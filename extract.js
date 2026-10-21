// shortcut: regex tag stripping (service workers have no DOMParser); move to an offscreen document if pages extract badly.
export function pageText(html, max = 8000) {
  return html
    .replace(/<(script|style|noscript|svg|nav|header|footer)\b[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, '**$2**') // keep bold: heavy bolding is an AI tell
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}
