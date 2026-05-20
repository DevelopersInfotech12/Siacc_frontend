// src/app/qr-contact/page.jsx
// Route: /qr-contact
// This is the page users land on after scanning the QR code.
// It shows a contact form — completely separate from /qr (review QR).

import QRContactScreen from "../screens/QRContactScreen";

export const metadata = {
  title: "Quick Enquiry | SIACC — Star India Accreditation",
  description: "Get a free certification consultation. Fill in your details and our expert will call you within 2 hours.",
};

export default function QRContactPage() {
  return <QRContactScreen />;
}