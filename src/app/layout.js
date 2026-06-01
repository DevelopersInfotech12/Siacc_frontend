import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import "./animations.css";
import WhatsAppWidget from "@/app/Components/WhatsAppWidget";
import Script from "next/script";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://siacc.co.in"),
  title: "Siacc India | Compliance & Certification Consultants",
  description:
    "India's trusted compliance consultancy. BIS, EPR, WPC, TEC, LMPC, BEE, ISO, CDSCO certifications made fast and easy.",
  keywords:
    "BIS certification, EPR registration, WPC approval, TEC MTCTE, LMPC, BEE registration, ISO certification, CDSCO, compliance India",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Siacc India | Compliance & Certification Consultants",
    description: "India's trusted compliance consultancy. BIS, EPR, WPC, TEC, LMPC, BEE, ISO, CDSCO certifications made fast and easy.",
    url: "https://siacc.co.in",
    siteName: "Siacc India",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siacc India | Compliance & Certification Consultants",
    description: "India's trusted compliance consultancy for BIS, EPR, WPC, TEC certifications.",
  },
};

const schemaLocalBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Star India Accreditation",
  url: "https://siacc.co.in",
  image: "https://siacc.co.in/icon.png",
  description: "India's trusted compliance and certification consultancy. 12+ years, 10,000+ clients, 0% failure rate.",
  telephone: ["+91-9891229135", "+91-9540190334"],
  email: "starindia.acc@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "House No. 211, Ground Floor, Pocket 9",
    addressLocality: "North West New Delhi",
    addressRegion: "Delhi",
    postalCode: "110086",
    addressCountry: "IN",
  },
  priceRange: "₹₹",
};

const schemaOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Star India Accreditation",
  url: "https://siacc.co.in",
  logo: "https://siacc.co.in/icon.png",
  description: "India's trusted compliance and certification consultancy. 12+ years, 10,000+ clients, 0% failure rate.",
  telephone: ["+91-9891229135", "+91-9540190334"],
  email: "starindia.acc@gmail.com",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9891229135",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLocalBusiness) }}
        />
      </head>
      <body className="font-dm bg-[#F7FAF8] text-[#1A1A2E] antialiased">

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7JR2MZ4Q15"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7JR2MZ4Q15');
          `}
        </Script>

        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}