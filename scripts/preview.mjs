// Turns the PREVIEW build into a self-contained multi-page bundle for a claude.ai artifact:
// relative links with .html, Google Fonts instead of self-hosted files, index.html without its own skeleton.
import fs from 'node:fs';
import path from 'node:path';
const DIST = 'dist';
const GF = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Source+Sans+3:wght@400;600&display=swap">';
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const pages = walk(DIST).filter((f) => f.endsWith('.html'));
const known = new Set(pages.map((f) => '/' + path.relative(DIST, f).replace(/\.html$/, '').replace(/^index$/, '')));
for (const f of pages) {
  const rel = path.relative(DIST, f);
  const depth = rel.split('/').length - 1;
  const up = depth ? '../'.repeat(depth) : '';
  let h = fs.readFileSync(f, 'utf8');
  h = h.replace(/@font-face\{[^}]*\}/g, '');
  h = h.replace('</title>', '</title>' + GF);
  const fix = (u) => {
    if (!u.startsWith('/') || u.startsWith('//')) return u;
    const [p, hash] = u.split('#');
    let out;
    if (p === '/' || p === '') out = 'index.html';
    else if (known.has(p)) out = p.slice(1) + '.html';
    else out = p.slice(1);
    return up + out + (hash ? '#' + hash : '');
  };
  h = h.replace(/(href|src|action)="([^"]*)"/g, (m, a, u) => `${a}="${fix(u)}"`);
  h = h.replace(/(srcset|imagesrcset)="([^"]*)"/g, (m, a, v) => `${a}="${v.split(', ').map((s) => { const [u, w] = s.split(' '); return fix(u) + ' ' + w; }).join(', ')}"`);
  if (rel === 'index.html') {
    h = h.replace(/<!doctype html>/i, '').replace(/<html[^>]*>/, '').replace('</html>', '').replace('<head>', '').replace('</head>', '').replace(/<body[^>]*>/, '').replace('</body>', '');
  }
  fs.writeFileSync(f, h);
}
// drop files the artifact doesn't need
for (const f of walk(DIST)) if (/\.(woff2?|xml|txt)$/.test(f) || f.includes('/og/') || f.endsWith('404.html')) fs.rmSync(f);
const files = walk(DIST).filter((f) => !f.endsWith('/index.html') || path.relative(DIST, f) !== 'index.html');
const map = Object.fromEntries(files.map((f) => [path.relative(DIST, f), path.resolve(f)]));
fs.writeFileSync('preview-files.json', JSON.stringify(map));
console.log(pages.length, 'pages;', Object.keys(map).length, 'supporting files');
