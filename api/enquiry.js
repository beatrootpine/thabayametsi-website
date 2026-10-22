// Vercel serverless function: receives Partners and Visit form submissions.
// Sends to the office inbox via Resend and (optionally) appends to a Google Sheet via an Apps Script webhook.
// Env: RESEND_API_KEY, OFFICE_EMAIL, FROM_EMAIL, SHEET_WEBHOOK_URL (optional)
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const chunks = []; for await (const c of req) chunks.push(c);
  const body = Buffer.concat(chunks).toString();
  const type = req.headers['content-type'] || '';
  let data = {};
  if (type.includes('application/json')) data = JSON.parse(body || '{}');
  else if (type.includes('multipart/form-data')) {
    const boundary = type.split('boundary=')[1];
    for (const part of body.split('--' + boundary)) {
      const m = part.match(/name="([^"]+)"\r\n\r\n([\s\S]*)\r\n$/);
      if (m) data[m[1]] = m[2];
    }
  } else data = Object.fromEntries(new URLSearchParams(body));
  // Spam protection without a visible CAPTCHA: honeypot + minimum fill time.
  if (data.website) return res.status(200).json({ ok: true });
  if (data.t && Date.now() - Number(data.t) < 3000) return res.status(200).json({ ok: true });
  if (!data.name || !data.email || !data.message) return res.status(400).json({ ok: false });
  const lines = ['name', 'organisation', 'email', 'phone', 'subject', 'message'].map((k) => `${k}: ${data[k] || ''}`).join('\n');
  const tasks = [];
  if (process.env.RESEND_API_KEY && process.env.OFFICE_EMAIL) {
    tasks.push(fetch('https://api.resend.com/emails', {
      method: 'POST', headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: process.env.FROM_EMAIL || 'website@thabayametsi.com', to: process.env.OFFICE_EMAIL, reply_to: data.email, subject: `Website enquiry: ${data.subject || data.form}`, text: lines }),
    }));
  }
  if (process.env.SHEET_WEBHOOK_URL) {
    tasks.push(fetch(process.env.SHEET_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, received: new Date().toISOString() }) }));
  }
  const results = await Promise.allSettled(tasks);
  const ok = results.every((r) => r.status === 'fulfilled' && r.value.ok);
  return res.status(ok ? 200 : 502).json({ ok });
}
