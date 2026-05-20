"use client";
import { useState } from "react";
import BISCRSProductModal from "./BISCRSProductModal";

// ── Theme (matches BISCRSScreen) ──────────────────────────────────────
const T = {
  teal: "#1E88C8", tealDark: "#074D4D", tealMid: "#0E8080", titleblue: "#0a6daa",
  para: "#080000b0", paradark: "#080000c4",
  tealLight: "#EBF5F5", amber: "#C8780A", amberLight: "#FEF3DC",
  slate: "#0D1B2A", body: "#2D3748", muted: "#718096",
  border: "#E8E3DA", borderLight: "#F0ECE5", white: "#FFFFFF", cream: "#FAF8F4",
  orange: "#F97316",
  poppins: "'Poppins','system-ui',sans-serif",
  sans: "'Outfit','system-ui',sans-serif",
};

// ── Full CRS Product List (all 79 categories from site) ───────────────
export const CRS_PRODUCTS = [
  // Audio / Video
  {
    id: "amplifiers",
    icon: "🔊",
    title: "Amplifiers",
    standard: "IS 616:2017",
    category: "Audio & Video",
    tag: "Mandatory",
    intro: "An amplifier uses electric power from a power supply to increase the amplitude of a signal. It boosts electric current and converts small sounds into loud ones. Added under BIS CRS in July 2013 via Scheme II of Schedule II.",
    overview: "Amplifiers are a core part of any audio system. BIS has mandated CRS registration for amplifiers to ensure Indian consumers receive safe, quality-tested products conforming to IS 616:2017.",
    docsForeign: ["Nomination of Authorized Indian Representative (AIR)", "Online application submission on BIS CRS portal", "Product sample testing at BIS-recognized lab", "Submit online/offline hard copy with test report", "BIS officials verify application", "Grant of Licence with unique R-number"],
    docsDomestic: ["Online application submission on BIS CRS portal", "Product sample testing at BIS-recognized lab", "Submit online/offline hard copy with test report", "BIS officials verify application", "Grant of Licence with unique R-number"],
    documents: ["Completely filled CDF/CCL form", "Duly filled BIS application form", "Business License of manufacturing unit", "Scope of Business License", "ISO certificate of the manufacturer", "Marking Label / Details of marking on the product", "Authorization letter (if signatory is not head of manufacturing)", "Trade Mark Certificate", "Trademark Authorization Letter (if TM owned by another entity)", "AIR company registration proof in India (foreign only)", "Photo ID of AIR / Authorized Signatory", "Technical Specification Sheet / User Manual"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "electronic-video-games",
    icon: "🎮",
    title: "Electronic Video Games",
    standard: "IS 616:2017",
    category: "Audio & Video",
    tag: "Mandatory",
    intro: "Electronic video game consoles and gaming devices require mandatory BIS CRS registration under IS 616:2017 before import or sale in India.",
    overview: "Electronic video game units including gaming consoles, handheld game devices, and video game peripherals are covered under the BIS CRS scheme to ensure product safety and quality for Indian consumers.",
    docsForeign: ["Nominate AIR in India", "Online application on BIS CRS portal", "Sample testing at BIS-recognized lab", "Submit application with test report", "BIS review", "Grant of Licence"],
    docsDomestic: ["Online application on BIS CRS portal", "Sample testing at BIS-recognized lab", "Submit application with test report", "BIS review", "Grant of Licence"],
    documents: ["Filled CDF/CCL form", "BIS application form", "Manufacturing unit business license", "ISO certificate", "Marking label details", "Trade Mark Certificate", "AIR registration proof (foreign)", "Photo ID of AIR/Signatory", "Technical Specification Sheet"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "optical-disk-players",
    icon: "💿",
    title: "Optical Disk (CD/DVD) Players",
    standard: "IS 616:2017",
    category: "Audio & Video",
    tag: "Mandatory",
    intro: "Optical disc players including CD, DVD, and Blu-ray players require BIS CRS registration under IS 616:2017 before being sold in India.",
    overview: "Optical disk players are covered under the CRS scheme to ensure safety and electrical compliance for Indian households.",
    docsForeign: ["Nominate AIR", "BIS portal application", "Lab testing", "Document submission", "BIS scrutiny", "Certificate issuance"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS scrutiny", "Certificate issuance"],
    documents: ["CDF/CCL form", "BIS application form", "Business License", "ISO certificate", "Marking details", "Trademark Certificate", "AIR proof (foreign)", "Technical Spec Sheet"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "led-tv",
    icon: "📺",
    title: "LED TV",
    standard: "IS 616:2017",
    category: "Audio & Video",
    tag: "Mandatory",
    intro: "LED televisions sold in India must carry valid BIS CRS registration. This covers all LED TV screen sizes under IS 616:2017.",
    overview: "LED TVs are one of the most commonly imported electronics in India. BIS has made CRS registration mandatory to protect consumers from substandard and unsafe television sets.",
    docsForeign: ["Nominate AIR", "BIS portal application", "Lab testing per IS 616:2017", "Document submission", "BIS review", "Licence issuance"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence issuance"],
    documents: ["CDF/CCL form", "BIS application form", "Manufacturing unit proof", "ISO certificate", "Marking label details", "Trademark Certificate", "AIR company registration (foreign)", "Photo ID of Signatory", "Technical Spec Sheet"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "wireless-microphone",
    icon: "🎤",
    title: "Wireless Microphone",
    standard: "IS 616:2017",
    category: "Audio & Video",
    tag: "Mandatory",
    intro: "Wireless microphones including handheld, lapel, and headset wireless microphones require BIS CRS registration under IS 616:2017.",
    overview: "Wireless microphones are widely used in events, education, and broadcasting. BIS registration ensures these devices meet Indian electrical safety standards.",
    docsForeign: ["AIR nomination", "BIS portal application", "Sample testing", "Document submission", "BIS verification", "Licence grant"],
    docsDomestic: ["BIS portal application", "Sample testing", "Document submission", "BIS verification", "Licence grant"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Trademark cert", "AIR proof (foreign)", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "electronic-musical-system",
    icon: "🎹",
    title: "Electronic Musical System",
    standard: "IS 616:2017",
    category: "Audio & Video",
    tag: "Mandatory",
    intro: "Electronic musical instruments and systems such as electronic keyboards, synthesizers, and audio workstations require BIS CRS registration.",
    overview: "Electronic musical systems must conform to IS 616:2017 before import or sale in India to ensure user safety and product quality.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS scrutiny", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS scrutiny", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Trademark cert", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "video-camera",
    icon: "📽️",
    title: "Video Camera",
    standard: "IS 616:2017",
    category: "Audio & Video",
    tag: "Mandatory",
    intro: "Video cameras including camcorders and action cameras require BIS CRS registration under IS 616:2017 before they can be imported or sold in India.",
    overview: "Video cameras are covered under the CRS scheme to ensure electrical and safety compliance for Indian users.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking label", "Trademark cert", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "bluetooth-speakers",
    icon: "🔉",
    title: "Bluetooth Speakers",
    standard: "IS 616:2017",
    category: "Audio & Video",
    tag: "Mandatory",
    intro: "Portable and desktop Bluetooth speakers require BIS CRS registration under IS 616:2017 before sale or import in India.",
    overview: "Bluetooth speakers are among the most imported consumer electronics. BIS CRS registration ensures these devices are safe and meet Indian electrical standards.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking label", "Trademark cert", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "wireless-headphone-earphone",
    icon: "🎧",
    title: "Wireless Headphone & Earphone",
    standard: "IS 616:2017",
    category: "Audio & Video",
    tag: "Mandatory",
    intro: "Wireless headphones, earphones, earbuds, and TWS devices require mandatory BIS CRS registration under IS 616:2017.",
    overview: "With the explosion of wireless audio devices in India, BIS has made CRS registration mandatory for all wireless headphones and earphones to ensure product safety and quality.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking label", "Trademark cert", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "smart-speakers",
    icon: "🔈",
    title: "Smart Speakers (with & without Display)",
    standard: "IS 616:2017",
    category: "Audio & Video",
    tag: "Mandatory",
    intro: "Smart speakers with and without display (e.g., Amazon Echo, Google Home type devices) require BIS CRS registration under IS 616:2017.",
    overview: "Smart speakers are internet-connected audio devices with voice assistant capability. BIS CRS registration is mandatory before import or sale in India.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking label", "Trademark cert", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "television-lcd-led",
    icon: "🖥️",
    title: "Plasma/LCD/LED Television (up to 32\")",
    standard: "IS 616:2010",
    category: "Audio & Video",
    tag: "Mandatory",
    intro: "Plasma, LCD, and LED televisions with screen sizes up to 32 inches require BIS CRS registration under IS 616:2010.",
    overview: "BIS has specifically covered smaller screen TVs under CRS to ensure even budget televisions meet Indian safety standards.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking label", "Trademark cert", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },

  // IT & Computing
  {
    id: "laptop",
    icon: "💻",
    title: "Laptop",
    standard: "IS 13252 (Part 1):2010",
    category: "IT & Computing",
    tag: "Mandatory",
    intro: "All laptops sold or imported in India require mandatory BIS CRS registration under IS 13252 (Part 1):2010.",
    overview: "Laptops are one of the most important IT products covered under BIS CRS. All laptops — including ultrabooks, gaming laptops, and 2-in-1 devices — require registration before import or sale in India.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing per IS 13252", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "BIS application form", "Business License", "ISO certificate", "Marking label details", "Trademark Certificate", "AIR registration (foreign)", "Photo ID of Signatory", "Technical Spec Sheet"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "notebook-tablet-pc",
    icon: "📱",
    title: "Notebook / Tablet PC",
    standard: "IS 13252 (Part 1):2010",
    category: "IT & Computing",
    tag: "Mandatory",
    intro: "Notebooks, netbooks, and tablet PCs require BIS CRS registration under IS 13252 (Part 1):2010 before import or sale in India.",
    overview: "Tablets and notebooks are widely used for education, business, and personal use. BIS registration ensures these devices meet India's IT equipment safety standards.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Trademark cert", "AIR proof (foreign)", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "mobile-phones",
    icon: "📱",
    title: "Mobile Phones",
    standard: "IS 13252 (Part 1):2010",
    category: "IT & Computing",
    tag: "Mandatory",
    intro: "All mobile phones and smartphones require mandatory BIS CRS registration under IS 13252 (Part 1):2010. This is one of the most strictly enforced CRS categories.",
    overview: "Mobile phones are the highest-volume electronics imported into India. BIS registration is rigorously enforced at customs. Every brand, model, and manufacturing location requires a separate registration.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing per IS 13252", "Complete document submission", "BIS scrutiny", "Licence with R-number"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS scrutiny", "Licence with R-number"],
    documents: ["CDF/CCL form", "BIS application form", "Manufacturing unit Business License", "ISO certificate", "Marking label details", "Trademark Certificate", "AIR registration proof (foreign)", "Photo ID of Signatory", "Technical Specification Sheet"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "printers",
    icon: "🖨️",
    title: "Printers",
    standard: "IS 13252 (Part 1):2010",
    category: "IT & Computing",
    tag: "Mandatory",
    intro: "All types of printers including inkjet, laser, and thermal printers require BIS CRS registration under IS 13252 (Part 1):2010.",
    overview: "Printers are essential office and home IT equipment. BIS CRS registration ensures all printers sold in India meet electrical safety and quality standards.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Trademark cert", "AIR proof (foreign)", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "scanner",
    icon: "📠",
    title: "Scanner",
    standard: "IS 13252 (Part 1):2010",
    category: "IT & Computing",
    tag: "Mandatory",
    intro: "Document and image scanners require BIS CRS registration under IS 13252 (Part 1):2010 before import or sale in India.",
    overview: "Scanners — flatbed, sheet-fed, and portable — must be registered under BIS CRS to ensure they meet safety standards for the Indian market.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "webcam",
    icon: "📷",
    title: "Webcam",
    standard: "IS 616:2017",
    category: "IT & Computing",
    tag: "Mandatory",
    intro: "Webcams (finished products) require BIS CRS registration under IS 616:2017 before import or sale in India.",
    overview: "With the growth of video conferencing and remote work, webcams have become essential. BIS CRS registration ensures quality and safety for Indian consumers.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking label", "Trademark cert", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "plotters",
    icon: "🖊️",
    title: "Plotters",
    standard: "IS 13252 (Part 1):2010",
    category: "IT & Computing",
    tag: "Mandatory",
    intro: "Wide-format plotters and drawing machines require BIS CRS registration under IS 13252 (Part 1):2010.",
    overview: "Plotters used in engineering, architecture, and design sectors must comply with BIS CRS standards before import or sale in India.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "set-top-box",
    icon: "📡",
    title: "Set Top Box",
    standard: "IS 13252 (Part 1):2010",
    category: "IT & Computing",
    tag: "Mandatory",
    intro: "Set-top boxes including DTH, cable, and IPTV set-top boxes require BIS CRS registration under IS 13252 (Part 1):2010.",
    overview: "Set-top boxes are widely used across India for DTH and cable TV. BIS registration ensures these devices meet safety standards to protect consumers.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "AIR proof (foreign)", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "projector",
    icon: "📽️",
    title: "Projector",
    standard: "IS 13252 (Part 1):2010",
    category: "IT & Computing",
    tag: "Mandatory",
    intro: "Digital projectors including business, home theater, and portable projectors require BIS CRS registration under IS 13252 (Part 1):2010.",
    overview: "Projectors used in offices, classrooms, and homes must be BIS CRS registered to ensure electrical safety and compliance with Indian standards.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "smart-watches",
    icon: "⌚",
    title: "Smart Watches",
    standard: "IS 13252 (Part 1):2010",
    category: "IT & Computing",
    tag: "Mandatory",
    intro: "Smart watches and fitness bands require mandatory BIS CRS registration under IS 13252 (Part 1):2010 before import or sale in India.",
    overview: "Smart watches are wearable electronics that interface with smartphones. BIS registration ensures these battery-powered devices are safe for Indian consumers.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Trademark cert", "AIR proof (foreign)", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "digital-camera",
    icon: "📸",
    title: "Digital Camera",
    standard: "IS 13252 (Part 1):2010",
    category: "IT & Computing",
    tag: "Mandatory",
    intro: "Digital cameras including point-and-shoot and mirrorless cameras require BIS CRS registration under IS 13252 (Part 1):2010.",
    overview: "Digital cameras must comply with IS 13252 (Part 1):2010 to be legally imported or sold in India under the BIS CRS scheme.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Trademark cert", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "keyboard",
    icon: "⌨️",
    title: "Keyboard",
    standard: "IS 13252 (Part 1):2010",
    category: "IT & Computing",
    tag: "Mandatory",
    intro: "Wired and wireless computer keyboards require BIS CRS registration under IS 13252 (Part 1):2010.",
    overview: "Keyboards are essential computer peripherals. BIS CRS registration ensures all keyboards sold in India meet electrical safety requirements.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "wireless-keyboard",
    icon: "⌨️",
    title: "Wireless Keyboard",
    standard: "IS 13252 (Part 1):2010",
    category: "IT & Computing",
    tag: "Mandatory",
    intro: "Wireless Bluetooth or RF keyboards require separate BIS CRS registration under IS 13252 (Part 1):2010.",
    overview: "Wireless keyboards are increasingly popular with laptops and tablets. BIS registration ensures they are safe and meet Indian IT equipment standards.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "cctv-cameras",
    icon: "📹",
    title: "CCTV Cameras",
    standard: "IS 13252 (Part 1):2010",
    category: "IT & Computing",
    tag: "Mandatory",
    intro: "CCTV cameras including IP cameras, dome cameras, and bullet cameras require BIS CRS registration under IS 13252 (Part 1):2010.",
    overview: "CCTV cameras are critical for security. BIS CRS registration ensures surveillance cameras sold in India are safe and meet quality standards.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "cctv-recorders",
    icon: "🎞️",
    title: "CCTV Recorders (DVR/NVR)",
    standard: "IS 13252 (Part 1):2010",
    category: "IT & Computing",
    tag: "Mandatory",
    intro: "CCTV Digital Video Recorders (DVR) and Network Video Recorders (NVR) require BIS CRS registration under IS 13252 (Part 1):2010.",
    overview: "CCTV recorders used with surveillance systems must be BIS CRS registered to ensure electrical safety and quality in the Indian market.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "visual-display-unit",
    icon: "🖥️",
    title: "Visual Display Unit (Monitor)",
    standard: "IS 13252 (Part 1):2010",
    category: "IT & Computing",
    tag: "Mandatory",
    intro: "Computer monitors and visual display units require BIS CRS registration under IS 13252 (Part 1):2010.",
    overview: "Computer monitors are essential IT peripherals covered under BIS CRS. All monitors sold in India must carry a valid BIS registration certificate.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },

  // Power & Energy
  {
    id: "power-banks",
    icon: "🔋",
    title: "Power Banks",
    standard: "IS 13252 (Part 1):2010",
    category: "Power & Energy",
    tag: "Mandatory",
    intro: "Portable power banks and battery packs require mandatory BIS CRS registration under IS 13252 (Part 1):2010 before import or sale in India.",
    overview: "Power banks are highly imported products in India. BIS registration ensures safe lithium battery packaging and electrical safety for consumers. Non-registered power banks are frequently seized at customs.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing per IS 13252", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking label", "Trademark cert", "AIR proof (foreign)", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "ups",
    icon: "⚡",
    title: "UPS (Uninterruptible Power Supply)",
    standard: "IS 16242 (Part 1):2014",
    category: "Power & Energy",
    tag: "Mandatory",
    intro: "Uninterruptible Power Supplies (UPS) up to 10 kVA require BIS CRS registration under IS 16242 (Part 1):2014.",
    overview: "UPS units are critical for data centres, offices, and homes. BIS CRS registration ensures UPS devices sold in India are electrically safe and comply with Indian standards.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing per IS 16242", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "invertors",
    icon: "🔌",
    title: "Invertors",
    standard: "IS 16242 (Part 1):2014",
    category: "Power & Energy",
    tag: "Mandatory",
    intro: "Home and office invertors require BIS CRS registration under IS 16242 (Part 1):2014 before sale or import in India.",
    overview: "Invertors are widely used across India for power backup. BIS registration ensures invertor safety and quality for Indian consumers.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "storage-battery",
    icon: "🔋",
    title: "Storage Battery",
    standard: "IS 16270:2014",
    category: "Power & Energy",
    tag: "Mandatory",
    intro: "Storage batteries including lead-acid and lithium storage batteries require BIS CRS registration under IS 16270:2014.",
    overview: "Storage batteries for backup power and industrial use must comply with IS 16270:2014 to be legally sold or imported in India.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing per IS 16270", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "sealed-secondary-cells",
    icon: "🔋",
    title: "Sealed Secondary Cells",
    standard: "IS 16046:2018",
    category: "Power & Energy",
    tag: "Mandatory",
    intro: "Sealed secondary cells (lithium-ion cells) require BIS CRS registration under IS 16046:2018 before import or sale in India.",
    overview: "Lithium-ion cells used in devices and battery packs must be BIS registered to ensure safety and prevent fire hazards associated with non-compliant cells.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing per IS 16046", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "sealed-secondary-batteries",
    icon: "🔋",
    title: "Sealed Secondary Batteries",
    standard: "IS 16046:2018",
    category: "Power & Energy",
    tag: "Mandatory",
    intro: "Sealed secondary battery packs including lithium-ion battery packs require BIS CRS registration under IS 16046:2018.",
    overview: "Battery packs used in devices, power tools, and EVs must be BIS registered to ensure they meet safety standards for the Indian market.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing per IS 16046", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "power-adapters-it",
    icon: "🔌",
    title: "Power Adapters for IT Equipment",
    standard: "IS 13252 (Part 1):2010",
    category: "Power & Energy",
    tag: "Mandatory",
    intro: "Power adapters and chargers for IT equipment (laptops, tablets, etc.) require BIS CRS registration under IS 13252 (Part 1):2010.",
    overview: "Power adapters for IT equipment are commonly imported and must be BIS registered to ensure electrical safety and prevent fire hazards.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "power-adapters-audio-video",
    icon: "🔌",
    title: "Power Adapters for Audio/Video Equipment",
    standard: "IS 616:2017",
    category: "Power & Energy",
    tag: "Mandatory",
    intro: "Power adapters for audio and video equipment require BIS CRS registration under IS 616:2017.",
    overview: "Adapters used to power audio and video equipment must be BIS CRS registered to ensure they meet Indian electrical safety standards.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "adaptors-household",
    icon: "🔌",
    title: "Adaptors for Household Appliances",
    standard: "IS 302 (Part 1):2008",
    category: "Power & Energy",
    tag: "Mandatory",
    intro: "Adaptors for household and similar electrical appliances require BIS CRS registration under IS 302 (Part 1):2008.",
    overview: "Household appliance adapters used in day-to-day electrical devices must meet BIS CRS requirements to protect Indian consumers from electrical hazards.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing per IS 302", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "standalone-smps",
    icon: "⚡",
    title: "Standalone SMPS (48V output)",
    standard: "IS 13252-1:2010",
    category: "Power & Energy",
    tag: "Mandatory",
    intro: "Standalone Switch Mode Power Supplies (SMPS) with 48V output voltage require BIS CRS registration under IS 13252-1:2010.",
    overview: "48V SMPS units are used in telecom and industrial applications. BIS CRS registration ensures these power supplies meet Indian safety standards.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },

  // LED & Lighting
  {
    id: "self-ballasted-led-lamps",
    icon: "💡",
    title: "Self Ballasted LED Lamps",
    standard: "IS 16102 (Part 2):2012",
    category: "LED & Lighting",
    tag: "Mandatory",
    intro: "Self-ballasted LED lamps (LED bulbs) for general lighting require BIS CRS registration under IS 16102 (Part 2):2012.",
    overview: "LED bulbs are one of the most common lighting products in India. BIS registration protects consumers from substandard LED lamps that may pose electrical or fire hazards.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing per IS 16102", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "recessed-led-luminaires",
    icon: "💡",
    title: "Recessed LED Luminaires",
    standard: "IS 10322-5 Sec 2:2012",
    category: "LED & Lighting",
    tag: "Mandatory",
    intro: "Recessed LED luminaires used in false ceilings and downlights require BIS CRS registration.",
    overview: "Recessed LED lights commonly used in offices and homes must be BIS registered to ensure they meet Indian electrical safety standards.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "street-light",
    icon: "🏮",
    title: "LED Street Lights",
    standard: "IS 10322-5 Sec 3:2012",
    category: "LED & Lighting",
    tag: "Mandatory",
    intro: "LED street lights and road luminaires require BIS CRS registration under IS 10322-5 Sec 3:2012.",
    overview: "LED street lights for municipal and highway lighting must be BIS CRS registered. This is especially important for government and public infrastructure procurement.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "led-flood-lights",
    icon: "🔦",
    title: "LED Flood Lights",
    standard: "IS 10322-5 Sec 5:2013",
    category: "LED & Lighting",
    tag: "Mandatory",
    intro: "LED flood lights for outdoor and indoor area lighting require BIS CRS registration.",
    overview: "LED flood lights used in sports venues, construction sites, and outdoor areas must be BIS registered to ensure safety and quality.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "led-hand-lamps",
    icon: "🔦",
    title: "LED Hand Lamps",
    standard: "IS 10322-5 Sec 6:2013",
    category: "LED & Lighting",
    tag: "Mandatory",
    intro: "LED hand lamps and portable work lights require BIS CRS registration under IS 10322-5 Sec 6:2013.",
    overview: "LED hand lamps used by workers and in households must be BIS registered to ensure they are safe and meet quality standards.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "led-lighting-chains",
    icon: "🎄",
    title: "LED Lighting Chains",
    standard: "IS 10322-5 Sec 7:2013",
    category: "LED & Lighting",
    tag: "Mandatory",
    intro: "LED lighting chains and string lights require BIS CRS registration under IS 10322-5 Sec 7:2013.",
    overview: "LED string lights used for decoration must be BIS registered. Uncertified decorative lights have caused fires — BIS registration protects Indian consumers.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "emergency-lighting",
    icon: "🚨",
    title: "Emergency Lighting",
    standard: "IS 10322-5 Sec 8:2013",
    category: "LED & Lighting",
    tag: "Mandatory",
    intro: "Emergency lighting systems and exit lights require BIS CRS registration under IS 10322-5 Sec 8:2013.",
    overview: "Emergency lighting is critical for safety in buildings. BIS CRS registration ensures emergency lighting systems meet Indian safety and performance standards.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "fixed-led-luminaires",
    icon: "💡",
    title: "Fixed General Purpose LED Luminaires",
    standard: "IS 10322 (Part 5/Sec 1):2012",
    category: "LED & Lighting",
    tag: "Mandatory",
    intro: "Fixed general purpose LED luminaires for indoor and outdoor use require BIS CRS registration.",
    overview: "General purpose fixed LED lights used in homes and commercial spaces must be BIS CRS registered to ensure electrical safety and quality.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "standalone-led-modules",
    icon: "💡",
    title: "Standalone LED Modules",
    standard: "IS 16103 (Part 1):2012",
    category: "LED & Lighting",
    tag: "Mandatory",
    intro: "Standalone LED modules for general lighting require BIS CRS registration under IS 16103 (Part 1):2012.",
    overview: "LED modules used in lighting fixtures must be BIS registered to ensure the building blocks of lighting products meet Indian safety standards.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "dc-ac-led-driver",
    icon: "⚡",
    title: "DC/AC Electronic Control Gear for LED",
    standard: "IS 15885 (Part 2/Sec 13):2012",
    category: "LED & Lighting",
    tag: "Mandatory",
    intro: "DC or AC supplied electronic control gear (LED drivers) for LED modules require BIS CRS registration.",
    overview: "LED drivers are the power conversion units for LED lighting. BIS registration ensures these critical components are safe and compliant.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "dimmers-led",
    icon: "🕹️",
    title: "Dimmers for LED Products",
    standard: "IS 60669-2-1:2008",
    category: "LED & Lighting",
    tag: "Mandatory",
    intro: "Dimmers compatible with LED lighting products require BIS CRS registration under IS 60669-2-1:2008.",
    overview: "LED dimmers used in smart lighting and home automation setups must be BIS CRS registered to ensure electrical safety.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "lighting-chain",
    icon: "🎄",
    title: "Lighting Chain",
    standard: "IS 10322 (Part 5/Sec 9):2017",
    category: "LED & Lighting",
    tag: "Mandatory",
    intro: "Decorative lighting chains require BIS CRS registration under IS 10322 (Part 5/Sec 9):2017.",
    overview: "Lighting chains used for decorative purposes must be BIS registered to ensure safety during prolonged use in households.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },

  // Appliances
  {
    id: "microwave-ovens",
    icon: "📦",
    title: "Microwave Ovens",
    standard: "IS 302-2-25:2014",
    category: "Home Appliances",
    tag: "Mandatory",
    intro: "Microwave ovens require mandatory BIS CRS registration under IS 302-2-25:2014 before import or sale in India.",
    overview: "Microwave ovens are common kitchen appliances. BIS registration ensures they meet Indian electrical safety standards to prevent fire hazards.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing per IS 302-2-25", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "rice-cooker",
    icon: "🍚",
    title: "Rice Cooker",
    standard: "IS 302-2-15:2009",
    category: "Home Appliances",
    tag: "Mandatory",
    intro: "Electric rice cookers require BIS CRS registration under IS 302-2-15:2009 before import or sale in India.",
    overview: "Rice cookers are widely used across India. BIS registration ensures these appliances are electrically safe for Indian consumers.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing per IS 302-2-15", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "induction-stove",
    icon: "🍳",
    title: "Induction Stove",
    standard: "IS 302-2-6:2009",
    category: "Home Appliances",
    tag: "Mandatory",
    intro: "Induction cooktops and stoves require BIS CRS registration under IS 302-2-6:2009 before import or sale in India.",
    overview: "Induction stoves are increasingly popular in Indian kitchens. BIS registration ensures electrical safety and quality of these cooking appliances.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing per IS 302-2-6", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "electronic-clock",
    icon: "🕐",
    title: "Electronic Clock",
    standard: "IS 302-2-26:2014",
    category: "Home Appliances",
    tag: "Mandatory",
    intro: "Electronic clocks and digital clocks require BIS CRS registration under IS 302-2-26:2014.",
    overview: "Electronic clocks including desk clocks, wall clocks, and alarm clocks with electronic displays must be BIS registered before import or sale in India.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },

  // Scanning & Identification
  {
    id: "barcode-readers",
    icon: "📊",
    title: "Barcode Readers",
    standard: "IS 13252 (Part 1):2010",
    category: "Scanning & ID",
    tag: "Mandatory",
    intro: "Barcode readers and scanners require BIS CRS registration under IS 13252 (Part 1):2010.",
    overview: "Barcode readers used in retail, logistics, and manufacturing must be BIS registered to ensure compliance with Indian IT equipment safety standards.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "barcode-scanners",
    icon: "📊",
    title: "Barcode Scanners",
    standard: "IS 13252 (Part 1):2010",
    category: "Scanning & ID",
    tag: "Mandatory",
    intro: "Handheld barcode scanners (including 2D scanners) require BIS CRS registration under IS 13252 (Part 1):2010.",
    overview: "Barcode scanners are essential in warehouses, supermarkets, and healthcare. BIS CRS registration ensures they meet Indian safety standards.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "iris-scanners",
    icon: "👁️",
    title: "Iris Scanners",
    standard: "IS 13252 (Part 1):2010",
    category: "Scanning & ID",
    tag: "Mandatory",
    intro: "Iris recognition scanners require BIS CRS registration under IS 13252 (Part 1):2010.",
    overview: "Iris scanners used for biometric authentication in government, banking, and enterprise applications must be BIS CRS registered.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "optical-fingerprint-scanners",
    icon: "🖐️",
    title: "Optical Fingerprint Scanners",
    standard: "IS 13252-1:2010",
    category: "Scanning & ID",
    tag: "Mandatory",
    intro: "Optical fingerprint scanners for biometric authentication require BIS CRS registration under IS 13252-1:2010.",
    overview: "Fingerprint scanners used in government schemes (Aadhaar, banking) and enterprise security must be BIS CRS registered.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "passport-reader",
    icon: "🛂",
    title: "Passport Reader",
    standard: "IS 13252 (Part 1):2010",
    category: "Scanning & ID",
    tag: "Mandatory",
    intro: "Passport and ID card readers require BIS CRS registration under IS 13252 (Part 1):2010.",
    overview: "Passport readers used at airports, hotels, and government offices must be BIS CRS registered to ensure safety and compliance.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "smart-card-reader",
    icon: "💳",
    title: "Smart Card Reader",
    standard: "IS 13252 (Part 1):2010",
    category: "Scanning & ID",
    tag: "Mandatory",
    intro: "Smart card readers and contactless card readers require BIS CRS registration under IS 13252 (Part 1):2010.",
    overview: "Smart card readers used in banking, access control, and government applications must be BIS registered.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },

  // Solar & Renewable
  {
    id: "pv-invertor",
    icon: "☀️",
    title: "Utility-Interconnected PV Inverters",
    standard: "IS 16169:2014",
    category: "Solar & Renewable",
    tag: "Mandatory",
    intro: "Utility-interconnected photovoltaic inverters (solar inverters) require BIS CRS registration under IS 16169:2014.",
    overview: "Solar inverters that connect to the utility grid must be BIS CRS registered to ensure safety and grid compatibility in India.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing per IS 16169", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "crystalline-silicon-pv",
    icon: "☀️",
    title: "Crystalline Silicon PV Modules",
    standard: "IS 14286 / IS/IEC 61730-1 / IS/IEC 61730-2",
    category: "Solar & Renewable",
    tag: "Mandatory",
    intro: "Crystalline silicon terrestrial photovoltaic modules (solar panels) require BIS CRS registration.",
    overview: "Solar panels are critical renewable energy components. BIS CRS registration ensures solar PV modules meet Indian quality and safety standards.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing per IS 14286 / IEC 61730", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec", "IEC test certificates"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "thin-film-pv",
    icon: "☀️",
    title: "Thin-Film Terrestrial Photovoltaic Modules",
    standard: "IS 16077:2013",
    category: "Solar & Renewable",
    tag: "Mandatory",
    intro: "Thin-film solar photovoltaic modules require BIS CRS registration under IS 16077:2013.",
    overview: "Thin-film solar panels used in industrial and commercial solar projects must be BIS registered to enter the Indian market.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing per IS 16077", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "power-invertor",
    icon: "☀️",
    title: "Power Invertor (PV System)",
    standard: "IS 16221 (Part 2):2015",
    category: "Solar & Renewable",
    tag: "Mandatory",
    intro: "Power invertors for photovoltaic power systems require BIS CRS registration under IS 16221 (Part 2):2015.",
    overview: "PV system power invertors must be BIS registered to ensure they meet Indian standards for solar power applications.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing per IS 16221", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },

  // Commercial & Office
  {
    id: "automatic-data-processing-machine",
    icon: "🖥️",
    title: "Automatic Data Processing Machine",
    standard: "IS 13252 (Part 1):2010",
    category: "Commercial & Office",
    tag: "Mandatory",
    intro: "Automatic data processing machines (servers, mainframes, computing devices) require BIS CRS registration under IS 13252 (Part 1):2010.",
    overview: "Data processing equipment including servers and computing systems must be BIS CRS registered for use in Indian data centres and enterprises.",
    types: [
      "Access Control Terminal (ADPM)",
      "Achilles Test Platform (ADPM)",
      "Active Panel (ADPM)",
      "Advanced Driver Assistance Systems (ADPM)",
      "ALL IN ONE PC (ADPM)",
      "Audio Conferencing System (ADPM)",
      "Audio Confrencing System (ADPM)",
      "Audio/Video bar for conference calls (ADPM)",
      "Camera Controller (ADPM)",
      "Commercial Display (ADPM)",
      "Compute Cartridge (ADPM)",
      "Conferencing Device (ADPM)",
      "Controller Appliance (ADPM)",
      "Cryptographic Data Processing Machine (ADPM)",
      "Customer Concierge (ADPM)",
      "Data Acquisition Unit (ADPM)",
      "Desk Manager (ADPM)",
      "Desktop Mini PC (ADPM)",
      "Developer Kit (ADPM)",
      "Digital Image Processing Unit (Automatic Data Processing Unit)",
      "Digital Media Receiver (ADPM)",
      "Digital Signage Player (ADPM)",
      "Display Controller (ADPM)",
      "Dolby Voice Huddle (ADPM)",
      "Embedded Computer (ADPM)",
      "Express Station (ADPM)",
      "Face Recognition System (ADPM)",
      "Face Recognition Terminal (ADPM)",
      "Fanless Embedded System (ADPM)",
      "GPU Accelerator (ADPM)",
      "GPU Box (ADPM)",
      "Graphics Tablet (ADPM)",
      "Hardware Security Module (ADPM)",
      "INDUSTRIAL PC (ADPM)",
      "Intelligent Multimedia Display (ADPM)",
      "INTELLIGENT PANEL (ADPM)",
      "Intelli-VMS Distributor Pro II Mini (ADPM)",
      "Interactive Display (ADPM)",
      "Interactive Flat Panel (ADPM)",
      "INTERACTIVE INTELLIGENT PANEL (ADPM)",
      "Interactive Video Streaming Device (ADPM)",
      "LCD Electronic Whiteboard (ADPM)",
      "Machine Learning Appliance (ADPM)",
      "Media Converter (ADPM)",
      "Media Processor (ADPM)",
      "Media Streaming Device (ADPM)",
      "Media Streaming Player (ADPM)",
      "Meeting Room Controller (ADPM)",
      "Micro PC (ADPM)",
      "Mobile Computer (ADPM)",
      "Net Top Box (ADPM)",
      "Network Appliance (ADPM)",
      "On-board signal and power converter (ADPM)",
      "OPS PC MODULE (ADPM)",
      "PANEL PC (ADPM)",
      "PROJECTOR (ADPM)",
      "RFID Reader (ADPM)",
      "SERVER (ADPM)",
      "Smart Clock (ADPM)",
      "Smart Mirror with Display (ADPM)",
      "Solid State Digital Sign Computer (ADPM)",
      "STORAGE (ADPM)",
      "System Processing Unit (ADPM)",
      "TAPE LIBRARY (ADPM)",
      "THIN CLIENT (ADPM)",
      "Tiny PC (ADPM)",
      "Touch Computer (ADPM)",
      "Touchpanel (ADPM)",
      "Tracker (Automatic Data Processing Machine)",
      "TV Stick (ADPM)",
      "Ultrasonic Quality Inspection Platform",
      "Unified Communication Server (ADPM)",
      "Unified Network Security Gateway (ADPM)",
      "Vacuum Quality Check Sensor (ADPM)",
      "Video Conference Equipment (ADPM)",
      "Video Image Processor (ADPM)",
      "WORKSTATION (ADPM)",
      "ZERO CLIENT (ADPM)",
    ],
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "cash-registers",
    icon: "🏧",
    title: "Cash Registers",
    standard: "IS 13252 (Part 1):2010",
    category: "Commercial & Office",
    tag: "Mandatory",
    intro: "Electronic cash registers require BIS CRS registration under IS 13252 (Part 1):2010.",
    overview: "Cash registers used in retail outlets must comply with IS 13252 standards and obtain BIS CRS registration before use in India.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "point-of-sale-terminals",
    icon: "💳",
    title: "Point of Sale (POS) Terminals",
    standard: "IS 13252-1:2010",
    category: "Commercial & Office",
    tag: "Mandatory",
    intro: "POS terminals used in retail and banking require BIS CRS registration under IS 13252-1:2010.",
    overview: "POS machines are essential for digital payments in India. BIS CRS registration ensures these devices are safe and reliable for consumer transactions.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "atm-machines",
    icon: "🏧",
    title: "ATM / Cash Dispensing Machines",
    standard: "IS 13252 (Part 1):2010",
    category: "Commercial & Office",
    tag: "Mandatory",
    intro: "Automatic Teller Machines and cash dispensing machines require BIS CRS registration under IS 13252 (Part 1):2010.",
    overview: "ATMs are critical financial infrastructure in India. BIS registration ensures ATM equipment meets electrical and safety standards.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "copying-machine-duplicators",
    icon: "📋",
    title: "Copying Machines / Duplicators",
    standard: "IS 13252-1:2010",
    category: "Commercial & Office",
    tag: "Mandatory",
    intro: "Photocopying machines, duplicators, and multifunction printers require BIS CRS registration.",
    overview: "Office copiers and duplicators must be BIS CRS registered to ensure they meet Indian electrical safety standards.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "mail-processing-machine",
    icon: "✉️",
    title: "Mail Processing Machine",
    standard: "IS 13252-1:2010",
    category: "Commercial & Office",
    tag: "Mandatory",
    intro: "Mail processing and franking machines require BIS CRS registration under IS 13252-1:2010.",
    overview: "Mail handling equipment used in postal services and corporate mailrooms must comply with BIS CRS standards.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "telephone-answering-machine",
    icon: "📞",
    title: "Telephone Answering Machine",
    standard: "IS 13252 (Part 1):2010",
    category: "Commercial & Office",
    tag: "Mandatory",
    intro: "Electronic telephone answering machines require BIS CRS registration under IS 13252 (Part 1):2010.",
    overview: "Telephone answering machines used in homes and offices must be BIS registered before import or sale in India.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },

  // Storage
  {
    id: "usb-external-hdd",
    icon: "💾",
    title: "USB Type External Hard Disk Drive",
    standard: "IS 13252-1:2010",
    category: "Storage",
    tag: "Mandatory",
    intro: "USB external hard disk drives (HDD) require BIS CRS registration under IS 13252-1:2010.",
    overview: "External HDDs are widely used for data storage and backup. BIS registration ensures these devices are electrically safe for Indian consumers.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "usb-ssd",
    icon: "💾",
    title: "USB Type External Solid State Storage Device",
    standard: "IS 13252-1:2010",
    category: "Storage",
    tag: "Mandatory",
    intro: "USB external solid state drives (SSD) and flash drives require BIS CRS registration under IS 13252-1:2010.",
    overview: "External SSDs are increasingly popular storage devices. BIS CRS registration ensures they meet Indian electrical and safety standards.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },

  // Switchgear (Low Voltage)
  {
    id: "circuit-breakers",
    icon: "⚡",
    title: "Low-Voltage Circuit Breakers",
    standard: "IS/IEC 60947 Part 2:2016",
    category: "Switchgear",
    tag: "Mandatory",
    intro: "Low-voltage switchgear circuit breakers require BIS CRS registration under IS/IEC 60947 Part 2:2016.",
    overview: "Circuit breakers are fundamental electrical safety components. BIS registration ensures all circuit breakers sold in India meet international safety standards adapted for Indian conditions.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing per IS/IEC 60947", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "switchgear-switches",
    icon: "🔌",
    title: "LV Switches, Disconnectors & Fuse Units",
    standard: "IS/IEC 60947 Part 3:2012",
    category: "Switchgear",
    tag: "Mandatory",
    intro: "Low-voltage switches, disconnectors, switch-disconnectors, and fuse-combination units require BIS CRS registration.",
    overview: "These low-voltage switchgear components are used in industrial and commercial electrical installations. BIS registration ensures they meet Indian safety standards.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing per IS/IEC 60947-3", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "electromechanical-contactors",
    icon: "⚙️",
    title: "Electromechanical Contactors & Motor Starters",
    standard: "IS/IEC 60947 Part 4 Sec 1:2012",
    category: "Switchgear",
    tag: "Mandatory",
    intro: "Electromechanical contactors and motor starters for LV switchgear require BIS CRS registration.",
    overview: "Contactors and motor starters are critical in industrial motor control systems. BIS registration ensures they comply with Indian electrical safety requirements.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing per IS/IEC 60947-4-1", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
  {
    id: "control-circuit-devices",
    icon: "🎛️",
    title: "Electromechanical Control Circuit Devices",
    standard: "IS/IEC 60947 Part 5 Sec 1:2009",
    category: "Switchgear",
    tag: "Mandatory",
    intro: "Electromechanical control circuit devices for LV switchgear require BIS CRS registration.",
    overview: "Control circuit devices used in industrial automation and switchgear panels must be BIS registered to ensure safety in Indian electrical systems.",
    docsForeign: ["AIR nomination", "BIS portal application", "Lab testing per IS/IEC 60947-5-1", "Document submission", "BIS review", "Licence"],
    docsDomestic: ["BIS portal application", "Lab testing", "Document submission", "BIS review", "Licence"],
    documents: ["CDF/CCL form", "Application form", "Business License", "ISO cert", "Marking details", "Technical Spec"],
    validity: "2 Years",
    timeline: "4–8 Weeks",
    scheme: "Scheme II of Schedule II — BIS (Conformity Assessment) Regulations, 2018",
  },
];

// ── Category color map ────────────────────────────────────────────────
const CATEGORY_COLORS = {
  "Audio & Video":      { bg: "#EBF5F5", text: "#0E8080", dot: "#1E88C8" },
  "IT & Computing":     { bg: "#EBF0FB", text: "#0a4daa", dot: "#1E45C8" },
  "Power & Energy":     { bg: "#FEF3DC", text: "#9A5C06", dot: "#C8780A" },
  "LED & Lighting":     { bg: "#FEFCE8", text: "#854D0E", dot: "#CA8A04" },
  "Home Appliances":    { bg: "#FCE7F3", text: "#9D174D", dot: "#DB2777" },
  "Scanning & ID":      { bg: "#F0FDF4", text: "#166534", dot: "#16A34A" },
  "Solar & Renewable":  { bg: "#FFF7ED", text: "#9A3412", dot: "#EA580C" },
  "Commercial & Office":{ bg: "#F5F3FF", text: "#5B21B6", dot: "#7C3AED" },
  "Storage":            { bg: "#F0F9FF", text: "#0C4A6E", dot: "#0284C7" },
  "Switchgear":         { bg: "#FFF1F2", text: "#9F1239", dot: "#E11D48" },
};

const ALL_CATEGORIES = ["All", ...Object.keys(CATEGORY_COLORS)];

const CATEGORY_ICONS = {
  "All":                "⚡",
  "Audio & Video":      "🔊",
  "IT & Computing":     "💻",
  "Power & Energy":     "🔋",
  "LED & Lighting":     "💡",
  "Home Appliances":    "🏠",
  "Scanning & ID":      "📊",
  "Solar & Renewable":  "☀️",
  "Commercial & Office":"🏢",
  "Storage":            "💾",
  "Switchgear":         "⚙️",
};

const css = `
  /* ── layout ── */
  .crs-shell {
    border: 1px solid #E8E3DA;
    border-radius: 14px;
    overflow: visible;        /* allow sticky sidebar to work */
    background: #fff;
    box-shadow: 0 4px 24px rgba(0,0,0,0.06);
    font-family: 'Outfit','system-ui',sans-serif;
    color: #0D1B2A;
  }
  /* re-clip only top bar and CTA */
  .crs-top-bar { border-radius: 14px 14px 0 0; overflow: hidden; }
  .crs-shell * {
    box-sizing: border-box;
  }
  .crs-shell button {
    font-family: 'Poppins','system-ui',sans-serif;
  }
  .crs-sidebar {
    border-right: 1px solid #E8E3DA;
    background: #FAF8F4 !important;
    color: #0D1B2A !important;
  }
  .crs-top-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    background: #FAF8F4;
    border-bottom: 1px solid #E8E3DA;
    flex-wrap: wrap;
    color: #0D1B2A !important;
  }
  .crs-body {
    display: grid;
    grid-template-columns: 220px 1fr;
    align-items: flex-start;   /* critical for sticky to work */
  }
  @media(max-width: 720px) {
    .crs-body { grid-template-columns: 1fr; }
    .crs-sidebar { flex-direction: row !important; overflow-x: auto; border-right: none !important; border-bottom: 1px solid #E8E3DA; padding: 10px !important; position: static !important; height: auto !important; }
    .crs-sidebar::-webkit-scrollbar { height: 3px; }
    .crs-cat-btn { flex-shrink: 0; flex-direction: row !important; padding: 8px 14px !important; border-radius: 20px !important; border-bottom: none !important; border: 1px solid #E8E3DA !important; }
    .crs-cat-btn.active { border-color: #1E88C8 !important; }
    .crs-cat-count { display: none !important; }
  }

  /* ── sidebar ── */
  .crs-sidebar {
    display: flex;
    flex-direction: column;
    padding: 12px 8px;
    gap: 2px;
    overflow-y: auto;
    position: sticky;
    top: 90px;           /* just below fixed navbar */
    height: fit-content;
    max-height: calc(100vh - 120px);
    align-self: flex-start;
  }
  .crs-sidebar::-webkit-scrollbar { width: 0; }
  .crs-cat-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 8px;
    border: none;
    background: transparent;
    cursor: pointer;
    text-align: left;
    transition: all 0.18s;
    border-bottom: 1px solid transparent;
    width: 100%;
    position: relative;
  }
  .crs-cat-btn:hover { background: rgba(30,136,200,0.06); }
  .crs-cat-btn.active {
    background: #EBF5F5;
  }
  .crs-cat-btn.active::before {
    content: '';
    position: absolute;
    left: 0; top: 20%; bottom: 20%;
    width: 3px;
    border-radius: 0 3px 3px 0;
    background: #1E88C8;
  }
  .crs-cat-icon { font-size: 17px; flex-shrink: 0; width: 22px; text-align: center; }
  .crs-cat-label { font-family: 'Poppins','system-ui',sans-serif; font-size: 12px; font-weight: 600; flex: 1; line-height: 1.3; color: #0D1B2A !important; }
  .crs-cat-count {
    font-family: 'Outfit','system-ui',sans-serif;
    font-size: 10px; font-weight: 700;
    background: rgba(30,136,200,0.12);
    color: #1E88C8 !important;
    border-radius: 10px;
    padding: 1px 7px;
    flex-shrink: 0;
  }
  .crs-cat-btn.active .crs-cat-count { background: #1E88C8; color: #fff; }

  /* ── right panel ── */
  .crs-panel {
    display: flex;
    flex-direction: column;
  }
  .crs-panel-header {
    padding: 14px 18px 10px;
    border-bottom: 1px solid #F0ECE5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
    background: #fff !important;
    flex-shrink: 0;
    color: #0D1B2A !important;
  }
  /* ── SCROLLABLE LIST ── */
  .crs-scroll-list {
    height: 580px;
    overflow-y: auto;
    padding: 14px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
    align-content: flex-start;
    background: #F8F9FC;
    grid-auto-rows: max-content;
  }
  .crs-scroll-list::-webkit-scrollbar { width: 5px; }
  .crs-scroll-list::-webkit-scrollbar-track { background: #F8F8FC; border-radius: 4px; }
  .crs-scroll-list::-webkit-scrollbar-thumb { background: #C8DFF0; border-radius: 4px; }
  .crs-scroll-list::-webkit-scrollbar-thumb:hover { background: #1E88C8; }
  @media(max-width: 500px) {
    .crs-scroll-list { grid-template-columns: 1fr 1fr; height: 400px; }
  }

  /* ── product row card ── */
  .crs-row-card {
    background: #fff !important;
    border: 1px solid #E8E3DA;
    border-radius: 9px;
    padding: 14px 14px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    gap: 7px;
    position: relative;
    overflow: hidden;
    color: #0D1B2A !important;
    height: 100%;
    min-height: 140px;
  }
  .crs-row-card::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: #1E88C8;
    opacity: 0;
    transition: opacity 0.2s;
  }
  .crs-row-card:hover {
    border-color: #1E88C8;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(30,136,200,0.10);
  }
  .crs-row-card:hover::after { opacity: 1; }

  /* ── search ── */
  .crs-search-wrap { position: relative; flex: 1; min-width: 180px; }
  .crs-search-wrap input {
    width: 100%;
    padding: 9px 12px 9px 34px;
    border: 1px solid #E8E3DA;
    border-radius: 7px;
    font-family: 'Outfit','system-ui',sans-serif;
    font-size: 13px;
    color: #0D1B2A !important;
    outline: none;
    transition: border-color 0.2s;
    box-sizing: border-box;
    background: #fff;
  }
  .crs-search-wrap input:focus { border-color: #1E88C8; box-shadow: 0 0 0 3px rgba(30,136,200,0.08); }
  .crs-search-icon {
    position: absolute; left: 10px; top: 50%;
    transform: translateY(-50%);
    color: #718096; font-size: 13px; pointer-events: none;
  }

  /* ── scroll hint fade ── */
  .crs-scroll-fade {
    position: relative;
  }
  .crs-scroll-fade::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 48px;
    background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.95));
    pointer-events: none;
    z-index: 2;
  }
`;

export default function BISCRSProductList({ onProductClick }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Count per category
  const categoryCounts = ALL_CATEGORIES.reduce((acc, cat) => {
    acc[cat] = cat === "All"
      ? CRS_PRODUCTS.length
      : CRS_PRODUCTS.filter(p => p.category === cat).length;
    return acc;
  }, {});

  const filtered = CRS_PRODUCTS.filter(p => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.standard.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <div>
      <style>{css}</style>

      <div className="crs-shell">
        {/* ── Top search bar ── */}
        <div className="crs-top-bar">
          <div className="crs-search-wrap">
            <span className="crs-search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search product name or IS standard…"
              value={search}
              onChange={e => { setSearch(e.target.value); setActiveCategory("All"); }}
            />
          </div>
          <div style={{ fontFamily: "'Outfit','system-ui',sans-serif", fontSize: 12.5, color: "#718096", whiteSpace: "nowrap" }}>
            <strong style={{ color: "#0a6daa" }}>{filtered.length}</strong> / {CRS_PRODUCTS.length} products
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#EBF5F5", borderRadius: 6, padding: "5px 12px" }}>
            <span style={{ fontSize: 13 }}>☝️</span>
            <span style={{ fontFamily: "'Poppins','system-ui',sans-serif", fontSize: 11, fontWeight: 600, color: "#0E8080" }}>
              Click any product for details
            </span>
          </div>
        </div>

        {/* ── Body: sidebar + panel ── */}
        <div className="crs-body" style={{ border: "1px solid #E8E3DA", borderTop: "none", borderBottom: "none" }}>

          {/* Sidebar categories */}
          <div className="crs-sidebar">
            {ALL_CATEGORIES.map(cat => {
              const isActive = activeCategory === cat && !search;
              const color = CATEGORY_COLORS[cat];
              return (
                <button
                  key={cat}
                  className={`crs-cat-btn${isActive ? " active" : ""}`}
                  onClick={() => { setActiveCategory(cat); setSearch(""); }}
                  style={{ color: isActive ? "#0a6daa" : "#718096" }}
                >
                  <span className="crs-cat-icon">{CATEGORY_ICONS[cat]}</span>
                  <span className="crs-cat-label" style={{ color: isActive ? "#0a6daa" : "#0D1B2A" }}>{cat}</span>
                  <span className="crs-cat-count">{categoryCounts[cat]}</span>
                </button>
              );
            })}
          </div>

          {/* Right panel */}
          <div className="crs-panel">
            {/* Panel header */}
            <div className="crs-panel-header">
              <div>
                <span style={{ fontFamily: "'Poppins','system-ui',sans-serif", fontSize: 13, fontWeight: 700, color: "#0a6daa" }}>
                  {search ? `Search: "${search}"` : activeCategory}
                </span>
                <span style={{ fontFamily: "'Outfit','system-ui',sans-serif", fontSize: 12, color: "#718096", marginLeft: 8 }}>
                  {filtered.length} product{filtered.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#718096" }}>
                <span style={{ fontSize: 12 }}>↕</span>
                <span style={{ fontFamily: "'Outfit','system-ui',sans-serif", fontSize: 11.5, color: "#718096" }}>Scroll inside list</span>
              </div>
            </div>

            {/* Scrollable grid */}
            <div className="crs-scroll-fade">
              {filtered.length === 0 ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 300, color: "#718096", fontFamily: "'Outfit','system-ui',sans-serif" }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
                  <p style={{ margin: 0 }}>No products match "<strong>{search}</strong>"</p>
                </div>
              ) : (
                <div className="crs-scroll-list">
                  {filtered.map(product => {
                    const catColor = CATEGORY_COLORS[product.category] || CATEGORY_COLORS["IT & Computing"];
                    return (
                      <div
                        key={product.id}
                        className="crs-row-card"
                        onClick={() => onProductClick(product)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => e.key === "Enter" && onProductClick(product)}
                      >
                        {/* Icon row */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div style={{ width: 36, height: 36, borderRadius: 8, background: catColor.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                            {product.icon}
                          </div>
                          <span style={{ fontFamily: "'Outfit','system-ui',sans-serif", fontSize: 9, fontWeight: 700, background: "#EBF5F5", color: "#0E8080", padding: "2px 7px", borderRadius: 3, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                            Mandatory
                          </span>
                        </div>

                        {/* Title */}
                        <div style={{ fontFamily: "'Poppins','system-ui',sans-serif", fontSize: 12.5, fontWeight: 700, color: "#0a6daa", lineHeight: 1.3 }}>
                          {product.title}
                        </div>

                        {/* Standard */}
                        <div style={{ fontFamily: "'Outfit','system-ui',sans-serif", fontSize: 10.5, color: "#718096" }}>
                          {product.standard}
                        </div>

                        {/* Footer */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 6 }}>
                          <span style={{ fontFamily: "'Outfit','system-ui',sans-serif", fontSize: 10, fontWeight: 600, color: catColor.text, background: catColor.bg, borderRadius: 3, padding: "1px 6px" }}>
                            {product.category}
                          </span>
                          <span style={{ fontSize: 11, color: "#1E88C8" }}>→</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div style={{ background: "linear-gradient(135deg, #1E88C8 0%, #0E8080 100%)", padding: "18px 24px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", borderRadius: "0 0 14px 14px" }}>
          <span style={{ fontSize: 22 }}>📋</span>
          <div style={{ flex: 1, minWidth: 160 }}>
            <div style={{ fontFamily: "'Poppins','system-ui',sans-serif", fontSize: 13.5, fontWeight: 700, color: "#fff", marginBottom: 2 }}>
              Don't see your product?
            </div>
            <p style={{ fontFamily: "'Outfit','system-ui',sans-serif", fontSize: 12.5, color: "rgba(255,255,255,0.82)", margin: 0 }}>
              79+ categories under CRS. Get a free eligibility check.
            </p>
          </div>
          <button
            onClick={() => window.location.href = "/contact"}
            style={{ padding: "9px 20px", background: "#F97316", color: "#fff", border: "none", borderRadius: 6, fontFamily: "'Poppins','system-ui',sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer", flexShrink: 0, transition: "background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#e06010"}
            onMouseLeave={e => e.currentTarget.style.background = "#F97316"}
          >
            Free Eligibility Check →
          </button>
        </div>
      </div>
    </div>
  );
}