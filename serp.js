// shortcut: one pass over the Google results present at load; results Google adds later (e.g. "more results") get no badge.
const COLORS = [[0.8, '#fde2e1', '#b3261e'], [0.5, '#fff1d6', '#8a5a00'], [0, '#e6f4ea', '#1e6e3a']];

for (const a of document.querySelectorAll('#search a:has(h3)')) {
  let url = new URL(a.href);
  if (url.pathname === '/url') url = new URL(url.searchParams.get('q') || url.searchParams.get('url') || a.href);
  if (!/^https?:$/.test(url.protocol) || /(^|\.)google\./.test(url.hostname)) continue;

  const badge = document.createElement('span');
  badge.textContent = 'slop …';
  badge.style.cssText =
    'margin-left:8px;padding:1px 6px;border-radius:4px;font-size:12px;font-weight:500;vertical-align:middle;background:#eee;color:#555';
  a.querySelector('h3').append(badge);

  chrome.runtime.sendMessage({ type: 'check', url: url.href }).then(res => {
    if (res.error) {
      badge.textContent = 'slop ?';
      badge.title = res.error;
      return;
    }
    const [, bg, fg] = COLORS.find(([min]) => res.p >= min);
    badge.textContent = `slop ${Math.round(res.p * 100)}%`;
    badge.style.background = bg;
    badge.style.color = fg;
    badge.title = res.reasons.map(r => `• ${r.label} (${Math.round(r.p * 100)}%)`).join('\n') || '뚜렷한 slop 신호 없음';
  });
}
