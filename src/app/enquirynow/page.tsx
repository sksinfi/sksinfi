import React from "react";
import type { Metadata } from "next";
import LegacyPageRenderer from "@/components/LegacyPageRenderer";
import pagesDataRaw from "@/data/pagesContent.json";

const pagesData = pagesDataRaw as Record<
  string,
  { slug: string; file: string; title: string; metaDescription: string; html: string; jsonLd?: string[] }
>;

export const metadata: Metadata = {
  title: "Contact SKS INFI | Financial Services & Enquiry Support",
  description:
    "Submit an online financial consultation or loan enquiry with SKS INFI in Jaipur.",
};

export default function EnquiryNowPage() {
  const page = pagesData["enquirynow"];
  return <LegacyPageRenderer slug="enquirynow" initialData={page} />;
}
