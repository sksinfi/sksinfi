import React from "react";
import type { Metadata } from "next";
import LegacyPageRenderer from "@/components/LegacyPageRenderer";
import pagesDataRaw from "@/data/pagesContent.json";

const pagesData = pagesDataRaw as Record<
  string,
  {
    slug: string;
    file: string;
    title: string;
    metaDescription: string;
    keywords?: string;
    canonical?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
    html: string;
    jsonLd?: string[];
  }
>;

export const metadata: Metadata = {
  title: "Financial Consultant in Jaipur | Trusted SKS INFI Experts",
  description:
    "SKS INFI provides expert financial planning, investment, loan and insurance services as a trusted Financial Consultant in Jaipur. Contact us today for guidance.",
  keywords: [
    "Financial Consultant in Jaipur",
    "Financial Advisor in Jaipur",
    "Home Loan Jaipur",
    "Business Loan Jaipur",
    "Mutual Fund SIP Advisor Jaipur",
    "SKS INFI"
  ],
  alternates: {
    canonical: "https://www.sksinfi.com/"
  },
  openGraph: {
    title: "Financial Consultant in Jaipur | Trusted SKS INFI Experts",
    description:
      "SKS INFI provides expert financial planning, investment, loan and insurance services as a trusted Financial Consultant in Jaipur. Contact us today for guidance.",
    url: "https://www.sksinfi.com/",
    siteName: "SKS INFI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.sksinfi.com/img/aboutus.png",
        width: 1200,
        height: 630,
        alt: "SKS INFI Financial Consultant in Jaipur"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Financial Consultant in Jaipur | Trusted SKS INFI Experts",
    description:
      "SKS INFI provides expert financial planning, investment, loan and insurance services as a trusted Financial Consultant in Jaipur. Contact us today for guidance.",
    images: ["https://www.sksinfi.com/img/aboutus.png"]
  }
};

export default function HomePage() {
  const page = pagesData["index"];
  return <LegacyPageRenderer slug="index" initialData={page} />;
}
