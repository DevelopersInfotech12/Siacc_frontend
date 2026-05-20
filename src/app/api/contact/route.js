// src/app/api/contact/route.js
//
// .env.local must have:
//   GOOGLE_SHEET_URL=https://script.google.com/macros/s/YOUR_ID/exec
//
// The URL must start with https://script.google.com/macros/s/
// NOT a Google Drive URL or Sheets URL.

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, company, service, description, heard, source } = body;

    // Validation
    if (!name?.trim() || !phone?.trim() || !email?.trim() || !description?.trim()) {
      return NextResponse.json(
        { error: "Name, phone, email and description are required." },
        { status: 400 }
      );
    }

    const sheetUrl = process.env.GOOGLE_SHEET_URL;

    // ── Validate the URL format ───────────────────────────────────────────────
    if (!sheetUrl) {
      console.error("❌ GOOGLE_SHEET_URL is not set in .env.local");
      return NextResponse.json({ success: true, note: "Sheet URL not configured" });
    }

    if (!sheetUrl.startsWith("https://script.google.com/macros/s/")) {
      console.error("❌ Wrong URL format! Got:", sheetUrl);
      console.error("   Must start with: https://script.google.com/macros/s/");
      return NextResponse.json({ success: true, note: "Invalid sheet URL format" });
    }

    if (!sheetUrl.endsWith("/exec")) {
      console.error("❌ URL must end with /exec. Got:", sheetUrl);
      return NextResponse.json({ success: true, note: "URL must end with /exec" });
    }

    console.log("✅ Sheet URL looks correct:", sheetUrl);

    const payload = {
      name:        name.trim(),
      phone:       phone.trim(),
      email:       email.trim(),
      company:     company?.trim()     || "",
      service:     service             || "Not specified",
      description: description?.trim() || "",
      heard:       heard               || "Not specified",
      source:      source              || "SIACC Contact Page",
    };

    // ── Send as POST with text/plain (avoids CORS preflight + redirect issues) 
    // Google Apps Script accepts text/plain body as postData.contents
    try {
      const res = await fetch(sheetUrl, {
        method:   "POST",
        redirect: "follow",
        headers:  { "Content-Type": "text/plain;charset=utf-8" },
        body:     JSON.stringify(payload),
        signal:   AbortSignal.timeout(12000),
      });

      const responseText = await res.text();
      console.log("📋 Sheet raw response:", responseText.slice(0, 200));

      // Check if we got HTML back (means URL is wrong or not deployed)
      if (responseText.trim().startsWith("<")) {
        console.error("❌ Got HTML response — script not deployed correctly or wrong URL");
        console.error("   Redeploy as Web App and get a new /exec URL");
      } else {
        try {
          const json = JSON.parse(responseText);
          console.log("✅ Sheet saved successfully. Row:", json.row);
        } catch {
          console.log("ℹ️  Non-JSON response:", responseText.slice(0, 100));
        }
      }
    } catch (fetchErr) {
      console.error("❌ Fetch to sheet failed:", fetchErr.message);
    }

    // Always return success to user
    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Contact API error:", err.message);
    return NextResponse.json({ success: true });
  }
}