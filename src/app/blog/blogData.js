// src/app/blog/blogData.js
// Central blog data store. Add new posts here — they auto-appear on blog listing + get detail pages.

export const T = {
  teal: "#1E88C8", titleblue: "#0a6daa", tealDark: "#074D4D",
  tealMid: "#0E8080", tealLight: "#EBF5F5",
  amber: "#C8780A", amberLight: "#FEF3DC", amberDark: "#9A5C06",
  slate: "#0D1B2A", body: "#2D3748", muted: "#718096", subtle: "#A0AEC0",
  border: "#E8E3DA", white: "#FFFFFF", cream: "#FAF8F4",
  ctaBand: "#EBF5FB", ctaBandBorder: "#C8DFF0", orange: "#F97316",
  poppins: "'Poppins','system-ui',sans-serif",
  sans: "'Outfit','system-ui',sans-serif",
};

export const tagColors = {
  "BIS":      { bg: "#FEF3DC", text: "#9A5C06" },
  "BIS Update":{ bg: "#FEF3DC", text: "#9A5C06" },
  "EPR":      { bg: "#DCFCE7", text: "#166534" },
  "WPC":      { bg: "#EBF5F5", text: "#074D4D" },
  "TEC":      { bg: "#EDE9FE", text: "#5b21b6" },
  "BEE":      { bg: "#FEF3C7", text: "#92400e" },
  "LMPC":     { bg: "#FFE4E6", text: "#9f1239" },
  "ISO":      { bg: "#EBF5F5", text: "#0E8080" },
  "CDSCO":    { bg: "#FDF2F8", text: "#9d174d" },
};

export const BLOGS = [
  {
    slug: "bis-conformity-assessment-amendment-2026",
    tag: "BIS Update",
    date: "April 20, 2025",
    readTime: "8 min read",
    featured: true,
    title: "BIS Conformity Assessment Amendment Regulations 2026 — What Manufacturers Must Know",
    excerpt: "The Bureau of Indian Standards has released major amendments to its Conformity Assessment Regulations. Here's a complete breakdown of what's changed, who is affected, and the new timelines businesses must comply with.",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80&fit=crop",
    heroImg: "/finalimages/bis-certification-india.jpg",
    heroGradient: "linear-gradient(135deg,rgba(13,27,42,0.97) 0%,rgba(10,109,170,0.82) 100%)",
    tagStyle: { bg: "#FEF3DC", text: "#9A5C06" },
    author: "Compliance & Regulatory Team",
    toc: [
      { id: "background", label: "Background" },
      { id: "scope", label: "Scope Expansion" },
      { id: "timelines", label: "Revised Timelines" },
      { id: "sdoc", label: "SDoC Route" },
      { id: "penalties", label: "Penalty Escalation" },
      { id: "iar", label: "IAR Requirement" },
      { id: "portal", label: "Portal Migration" },
      { id: "action", label: "Action Plan" },
    ],
    meta: [
      { label: "Category", value: "BIS Update" },
      { label: "Published", value: "April 20, 2025" },
      { label: "Read Time", value: "8 min read" },
      { label: "Effective Date", value: "Q2 2025" },
    ],
    sidebarCta: { title: "Need BIS Help?", body: "BIS CRS registration, ISI marking, IAR services — free consultation.", btn: "Get Free Consultation →" },
    highlights: [
      "Mandatory BIS registration extended to 50+ new product categories",
      "Revised testing timelines — stricter lab submission deadlines",
      "New Self-Declaration of Conformity (SDoC) route for low-risk products",
      "Penalty for non-compliance increased up to ₹2 lakh per violation",
      "Foreign manufacturers must appoint Indian Authorized Representative (IAR)",
      "BIS portal overhaul — all applications migrate to new system by Q3 2025",
    ],
    ctaTitle: "Need BIS Certification for Your Product?",
    ctaBody: "Our BIS experts handle CRS registration, ISI marking, lab coordination, and annual renewals — end-to-end. Free consultation. Clear timeline. Transparent pricing.",
    tags: ["BIS", "Conformity Assessment", "ISI Mark", "CRS", "Manufacturers"],
    sections: [
      {
        id: "background",
        heading: "Background — What Are the BIS Conformity Assessment Regulations?",
        content: [
          { type: "p", text: "The Bureau of Indian Standards Act, 2016, empowers BIS to prescribe and enforce Conformity Assessment Regulations (CAR) — the framework that governs how products are tested, certified, and marked with the Standard Mark (ISI Mark) or registered under the Compulsory Registration Scheme (CRS) before they can be sold in India." },
          { type: "p", text: "The original regulations, notified in 2018, have been periodically amended. The 2026 amendment is the most substantial revision since the framework was established — covering scope expansion, procedural reforms, penalty escalation, and the introduction of a new self-declaration route." },
          { type: "p", text: "For manufacturers, importers, and brand owners, these changes affect timelines, documentation requirements, lab empanelment, and the consequences of non-compliance. Understanding the amendments before they take effect is critical to maintaining market access and avoiding regulatory exposure." },
        ],
      },
      {
        id: "scope",
        heading: "Scope Expansion — New Product Categories Added",
        content: [
          { type: "p", text: "The most immediately impactful change in the 2026 amendment is the expansion of mandatory BIS certification to 50+ new product categories across electronics, electrical appliances, chemicals, and consumer goods." },
          { type: "p", text: "Key new categories now under mandatory BIS registration include:" },
          { type: "ul", items: ["<strong>Smart home devices</strong> — smart plugs, smart switches, smart lighting controllers","<strong>Wearable electronics</strong> — smartwatches, fitness bands, wireless earbuds","<strong>Lithium-ion powered consumer products</strong> — power banks, portable chargers, e-scooter batteries","<strong>Industrial electrical equipment</strong> — variable frequency drives, soft starters, motor control centres","<strong>Chemical products</strong> — certain lubricants, adhesives, and surface coatings","<strong>Personal protective equipment (PPE)</strong> — helmets, safety footwear, protective gloves"] },
          { type: "callout-warn", text: "<strong>⚠️ Action Required:</strong> Businesses currently selling any of the newly covered categories must initiate BIS registration immediately. Products already in market without a valid licence after the effective date will be subject to enforcement action, seizure, and penalties regardless of prior compliance status." },
        ],
      },
      {
        id: "timelines",
        heading: "Revised Testing & Application Timelines",
        content: [
          { type: "p", text: "The 2026 amendment introduces stricter processing timelines for both BIS and applicants — compressing the end-to-end certification window while simultaneously increasing consequences for delays." },
          { type: "h3", text: "New BIS Review Timelines" },
          { type: "ul", items: ["Stage 1 document review: <strong>15 working days</strong> (reduced from 30)","Grant or rejection of licence: <strong>45 working days</strong> from complete application","Factory inspection scheduling: <strong>30 working days</strong> from application acceptance","Surveillance inspection frequency: <strong>increased from annual to bi-annual</strong> for high-risk categories"] },
          { type: "h3", text: "Applicant Obligations" },
          { type: "ul", items: ["Response to BIS queries: <strong>10 working days</strong> (down from 21)","Document corrections after rejection: <strong>15 working days</strong>","Pre-application product testing: must be from BIS-empanelled lab, tested within <strong>12 months</strong> of application date"] },
          { type: "callout", text: "<strong>💡 Practical Implication:</strong> The 10-day window for responding to BIS queries is operationally tight — especially for foreign manufacturers who need to coordinate documentation across time zones. We recommend having all supplementary documents prepared before filing, not after." },
        ],
      },
      {
        id: "sdoc",
        heading: "New Self-Declaration of Conformity (SDoC) Route",
        content: [
          { type: "p", text: "One of the most significant procedural changes in the 2026 amendment is the introduction of a Self-Declaration of Conformity (SDoC) pathway for low-risk product categories — replacing the mandatory third-party certification requirement for these products." },
          { type: "ul", items: ["Test report from a NABL-accredited or BIS-empanelled laboratory","Technical file including design documentation, risk assessment, and test records","Signed declaration of conformity by the manufacturer's authorized representative","Registration on the BIS portal with annual renewal obligation"] },
          { type: "h3", text: "Categories Currently Eligible for SDoC" },
          { type: "ul", items: ["Certain categories of IT equipment (non-safety-critical peripherals)","Low-power consumer electronics under defined wattage thresholds","Non-food-contact packaging materials","Specific furniture and household items"] },
          { type: "callout-warn", text: "<strong>⚠️ Important:</strong> Using the SDoC route for a product that should be under mandatory third-party certification is treated as fraudulent self-certification — attracting significantly higher penalties. Category eligibility must be verified before choosing the SDoC route." },
        ],
      },
      {
        id: "penalties",
        heading: "Penalty Escalation — New Enforcement Framework",
        content: [
          { type: "p", text: "The 2026 amendment significantly escalates penalties for BIS non-compliance, reflecting BIS's increased enforcement posture and the expansion of mandatory categories." },
          { type: "ul", items: ["<strong>First violation:</strong> Up to ₹2 lakh (increased from ₹1 lakh)","<strong>Repeat violation within 3 years:</strong> Up to ₹5 lakh + product seizure","<strong>Fraudulent use of BIS Standard Mark:</strong> Up to ₹10 lakh + criminal prosecution","<strong>E-commerce platforms listing non-compliant products:</strong> Platform liability introduced","<strong>Importers:</strong> Consignment detention + mandatory re-export or destruction at importer's cost"] },
          { type: "p", text: "The introduction of platform liability is a landmark change — e-commerce operators must now actively verify BIS compliance status of products on their platforms." },
        ],
      },
      {
        id: "iar",
        heading: "Indian Authorized Representative (IAR) — Now Mandatory for Foreign Manufacturers",
        content: [
          { type: "p", text: "The 2026 amendment formalizes and strengthens the IAR requirement — all foreign manufacturers applying for BIS certification must now appoint a legally registered Indian entity as their Authorized Representative." },
          { type: "ul", items: ["Responding to BIS surveillance inspections and queries","Maintaining technical files and test records in India","Facilitating product recall if BIS orders withdrawal","Receiving and acting on BIS enforcement notices"] },
          { type: "callout", text: "<strong>💡 Note for Foreign Brands:</strong> We provide IAR services — acting as your legal representative in India for BIS registration, ongoing compliance, and enforcement response. Contact us for a quote specific to your product categories." },
        ],
      },
      {
        id: "portal",
        heading: "BIS Portal Migration — Critical for All Existing Licensees",
        content: [
          { type: "p", text: "All BIS certifications — existing and new — are migrating to the new unified BIS portal by Q3 2025. This affects all current BIS licence holders." },
          { type: "ul", items: ["Create a new account on the updated portal and link existing licences","Upload and verify all historical test reports and compliance documents","Update product model details and manufacturing unit information","Complete portal migration before the deadline to avoid licence suspension"] },
          { type: "p", text: "The portal migration is not automatic — existing licensees who do not migrate their accounts by the specified deadline will have their licences flagged as inactive in the BIS enforcement database." },
        ],
      },
      {
        id: "action",
        heading: "Action Plan for Businesses",
        content: [
          { type: "p", text: "Given the breadth of the 2026 amendments, businesses should prioritise the following actions immediately:" },
          { type: "ol", items: ["<strong>Audit your product portfolio</strong> against the updated mandatory category list","<strong>Check BIS portal migration status</strong> for all existing licences","<strong>Review query response processes</strong> — ensure your team can respond within 10 working days","<strong>Assess SDoC eligibility</strong> for products currently under third-party certification","<strong>Appoint or review your IAR</strong> — foreign manufacturers should confirm IAR legal capacity","<strong>Schedule lab testing early</strong> for products in newly covered categories"] },
        ],
      },
    ],
    related: [
      { img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80&fit=crop", tag: "WPC", tagBg: "#EBF5F5", tagColor: "#074D4D", date: "April 10, 2025", title: "WPC-ETA Approval for IoT Devices: New Requirements Under Saralsanchar Portal", slug: "wpc-eta-iot-devices-saralsanchar" },
      { img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&q=80&fit=crop", tag: "BIS", tagBg: "#FEF3DC", tagColor: "#9A5C06", date: "March 15, 2025", title: "BIS CRS Registration: Complete Guide for Electronics Importers in 2025", slug: null },
      { img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&q=80&fit=crop", tag: "TEC", tagBg: "#EDE9FE", tagColor: "#5b21b6", date: "February 28, 2025", title: "MTCTE Certification: How the Expanded Product List Affects IoT Importers", slug: null },
    ],
  },

  {
    slug: "wpc-eta-iot-devices-saralsanchar",
    tag: "WPC",
    date: "April 10, 2025",
    readTime: "5 min read",
    featured: false,
    title: "WPC-ETA Approval for IoT Devices: New Requirements Under Saralsanchar Portal",
    excerpt: "The WPC Wing has updated its approval process. We break down the new Saralsanchar portal workflow for wireless and IoT device importers.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80&fit=crop",
    heroImg: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=85&fit=crop",
    heroGradient: "linear-gradient(135deg,rgba(13,27,42,0.97) 0%,rgba(14,128,128,0.80) 100%)",
    tagStyle: { bg: "#EBF5F5", text: "#074D4D" },
    author: "WPC & Wireless Compliance Team",
    toc: [
      { id: "background", label: "What is WPC-ETA?" },
      { id: "saralsanchar", label: "Saralsanchar Portal" },
      { id: "iot-requirements", label: "IoT Requirements" },
      { id: "steps", label: "Step-by-Step Process" },
      { id: "documents", label: "Documents Required" },
      { id: "timelines", label: "Timelines & Validity" },
      { id: "penalties", label: "Non-Compliance Risk" },
    ],
    meta: [
      { label: "Category", value: "WPC" },
      { label: "Published", value: "April 10, 2025" },
      { label: "Read Time", value: "5 min read" },
      { label: "ETA Validity", value: "5 Years (updated)" },
      { label: "Portal", value: "Saralsanchar" },
    ],
    sidebarCta: { title: "Need WPC-ETA?", body: "Saralsanchar portal filing, RF lab coordination, query resolution — free consultation.", btn: "Get Free Consultation →" },
    highlights: [
      "Saralsanchar portal now mandatory for all WPC-ETA applications — old portal retired",
      "IoT devices with multiple RF technologies require consolidated single-model ETA",
      "New frequency band declarations required for 6 GHz Wi-Fi devices",
      "Type Approval validity extended from 3 to 5 years for eligible categories",
      "Foreign applicants must submit translated documents with apostille in some cases",
      "ETA certificate now downloadable directly from Saralsanchar portal by applicant",
    ],
    ctaTitle: "Importing Wireless or IoT Devices into India?",
    ctaBody: "Our WPC specialists handle the complete Saralsanchar portal process — RF lab coordination, filing, query resolution, and renewal. Free consultation. Clear timeline. Transparent pricing.",
    tags: ["WPC", "ETA", "IoT", "Saralsanchar", "Wireless Devices"],
    sections: [
      {
        id: "background",
        heading: "What is WPC-ETA and Why Does It Matter?",
        content: [
          { type: "p", text: "The Wireless Planning & Coordination (WPC) Wing of the Department of Telecommunications (DoT) governs the import, manufacture, and use of wireless devices in India under the Indian Wireless Telegraphy Act, 1933. Equipment Type Approval (ETA) is the mandatory authorization required before any wireless or IoT device using unlicensed frequency spectrum can be imported or sold in India." },
          { type: "p", text: "Products requiring WPC-ETA include — but are not limited to — devices using Wi-Fi (2.4 GHz, 5 GHz, 6 GHz), Bluetooth (Classic and BLE), Zigbee, Z-Wave, LoRa, RFID, GPS modules, NFC, and any other radio frequency technology." },
          { type: "p", text: "India's IoT market is projected to exceed $26 billion by 2026. Every connected device entering this market requires valid WPC-ETA before customs clearance." },
        ],
      },
      {
        id: "saralsanchar",
        heading: "The Saralsanchar Portal — What's Changed",
        content: [
          { type: "p", text: "The most operationally significant change in the 2025 WPC update is the full migration to the Saralsanchar portal (saralsanchar.gov.in) for all ETA applications. The legacy WPC portal has been retired." },
          { type: "ul", items: ["Unified dashboard for tracking multiple ETA applications simultaneously","Online payment of government fees (₹500–₹2,000 depending on category)","Direct download of approved ETA certificates — no physical certificate required","Query management — WPC officials post technical queries directly on the portal","Renewal management integrated with original application record"] },
          { type: "callout-warn", text: "<strong>⚠️ Common First-Timer Mistake:</strong> The Saralsanchar portal has multiple form types — for ETA, Import License, DPL, NDPL, and other WPC approvals. Selecting the wrong form type results in rejection. Always verify form selection before submission." },
        ],
      },
      {
        id: "iot-requirements",
        heading: "New Requirements Specific to IoT Devices",
        content: [
          { type: "h3", text: "Multi-Technology Consolidated ETA" },
          { type: "p", text: "IoT devices that incorporate multiple RF technologies now require a single consolidated ETA application covering all frequency bands — separate applications per technology are no longer accepted." },
          { type: "h3", text: "6 GHz Wi-Fi — New Declaration Requirements" },
          { type: "p", text: "Devices with 6 GHz Wi-Fi capability (Wi-Fi 6E and Wi-Fi 7) require an additional frequency band declaration form confirming compliance with India's specific power limits for the 6 GHz band." },
          { type: "h3", text: "LoRa and LPWAN Devices" },
          { type: "p", text: "IoT devices using LoRa, Sigfox, or other LPWAN technologies now have a dedicated ETA application sub-category on the Saralsanchar portal with a designated review team and faster processing timeline." },
        ],
      },
      {
        id: "steps",
        heading: "Step-by-Step: Filing WPC-ETA on Saralsanchar (2025 Workflow)",
        content: [
          { type: "p", text: "Here is the current workflow for filing a WPC-ETA application on the Saralsanchar portal under the updated requirements:" },
          { type: "steps", items: [
            { n: "01", title: "Device & Frequency Assessment", desc: "Identify all frequency bands, power levels, and RF technologies. Determine the correct ETA sub-category.", tip: "Multi-band IoT devices must list all technologies explicitly — omitting one frequency band invalidates the entire ETA." },
            { n: "02", title: "RF Testing at WPC-Recognized Lab", desc: "Submit device samples to a WPC-recognized laboratory for RF conformity testing across all applicable frequency bands.", tip: "Confirm the lab's WPC recognition scope includes all your frequency bands before sample submission." },
            { n: "03", title: "Saralsanchar Account & Application", desc: "Create or log into your Saralsanchar account. Select the WPC-ETA form and fill all fields precisely as they appear in the test report.", tip: "Model number must match test report exactly — including capitalisation and spaces. Mismatches trigger instant query." },
            { n: "04", title: "Document Upload", desc: "Upload RF test report, technical datasheet, product photographs, user manual, company registration, IEC certificate, authorization letter, and declaration of conformity.", tip: "PDF file size limit per document: 5MB. Large files must be compressed before upload." },
            { n: "05", title: "Fee Payment & Submission", desc: "Pay the applicable government fee online through the Saralsanchar payment gateway and retain the application reference number.", tip: "Payment gateway occasionally times out. Screenshot the payment confirmation before navigating away." },
            { n: "06", title: "WPC Review & Certificate Download", desc: "WPC reviews within 2–4 weeks. Respond to portal queries within 7 days. Download the ETA certificate directly from the portal dashboard.", tip: "Set portal notifications to email — WPC query alerts are only sent to the registered email, not by SMS." },
          ]},
        ],
      },
      {
        id: "documents",
        heading: "Documents Required for WPC-ETA (Updated 2025 Checklist)",
        content: [
          { type: "ul", items: ["<strong>RF Test Report</strong> — from WPC-recognized lab, covering all frequency bands, dated within 12 months","<strong>Technical Specification Sheet</strong> — frequency bands, power output, antenna gain, modulation types","<strong>Product Photographs</strong> — front, rear, sides, label, internal antenna (if applicable)","<strong>User Manual</strong> — in English, specifying frequency bands and power output","<strong>Company Registration</strong> — Certificate of Incorporation, PAN, GST certificate","<strong>Import-Export Code (IEC)</strong> — issued by DGFT, mandatory for all importers","<strong>Authorization Letter</strong> — authorizing consultant to file on behalf of the company","<strong>Declaration of Conformity</strong> — signed by manufacturer","<strong>6 GHz Band Declaration</strong> — additional requirement for Wi-Fi 6E and Wi-Fi 7 devices","<strong>Consolidated Technology List</strong> — for multi-technology IoT devices"] },
          { type: "callout", text: "<strong>💡 Pro Tip:</strong> The #1 cause of WPC query letters is model number mismatch between the test report and the Saralsanchar application form. Our team cross-checks every field before submission." },
        ],
      },
      {
        id: "timelines",
        heading: "Timelines and Validity Under Updated Guidelines",
        content: [
          { type: "ul", items: ["<strong>RF lab testing:</strong> 2–4 weeks (standard wireless) / 3–5 weeks (multi-band IoT)","<strong>Document preparation and portal filing:</strong> 3–5 working days","<strong>WPC portal review:</strong> 2–3 weeks from application submission","<strong>Query response window:</strong> 7 days from query date","<strong>Total end-to-end (clean application):</strong> 4–8 weeks"] },
          { type: "p", text: "A notable update in the 2025 guidelines: ETA certificate validity has been extended to <strong>5 years</strong> (from 3 years previously) for standard unlicensed band devices." },
        ],
      },
      {
        id: "penalties",
        heading: "Consequences of Importing Without WPC-ETA",
        content: [
          { type: "ul", items: ["<strong>Customs detention:</strong> Shipment held at port of entry pending resolution","<strong>Return or destruction:</strong> Detained consignment returned at importer's cost or destroyed","<strong>Fines:</strong> Up to ₹1,000 per device, or ₹10,000 per consignment (whichever is higher)","<strong>Repeat violation:</strong> Up to 3 years imprisonment under IWT Act provisions","<strong>Import licence cancellation:</strong> IEC suspended for repeat offenders"] },
          { type: "callout-warn", text: "<strong>⚠️ WPC enforcement has intensified significantly since 2023.</strong> Customs officials now routinely cross-reference product descriptions against the WPC-ETA database. Devices described generically to avoid scrutiny are flagged for inspection." },
        ],
      },
    ],
    related: [
      { img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80&fit=crop", tag: "BIS Update", tagBg: "#FEF3DC", tagColor: "#9A5C06", date: "April 20, 2025", title: "BIS Conformity Assessment Amendment Regulations 2026 — What Manufacturers Must Know", slug: "bis-conformity-assessment-amendment-2026" },
      { img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&q=80&fit=crop", tag: "TEC", tagBg: "#EDE9FE", tagColor: "#5b21b6", date: "March 5, 2025", title: "MTCTE Certification for Smart Devices: How MTCTE and WPC-ETA Overlap", slug: null },
      { img: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=500&q=80&fit=crop", tag: "EPR", tagBg: "#DCFCE7", tagColor: "#166534", date: "February 12, 2025", title: "EPR Compliance for IoT Device Importers — E-Waste Obligations You May Be Missing", slug: null },
    ],
  },
  {
    slug: "bis-crs-power-banks-chargers-india-2025",
    tag: "BIS",
    date: "May 10, 2025",
    readTime: "7 min read",
    featured: false,
    title: "BIS CRS for Power Banks & Chargers in India: Complete Compliance Guide 2025",
    excerpt: "Power banks and chargers sold in India must comply with BIS CRS registration under IS 13252. Learn the mandatory standards, testing requirements, registration process, and penalties for non-compliance.",
    img: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=900&q=80&fit=crop",
    heroImg: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=1600&q=80&fit=crop",
    author: "BIS Compliance Team",
    tagStyle: { bg: "#FEF3DC", text: "#9A5C06" },
    toc: [
      { id: "overview", label: "Why CRS is Mandatory" },
      { id: "standards", label: "Applicable Standards" },
      { id: "process", label: "Registration Process" },
      { id: "documents", label: "Documents Required" },
      { id: "testing", label: "Testing Requirements" },
      { id: "penalties", label: "Penalties for Non-Compliance" },
      { id: "timeline", label: "Timeline & Costs" },
      { id: "faq", label: "Common FAQs" },
    ],
    meta: [
      { label: "Category", value: "BIS" },
      { label: "Published", value: "May 10, 2025" },
      { label: "Read Time", value: "7 min read" },
      { label: "Standard", value: "IS 13252 / IS 16046" },
    ],
    sidebarCta: { title: "Get BIS CRS for Power Banks", body: "We handle end-to-end BIS CRS registration for power banks and chargers. Free consultation.", btn: "Start Registration →" },
    highlights: [
      "Power banks and chargers are mandatory BIS CRS products — cannot be sold without registration",
      "Applicable standard: IS 13252 (Part 1) for IT equipment power supplies and IS 16046 for Li-ion batteries",
      "Both domestic manufacturers and importers must obtain CRS registration",
      "BIS-empanelled lab testing is mandatory before application",
      "Penalty for non-compliance: up to ₹2 lakh fine + product seizure",
      "Factory audit required for domestic manufacturers; quarterly surveillance thereafter",
    ],
    ctaTitle: "Need BIS CRS Registration for Power Banks or Chargers?",
    ctaBody: "SIACC handles complete BIS CRS registration — lab coordination, document preparation, application filing, and liaison with BIS. Fast turnaround. Transparent pricing.",
    tags: ["BIS", "CRS", "Power Banks", "Chargers", "IS 13252", "IS 16046"],
    sections: [
      {
        id: "overview",
        heading: "Why BIS CRS Registration is Mandatory for Power Banks & Chargers",
        content: [
          { type: "p", text: "The Bureau of Indian Standards (BIS) Compulsory Registration Scheme (CRS) mandates that power banks and chargers sold in India must carry the BIS Standard Mark. This requirement is enforced under the Electronics and Information Technology Goods (Requirements for Compulsory Registration) Order, originally notified by the Ministry of Electronics and Information Technology (MeitY)." },
          { type: "p", text: "Power banks fall under <strong>IS 16046 (Part 2)</strong> — Secondary lithium cells and batteries for portable applications — and chargers are governed by <strong>IS 13252 (Part 1)</strong> — Safety requirements for IT and audio-video equipment. Both product categories have been under mandatory CRS since 2016 and 2013 respectively." },
          { type: "callout", text: "<strong>Key rule:</strong> No power bank or charger can be manufactured for sale, stored for sale, sold, imported, or distributed in India without a valid BIS CRS registration number displayed on the product and packaging." },
        ],
      },
      {
        id: "standards",
        heading: "Applicable BIS Standards",
        content: [
          { type: "p", text: "The two primary standards governing these products are:" },
          { type: "ul", items: [
            "<strong>IS 13252 (Part 1):2010/IEC 60950-1:2005</strong> — For chargers and power adapters (IT equipment power supplies). Covers electrical safety, insulation, creepage distances, and thermal requirements.",
            "<strong>IS 16046 (Part 2):2018/IEC 62133-2:2017</strong> — For lithium-ion/lithium-polymer power banks. Covers electrochemical safety, overcharge protection, short-circuit protection, and mechanical integrity.",
            "<strong>IS 13252 (Part 2)</strong> may apply to chargers with specific energy efficiency requirements under BEE (Bureau of Energy Efficiency) labelling overlap.",
          ]},
          { type: "p", text: "BIS periodically updates the referenced standards. Manufacturers must ensure their products are tested against the currently notified version of the standard at the time of registration." },
        ],
      },
      {
        id: "process",
        heading: "BIS CRS Registration Process — Step by Step",
        content: [
          { type: "steps", stepItems: [
            { n: "01", title: "Product Testing at BIS-Empanelled Lab", desc: "Send product samples to a BIS-empanelled testing laboratory. The lab tests against the applicable IS standard and issues a test report.", tip: "Select a lab familiar with IS 16046 or IS 13252 specifically — not all labs are empanelled for both." },
            { n: "02", title: "Prepare Application Documents", desc: "Compile all required documents: company registration, authorisation letter (for importers), test report, product specifications, and label artwork." },
            { n: "03", title: "File Application on BIS Online Portal", desc: "Submit the application through the BIS CRS online portal (www.bis.gov.in). Pay the applicable registration fees.", tip: "Importers must have an Indian Authorised Representative (IAR) registered with BIS." },
            { n: "04", title: "BIS Review & Factory Audit (Domestic Manufacturers)", desc: "BIS reviews the application. For domestic manufacturers, a factory audit is conducted. For importers, the audit happens at the manufacturer's foreign facility or may be waived for certain categories.", tip: "Keep your factory floor organised and QC records updated before the audit date." },
            { n: "05", title: "Grant of Registration Certificate", desc: "Upon successful review, BIS issues the Registration Certificate with a unique R-number. This must be printed on every unit and its packaging." },
          ]},
        ],
      },
      {
        id: "documents",
        heading: "Documents Required for BIS CRS Application",
        content: [
          { type: "ul", items: [
            "<strong>For importers:</strong> Import Export Code (IEC), company incorporation certificate, authorisation letter from foreign manufacturer, test report from BIS-empanelled lab, product datasheet, label design with R-number placement, Authorised Indian Representative (AIR) details",
            "<strong>For domestic manufacturers:</strong> Company registration, factory address proof, QC manual, production process overview, test report, label design",
            "<strong>Common to both:</strong> Product model list, Bill of Materials (BoM) if required by BIS, power bank/charger technical specifications (capacity, input/output voltage, charging protocols)",
          ]},
          { type: "callout-warn", text: "<strong>⚠️ Important:</strong> If a power bank supports fast-charging protocols (PD, QC, etc.), ensure the test report explicitly covers these modes. Incomplete test coverage is a common reason for BIS application rejection." },
        ],
      },
      {
        id: "testing",
        heading: "Testing Requirements",
        content: [
          { type: "p", text: "Testing must be conducted at a BIS-empanelled laboratory. The test report is valid for <strong>12 months</strong> from the date of issue for CRS application purposes. Key tests conducted include:" },
          { type: "ul", items: [
            "<strong>Overcharge protection test</strong> — Verifies automatic cutoff above rated voltage",
            "<strong>Short-circuit protection test</strong> — Tests response to short circuit at output terminals",
            "<strong>Overdischarge protection</strong> — Ensures cells are not discharged below safe voltage",
            "<strong>Thermal abuse test</strong> — Exposure to elevated temperatures",
            "<strong>Mechanical shock and vibration tests</strong>",
            "<strong>Electrical safety tests</strong> (for chargers): dielectric strength, insulation resistance, leakage current",
          ]},
          { type: "p", text: "Samples required for testing are typically <strong>3–5 units per model</strong>. BIS may request additional samples during factory audit or surveillance visits." },
        ],
      },
      {
        id: "penalties",
        heading: "Penalties for Non-Compliance",
        content: [
          { type: "p", text: "Selling or importing power banks or chargers without BIS CRS registration is a punishable offence under the BIS Act, 2016. Penalties include:" },
          { type: "ul", items: [
            "<strong>First offence:</strong> Fine up to ₹2 lakh",
            "<strong>Repeat offence:</strong> Fine up to ₹5 lakh plus up to 2 years imprisonment",
            "<strong>Product seizure:</strong> Entire consignment or stock may be seized and destroyed",
            "<strong>E-commerce liability:</strong> Online marketplaces are required to delist non-compliant products and may be held liable for knowingly listing them",
          ]},
          { type: "callout-warn", text: "<strong>BIS enforcement has intensified.</strong> Customs authorities now routinely verify BIS registration numbers at the port of entry for electronics consignments. Products without a valid R-number face detention or return at the importer's cost." },
        ],
      },
      {
        id: "timeline",
        heading: "Typical Timeline & Costs",
        content: [
          { type: "p", text: "The end-to-end timeline for BIS CRS registration depends on lab availability and BIS processing time:" },
          { type: "ul", items: [
            "<strong>Lab testing:</strong> 3–6 weeks (varies by lab queue and standard)",
            "<strong>Application preparation & filing:</strong> 1–2 weeks",
            "<strong>BIS review & audit:</strong> 4–8 weeks",
            "<strong>Total (typical):</strong> 8–16 weeks from sample submission",
          ]},
          { type: "p", text: "<strong>Cost components</strong> include lab testing fees (₹30,000–₹80,000 depending on standard and number of tests), BIS registration fees (₹1,000–₹10,000 depending on number of models), and professional service fees if using a consultant." },
        ],
      },
      {
        id: "faq",
        heading: "Common FAQs",
        content: [
          { type: "h3", text: "Can I sell under one BIS registration for multiple capacity variants?" },
          { type: "p", text: "No. Each model (defined by rated capacity, chemistry, form factor, and output specifications) requires a separate BIS CRS registration. Minor variants may be grouped if BIS considers them the same model — confirm with BIS before filing." },
          { type: "h3", text: "Does BIS CRS expire?" },
          { type: "p", text: "BIS CRS registration does not have a fixed expiry but is subject to annual surveillance. Non-compliance during surveillance can result in cancellation. Manufacturers must also notify BIS of any design changes." },
          { type: "h3", text: "Is BIS CRS required for power banks sold only online (e-commerce)?" },
          { type: "p", text: "Yes. BIS CRS is mandatory regardless of the sales channel — offline retail, e-commerce, B2B, or direct import. E-commerce platforms are under active scrutiny to delist non-compliant products." },
        ],
      },
    ],
    related: [
      { img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80&fit=crop", tag: "BIS Update", tagBg: "#FEF3DC", tagColor: "#9A5C06", date: "April 20, 2025", title: "BIS Conformity Assessment Amendment Regulations 2026 — What Manufacturers Must Know", slug: "bis-conformity-assessment-amendment-2026" },
      { img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80&fit=crop", tag: "WPC", tagBg: "#EBF5F5", tagColor: "#074D4D", date: "April 10, 2025", title: "WPC-ETA Approval for IoT Devices: New Requirements Under Saralsanchar Portal", slug: "wpc-eta-iot-devices-saralsanchar" },
      { img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&q=80&fit=crop", tag: "BIS", tagBg: "#FEF3DC", tagColor: "#9A5C06", date: "March 15, 2025", title: "BIS CRS Registration: Complete Guide for Electronics Importers in 2025", slug: null },
    ],
  },
];

export function getBlogBySlug(slug) {
  return BLOGS.find(b => b.slug === slug) || null;
}

export const featuredBlog = BLOGS.find(b => b.featured);
export const gridPosts = BLOGS.filter(b => !b.featured);