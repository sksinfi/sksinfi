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

const page = pagesData["contact"];

export const metadata: Metadata = {
  title: page?.title || "SKS INFI Contact Number | Get Expert Financial Guidance Today",
  description:
    page?.metaDescription ||
    "Contact SKS INFI in Jaipur for expert financial consultation, loans, investments, insurance and NRI financial services.",
  keywords: [
    "SKS INFI Contact Number",
    "Financial Solutions Provider in Jaipur",
    "Financial Consultant in Jaipur",
    "Contact SKS INFI"
  ],
  alternates: {
    canonical: "https://www.sksinfi.com/contact.php"
  },
  openGraph: {
    title: page?.ogTitle || page?.title || "SKS INFI Contact Number | Get Expert Financial Guidance Today",
    description:
      page?.ogDescription ||
      page?.metaDescription ||
      "Contact SKS INFI in Jaipur for expert financial consultation, loans, investments, insurance and NRI financial services.",
    url: "https://www.sksinfi.com/contact.php",
    siteName: "SKS INFI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: page?.ogImage || "https://www.sksinfi.com/img/aboutus.png",
        alt: "Contact SKS INFI Jaipur"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: page?.twitterTitle || page?.title || "SKS INFI Contact Number | Get Expert Financial Guidance Today",
    description:
      page?.twitterDescription ||
      page?.metaDescription ||
      "Contact SKS INFI in Jaipur for expert financial consultation, loans, investments, insurance and NRI financial services.",
    images: [page?.twitterImage || "https://www.sksinfi.com/img/aboutus.png"]
  }
};

export default function ContactPage() {
  return <LegacyPageRenderer slug="contact" initialData={page} />;
}
