import nodemailer from 'nodemailer'

/* ─── Sanitizar HTML para evitar XSS ────────────────────────────────────── */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export default async function handler(req, res) {
  /* Solo POST */
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  const { name, email, phone, service, budget, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Faltan campos requeridos' })
  }

  /* Sanitizar inputs */
  const safeName    = escapeHtml(name)
  const safeEmail   = escapeHtml(email)
  const safePhone   = escapeHtml(phone || '')
  const safeService = escapeHtml(service || '')
  const safeBudget  = escapeHtml(budget || '')
  const safeMessage = escapeHtml(message)

  const infoRows = [
    { label: 'Nombre', value: safeName },
    { label: 'Email', value: `<a href="mailto:${safeEmail}" style="color:#00d4ff;">${safeEmail}</a>` },
    safePhone   && { label: 'Teléfono', value: safePhone },
    safeService && { label: 'Tipo de proyecto', value: safeService },
    safeBudget  && { label: 'Presupuesto', value: safeBudget },
  ].filter(Boolean)

  const tableRows = infoRows.map(r => `
    <tr>
      <td style="padding:10px 16px;font-size:13px;color:#888;white-space:nowrap;border-bottom:1px solid #f0f0f0;">${r.label}</td>
      <td style="padding:10px 16px;font-size:14px;color:#333;border-bottom:1px solid #f0f0f0;font-weight:500;">${r.value}</td>
    </tr>
  `).join('')

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from:    `"Portafolio de Jose" <${process.env.EMAIL_USER}>`,
      to:      process.env.EMAIL_USER,
      replyTo: email,
      subject: `📩 Nuevo mensaje de ${safeName} — Portafolio`,
      html: `
        <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
          <div style="background:linear-gradient(135deg,#080812 0%,#0f0f23 100%);padding:32px 28px;border-radius:12px 12px 0 0;">
            <h1 style="margin:0;font-size:22px;color:#00d4ff;font-weight:700;">📬 Nuevo mensaje del portafolio</h1>
            <p style="margin:8px 0 0;font-size:13px;color:#8892b0;">Alguien quiere trabajar contigo</p>
          </div>
          <div style="padding:24px 0;">
            <table style="width:100%;border-collapse:collapse;">
              ${tableRows}
            </table>
          </div>
          <div style="padding:0 28px 28px;">
            <div style="background:#f8f9fb;border-left:4px solid #00d4ff;border-radius:0 8px 8px 0;padding:20px;">
              <p style="margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#888;font-weight:600;">Mensaje</p>
              <p style="margin:0;font-size:14px;color:#333;line-height:1.7;white-space:pre-wrap;">${safeMessage}</p>
            </div>
          </div>
          <div style="padding:16px 28px;background:#f8f9fb;border-radius:0 0 12px 12px;text-align:center;">
            <p style="margin:0;font-size:11px;color:#999;">
              Puedes responder directamente a este correo para contactar a ${safeName}
            </p>
          </div>
        </div>
      `,
    })

    res.json({ success: true })
  } catch (err) {
    console.error('Error enviando correo:', err.message)
    res.status(500).json({ success: false, error: 'Error al enviar el correo' })
  }
}
