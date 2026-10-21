import { pageText } from './extract.js';
import { QUESTIONS, parseAnswers } from './questions.js';

// shortcut: in-memory cache, lost when the service worker sleeps; fine for repeat clicks within a session.
const cache = new Map();

chrome.runtime.onInstalled.addListener(() => chrome.runtime.openOptionsPage());

chrome.runtime.onMessage.addListener((msg, sender, reply) => {
  if (msg.type === 'open') {
    chrome.tabs.create({ url: msg.url, index: sender.tab.index + 1, openerTabId: sender.tab.id });
    return;
  }
  if (msg.type !== 'check') return;
  if (!cache.has(msg.url)) cache.set(msg.url, slopProbability(msg.url));
  cache.get(msg.url).then(
    r => reply(r),
    err => { cache.delete(msg.url); reply({ error: String(err) }); },
  );
  return true; // keep the channel open for the async reply
});

async function slopProbability(url) {
  const { apiKey, gateway } = await chrome.storage.local.get(['apiKey', 'gateway']);
  if (!apiKey) throw new Error('Jev API 키가 없습니다. 확장 옵션에서 설정하세요.');

  // omit cookies: we only need the public text, not the user's logged-in view
  const page = await fetch(url, { credentials: 'omit' });
  if (!page.headers.get('content-type')?.includes('text/html')) return { p: 0, reasons: [] };
  const text = pageText(await page.text());
  if (text.length < 200) return { p: 0, reasons: [] }; // too little text to judge

  const res = await fetch(
    gateway ? 'https://ai-gateway.vercel.sh/typesafe/v1/systemone' : 'https://api.typesafe.ai/v1/systemone',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        state: `URL: ${url}\n\n${text}`, // the URL lets Jev recognise official sources
        model: gateway ? 'typesafe-ai/jev' : 'jev-latest',
        questions: QUESTIONS,
      }),
    },
  );
  if (!res.ok) throw new Error(`Jev ${res.status}: ${await res.text()}`);
  return parseAnswers(await res.json());
}
