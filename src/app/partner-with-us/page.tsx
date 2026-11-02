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

const page = pagesData["partner_with_us"];

export const metadata: Metadata = {
  title: page?.title || "Partner With A SKS INFI | Financial Consultant in Jaipur",
  description:
    page?.metaDescription ||
    "Partner with SKS INFI to grow your financial advisory or distribution business in Jaipur and across India.",
  keywords: [
    "Partner With SKS INFI",
    "Financial Consultant in Jaipur",
    "Loan Channel Partner Jaipur",
    "DSA Partner Rajasthan",
    "Financial Advisory Partner"
  ],
  alternates: {
    canonical: "https://www.sksinfi.com/partner-with-us.php"
  },
  openGraph: {
    title: page?.ogTitle || page?.title || "Partner With A SKS INFI | Financial Consultant in Jaipur",
    description:
      page?.ogDescription ||
      page?.metaDescription ||
      "Partner with SKS INFI to grow your financial advisory or distribution business in Jaipur and across India.",
    url: "https://www.sksinfi.com/partner-with-us.php",
    siteName: "SKS INFI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: page?.ogImage || "https://www.sksinfi.com/img/aboutus.png",
        alt: "Partner With SKS INFI"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: page?.twitterTitle || page?.title || "Partner With A SKS INFI | Financial Consultant in Jaipur",
    description:
      page?.twitterDescription ||
      page?.metaDescription ||
      "Partner with SKS INFI to grow your financial advisory or distribution business in Jaipur and across India.",
    images: [page?.twitterImage || "https://www.sksinfi.com/img/aboutus.png"]
  }
};

export default function PartnerWithUsPage() {
  return <LegacyPageRenderer slug="partner_with_us" initialData={page} />;
}
