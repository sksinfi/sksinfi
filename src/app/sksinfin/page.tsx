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

const page = pagesData["sksinfin"];

export const metadata: Metadata = {
  title: page?.title || "Financial Services in Jaipur | Financial Experts | SKS INFI",
  description:
    page?.metaDescription ||
    "Learn why SKS INFI is Jaipur's most trusted partner for loans, wealth planning, mutual funds, taxation, and NRI services.",
  keywords: [
    "Financial Services in Jaipur",
    "Financial Advisory Services in India",
    "Financial Consultant in Jaipur",
    "SKS INFI Services"
  ],
  alternates: {
    canonical: "https://www.sksinfi.com/sksinfin.php"
  },
  openGraph: {
    title: page?.ogTitle || page?.title || "Financial Services in Jaipur | Financial Experts | SKS INFI",
    description:
      page?.ogDescription ||
      page?.metaDescription ||
      "Learn why SKS INFI is Jaipur's most trusted partner for loans, wealth planning, mutual funds, taxation, and NRI services.",
    url: "https://www.sksinfi.com/sksinfin.php",
    siteName: "SKS INFI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: page?.ogImage || "https://www.sksinfi.com/img/aboutus.png",
        alt: "Financial Services in Jaipur - SKS INFI"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: page?.twitterTitle || page?.title || "Financial Services in Jaipur | Financial Experts | SKS INFI",
    description:
      page?.twitterDescription ||
      page?.metaDescription ||
      "Learn why SKS INFI is Jaipur's most trusted partner for loans, wealth planning, mutual funds, taxation, and NRI services.",
    images: [page?.twitterImage || "https://www.sksinfi.com/img/aboutus.png"]
  }
};

export default function SksinfinPage() {
  return <LegacyPageRenderer slug="sksinfin" initialData={page} />;
}
