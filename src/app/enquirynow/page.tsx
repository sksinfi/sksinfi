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

const page = pagesData["enquirynow"];

export const metadata: Metadata = {
  title: page?.title || "Contact SKS INFI | Financial Services & Enquiry Support",
  description:
    page?.metaDescription ||
    "Submit an online financial consultation or loan enquiry with SKS INFI in Jaipur for expert advice.",
  keywords: [
    "Contact SKS INFI",
    "Financial Services Enquiry Jaipur",
    "Loan Support Jaipur",
    "Enquiry Form SKS INFI"
  ],
  alternates: {
    canonical: "https://www.sksinfi.com/enquirynow.php"
  },
  openGraph: {
    title: page?.ogTitle || page?.title || "Contact SKS INFI | Financial Services & Enquiry Support",
    description:
      page?.ogDescription ||
      page?.metaDescription ||
      "Submit an online financial consultation or loan enquiry with SKS INFI in Jaipur for expert advice.",
    url: "https://www.sksinfi.com/enquirynow.php",
    siteName: "SKS INFI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: page?.ogImage || "https://www.sksinfi.com/img/aboutus.png",
        alt: "SKS INFI Enquiry"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: page?.twitterTitle || page?.title || "Contact SKS INFI | Financial Services & Enquiry Support",
    description:
      page?.twitterDescription ||
      page?.metaDescription ||
      "Submit an online financial consultation or loan enquiry with SKS INFI in Jaipur for expert advice.",
    images: [page?.twitterImage || "https://www.sksinfi.com/img/aboutus.png"]
  }
};

export default function EnquiryNowPage() {
  return <LegacyPageRenderer slug="enquirynow" initialData={page} />;
}
