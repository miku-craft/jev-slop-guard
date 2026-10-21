// Pattern sources: Wikipedia "Signs of AI writing", the-antislop (MIT), tropes.fyi, wepick "AI가 망쳐놔서 더 이상 읽기 어려운 글쓰기 형식들",
// 오마이뉴스·한경 AI 말투 기사, and slop word lists (slopdetector.org, momenticmarketing).
export const SIGNALS = {
  tool_explainer: {
    label: '유행하는 툴·모델 소개/비교/리뷰 글 (Orca, Herdr 류) — 직접 써본 흔적 없음',
    instructions: 'Is this page an explainer, "what is X", deep-dive, how-to roundup, "X vs Y" comparison, "best X alternatives in 2026" or "X review 2026" about a trending tool, app, AI model or open-source project (for example Orca, Herdr, tmux-style agent workspaces, new AI coding agents, new AI models) that mostly restates the official announcement, README, docs or feature list? Install commands, config snippets, keybinding or feature tables, GitHub star counts, pros/cons tables and an unverifiable claim like "몇 주 써 보니" do NOT count as hands-on evidence, because they can be copied from the docs. Korean tells: titles like "X란 무엇인가", "X 파헤치기", "X 사용법 총정리", "X 완벽 가이드", "X vs Y 비교", "(feat. X, Y)"; a table for nearly every concept; "주의" / "설치 전 확인" callouts; "여기까지는 ~와 똑같습니다" setups; "X는 맞지만, Y는 아닙니다"; "진짜 장점은"; "한눈에", "직관적", "자연스럽다"; a closing summary table and "궁금한 점이 있다면 댓글로 남겨주세요". The product\'s own official site, docs, README or changelog is the source, not an explainer: answer no for it. Answer yes for such pages unless they show something the docs could not: specific errors the author actually hit and how they solved them, measured numbers, or a clearly personal workflow with concrete details.',
  },
  generic: {
    label: '누구나 아무에게나 쓸 수 있는 뻔한 내용 (직접 경험·구체적 수치·출처 없음)',
    instructions: 'Horoscope test: could this text have been written by anyone, for anyone? Answer yes unless it clearly shows a specific person\'s first-hand experience, concrete numbers, dates, names, cited sources or information you could not get from a generic summary. Vague attributions ("전문가들은", "많은 사람들이", "experts say", "studies show") without a named source count as yes.',
  },
  hype: {
    label: '과장된 단정·감탄 ("이건 정말 ~", "이건 강하다" 류)',
    instructions: 'Is the text full of empty hype, punchy overclaiming verdicts or inflated stakes with no evidence behind them? Korean examples: "이건 정말 ~다", "이건 강하다", "이건 미쳤다", "역대급", "판도를 바꾼다", "게임 체인저", "충격적인", "꼭 알아야 할", "진실은?", "불편한 진실은?", "그런데 가장 좋은 점은?", escalating triples like "좋다. 더 좋다. 최고다". English examples: "this changes everything", "game-changer", "here\'s the kicker", "the best part?", "and that\'s huge". Answer yes if such lines appear more than once.',
  },
  fake_insight: {
    label: '가짜 통찰 화법 ("A가 아니다. B다.", "모두가 X라 한다. 틀렸다" 류)',
    instructions: 'Does the text lean on rhetorical templates that fake insight? Signs: negative parallelism ("단순한 X가 아니라 Y다", "A가 아니다. B다.", "it\'s not X, it\'s Y"), negated countdowns ("재능이 아니다. 운도 아니다. 꾸준함이다"), fake contrarianism ("모두가 X라고 한다. 그들은 틀렸다", "아무도 말하지 않는"), crowd vs winners ("대부분의 사람들은 X, 성공한 사람들은 Y"), telling the reader what they need ("당신에게 필요한 건 X가 아니라 Y다"), stacked or self-answered questions ("그렇다면 왜일까? 답은 간단하다"), commanding one-liners ("스크롤을 멈춰라. 만들기 시작하라"), obvious ideas dressed as reversals ("생산성은 더 하는 게 아니라 덜 하는 것"), false suspense, "imagine a world", "think of it as" analogies. Answer yes if two or more appear.',
  },
  stock_phrases: {
    label: 'AI 상투어가 몰려 있음',
    instructions: 'Does the text contain a cluster of stock phrases typical of AI writing? Korean: "오늘은 ~에 대해 알아보겠습니다", "많은 분들이 궁금해하시는", "~해 보신 적 있으신가요?", "결론적으로", "정리하자면", "마무리하며", "도움이 되셨길 바랍니다", "총정리", "완벽 가이드", "A to Z", "진정으로", "핵심은", "중요한 점은", "주목할 만한", "~라고 해도 과언이 아니다", "아무리 강조해도 지나치지 않다", "새로운 패러다임", "X는 새로운 Y다", "한 단계 끌어올리다", "시사하는 바가 크다", "이 아이디어를 검증해보자". English: "delve", "leverage", "foster", "tapestry", "landscape", "underscore", "intricate", "pivotal", "elevate", "robust", "seamless", "serves as", "it\'s worth noting", "in today\'s fast-paced world", "here\'s the thing", "let\'s break this down", "unlock the power of". Answer yes if three or more appear.',
  },
  em_dash: {
    label: 'em dash(—) 남발',
    instructions: 'Does the text use em dashes (—) as a habit: in most paragraphs, for asides, dramatic pauses or "X — and that is the point" reveals? This is a strong tell in Korean text, where people rarely type "—" (Korean keyboards have no key for it; Korean writers use commas, parentheses or "-"). One or two em dashes in a long English text is normal; answer yes for repeated use, and for any repeated use in Korean text.',
  },
  template_structure: {
    label: '틀에 박힌 AI 글 구조',
    instructions: 'Does the text follow a mechanical AI template? Signs: one-sentence paragraphs and staccato runs ("이건 강하다. 정말 강하다."), emoji section headings (✅📌💡🔥🚀), every bullet starting with **bold**, heavy **bold** elsewhere, arrows and decorative unicode (→ ✓), constant rule-of-three lists, the same sentence opening repeated, "Step 1 / Phase 2" labels, a moral tacked onto each paragraph, summaries at every level, problems acknowledged then waved away with an upbeat close, a signposted ending ("결론적으로", "in conclusion") and a closing summary or FAQ that repeats the body. Answer yes if three or more appear.',
  },
};

// Not a slop signal: used to discount the score of trustworthy sources.
const AUTHORITY_INSTRUCTIONS = 'Look at the URL first. Is this page from an authoritative primary or reputable source: the official website, documentation, README, changelog or blog of the product or company itself (the domain or repository belongs to the project), Wikipedia, a government or university site, a standards body, a peer-reviewed journal or preprint server, or an established news outlet? Answer no for third-party blogs and personal posts (tistory, velog, naver blog, brunch, medium, dev.to, substack written by others), content farms, SEO "alternatives" / "vs" / "best of" sites, AI tool directories and aggregators.';
const AUTHORITY_DISCOUNT = 0.5; // a fully authoritative page keeps half its slop score

export const QUESTIONS = {
  slop: {
    type: 'noul',
    instructions: 'Be strict: most mass-produced web content is slop. Is this web page low-effort AI-generated "slop": generic, mass-produced filler written or mostly written by an AI with little real human insight, experience or original information? Answer yes if the page is a trending-tool explainer, deep-dive, comparison or review that mainly restates docs (install commands, keybinding tables and "몇 주 써 보니" claims do not rescue it), or if two or more of the signals below are present. Official documentation written by the product\'s own team is reference material, not slop. Answer no only when the text clearly shows a specific human\'s first-hand experience, original data or a distinctive voice. Signals: ' +
      Object.values(SIGNALS).map(s => s.instructions).join(' '),
  },
  authority: { type: 'noul', instructions: AUTHORITY_INSTRUCTIONS },
  ...Object.fromEntries(Object.entries(SIGNALS).map(([k, s]) => [k, { type: 'noul', instructions: s.instructions }])),
};

// `slop` decides, discounted only for authoritative sources; the other signals are shown as reasons, not mixed in.
export function parseAnswers({ answers }) {
  const authority = answers.authority?.noul ?? 0;
  const reasons = Object.entries(SIGNALS)
    .map(([k, s]) => ({ label: s.label, p: answers[k]?.noul ?? 0 }))
    .filter(r => r.p >= 0.5)
    .sort((a, b) => b.p - a.p);
  if (authority >= 0.5) reasons.push({ label: '공신력 있는 출처로 보여 점수 감면 (공식 문서·위키·언론 등)', p: authority });
  return { p: answers.slop.noul * (1 - AUTHORITY_DISCOUNT * authority), reasons };
}
