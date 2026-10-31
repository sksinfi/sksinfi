import React from "react";
import type { Metadata } from "next";
import LegacyPageRenderer from "@/components/LegacyPageRenderer";
import pagesDataRaw from "@/data/pagesContent.json";

const pagesData = pagesDataRaw as Record<
  string,
  { slug: string; file: string; title: string; metaDescription: string; html: string; jsonLd?: string[] }
>;

export const metadata: Metadata = {
  title: "Financial Services in Jaipur | Financial Experts | SKS INFI",
  description:
    "Learn why SKS INFI is Jaipur's most trusted partner for loans, wealth planning, mutual funds, taxation, and NRI services.",
};

export default function SksinfinPage() {
  const page = pagesData["sksinfin"];
  return <LegacyPageRenderer slug="sksinfin" initialData={page} />;
}
