import { chromium } from 'playwright';
const [,, base, out, ...paths] = process.argv;
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
for (const p of paths) {
  for (const [w, h, tag] of [[1440, 900, 'd'], [390, 844, 'm']]) {
    const pg = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    const errs = [];
    pg.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
    pg.on('pageerror', (e) => errs.push(String(e)));
    await pg.goto(base + p, { waitUntil: 'networkidle' });
    await pg.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 150)); } window.scrollTo(0, 0); });
    await pg.waitForTimeout(2800);
    const ow = await pg.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    const name = `${out}/${(p.replace(/\//g, '_') || 'home')}-${tag}.jpg`;
    await pg.screenshot({ path: name, fullPage: true, type: 'jpeg', quality: 60 });
    console.log(name, 'overflowX=' + ow, errs.length ? 'ERR ' + errs.join(' | ') : '');
    await pg.close();
  }
}
await b.close();
