import React from "react";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import LegacyPageRenderer from "@/components/LegacyPageRenderer";
import pagesDataRaw from "@/data/pagesContent.json";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const pagesData = pagesDataRaw as Record<
  string,
  { slug: string; file: string; title: string; metaDescription: string; html: string; jsonLd?: string[] }
>;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cleanSlug = slug.replace(/\.php$/, "");
  const page = pagesData[cleanSlug];

  if (!page) {
    return {
      title: "SKS INFI | Financial Consultant in Jaipur",
    };
  }

  return {
    title: page.title || "SKS INFI | Financial Consultant in Jaipur",
    description:
      page.metaDescription ||
      "SKS INFI provides expert financial planning, investment, loan, and insurance services in Jaipur.",
  };
}

export default async function DynamicLegacyPage({ params }: PageProps) {
  const { slug } = await params;
  const cleanSlug = slug.replace(/\.php$/, "");

  if (cleanSlug === "blog" || cleanSlug === "blogs") {
    redirect("/blogs");
  }

  const page = pagesData[cleanSlug];

  if (!page) {
    notFound();
  }

  return <LegacyPageRenderer slug={cleanSlug} initialData={page} />;
}
