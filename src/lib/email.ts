import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM = process.env.EMAIL_FROM || 'Studio One Graphics <onboarding@resend.dev>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';

export async function sendBookingConfirmation(to: string, data: {
  name: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
}) {
  if (!resend) return;
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject: 'Appointment Request Received — Studio One Graphics',
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 520px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="margin: 0 0 16px;">Thanks, ${data.name}!</h2>
          <p style="margin: 0 0 12px; color: #555; line-height: 1.6;">
            We've received your appointment request. Here's a summary:
          </p>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr><td style="padding: 8px 0; color: #888; width: 140px;">Service</td><td style="padding: 8px 0;">${data.service}</td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Preferred Date</td><td style="padding: 8px 0;">${data.preferredDate}</td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Preferred Time</td><td style="padding: 8px 0;">${data.preferredTime}</td></tr>
          </table>
          <p style="margin: 16px 0 0; color: #555; line-height: 1.6;">
            We'll be in touch shortly to confirm your appointment. If you have any questions, reply to this email or call us.
          </p>
          <p style="margin: 24px 0 0; color: #999; font-size: 13px;">
            — Studio One Graphics · Surrey, BC
          </p>
        </div>
      `,
    });
  } catch {
    // Email send failure shouldn't block the booking
  }
}

export async function sendAdminBookingAlert(data: {
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}) {
  if (!resend || !ADMIN_EMAIL) return;
  try {
    await resend.emails.send({
      from: FROM,
      to: ADMIN_EMAIL,
      subject: `New Appointment Request — ${data.name} · ${data.service}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 520px; color: #1a1a1a;">
          <h2 style="margin: 0 0 16px;">New Appointment Request</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #888; width: 120px;">Name</td><td style="padding: 6px 0;">${data.name}</td></tr>
            <tr><td style="padding: 6px 0; color: #888;">Email</td><td style="padding: 6px 0;">${data.email}</td></tr>
            <tr><td style="padding: 6px 0; color: #888;">Phone</td><td style="padding: 6px 0;">${data.phone || '—'}</td></tr>
            <tr><td style="padding: 6px 0; color: #888;">Vehicle</td><td style="padding: 6px 0;">${data.vehicle}</td></tr>
            <tr><td style="padding: 6px 0; color: #888;">Service</td><td style="padding: 6px 0;">${data.service}</td></tr>
            <tr><td style="padding: 6px 0; color: #888;">Date</td><td style="padding: 6px 0;">${data.preferredDate}</td></tr>
            <tr><td style="padding: 6px 0; color: #888;">Time</td><td style="padding: 6px 0;">${data.preferredTime}</td></tr>
            <tr><td style="padding: 6px 0; color: #888;">Notes</td><td style="padding: 6px 0;">${data.notes || '—'}</td></tr>
          </table>
          <p style="margin: 20px 0 0;"><a href="https://studioonegraphics.up.railway.app/admin/appointment-requests" style="color: #000; font-weight: 600;">View in Dashboard →</a></p>
        </div>
      `,
    });
  } catch {
    // Don't block the booking
  }
}

export async function sendContactAlert(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  if (!resend || !ADMIN_EMAIL) return;
  try {
    await resend.emails.send({
      from: FROM,
      to: ADMIN_EMAIL,
      subject: `New Contact Message — ${data.name}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 520px; color: #1a1a1a;">
          <h2 style="margin: 0 0 16px;">New Contact Message</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #888; width: 100px;">Name</td><td style="padding: 6px 0;">${data.name}</td></tr>
            <tr><td style="padding: 6px 0; color: #888;">Email</td><td style="padding: 6px 0;">${data.email}</td></tr>
            <tr><td style="padding: 6px 0; color: #888;">Phone</td><td style="padding: 6px 0;">${data.phone || '—'}</td></tr>
          </table>
          <div style="margin: 16px 0; padding: 16px; background: #f5f5f5; border-radius: 8px; line-height: 1.6;">
            ${data.message}
          </div>
          <p style="margin: 16px 0 0;"><a href="https://studioonegraphics.up.railway.app/admin" style="color: #000; font-weight: 600;">View in Dashboard →</a></p>
        </div>
      `,
    });
  } catch {
    // Don't block the contact form
  }
}
