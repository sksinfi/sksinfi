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

const page = pagesData["about"];

export const metadata: Metadata = {
  title: page?.title || "Financial Consultancy in India | Trusted SKS INFI Experts",
  description:
    page?.metaDescription ||
    "Choose SKS INFI as your Financial Service Provider in India for financial planning, investments, insurance, taxation and wealth management guidance now today.",
  keywords: [
    "Financial Consultancy in India",
    "Financial Service Provider in India",
    "Financial Consultant in Jaipur",
    "SKS INFI About Us"
  ],
  alternates: {
    canonical: "https://www.sksinfi.com/about.php"
  },
  openGraph: {
    title: page?.ogTitle || page?.title || "Financial Consultancy in India | Trusted SKS INFI Experts",
    description:
      page?.ogDescription ||
      page?.metaDescription ||
      "Choose SKS INFI as your Financial Service Provider in India for financial planning, investments, insurance, taxation and wealth management guidance now today.",
    url: "https://www.sksinfi.com/about.php",
    siteName: "SKS INFI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: page?.ogImage || "https://www.sksinfi.com/images/aboutus.png",
        alt: "About SKS INFI Loan Consultant in Jaipur"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: page?.twitterTitle || page?.title || "Financial Consultancy in India | Trusted SKS INFI Experts",
    description:
      page?.twitterDescription ||
      page?.metaDescription ||
      "Choose SKS INFI as your Financial Service Provider in India for financial planning, investments, insurance, taxation and wealth management guidance now today.",
    images: [page?.twitterImage || "https://www.sksinfi.com/images/aboutus.png"]
  }
};

export default function AboutPage() {
  return <LegacyPageRenderer slug="about" initialData={page} />;
}
