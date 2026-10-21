import assert from 'node:assert/strict';
import { pageText } from './extract.js';
import { QUESTIONS, parseAnswers } from './questions.js';

const html = `<html><head><style>p{color:red}</style><script>alert(1)</script></head>
<body><nav>Home | About</nav><!-- hi --><h1>Title</h1><p>Tom &amp; Jerry&nbsp;&lt;3<br><b>이건 강하다</b></p><footer>© 2026</footer></body></html>`;
assert.equal(pageText(html), 'Title Tom & Jerry <3 **이건 강하다**');
assert.equal(pageText('<p>' + 'a'.repeat(9000) + '</p>').length, 8000);

assert.deepEqual(Object.keys(QUESTIONS), ['slop', 'authority', 'tool_explainer', 'generic', 'hype', 'fake_insight', 'stock_phrases', 'em_dash', 'template_structure']);
assert.ok(['이건 강하다', 'Orca', 'A가 아니다. B다.', '파헤치기'].every(s => QUESTIONS.slop.instructions.includes(s)));

const r = parseAnswers({ answers: {
  slop: { noul: 0.87 }, generic: { noul: 0.6 }, hype: { noul: 0.95 }, stock_phrases: { noul: 0.2 },
} });
assert.equal(r.p, 0.87);
assert.deepEqual(r.reasons.map(x => x.p), [0.95, 0.6]); // >=0.5 only, highest first; missing answer treated as 0

// authoritative source: 0.9 slop * (1 - 0.5 * 0.9) = 0.495, below the 0.8 warning line
const doc = parseAnswers({ answers: { slop: { noul: 0.9 }, authority: { noul: 0.9 }, tool_explainer: { noul: 0.7 } } });
assert.ok(Math.abs(doc.p - 0.495) < 1e-9);
assert.equal(doc.reasons.at(-1).label.startsWith('공신력'), true);
// no authority answer: score unchanged
assert.equal(parseAnswers({ answers: { slop: { noul: 0.9 } } }).p, 0.9);
console.log('ok');
