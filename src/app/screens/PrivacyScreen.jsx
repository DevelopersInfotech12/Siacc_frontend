import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const C = {
  forest: "#1B4332", forestMid: "#2D6A4F", forestLight: "#40916C",
  mint: "#95D5B2", mintLight: "#D8F3DC",
  offWhite: "#F7FAF8", charcoal: "#1A1A2E", gray: "#6B7280", white: "#ffffff",
  serif: "'Playfair Display', Georgia, serif", sans: "'DM Sans', system-ui, sans-serif",
};

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly to us, including:
    
• Contact details: name, email address, phone number, company name, and job title when you fill out forms on our website or contact us.
• Communication records: emails, messages, and notes from consultations and calls.
• Usage data: pages visited, time on site, browser type, IP address, and referring URLs collected automatically through cookies and analytics tools.
• Payment information: processed securely through third-party payment processors. We do not store card details.`
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to:

• Respond to your enquiries and provide certification consulting services.
• Send you service-related communications, invoices, and status updates.
• Send regulatory updates, newsletters, and compliance alerts (you may opt out at any time).
• Improve our website, services, and user experience through analytics.
• Comply with legal obligations and regulatory requirements.
• Prevent fraud and maintain the security of our systems.`
  },
  {
    title: "3. Information Sharing",
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with:

• Service providers who assist us in operating our website and delivering services (e.g., email platforms, CRM tools, cloud storage) — bound by confidentiality agreements.
• Regulatory bodies (BIS, CPCB, WPC, TEC, etc.) when required to process your certification applications.
• Legal authorities when required by applicable law, court order, or government regulation.
• Business partners only with your explicit consent.`
  },
  {
    title: "4. Data Security",
    content: `We implement industry-standard security measures to protect your personal information:

• All data transmitted between your browser and our website is encrypted using SSL/TLS.
• Access to personal data is restricted to authorized personnel only.
• We conduct regular security reviews and vulnerability assessments.
• Client certification documents are stored in encrypted, access-controlled storage.

No method of internet transmission is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.`
  },
  {
    title: "5. Cookies & Tracking",
    content: `Our website uses cookies and similar technologies to:

• Remember your preferences and settings.
• Analyze website traffic and usage patterns using tools like Google Analytics.
• Improve website functionality and user experience.

You can control cookies through your browser settings. Disabling cookies may affect some website functionality. We use only essential and analytics cookies — no advertising or tracking cookies.`
  },
  {
    title: "6. Your Rights",
    content: `You have the right to:

• Access: Request a copy of the personal data we hold about you.
• Correction: Request correction of inaccurate or incomplete data.
• Deletion: Request deletion of your personal data (subject to legal obligations).
• Objection: Object to the processing of your data for marketing purposes.
• Portability: Request a copy of your data in a machine-readable format.

To exercise any of these rights, contact us at privacy@Siacc.in. We will respond within 30 days.`
  },
  {
    title: "7. Data Retention",
    content: `We retain your personal data for as long as necessary to:

• Provide our services and maintain our business relationship with you.
• Comply with legal and regulatory obligations (typically 7 years for financial records).
• Resolve disputes and enforce our agreements.

Once data is no longer required, we securely delete or anonymize it. Certification documents may be retained longer as required by applicable regulatory frameworks.`
  },
  {
    title: "8. Third-Party Links",
    content: `Our website may contain links to third-party websites (e.g., BIS, CPCB, WPC portals). We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before providing personal information.`
  },
  {
    title: "9. Children's Privacy",
    content: `Our services are intended for businesses and professionals. We do not knowingly collect personal information from children under 18. If you believe we have inadvertently collected such information, please contact us immediately at privacy@Siacc.in.`
  },
  {
    title: "10. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or services. We will notify you of significant changes by:

• Posting a notice on our website.
• Sending an email to registered users.

The "Last Updated" date at the top of this page reflects the most recent revision. Continued use of our services after changes constitutes acceptance of the updated policy.`
  },
  {
    title: "11. Contact Us",
    content: `For any privacy-related questions, requests, or concerns, please contact:

Siacc India — Privacy Officer
Email: privacy@Siacc.in
Phone: +91- 9540190334
Address: 12, North West Delhi, New Delhi – 110001

We aim to respond to all privacy inquiries within 5 business days.`
  },
];

export default function PrivacyScreen() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: C.offWhite, fontFamily: C.sans }}>
      <Navbar />

      {/* Hero */}
      <section style={{ backgroundColor: C.forest, padding: "64px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: C.mint, letterSpacing: "0.12em", textTransform: "uppercase" }}>Legal</span>
          <h1 style={{ fontFamily: C.serif, fontSize: "clamp(1.8rem,3vw,2.8rem)", color: C.white, margin: "12px 0 16px", fontWeight: 700 }}>Privacy Policy</h1>
          <p style={{ color: "#b7e4c7", fontSize: 15, lineHeight: 1.7 }}>
            Last Updated: <strong style={{ color: C.mint }}>April 1, 2025</strong> &nbsp;|&nbsp; Effective Date: <strong style={{ color: C.mint }}>January 1, 2024</strong>
          </p>
          <p style={{ color: "#b7e4c7", fontSize: 15, lineHeight: 1.75, maxWidth: 680, marginTop: 12 }}>
            Siacc India ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website or services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {sections.map((sec) => (
              <div key={sec.title} style={{ backgroundColor: C.white, borderRadius: 16, padding: "28px 32px", border: `1px solid ${C.mintLight}` }}>
                <h2 style={{ fontFamily: C.serif, fontSize: 18, color: C.forest, marginBottom: 16, fontWeight: 700 }}>{sec.title}</h2>
                <div style={{ fontSize: 14, color: C.gray, lineHeight: 1.85, whiteSpace: "pre-line" }}>{sec.content}</div>
              </div>
            ))}
          </div>

          {/* Summary box */}
          <div style={{ marginTop: 32, backgroundColor: C.mintLight, borderRadius: 16, padding: "28px 32px", border: `1px solid ${C.mint}` }}>
            <h3 style={{ fontFamily: C.serif, fontSize: 17, color: C.forest, marginBottom: 12, fontWeight: 600 }}>Quick Summary</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { icon: "✅", text: "We don't sell your data to third parties" },
                { icon: "✅", text: "You can request deletion of your data anytime" },
                { icon: "✅", text: "All data is transmitted over encrypted connections" },
                { icon: "✅", text: "We only collect data necessary for our services" },
                { icon: "✅", text: "Marketing emails include an unsubscribe option" },
                { icon: "✅", text: "We comply with applicable Indian data protection laws" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: C.forest }}>
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}