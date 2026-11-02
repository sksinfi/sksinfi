import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at SKS INFI | Join Our Financial Advisory & Consulting Team",
  description:
    "Explore exciting career opportunities in loan relationship management, financial advisory, wealth management, and real estate consulting at SKS INFI in Jaipur.",
  keywords: [
    "SKS INFI Careers",
    "Jobs in Financial Services Jaipur",
    "Loan Relationship Manager Jobs",
    "Financial Advisor Jobs Jaipur",
    "Finance Careers Rajasthan"
  ],
  alternates: {
    canonical: "https://www.sksinfi.com/careers"
  },
  openGraph: {
    title: "Careers at SKS INFI | Join Our Financial Advisory & Consulting Team",
    description:
      "Explore exciting career opportunities in loan relationship management, financial advisory, wealth management, and real estate consulting at SKS INFI in Jaipur.",
    url: "https://www.sksinfi.com/careers",
    siteName: "SKS INFI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.sksinfi.com/img/aboutus.png",
        alt: "Careers at SKS INFI"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at SKS INFI | Join Our Financial Advisory & Consulting Team",
    description:
      "Explore exciting career opportunities in loan relationship management, financial advisory, wealth management, and real estate consulting at SKS INFI in Jaipur.",
    images: ["https://www.sksinfi.com/img/aboutus.png"]
  }
};

export default function CareersLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
