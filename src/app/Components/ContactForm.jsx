// src/app/api/contact/route.js
//
// Add to .env.local:
//   GOOGLE_SHEET_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const { name, phone, email, service, message } = body;

    // Basic validation
    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "Name, phone and email are required." },
        { status: 400 }
      );
    }

    const sheetUrl = process.env.GOOGLE_SHEET_URL;
    if (!sheetUrl) {
      console.error("GOOGLE_SHEET_URL not set in .env.local");
      return NextResponse.json(
        { error: "Sheet URL not configured." },
        { status: 500 }
      );
    }

    // Forward to Google Apps Script
    const sheetRes = await fetch(sheetUrl, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name:    name.trim(),
        phone:   phone.trim(),
        email:   email.trim(),
        service: service || "Not specified",
        message: message || "",
        source:  "SIACC Website Contact Form",
      }),
    });

    // Google Apps Script always returns 200 even on errors — check body
    const result = await sheetRes.json().catch(() => ({ status: "unknown" }));

    if (result.status === "error") {
      console.error("Google Sheet error:", result.message);
      return NextResponse.json({ error: "Failed to save to sheet." }, { status: 502 });
    }

    return NextResponse.json({ success: true, message: "Enquiry saved successfully." });

  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}