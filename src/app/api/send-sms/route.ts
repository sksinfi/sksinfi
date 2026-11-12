import { NextRequest, NextResponse } from "next/server";

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

    // Default admin notification number
    const adminPhone = process.env.ADMIN_SMS_PHONE || "9928593122";
    // Clean recipient number for Indian SMS gateways (strip +91, non-digits)
    const rawDigits = adminPhone.replace(/\D/g, "");
    const clean10DigitPhone = rawDigits.length > 10 ? rawDigits.slice(-10) : rawDigits;
    const internationalPhone = adminPhone.startsWith("+") ? adminPhone : `+91${clean10DigitPhone}`;

    const serviceDisplay = subService ? `${service} (${subService})` : service;

    // Concise SMS text formatted to fit within standard single-credit SMS (approx 160 chars)
    const smsMessage = `SKS INFI Lead:\nName: ${name}\nPhone: ${phone}\nService: ${serviceDisplay}\nEmail: ${email}\nLoc: ${city ? `${city}, ` : ""}${country}`;

    console.log("--------------------------------------------------");
    console.log("📲 SKS INFI INCOMING ENQUIRY - SMS DISPATCH");
    console.log(`To Admin: ${adminPhone}`);
    console.log(`Message:\n${smsMessage}`);
    console.log("--------------------------------------------------");

    let gatewayResponse: any = null;
    let providerUsed = "mock";

    // 1. Check for Fast2SMS (Popular in India)
    if (process.env.FAST2SMS_API_KEY) {
      providerUsed = "fast2sms";
      try {
        const res = await fetch("https://www.fast2sms.com/dev/bulkV2", {
          method: "POST",
          headers: {
            authorization: process.env.FAST2SMS_API_KEY,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            route: "q",
            message: smsMessage,
            language: "english",
            flash: 0,
            numbers: clean10DigitPhone
          })
        });
        gatewayResponse = await res.json();
      } catch (err: any) {
        console.error("Fast2SMS API Error:", err.message);
      }
    }
    // 2. Check for Twilio (Global standard)
    else if (
      process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_FROM_PHONE
    ) {
      providerUsed = "twilio";
      try {
        const auth = Buffer.from(
          `${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`
        ).toString("base64");
        const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`;

        const params = new URLSearchParams();
        params.append("To", internationalPhone);
        params.append("From", process.env.TWILIO_FROM_PHONE);
        params.append("Body", smsMessage);

        const res = await fetch(twilioUrl, {
          method: "POST",
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: params.toString()
        });
        gatewayResponse = await res.json();
      } catch (err: any) {
        console.error("Twilio API Error:", err.message);
      }
    }
    // 3. Check for Generic SMS Webhook / Custom Gateway
    else if (process.env.SMS_GATEWAY_URL) {
      providerUsed = "custom_gateway";
      try {
        const url = process.env.SMS_GATEWAY_URL
          .replace("{phone}", encodeURIComponent(clean10DigitPhone))
          .replace("{message}", encodeURIComponent(smsMessage));

        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(process.env.SMS_API_KEY ? { Authorization: `Bearer ${process.env.SMS_API_KEY}` } : {})
          },
          body: JSON.stringify({
            to: clean10DigitPhone,
            message: smsMessage
          })
        });
        gatewayResponse = await res.text();
      } catch (err: any) {
        console.error("Custom SMS Gateway Error:", err.message);
      }
    }

    return NextResponse.json({
      success: true,
      provider: providerUsed,
      recipient: adminPhone,
      messagePreview: smsMessage,
      gatewayResponse: gatewayResponse || {
        status: "logged_in_dev_mode",
        note: "SMS payload logged to server. Set FAST2SMS_API_KEY, TWILIO_*, or SMS_GATEWAY_URL in .env.local to activate live carrier delivery."
      }
    });
  } catch (error: any) {
    console.error("SMS notification handler error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

