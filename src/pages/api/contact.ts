import type { APIRoute } from "astro";

export const prerender = false;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value: string) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const response = (message: string, status = 200) => Response.json({ message }, { status });

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const message = String(form.get("message") ?? "").trim();
  const company = String(form.get("company") ?? "").trim();

  if (company) return response("Invalid submission.", 400);
  if (name.length < 2 || name.length > 80 || !EMAIL_PATTERN.test(email) || message.length < 10 || message.length > 4000) {
    return response("Please review the form fields.", 400);
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  const from = import.meta.env.RESEND_FROM;
  const recipient = import.meta.env.CONTACT_RECIPIENT;
  if (!apiKey || !from || !recipient) return response("Email service is not configured.", 503);

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [recipient],
      reply_to: email,
      subject: `Nuevo contacto: ${name}`,
      html: `<h2>Nuevo mensaje desde el portafolio</h2><p><strong>Nombre:</strong> ${escapeHtml(name)}</p><p><strong>Correo:</strong> ${escapeHtml(email)}</p><p><strong>Mensaje:</strong></p><p>${escapeHtml(message).replaceAll("\n", "<br>")}</p>`,
    }),
  });

  if (!resendResponse.ok) {
    console.error("Resend contact form error", await resendResponse.text());
    return response("Unable to send the message.", 502);
  }

  return response("Message sent successfully.");
};
