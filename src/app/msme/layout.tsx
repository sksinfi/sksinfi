import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MSME Financial Solutions, Loans, Subsidies & IPO Listing | SKS INFI",
  description:
    "Empowering Indian MSMEs with 360° financial growth services: Working Capital & Financial Solutions, Central & Rajasthan Govt Subsidies, Collateral-Free Loans, Venture Capital, TReDS Setup, and BSE SME/NSE Emerge IPO Listing.",
  keywords: [
    "MSME Financial Solutions",
    "MSME Subsidy & Incentive Solutions",
    "MSME Loan & Financial Services",
    "Venture Capital & Private Equity MSME",
    "TReDS Setup Invoice Discounting",
    "MSME IPO Listing & Fundraising",
    "SME IPO Consultant Jaipur",
    "CGTMSE Collateral Free Loan",
    "RIPS 2024 Subsidy Consultant",
    "MSME Advisor Jaipur India",
    "SKS INFI MSME Services"
  ],
  alternates: {
    canonical: "https://www.sksinfi.com/msme"
  },
  openGraph: {
    title: "MSME Financial Solutions, Loans, Subsidies & IPO Listing | SKS INFI",
    description:
      "Comprehensive growth advisory for Micro, Small & Medium Enterprises: Financial Solutions, Government Subsidies, Business Loans, Venture Capital, TReDS Factoring, and SME IPO Listing.",
    url: "https://www.sksinfi.com/msme",
    siteName: "SKS INFI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.sksinfi.com/images/msme_business_loan_cover.jpg",
        width: 1200,
        height: 630,
        alt: "SKS INFI MSME Financial & Growth Advisory"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "MSME Financial Solutions, Loans, Subsidies & IPO Listing | SKS INFI",
    description:
      "Strategic financial advisory for Indian MSMEs: Loans, Subsidies, VC/PE, TReDS Invoice Discounting, and SME IPO listing by SKS INFI.",
    images: ["https://www.sksinfi.com/images/msme_business_loan_cover.jpg"]
  }
};

const msmeSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "SKS INFI - MSME Advisory & Financial Solutions",
  "url": "https://www.sksinfi.com/msme",
  "logo": "https://www.sksinfi.com/img/sksl.jpg",
  "image": "https://www.sksinfi.com/images/msme_business_loan_cover.jpg",
  "description":
    "Comprehensive financial, debt syndication, government subsidy, TReDS invoice discounting, venture capital, and SME IPO listing advisory for MSMEs across India.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "520, 5th Floor, Sunny Trade Center, New Aatish Market",
    "addressLocality": "Jaipur",
    "addressRegion": "Rajasthan",
    "postalCode": "302020",
    "addressCountry": "IN"
  },
  "telephone": "+91-9928529222",
  "areaServed": "India",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "MSME Advisory Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "MSME Financial Solutions",
          "description": "Working capital structuring, cash flow advisory, debt syndication, and balance sheet optimization."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "MSME Subsidy & Incentive Solutions",
          "description": "Central & Rajasthan state government capital investment subsidies, interest subvention, and fiscal exemptions."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "MSME Loan & Financial Services",
          "description": "Collateral-free CGTMSE loans up to ₹5-10 Cr, machinery loans, term debt, and working capital credit lines."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Venture Capital & Private Equity",
          "description": "Growth capital, angel syndicate matchmaking, venture debt, and institutional equity fundraising."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "TReDS Setup – Invoice Discounting",
          "description": "RBI-approved TReDS platform onboarding (RXIL, M1xchange, Invoicemart) for 24-48 hour collateral-free receivables discounting."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "MSME IPO Listing & Fundraising",
          "description": "End-to-end management for public listings on BSE SME and NSE Emerge capital market platforms."
        }
      }
    ]
  }
};

export default function MsmeLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(msmeSchema) }}
      />
      {children}
    </>
  );
}

