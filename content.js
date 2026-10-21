const THRESHOLD = 0.8;

document.addEventListener('click', async e => {
  // shortcut: plain left-clicks only; cmd/ctrl/middle-click and typed URLs go through unchecked.
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = e.target.closest?.('a[href]');
  if (!a) return;
  const url = new URL(a.href, location.href);
  if (!/^https?:$/.test(url.protocol) || url.origin === location.origin) return;

  e.preventDefault();
  e.stopImmediatePropagation();
  document.documentElement.style.cursor = 'progress';
  const res = await chrome.runtime.sendMessage({ type: 'check', url: url.href });
  document.documentElement.style.cursor = '';

  if (res.error) console.warn('[Slop Guard] 검사 실패, 그냥 엽니다:', res.error);
  else if (res.p >= THRESHOLD &&
    !confirm(warning(res, url.href))) return;

  if (a.target === '_blank') chrome.runtime.sendMessage({ type: 'open', url: url.href });
  else location.assign(url.href);
}, true);

const pct = p => `${Math.round(p * 100)}%`;
const warning = ({ p, reasons }, href) =>
  `⚠️ 이 페이지가 AI slop일 확률: ${pct(p)}\n\n` +
  (reasons.length ? `근거:\n${reasons.map(r => `• ${r.label} (${pct(r.p)})`).join('\n')}\n\n` : '') +
  `${href}\n\n그래도 들어갈까요?`;
