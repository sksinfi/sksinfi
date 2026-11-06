import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MSME_PAGES_DATA, getMsmePageBySlug } from "@/data/msmePagesData";
import SingleMsmeClient from "./SingleMsmeClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs: string[] = [];
  Object.values(MSME_PAGES_DATA).forEach((page) => {
    slugs.push(page.slug);
    if (page.aliases) {
      slugs.push(...page.aliases);
    }
  });
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getMsmePageBySlug(slug);

  if (!page) {
    return {
      title: "MSME Service | SKS INFI",
      description: "Premier MSME financial and growth advisory services by SKS INFI.",
    };
  }

  const canonicalUrl = `https://www.sksinfi.com/msme/${page.slug}`;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: canonicalUrl,
      siteName: "SKS INFI",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "https://www.sksinfi.com/images/msme_business_loan_cover.jpg",
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images: ["https://www.sksinfi.com/images/msme_business_loan_cover.jpg"],
    },
  };
}

export default async function MsmeSinglePage({ params }: PageProps) {
  const { slug } = await params;
  const page = getMsmePageBySlug(slug);

  if (!page) {
    notFound();
  }

  return <SingleMsmeClient page={page} />;
}

