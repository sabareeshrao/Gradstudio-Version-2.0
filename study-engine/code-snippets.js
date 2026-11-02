// Gradstudio: shared VS Code Dark+ teaching snippets.
// Keep source snippets at 15 lines or fewer. Runtime guard is a safety net.
const MAX_LINES = 15;
const keywords = /^(?:and|as|assert|async|await|break|case|class|const|continue|def|del|elif|else|except|export|False|finally|for|from|function|if|import|in|is|lambda|let|new|None|not|or|pass|raise|return|self|super|switch|throw|True|try|var|while|with|yield)$/;
const builtins = /^(?:enumerate|float|int|len|list|map|max|min|print|range|round|set|str|sum|tuple|zip|torch|nn|np|pd)$/;
const tokens = /(?:#[^\n]*|\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\x60(?:\\.|[^\x60\\])*\x60|@[a-zA-Z_]\w*|\b\d+(?:\.\d+)?\b|\b[A-Za-z_]\w*\b)/g;
function colorLine(line, row) {
  let offset = 0;
  for (const match of line.matchAll(tokens)) {
    const word = match[0], index = match.index;
    if (index > offset) row.append(document.createTextNode(line.slice(offset, index)));
    let type = '';
    if (word.startsWith('#') || word.startsWith('//')) type = 'comment';
    else if (/^["'\x60]/.test(word)) type = 'string';
    else if (word.startsWith('@')) type = 'decorator';
    else if (/^\d/.test(word)) type = 'number';
    else if (keywords.test(word)) type = 'keyword';
    else if (builtins.test(word)) type = 'builtin';
    else if (/^[A-Z]/.test(word)) type = 'class';
    else if (/^\s*\(/.test(line.slice(index + word.length))) type = 'function';
    if (type) {
      const span = document.createElement('span');
      span.className = 'gs-tok-' + type;
      span.textContent = word;
      row.append(span);
    } else row.append(document.createTextNode(word));
    offset = index + word.length;
  }
  if (offset < line.length) row.append(document.createTextNode(line.slice(offset)));
}
export function formatLessonCode(root) {
  if (!root) return {blocks: 0, truncated: 0};
  let blocks = 0, truncated = 0;
  for (const pre of root.querySelectorAll('pre')) {
    if (pre.closest('svg') || pre.hasAttribute('data-no-code-format')) continue;
    const source = pre.querySelector('code') || pre;
    const raw = source.textContent.replace(/\r\n?/g, '\n').replace(/^\n+|\n+$/g, '');
    if (!raw.trim()) continue;
    const allLines = raw.split('\n'), lines = allLines.slice(0, MAX_LINES);
    if (allLines.length > MAX_LINES) {
      truncated++;
      pre.dataset.truncatedLines = String(allLines.length);
      pre.title = 'Preview shows 15 of ' + allLines.length + ' lines; update the source to a shorter excerpt.';
    }
    const code = document.createElement('code');
    code.className = 'gs-syntax';
    const lang = /\b(js|javascript|json|typescript)\b/i.test(pre.className + ' ' + source.className) ? 'JS / JSON' : 'PYTHON';
    pre.dataset.language = lang + ' · ' + lines.length + ' LINES';
    lines.forEach((line, i) => {
      const row = document.createElement('span');
      row.className = 'gs-code-row';
      row.dataset.number = String(i + 1);
      colorLine(line, row);
      code.append(row);
    });
    pre.replaceChildren(code);
    pre.classList.add('gs-code-block');
    blocks++;
  }
  return {blocks, truncated};
}
