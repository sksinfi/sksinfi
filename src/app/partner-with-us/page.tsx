import React from "react";
import type { Metadata } from "next";
import LegacyPageRenderer from "@/components/LegacyPageRenderer";
import pagesDataRaw from "@/data/pagesContent.json";

const pagesData = pagesDataRaw as Record<
  string,
  { slug: string; file: string; title: string; metaDescription: string; html: string; jsonLd?: string[] }
>;

export const metadata: Metadata = {
  title: "Partner With A SKS INFI | Financial Consultant in Jaipur",
  description:
    "Partner with SKS INFI to grow your financial advisory or distribution business in Jaipur and across India.",
};

export default function PartnerWithUsPage() {
  const page = pagesData["partner_with_us"];
  return <LegacyPageRenderer slug="partner_with_us" initialData={page} />;
}
