import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name = "Website Visitor",
      phone = "Not provided",
      email = "Not provided",
      service = "General Consultation",
      subService = "",
      country = "India",
      city = "",
      message = ""
    } = body;

    const recipientEmail = process.env.ADMIN_EMAIL || "infi@sksinfi.com";
    const serviceDisplay = subService ? `${service} - ${subService}` : service;
    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    const subject = `New Lead Enquiry: ${serviceDisplay} from ${name}`;

    const textContent = `
SKS INFI - New Website Lead Alert
=================================
Received on: ${timestamp} IST

Client Details:
- Name: ${name}
- Phone: ${phone}
- Email: ${email}
- Service: ${serviceDisplay}
- Location: ${city ? `${city}, ` : ""}${country}
- Message / Notes: ${message || "N/A"}

Recipient: ${recipientEmail}
`;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
    .header { background: linear-gradient(135deg, #094b57 0%, #0d5f6f 100%); padding: 28px 24px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0 0 6px 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px; }
    .header p { margin: 0; font-size: 13px; color: #b69455; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
    .body-content { padding: 24px; color: #334155; }
    .lead-table { width: 100%; border-collapse: collapse; margin-top: 16px; margin-bottom: 24px; }
    .lead-table td { padding: 12px 14px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .lead-table td.label { font-weight: 600; color: #094b57; width: 35%; background: #f8fafc; }
    .lead-table td.value { color: #1e293b; font-weight: 500; }
    .action-btn-container { text-align: center; margin: 24px 0 16px 0; }
    .btn-call { display: inline-block; background: #094b57; color: #ffffff !important; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 14px; margin-right: 10px; }
    .btn-email { display: inline-block; background: #b69455; color: #ffffff !important; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 14px; }
    .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>SKS INFI Consultation Alert</h1>
      <p>Instant Website Lead Notification</p>
    </div>
    <div class="body-content">
      <p style="margin-top: 0; font-size: 15px;">A prospective client has submitted an enquiry form on <strong>sksinfi.com</strong>:</p>
      
      <table class="lead-table">
        <tr>
          <td class="label">Full Name</td>
          <td class="value"><strong>${name}</strong></td>
        </tr>
        <tr>
          <td class="label">Contact Phone</td>
          <td class="value"><a href="tel:${phone}" style="color: #094b57; font-weight: 700;">${phone}</a></td>
        </tr>
        <tr>
          <td class="label">Email Address</td>
          <td class="value"><a href="mailto:${email}" style="color: #094b57;">${email}</a></td>
        </tr>
        <tr>
          <td class="label">Service Requested</td>
          <td class="value"><strong>${service}</strong></td>
        </tr>
        ${subService ? `<tr><td class="label">Product / Sub-Service</td><td class="value">${subService}</td></tr>` : ""}
        <tr>
          <td class="label">Location / Country</td>
          <td class="value">${city ? `${city}, ` : ""}${country}</td>
        </tr>
        ${message ? `<tr><td class="label">Message / Details</td><td class="value">${message}</td></tr>` : ""}
        <tr>
          <td class="label">Submitted At</td>
          <td class="value">${timestamp} IST</td>
        </tr>
      </table>

      <div class="action-btn-container">
        <a href="tel:${phone}" class="btn-call">📞 Call Client Now</a>
        <a href="mailto:${email}?subject=Regarding your enquiry with SKS INFI" class="btn-email">✉️ Reply via Email</a>
      </div>
    </div>
    <div class="footer">
      Sent automatically to <strong>${recipientEmail}</strong> via SKS INFI Lead Dispatch System.
    </div>
  </div>
</body>
</html>
`;

    console.log("--------------------------------------------------");
    console.log("📧 SKS INFI LEAD ENQUIRY - EMAIL DISPATCH");
    console.log(`To: ${recipientEmail}`);
    console.log(`Subject: ${subject}`);
    console.log(`Name: ${name} | Phone: ${phone} | Email: ${email}`);
    console.log(`Service: ${serviceDisplay}`);
    console.log("--------------------------------------------------");

    let mailResult: any = null;
    let modeUsed = "logged_in_dev_mode";

    // Method 1: Resend (Easiest Modern API - Only 1 API Key needed)
    if (process.env.RESEND_API_KEY) {
      modeUsed = "resend";
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM || "SKS INFI Leads <onboarding@resend.dev>",
            to: [recipientEmail],
            reply_to: email !== "Not provided" ? email : undefined,
            subject,
            html: htmlContent,
            text: textContent
          })
        });
        mailResult = await res.json();
      } catch (err: any) {
        console.error("Resend API Error:", err.message);
      }
    }
    // Method 2: Web3Forms (Zero Password - 1 Free Access Key)
    else if (process.env.WEB3FORMS_ACCESS_KEY) {
      modeUsed = "web3forms";
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: process.env.WEB3FORMS_ACCESS_KEY,
            to: recipientEmail,
            subject,
            from_name: "SKS INFI Website",
            name,
            phone,
            email,
            service: serviceDisplay,
            location: `${city ? `${city}, ` : ""}${country}`,
            message
          })
        });
        mailResult = await res.json();
      } catch (err: any) {
        console.error("Web3Forms Error:", err.message);
      }
    }
    // Method 3: Standard SMTP (cPanel Webmail, Gmail, or Zoho)
    else if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      modeUsed = "smtp_live";
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || "465", 10),
          secure: process.env.SMTP_SECURE === "false" ? false : true,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });

        const fromAddress = process.env.SMTP_FROM || `SKS INFI Enquiries <${process.env.SMTP_USER}>`;

        mailResult = await transporter.sendMail({
          from: fromAddress,
          to: recipientEmail,
          replyTo: email !== "Not provided" ? email : undefined,
          subject,
          text: textContent,
          html: htmlContent
        });
      } catch (smtpErr: any) {
        console.error("SMTP sending error:", smtpErr.message);
      }
    }

    return NextResponse.json({
      success: true,
      mode: modeUsed,
      recipient: recipientEmail,
      subject,
      mailResult: mailResult || {
        status: "logged_in_dev_mode",
        note: "Email logged. Provide RESEND_API_KEY, WEB3FORMS_ACCESS_KEY, or SMTP_PASS in .env.local to send live emails to infi@sksinfi.com."
      }
    });
  } catch (error: any) {
    console.error("Email API route error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
