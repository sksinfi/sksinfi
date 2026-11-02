import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIP Calculator & Loan EMI Calculator | SKS INFI Financial Tools",
  description:
    "Calculate your mutual fund SIP wealth compounding and home loan or business loan monthly EMIs with SKS INFI free online financial calculators.",
  keywords: [
    "SIP Calculator",
    "Loan EMI Calculator",
    "Mutual Fund Calculator",
    "Home Loan EMI Calculator Jaipur",
    "SKS INFI Calculator"
  ],
  alternates: {
    canonical: "https://www.sksinfi.com/calculator"
  },
  openGraph: {
    title: "SIP Calculator & Loan EMI Calculator | SKS INFI Financial Tools",
    description:
      "Calculate your mutual fund SIP wealth compounding and home loan or business loan monthly EMIs with SKS INFI free online financial calculators.",
    url: "https://www.sksinfi.com/calculator",
    siteName: "SKS INFI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.sksinfi.com/img/aboutus.png",
        alt: "SKS INFI Financial Calculators"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "SIP Calculator & Loan EMI Calculator | SKS INFI Financial Tools",
    description:
      "Calculate your mutual fund SIP wealth compounding and home loan or business loan monthly EMIs with SKS INFI free online financial calculators.",
    images: ["https://www.sksinfi.com/img/aboutus.png"]
  }
};

export default function CalculatorLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
