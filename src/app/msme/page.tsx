"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import { submitLoanEnquiry } from "@/lib/supabase";
import {
  Landmark,
  BadgePercent,
  Coins,
  TrendingUp,
  Layers,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Mail,
  Award,
  Clock,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronUp,
  Loader2,
  Send
} from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  statPill: string;
  description: string;
  offerings: string[];
  eligibility: string;
  timeline: string;
  deliverables: string[];
}

const MSME_SERVICES: ServiceItem[] = [
  {
    id: "financial-solutions",
    title: "MSME Financial Solutions",
    subtitle: "Working Capital Optimization & Balance Sheet Advisory",
    badge: "Strategic Financial Advisory",
    icon: Landmark,
    statPill: "Optimized Cash Flow & Lower Borrowing Cost",
    description:
      "Comprehensive financial engineering designed to strengthen your enterprise's liquidity, balance sheet health, and credit rating. We restructure existing credit facilities, negotiate lower interest margins, and optimize Maximum Permissible Bank Finance (MPBF).",
    offerings: [
      "Working Capital & Cash Flow Assessment to eliminate liquidity bottlenecks",
      "Balance Sheet Health & Financial Ratio Structuring for bank credit committees",
      "Multi-Banking Consortium & Syndicated Debt Advisory across PSU and private banks",
      "Credit Rating Advisory (CRISIL, ICRA, CARE) to reduce overall borrowing spreads",
      "Debt Restructuring & Resolution of stressed credit lines for sustainable growth"
    ],
    eligibility: "Manufacturing, Trading, and Service MSMEs with annual turnover of ₹50 Lakhs to ₹250+ Crore.",
    timeline: "2 to 4 Weeks for Complete Diagnostic & Financial Structuring",
    deliverables: [
      "Detailed Financial Diagnostic Report",
      "Working Capital Assessment (CMA Data)",
      "Multi-Banking Negotiation Strategy",
      "Credit Spread Reduction Roadmap"
    ]
  },
  {
    id: "subsidy-solutions",
    title: "MSME Subsidy & Incentive Solutions",
    subtitle: "Central & State Government Grants & Fiscal Rebates",
    badge: "Government Grants & Incentives",
    icon: BadgePercent,
    statPill: "Up to 40% Capital Subsidy & Interest Rebate",
    description:
      "Maximize government grant disbursements and fiscal exemptions under Central and State industrial schemes—including Rajasthan Investment Promotion Scheme (RIPS 2024 / 2022), PMEGP, and CLCSS. We manage complete paperwork, DPR preparation, and nodal department liaising.",
    offerings: [
      "Capital Investment Subsidy (up to 25% to 40% grant on plant, machinery, and civil structures)",
      "Interest Subvention Schemes (5% to 8% interest subsidy on term loans for up to 5-7 years)",
      "100% Electricity Duty, Mandi Fee, and Land Conversion / Stamp Duty Exemptions",
      "Technology Upgradation, Quality Certification (ZED, ISO), and Patent Filing Grants",
      "Turnkey Detailed Project Report (DPR) preparation and nodal agency liaising through disbursement"
    ],
    eligibility: "New manufacturing/service units or existing enterprises undergoing expansion, diversification, or modernization in Rajasthan and pan-India.",
    timeline: "4 to 8 Weeks from DPR Submission to Scheme Sanction",
    deliverables: [
      "Scheme Eligibility & Subsidy Audit",
      "Bankable Detailed Project Report (DPR)",
      "Nodal Agency Application & Representation",
      "Disbursement Follow-Up till Credit"
    ]
  },
  {
    id: "loan-services",
    title: "MSME Loan & Financial Services",
    subtitle: "Collateral-Free CGTMSE Debt & Secured Credit Lines",
    badge: "Debt Financing & Credit Lines",
    icon: Coins,
    statPill: "Collateral-Free Up to ₹5–10 Crore",
    description:
      "Fast-track debt financing powered by relationships with 40+ PSU banks, leading private banks, and specialized MSME NBFCs. We facilitate collateral-free CGTMSE loans, machinery finance, and competitive Cash Credit/Overdraft limits tailored to your cash cycle.",
    offerings: [
      "Collateral-Free CGTMSE Business Loans from ₹25 Lakhs up to ₹5 Crore – ₹10 Crore",
      "Machinery & Industrial Equipment Purchase Loans with tenures extending up to 7–10 years",
      "Flexible Cash Credit (CC) & Overdraft (OD) limits against hypothecation of stock and debtors",
      "Industrial Plot, Factory Shed Construction, and Commercial Real Estate Mortgages",
      "Non-Fund Based Limits: Bank Guarantees (BG), Letters of Credit (LC), and Buyer's Credit"
    ],
    eligibility: "Enterprises with minimum 1-2 years of operational track record, positive net worth, and viable repayment cash flows.",
    timeline: "7 to 15 Working Days from Document Submission to Sanction",
    deliverables: [
      "Multi-Lender Comparative Offer Matrix",
      "CMA Preparation & Credit Appraisal Support",
      "Sanction Letter Issuance at Lowest ROI",
      "Post-Sanction Disbursement Handholding"
    ]
  },
  {
    id: "venture-capital",
    title: "Venture Capital & Private Equity",
    subtitle: "Growth Equity, Family Office Syndicates & Venture Debt",
    badge: "Equity & Institutional Funding",
    icon: TrendingUp,
    statPill: "Seed to Series B Institutional Capital",
    description:
      "Connect scaling MSMEs, technology-enabled manufacturers, and innovative consumer brands with institutional equity, angel networks, family offices, and venture debt providers. We manage valuation modeling, investor pitch decks, and term sheet negotiations.",
    offerings: [
      "Investor Readiness Diagnostic & Financial Valuation Modeling using DCF & Market Multiples",
      "Professional Pitch Deck, Executive Teaser, and Information Memorandum (IM) creation",
      "Direct Roadshows with Angel Networks, Family Offices, and Mid-Market Private Equity Funds",
      "Venture Debt & Mezzanine Financing for high-growth firms seeking low equity dilution",
      "Term Sheet structuring, Shareholder Agreements (SHA/SSA), and Due Diligence advisory"
    ],
    eligibility: "Fast-growing enterprises with demonstrated product-market fit, scalable unit economics, and minimum annual revenues of ₹3 Cr to ₹50+ Cr.",
    timeline: "8 to 16 Weeks for Complete Investor Matchmaking & Term Sheet Execution",
    deliverables: [
      "Comprehensive Investor Deck & Financial Model",
      "Curated Outreach to Active VC/PE Funds",
      "Term Sheet & Valuation Negotiation",
      "Due Diligence & Legal Closing Advisory"
    ]
  },
  {
    id: "treds-setup",
    title: "TReDS Setup – Invoice Discounting",
    subtitle: "RBI-Approved Receivables Discounting Without Collateral",
    badge: "Receivables Financing (RBI Authorized)",
    icon: Layers,
    statPill: "24–48 Hr Cash Flow Without Collateral",
    description:
      "Unlock trapped working capital by institutional discounting of trade receivables on RBI-authorized TReDS platforms (RXIL, M1xchange, Invoicemart). Convert supply invoices to large corporates, PSUs, and government departments into liquid cash within 24–48 hours without recourse.",
    offerings: [
      "Turnkey Onboarding on all three RBI-authorized exchanges: RXIL, M1xchange, and Invoicemart",
      "Digital buyer-supplier agreement setup and enterprise portal integration",
      "Collateral-Free, 'Without Recourse' invoice discounting with zero balance-sheet borrowing liability",
      "Competitive multi-bank reverse auction ensuring the absolute lowest factoring discount rates",
      "Ongoing operational desk support for continuous invoice uploading and auction monitoring"
    ],
    eligibility: "Registered MSMEs (Udyam registered) supplying goods or services to Corporates, PSUs, or Government Departments with credit terms.",
    timeline: "3 to 5 Working Days for Platform Onboarding & Account Activation",
    deliverables: [
      "TReDS Platform Registration & Verification",
      "Buyer Mapping & KYC Approval",
      "Live Auction Discounting Workflow",
      "Direct Escrow Bank Credit Integration"
    ]
  },
  {
    id: "msme-ipo",
    title: "MSME IPO Listing & Fundraising",
    subtitle: "Public Listing on BSE SME & NSE Emerge Platforms",
    badge: "Capital Markets & SME IPO",
    icon: Sparkles,
    statPill: "Listing on BSE SME & NSE Emerge",
    description:
      "Transform your privately held MSME into a publicly traded corporate leader. SKS INFI provides comprehensive advisory for BSE SME and NSE Emerge public listings—from merchant banker appointment and capital restructuring to prospectus drafting, roadshows, and bell-ringing.",
    offerings: [
      "Feasibility Study & Pre-IPO Diagnostic against BSE SME and NSE Emerge listing criteria",
      "Selection and coordination with SEBI-registered Merchant Bankers, Underwriters, and Legal Counsels",
      "Statutory Audit alignment, Corporate Governance enhancement, and Capital Restructuring",
      "Drafting and filing of Draft Red Herring Prospectus (DRHP) with stock exchanges",
      "Institutional roadshows, HNI syndicate pitching, Anchor Investor placement, and successful listing"
    ],
    eligibility: "Profitable MSMEs with post-issue paid-up capital up to ₹25 Crore, minimum 2-3 years of audited profitability, and strong growth trajectory.",
    timeline: "4 to 6 Months for Complete Pre-IPO Structuring & Listing",
    deliverables: [
      "SME IPO Readiness & Valuation Audit",
      "Merchant Banker & Underwriter Syndicate",
      "DRHP Drafting & Exchange Approvals",
      "Public Issue Execution & Ringing the Bell"
    ]
  }
];

const FAQS = [
  {
    q: "What is the maximum limit for Collateral-Free MSME Loans under CGTMSE?",
    a: "Under the Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE) scheme, eligible MSMEs can secure collateral-free credit facilities up to ₹5 Crore (and in select expanded schemes/categories up to ₹10 Crore) from partner PSU banks and private institutions. SKS INFI assists with project viability assessment and documentation to ensure high sanction rates."
  },
  {
    q: "How does the Rajasthan Investment Promotion Scheme (RIPS 2024) benefit MSMEs?",
    a: "RIPS 2024 provides extensive fiscal incentives for enterprises setting up new manufacturing/service units or expanding existing facilities in Rajasthan. Benefits include Capital Investment Subsidies of up to 25%–40%, Interest Subvention of 5%–8% for up to 5–7 years, 100% exemption on Electricity Duty, Mandi Fee, and Stamp Duty. SKS INFI handles end-to-end DPR preparation and department liaison."
  },
  {
    q: "How does TReDS Invoice Discounting help solve delayed payment challenges?",
    a: "Trade Receivables Discounting System (TReDS) is an RBI-regulated digital exchange where MSMEs can upload approved invoices raised against large corporates and PSUs. Multiple banks bid competitively in an auction to finance the invoice, enabling you to receive payment within 24–48 hours at low interest rates without pledging any collateral, and on a 'without recourse' basis."
  },
  {
    q: "What are the primary eligibility criteria for an SME IPO on BSE SME or NSE Emerge?",
    a: "To list on BSE SME or NSE Emerge, a company generally needs a post-issue paid-up equity capital of up to ₹25 Crore, positive net tangible assets, at least 2–3 years of operational track record with operating profit (EBITDA), and clean corporate governance. SKS INFI guides businesses through pre-IPO audit, merchant banker selection, and full SEBI compliance."
  },
  {
    q: "Can SKS INFI help us combine Government Subsidies with Bank Term Loans?",
    a: "Yes! SKS INFI specializes in integrated financial engineering. We structure your bank term loans and working capital facilities in direct coordination with government subsidy policies (such as RIPS, PMEGP, or Central Capital Subsidies). This ensures that your project report satisfies bank underwriting while maximizing government grant disbursements."
  },
  {
    q: "What documents are required to start the MSME consultation process?",
    a: "To initiate an evaluation, we typically review your Udyam Registration Certificate, last 3 years of audited financials (P&L and Balance Sheet), GST returns for the past 12 months, 6-12 months of bank statements, and details of existing credit facilities. For startups seeking VC/PE, we additionally examine the business deck and revenue projections."
  }
];

export default function MsmePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalService, setModalService] = useState("MSME Financial Solutions");
  const [selectedServiceTab, setSelectedServiceTab] = useState(MSME_SERVICES[0].id);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Quick form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [turnover, setTurnover] = useState("₹1 Cr - ₹5 Cr");
  const [serviceNeeded, setServiceNeeded] = useState("MSME Financial Solutions");
  const [city, setCity] = useState("Jaipur");
  const [message, setMessage] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  const handleOpenModal = (serviceName?: string) => {
    setModalService(serviceName || "MSME Financial Solutions");
    setModalOpen(true);
  };

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setFormError("Please enter your name and contact phone number.");
      return;
    }
    setFormLoading(true);
    setFormError("");

    try {
      await submitLoanEnquiry({
        name,
        phone,
        service_category: "MSME Advisory",
        product_name: serviceNeeded,
        city,
        message: `Company: ${companyName || "N/A"} | Turnover: ${turnover} | Details: ${message || "Interested in MSME consultation."}`
      });

      setFormSuccess(true);
      setName("");
      setPhone("");
      setCompanyName("");
      setMessage("");
    } catch (err: any) {
      console.error(err);
      setFormError("Submission failed. Please call +91 99285 29222 directly for immediate support.");
    } finally {
      setFormLoading(false);
    }
  };

  const currentTabService = MSME_SERVICES.find((s) => s.id === selectedServiceTab) || MSME_SERVICES[0];

  return (
    <div
      className="msme-page min-h-screen flex flex-col bg-[#fcfcfa] text-[#333333] overflow-x-hidden"
      style={{ overflowX: "hidden" }}
      suppressHydrationWarning
    >
      <Navbar onOpenEnquiry={(cat) => handleOpenModal(cat || "MSME Financial Solutions")} />

      <main className="flex-1 w-full overflow-x-hidden" style={{ overflowX: "hidden" }}>
        {/* ================= HERO SECTION ================= */}
        <section
          className="msme-dark-sec relative bg-gradient-to-br from-[#06323a] via-[#083d49] to-[#0a4f5e] text-white overflow-hidden"
          style={{
            paddingTop: "60px",
            paddingBottom: "60px",
            margin: 0,
            overflow: "hidden"
          }}
        >
          {/* Ambient Lighting Gradients */}
          <div className="absolute top-0 right-0 -mr-28 -mt-28 w-[460px] h-[460px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] rounded-full bg-[#b69455]/15 blur-3xl pointer-events-none" />

          <div
            style={{
              maxWidth: "1200px",
              width: "100%",
              margin: "0 auto",
              padding: "0 20px",
              position: "relative",
              zIndex: 10
            }}
          >
            {/* Breadcrumb */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12px",
                marginBottom: "14px"
              }}
            >
              <Link
                href="/"
                style={{ color: "rgba(255, 255, 255, 0.75)", textDecoration: "none" }}
                className="hover:text-white transition"
              >
                Home
              </Link>
              <span style={{ color: "rgba(255, 255, 255, 0.5)" }}>/</span>
              <span style={{ color: "#e9c787", fontWeight: 600 }}>MSME Solutions</span>
            </div>

            <div
              className="flex flex-col lg:flex-row items-center justify-between"
              style={{
                display: "flex",
                gap: "48px",
                alignItems: "center"
              }}
            >
              {/* Left Column: Headline & Action (~55% width) */}
              <div
                className="w-full lg:w-[55%]"
                style={{
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                {/* Small Badge */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "6px 14px",
                    borderRadius: "9999px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(182, 148, 85, 0.35)",
                    marginBottom: "14px",
                    width: "fit-content",
                    maxWidth: "100%"
                  }}
                >
                  <Sparkles size={14} className="text-[#e9c787] shrink-0" />
                  <span
                    style={{ color: "#e9c787", fontWeight: 600, letterSpacing: "0.02em" }}
                    className="text-[11px] sm:text-xs"
                  >
                    <span className="hidden sm:inline">360° MSME Capital & Growth Advisory • SKS INFI</span>
                    <span className="sm:hidden inline">360° MSME Capital & Growth Advisory</span>
                  </span>
                </div>

                <h1
                  style={{
                    color: "#ffffff",
                    textTransform: "none",
                    lineHeight: "1.26",
                    letterSpacing: "-0.015em",
                    margin: "0 0 16px 0",
                    fontWeight: 700
                  }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-serif break-words"
                >
                  Scale Your MSME with Strategic Capital, Subsidies & Public Listing
                </h1>

                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.9)",
                    lineHeight: "1.65",
                    fontSize: "15px",
                    fontWeight: 300,
                    margin: "0 0 22px 0"
                  }}
                >
                  From working capital and government subsidies to collateral-free credit lines, venture capital, and SME IPO listing on BSE SME & NSE Emerge. SKS INFI delivers turnkey financial advisory with 20+ years of proven expertise.
                </p>

                {/* Key Checklist Badges (20px vertical row gap) */}
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 text-sm text-slate-100"
                  style={{
                    display: "grid",
                    rowGap: "20px",
                    columnGap: "24px",
                    marginBottom: "26px"
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={18} className="text-[#e9c787] shrink-0" />
                    <span style={{ color: "rgba(255, 255, 255, 0.95)", fontSize: "14px", lineHeight: 1.4 }}>
                      Collateral-Free Loans up to ₹5–10 Cr
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={18} className="text-[#e9c787] shrink-0" />
                    <span style={{ color: "rgba(255, 255, 255, 0.95)", fontSize: "14px", lineHeight: 1.4 }}>
                      Up to 40% Govt Subsidy (RIPS 2024 / PMEGP)
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={18} className="text-[#e9c787] shrink-0" />
                    <span style={{ color: "rgba(255, 255, 255, 0.95)", fontSize: "14px", lineHeight: 1.4 }}>
                      RBI-Approved TReDS Invoice Liquidity
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={18} className="text-[#e9c787] shrink-0" />
                    <span style={{ color: "rgba(255, 255, 255, 0.95)", fontSize: "14px", lineHeight: 1.4 }}>
                      Turnkey BSE SME & NSE Emerge IPO Listing
                    </span>
                  </div>
                </div>

                {/* Hero Action Buttons (Primary & Secondary on same row with 18px gap) */}
                <div
                  className="flex flex-col sm:flex-row items-stretch sm:items-center"
                  style={{
                    display: "flex",
                    gap: "18px"
                  }}
                >
                  <button
                    onClick={() => handleOpenModal("MSME Financial Solutions")}
                    style={{
                      backgroundColor: "#b69455",
                      color: "#094b57",
                      border: "none",
                      cursor: "pointer",
                      height: "48px",
                      padding: "0 26px"
                    }}
                    className="w-full sm:w-auto rounded-full font-bold text-sm tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 shrink-0"
                  >
                    <span>Book Free MSME Consultation</span>
                    <ArrowRight size={16} />
                  </button>

                  <a
                    href="#services"
                    style={{
                      color: "#ffffff",
                      textDecoration: "none",
                      backgroundColor: "rgba(255, 255, 255, 0.12)",
                      border: "1px solid rgba(255, 255, 255, 0.25)",
                      height: "48px",
                      padding: "0 24px"
                    }}
                    className="w-full sm:w-auto rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:bg-white/20 shrink-0"
                  >
                    <span>Explore 6 Services</span>
                    <ChevronDown size={16} />
                  </a>
                </div>

                {/* Phone Contact Button placed below with 20px vertical spacing */}
                <div style={{ marginTop: "20px" }}>
                  <a
                    href="tel:+919928529222"
                    style={{
                      color: "#e9c787",
                      textDecoration: "none",
                      borderColor: "rgba(233, 199, 135, 0.4)",
                      height: "44px",
                      padding: "0 22px",
                      display: "inline-flex"
                    }}
                    className="rounded-full bg-white/5 hover:bg-white/10 font-semibold text-sm transition-all duration-300 items-center justify-center gap-2 border w-full sm:w-auto"
                  >
                    <PhoneCall size={15} />
                    <span>+91 99285 29222</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Hero Visual Card (~40% width) */}
              <div
                className="w-full lg:w-[40%]"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center"
                }}
              >
                <div
                  style={{
                    padding: "24px",
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                    borderRadius: "24px",
                    boxShadow: "0 20px 45px -12px rgba(0, 0, 0, 0.35)"
                  }}
                  className="relative backdrop-blur-md w-full"
                >
                  {/* Card Header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
                      paddingBottom: "16px",
                      marginBottom: "20px"
                    }}
                  >
                    <div>
                      <span
                        style={{
                          color: "#e9c787",
                          fontSize: "11px",
                          letterSpacing: "0.08em",
                          fontWeight: 700,
                          display: "block",
                          marginBottom: "4px"
                        }}
                        className="uppercase"
                      >
                        Institutional Reach
                      </span>
                      <h4
                        style={{
                          color: "#ffffff",
                          textTransform: "none",
                          fontSize: "20px",
                          fontWeight: 700,
                          margin: 0,
                          lineHeight: 1.3
                        }}
                      >
                        MSME Growth Engine
                      </h4>
                    </div>
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        backgroundColor: "rgba(182, 148, 85, 0.2)",
                        border: "1px solid rgba(182, 148, 85, 0.4)",
                        borderRadius: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#e9c787",
                        flexShrink: 0
                      }}
                    >
                      <Award size={22} />
                    </div>
                  </div>

                  {/* Information Rows with 12px gap & 14px vertical internal padding */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      marginBottom: "20px"
                    }}
                  >
                    {/* Row 01 */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "14px",
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        padding: "14px 16px",
                        borderRadius: "14px",
                        border: "1px solid rgba(255, 255, 255, 0.12)"
                      }}
                    >
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          backgroundColor: "rgba(182, 148, 85, 0.3)",
                          color: "#e9c787",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: "12px",
                          flexShrink: 0,
                          marginTop: "2px"
                        }}
                      >
                        01
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          style={{
                            color: "#ffffff",
                            margin: "0 0 4px 0",
                            fontWeight: 600,
                            fontSize: "14px",
                            lineHeight: 1.3
                          }}
                        >
                          40+ Financial Institutions
                        </p>
                        <p
                          style={{
                            color: "rgba(255, 255, 255, 0.78)",
                            margin: 0,
                            fontSize: "12px",
                            lineHeight: 1.45
                          }}
                        >
                          PSU Banks, Private Lenders, NBFCs, and Venture Debt Funds.
                        </p>
                      </div>
                    </div>

                    {/* Row 02 */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "14px",
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        padding: "14px 16px",
                        borderRadius: "14px",
                        border: "1px solid rgba(255, 255, 255, 0.12)"
                      }}
                    >
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          backgroundColor: "rgba(182, 148, 85, 0.3)",
                          color: "#e9c787",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: "12px",
                          flexShrink: 0,
                          marginTop: "2px"
                        }}
                      >
                        02
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          style={{
                            color: "#ffffff",
                            margin: "0 0 4px 0",
                            fontWeight: 600,
                            fontSize: "14px",
                            lineHeight: 1.3
                          }}
                        >
                          Dedicated Scheme Officers
                        </p>
                        <p
                          style={{
                            color: "rgba(255, 255, 255, 0.78)",
                            margin: 0,
                            fontSize: "12px",
                            lineHeight: 1.45
                          }}
                        >
                          Expert preparation of Detailed Project Reports (DPR) & Subsidy filing.
                        </p>
                      </div>
                    </div>

                    {/* Row 03 */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "14px",
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        padding: "14px 16px",
                        borderRadius: "14px",
                        border: "1px solid rgba(255, 255, 255, 0.12)"
                      }}
                    >
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          backgroundColor: "rgba(182, 148, 85, 0.3)",
                          color: "#e9c787",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: "12px",
                          flexShrink: 0,
                          marginTop: "2px"
                        }}
                      >
                        03
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          style={{
                            color: "#ffffff",
                            margin: "0 0 4px 0",
                            fontWeight: 600,
                            fontSize: "14px",
                            lineHeight: 1.3
                          }}
                        >
                          Pre-IPO to Bell Ringing
                        </p>
                        <p
                          style={{
                            color: "rgba(255, 255, 255, 0.78)",
                            margin: 0,
                            fontSize: "12px",
                            lineHeight: 1.45
                          }}
                        >
                          Merchant banker selection, exchange filing, and public subscription.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div
                    style={{
                      paddingTop: "14px",
                      borderTop: "1px solid rgba(255, 255, 255, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: "12px"
                    }}
                  >
                    <span style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "12px" }}>
                      Zero upfront consultation charge
                    </span>
                    <span style={{ color: "#e9c787", fontWeight: 600, fontSize: "12px" }}>
                      Jaipur & Pan-India
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= IMPACT METRICS BAR ================= */}
        <section
          style={{
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #e5e7eb",
            paddingTop: "32px",
            paddingBottom: "32px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)"
          }}
        >
          <div style={{ maxWidth: "1200px", width: "100%", margin: "0 auto", padding: "0 20px" }}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {/* Stat 1 */}
              <div className="flex flex-col items-center justify-center">
                <p
                  className="text-2xl sm:text-3xl font-extrabold text-[#094b57]"
                  style={{ margin: "0 0 6px 0", lineHeight: 1.2 }}
                >
                  ₹500+ Cr
                </p>
                <p
                  className="text-xs sm:text-sm text-gray-600 font-medium"
                  style={{ margin: 0, lineHeight: 1.3 }}
                >
                  Capital & Debt Syndicated
                </p>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center justify-center border-l border-gray-200">
                <p
                  className="text-2xl sm:text-3xl font-extrabold text-[#094b57]"
                  style={{ margin: "0 0 6px 0", lineHeight: 1.2 }}
                >
                  20+ Years
                </p>
                <p
                  className="text-xs sm:text-sm text-gray-600 font-medium"
                  style={{ margin: 0, lineHeight: 1.3 }}
                >
                  Financial & Banking Advisory
                </p>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-center justify-center border-l-0 lg:border-l border-gray-200">
                <p
                  className="text-2xl sm:text-3xl font-extrabold text-[#094b57]"
                  style={{ margin: "0 0 6px 0", lineHeight: 1.2 }}
                >
                  1,500+
                </p>
                <p
                  className="text-xs sm:text-sm text-gray-600 font-medium"
                  style={{ margin: 0, lineHeight: 1.3 }}
                >
                  MSMEs & Enterprises Advised
                </p>
              </div>

              {/* Stat 4 */}
              <div className="flex flex-col items-center justify-center border-l border-gray-200">
                <p
                  className="text-2xl sm:text-3xl font-extrabold text-[#094b57]"
                  style={{ margin: "0 0 6px 0", lineHeight: 1.2 }}
                >
                  98%
                </p>
                <p
                  className="text-xs sm:text-sm text-gray-600 font-medium"
                  style={{ margin: 0, lineHeight: 1.3 }}
                >
                  Subsidy & Sanction Success
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 1. 6 CORE MSME SERVICES ================= */}
        <section id="growth-solutions" style={{ padding: "80px 0" }} className="bg-[#f9f8f5]">
          <div style={{ maxWidth: "1200px", width: "100%", margin: "0 auto", padding: "0 20px" }}>
            {/* Section Header */}
            <div className="max-w-3xl mx-auto text-center" style={{ marginBottom: "36px" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  backgroundColor: "rgba(9, 75, 87, 0.1)",
                  color: "#094b57",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "14px"
                }}
              >
                Comprehensive Service Spectrum
              </span>
              <h2
                style={{
                  textTransform: "none",
                  color: "#094b57",
                  fontSize: "clamp(26px, 3vw, 36px)",
                  fontWeight: 700,
                  lineHeight: 1.25,
                  margin: "0 0 14px 0"
                }}
                className="font-serif"
              >
                Tailored Advisory for Every Stage of MSME Growth
              </h2>
              <p
                style={{
                  color: "#4b5563",
                  fontSize: "15px",
                  lineHeight: 1.6,
                  margin: 0
                }}
              >
                Whether you need immediate working capital, government grants, institutional factoring, equity investment, or public listing, our 6 core services provide end-to-end execution.
              </p>
            </div>

            {/* 6 Services Grid (3-column on desktop, 2-col tablet, 1-col mobile, 28px gap) */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              style={{
                display: "grid",
                gap: "28px"
              }}
            >
              {MSME_SERVICES.map((service, idx) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    id={service.id}
                    style={{
                      padding: "26px",
                      backgroundColor: "#ffffff",
                      borderRadius: "20px",
                      border: "1px solid rgba(229, 231, 235, 0.9)",
                      boxShadow: "0 4px 16px -4px rgba(9, 75, 87, 0.05), 0 2px 6px -2px rgba(0, 0, 0, 0.03)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                      transition: "all 0.25s ease"
                    }}
                    className="group hover:shadow-xl hover:-translate-y-1"
                  >
                    <div>
                      {/* Top Row: Icon + Number Badge */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "16px"
                        }}
                      >
                        <div
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "14px",
                            background: "linear-gradient(135deg, rgba(9, 75, 87, 0.08) 0%, rgba(182, 148, 85, 0.16) 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#094b57",
                            transition: "all 0.3s ease"
                          }}
                          className="group-hover:bg-[#094b57] group-hover:text-white"
                        >
                          <IconComponent size={22} />
                        </div>
                        <span
                          style={{
                            fontSize: "22px",
                            fontWeight: 900,
                            color: "rgba(182, 148, 85, 0.35)",
                            fontFamily: "monospace"
                          }}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Service Tag Badge */}
                      <div style={{ marginBottom: "10px" }}>
                        <span
                          style={{
                            display: "inline-block",
                            fontSize: "11px",
                            fontWeight: 700,
                            color: "#b69455",
                            backgroundColor: "rgba(182, 148, 85, 0.12)",
                            padding: "3px 10px",
                            borderRadius: "6px",
                            letterSpacing: "0.02em"
                          }}
                        >
                          {service.badge}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <h3
                        style={{
                          textTransform: "none",
                          color: "#094b57",
                          fontSize: "18px",
                          fontWeight: 700,
                          lineHeight: 1.3,
                          margin: "0 0 6px 0",
                          transition: "color 0.2s ease"
                        }}
                        className="group-hover:text-[#b69455]"
                      >
                        {service.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "#6b7280",
                          margin: "0 0 14px 0",
                          lineHeight: 1.4
                        }}
                      >
                        {service.subtitle}
                      </p>

                      {/* Description */}
                      <p
                        style={{
                          fontSize: "13.5px",
                          color: "#4b5563",
                          lineHeight: 1.55,
                          margin: "0 0 18px 0"
                        }}
                      >
                        {service.description}
                      </p>

                      {/* Offerings list */}
                      <div
                        style={{
                          paddingTop: "16px",
                          borderTop: "1px solid #f3f4f6",
                          display: "flex",
                          flexDirection: "column",
                          gap: "9px",
                          marginBottom: "20px"
                        }}
                      >
                        {service.offerings.slice(0, 3).map((item, oIdx) => (
                          <div
                            key={oIdx}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "8px",
                              fontSize: "12px",
                              color: "#374151",
                              lineHeight: 1.4
                            }}
                          >
                            <CheckCircle2 size={14} className="text-[#094b57] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom CTA Card Area - flex aligned to bottom */}
                    <div
                      style={{
                        marginTop: "auto",
                        paddingTop: "16px",
                        borderTop: "1px solid #f3f4f6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "8px"
                      }}
                    >
                      <Link
                        href={
                          service.id === "financial-solutions"
                            ? "/msme/financial-solutions"
                            : service.id === "subsidy-solutions"
                            ? "/msme/subsidy-schemes"
                            : service.id === "loan-services"
                            ? "/msme/cgtmse"
                            : service.id === "venture-capital"
                            ? "/msme/venture-capital"
                            : service.id === "treds-setup"
                            ? "/msme/invoice-discounting"
                            : service.id === "msme-ipo"
                            ? "/msme/ipo-listing"
                            : `/msme/${service.id}`
                        }
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#094b57",
                          textDecoration: "none"
                        }}
                        className="hover:text-[#b69455] transition-colors"
                      >
                        <span>Full Details</span>
                        <ArrowRight size={13} />
                      </Link>

                      <button
                        onClick={() => handleOpenModal(service.title)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#b69455",
                          padding: "4px 8px",
                          borderRadius: "6px",
                          transition: "all 0.2s ease"
                        }}
                        className="hover:text-[#094b57] hover:bg-[#094b57]/5"
                      >
                        <span>Enquire</span>
                        <ArrowUpRight size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= 2. INTERACTIVE SERVICE DEEP-DIVE TABS ================= */}
        <section id="registration" style={{ padding: "80px 0" }} className="bg-white">
          <div style={{ maxWidth: "1200px", width: "100%", margin: "0 auto", padding: "0 20px" }}>
            {/* Section Header */}
            <div className="max-w-3xl mx-auto text-center" style={{ marginBottom: "32px" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  backgroundColor: "rgba(182, 148, 85, 0.15)",
                  color: "#8c6f37",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "14px"
                }}
              >
                In-Depth Exploration
              </span>
              <h2
                style={{
                  textTransform: "none",
                  color: "#094b57",
                  fontSize: "clamp(26px, 3vw, 36px)",
                  fontWeight: 700,
                  lineHeight: 1.25,
                  margin: "0 0 14px 0"
                }}
                className="font-serif"
              >
                Service Deliverables & Eligibility Guide
              </h2>
              <p
                style={{
                  color: "#4b5563",
                  fontSize: "15px",
                  lineHeight: 1.6,
                  margin: 0
                }}
              >
                Click on any service below to examine specific deliverables, turnaround timelines, and eligibility criteria.
              </p>
            </div>

            {/* Container width ~960px for balanced layout */}
            <div style={{ maxWidth: "960px", width: "100%", margin: "0 auto" }}>
              {/* Balanced Tab Grid: 3 columns on desktop, 2 on mobile, equal height buttons */}
              <div
                className="grid grid-cols-2 md:grid-cols-3"
                style={{
                  display: "grid",
                  gap: "12px",
                  marginBottom: "24px"
                }}
              >
                {MSME_SERVICES.map((s) => {
                  const isSelected = selectedServiceTab === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedServiceTab(s.id)}
                      style={{
                        backgroundColor: isSelected ? "#094b57" : "#f3f4f6",
                        color: isSelected ? "#ffffff" : "#374151",
                        border: isSelected ? "1px solid #094b57" : "1px solid #e5e7eb",
                        cursor: "pointer",
                        padding: "12px 14px",
                        borderRadius: "12px",
                        fontSize: "12.5px",
                        fontWeight: isSelected ? 700 : 600,
                        textAlign: "center",
                        minHeight: "48px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: isSelected ? "0 4px 14px rgba(9, 75, 87, 0.2)" : "none",
                        transition: "all 0.2s ease"
                      }}
                      className={isSelected ? "" : "hover:bg-gray-200 hover:text-[#094b57]"}
                    >
                      {s.title}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content Card: 28px internal padding */}
              <div
                style={{
                  backgroundColor: "#fcfcfa",
                  borderRadius: "24px",
                  padding: "28px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 6px 20px -4px rgba(0, 0, 0, 0.04)"
                }}
              >
                {/* Header row in details panel */}
                <div
                  className="flex flex-col md:flex-row md:items-center justify-between"
                  style={{
                    display: "flex",
                    gap: "16px",
                    paddingBottom: "22px",
                    borderBottom: "1px solid #e5e7eb"
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "#b69455",
                        display: "block",
                        marginBottom: "4px"
                      }}
                    >
                      {currentTabService.badge}
                    </span>
                    <h3
                      style={{
                        textTransform: "none",
                        color: "#094b57",
                        fontSize: "22px",
                        fontWeight: 700,
                        margin: "0 0 4px 0",
                        lineHeight: 1.3
                      }}
                      className="font-serif"
                    >
                      {currentTabService.title}
                    </h3>
                    <p style={{ fontSize: "13px", color: "#4b5563", margin: 0, lineHeight: 1.4 }}>
                      {currentTabService.subtitle}
                    </p>
                  </div>

                  <button
                    onClick={() => handleOpenModal(currentTabService.title)}
                    style={{
                      backgroundColor: "#094b57",
                      color: "#ffffff",
                      border: "none",
                      cursor: "pointer",
                      height: "44px",
                      padding: "0 22px",
                      borderRadius: "9999px",
                      fontWeight: 700,
                      fontSize: "12px",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      flexShrink: 0,
                      transition: "all 0.2s ease"
                    }}
                    className="hover:bg-[#0c5e6d] shadow-sm hover:shadow"
                  >
                    <span>Apply For {currentTabService.title.split(" ")[0]}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                {/* Offerings Details */}
                <div style={{ paddingTop: "22px", paddingBottom: "22px" }}>
                  <h4
                    style={{
                      color: "#111827",
                      fontSize: "13px",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      margin: "0 0 14px 0"
                    }}
                  >
                    Key Scope of Work & Capabilities
                  </h4>
                  <div
                    className="grid grid-cols-1 md:grid-cols-2"
                    style={{
                      display: "grid",
                      gap: "12px"
                    }}
                  >
                    {currentTabService.offerings.map((offering, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "10px",
                          padding: "12px 14px",
                          borderRadius: "12px",
                          backgroundColor: "#ffffff",
                          border: "1px solid #f3f4f6",
                          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.02)"
                        }}
                      >
                        <Check size={16} className="text-[#094b57] shrink-0 mt-0.5" />
                        <span style={{ fontSize: "13px", color: "#374151", lineHeight: 1.45 }}>{offering}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Meta Information Cards (Target Eligibility, Expected Turnaround, Key Deliverables) */}
                <div
                  className="grid grid-cols-1 md:grid-cols-3"
                  style={{
                    display: "grid",
                    gap: "20px",
                    paddingTop: "22px",
                    borderTop: "1px solid #e5e7eb"
                  }}
                >
                  {/* Card 1 */}
                  <div
                    style={{
                      padding: "18px",
                      borderRadius: "14px",
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%"
                    }}
                  >
                    <p
                      style={{
                        fontWeight: 700,
                        color: "#111827",
                        textTransform: "uppercase",
                        fontSize: "11px",
                        letterSpacing: "0.05em",
                        margin: "0 0 8px 0"
                      }}
                    >
                      Target Eligibility
                    </p>
                    <p style={{ color: "#4b5563", fontSize: "12.5px", lineHeight: 1.55, margin: 0 }}>
                      {currentTabService.eligibility}
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div
                    style={{
                      padding: "18px",
                      borderRadius: "14px",
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%"
                    }}
                  >
                    <p
                      style={{
                        fontWeight: 700,
                        color: "#111827",
                        textTransform: "uppercase",
                        fontSize: "11px",
                        letterSpacing: "0.05em",
                        margin: "0 0 8px 0"
                      }}
                    >
                      Expected Turnaround
                    </p>
                    <p style={{ color: "#4b5563", fontSize: "12.5px", lineHeight: 1.55, margin: 0 }}>
                      {currentTabService.timeline}
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div
                    style={{
                      padding: "18px",
                      borderRadius: "14px",
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%"
                    }}
                  >
                    <p
                      style={{
                        fontWeight: 700,
                        color: "#111827",
                        textTransform: "uppercase",
                        fontSize: "11px",
                        letterSpacing: "0.05em",
                        margin: "0 0 8px 0"
                      }}
                    >
                      Key Deliverables
                    </p>
                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: "16px",
                        fontSize: "12.5px",
                        color: "#4b5563",
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px"
                      }}
                    >
                      {currentTabService.deliverables.map((d, dIdx) => (
                        <li key={dIdx} style={{ lineHeight: 1.45 }}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3. THE 4-STEP EXECUTION ROADMAP ================= */}
        <section
          id="why-sks-infi"
          style={{ padding: "80px 0" }}
          className="msme-dark-sec bg-[#094b57] text-white relative overflow-hidden"
        >
          <div style={{ maxWidth: "1200px", width: "100%", margin: "0 auto", padding: "0 20px", position: "relative", zIndex: 10 }}>
            {/* Section Header */}
            <div className="max-w-3xl mx-auto text-center" style={{ marginBottom: "36px" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "#e9c787",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  marginBottom: "14px"
                }}
              >
                Streamlined Execution
              </span>
              <h2
                style={{
                  color: "#ffffff",
                  textTransform: "none",
                  fontSize: "clamp(26px, 3vw, 36px)",
                  fontWeight: 700,
                  lineHeight: 1.25,
                  margin: "0 0 14px 0"
                }}
                className="font-serif"
              >
                How SKS INFI Delivers Results
              </h2>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: "15px",
                  fontWeight: 300,
                  lineHeight: 1.6,
                  margin: 0
                }}
              >
                Our proven 4-stage process ensures zero paperwork delays, high approval rates, and continuous financial guidance.
              </p>
            </div>

            {/* 4 Cards in 1 Row on desktop (lg:grid-cols-4), 2 on tablet, 1 on mobile, 22px gap, 24px padding */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              style={{
                display: "grid",
                gap: "22px"
              }}
            >
              {/* Step 1 */}
              <div
                style={{
                  padding: "24px",
                  borderRadius: "18px",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.16)",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  backdropFilter: "blur(6px)"
                }}
              >
                <span
                  style={{
                    fontSize: "28px",
                    fontWeight: 900,
                    color: "#e9c787",
                    marginBottom: "14px",
                    fontFamily: "monospace"
                  }}
                >
                  01
                </span>
                <h4
                  style={{
                    color: "#ffffff",
                    textTransform: "none",
                    margin: "0 0 10px 0",
                    fontSize: "17px",
                    fontWeight: 700,
                    lineHeight: 1.3
                  }}
                >
                  Diagnostic & Audit
                </h4>
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.82)",
                    margin: 0,
                    fontSize: "12.5px",
                    lineHeight: 1.55
                  }}
                >
                  We analyze your business financials, GST returns, and expansion goals to map exact capital needs and subsidy qualifications.
                </p>
              </div>

              {/* Step 2 */}
              <div
                style={{
                  padding: "24px",
                  borderRadius: "18px",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.16)",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  backdropFilter: "blur(6px)"
                }}
              >
                <span
                  style={{
                    fontSize: "28px",
                    fontWeight: 900,
                    color: "#e9c787",
                    marginBottom: "14px",
                    fontFamily: "monospace"
                  }}
                >
                  02
                </span>
                <h4
                  style={{
                    color: "#ffffff",
                    textTransform: "none",
                    margin: "0 0 10px 0",
                    fontSize: "17px",
                    fontWeight: 700,
                    lineHeight: 1.3
                  }}
                >
                  Scheme & Lender Matching
                </h4>
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.82)",
                    margin: 0,
                    fontSize: "12.5px",
                    lineHeight: 1.55
                  }}
                >
                  We match your enterprise with appropriate schemes (CGTMSE, RIPS, TReDS, or VC) and select best-fit institutional partners.
                </p>
              </div>

              {/* Step 3 */}
              <div
                style={{
                  padding: "24px",
                  borderRadius: "18px",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.16)",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  backdropFilter: "blur(6px)"
                }}
              >
                <span
                  style={{
                    fontSize: "28px",
                    fontWeight: 900,
                    color: "#e9c787",
                    marginBottom: "14px",
                    fontFamily: "monospace"
                  }}
                >
                  03
                </span>
                <h4
                  style={{
                    color: "#ffffff",
                    textTransform: "none",
                    margin: "0 0 10px 0",
                    fontSize: "17px",
                    fontWeight: 700,
                    lineHeight: 1.3
                  }}
                >
                  Turnkey Documentation
                </h4>
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.82)",
                    margin: 0,
                    fontSize: "12.5px",
                    lineHeight: 1.55
                  }}
                >
                  Our financial analysts draft comprehensive Detailed Project Reports (DPR), CMA projections, or Pitch Decks meeting strict compliance.
                </p>
              </div>

              {/* Step 4 */}
              <div
                style={{
                  padding: "24px",
                  borderRadius: "18px",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.16)",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  backdropFilter: "blur(6px)"
                }}
              >
                <span
                  style={{
                    fontSize: "28px",
                    fontWeight: 900,
                    color: "#e9c787",
                    marginBottom: "14px",
                    fontFamily: "monospace"
                  }}
                >
                  04
                </span>
                <h4
                  style={{
                    color: "#ffffff",
                    textTransform: "none",
                    margin: "0 0 10px 0",
                    fontSize: "17px",
                    fontWeight: 700,
                    lineHeight: 1.3
                  }}
                >
                  Sanction & Disbursement
                </h4>
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.82)",
                    margin: 0,
                    fontSize: "12.5px",
                    lineHeight: 1.55
                  }}
                >
                  We follow through credit committee approvals, documentation signing, escrow setup, and final bank fund release to your account.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 4. QUICK CONSULTATION INLINE FORM ================= */}
        <section style={{ padding: "80px 0" }} className="bg-white">
          <div style={{ maxWidth: "1200px", width: "100%", margin: "0 auto", padding: "0 20px" }}>
            <div
              style={{
                maxWidth: "960px",
                width: "100%",
                margin: "0 auto",
                backgroundColor: "#f9f8f5",
                borderRadius: "24px",
                padding: "36px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)"
              }}
            >
              <div className="text-center max-w-2xl mx-auto" style={{ marginBottom: "28px" }}>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#b69455",
                    marginBottom: "10px"
                  }}
                >
                  Fast-Track Eligibility
                </span>
                <h3
                  style={{
                    textTransform: "none",
                    color: "#094b57",
                    fontSize: "clamp(24px, 2.5vw, 30px)",
                    fontWeight: 700,
                    margin: "0 0 10px 0",
                    lineHeight: 1.3
                  }}
                  className="font-serif"
                >
                  Request an MSME Advisory Assessment
                </h3>
                <p style={{ color: "#4b5563", fontSize: "14px", lineHeight: 1.55, margin: 0 }}>
                  Fill in your basic enterprise details below. Our senior MSME consultant will evaluate your options and contact you within 24 hours.
                </p>
              </div>

              {formSuccess ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 size={42} className="text-emerald-600 mx-auto" />
                  <h4 className="text-xl font-bold text-emerald-900">Enquiry Received Successfully!</h4>
                  <p className="text-sm text-emerald-700 max-w-md mx-auto">
                    Thank you. Our senior financial advisor will review your MSME requirements and connect with you shortly.
                  </p>
                  <button
                    onClick={() => setFormSuccess(false)}
                    className="mt-4 px-6 py-2 rounded-full bg-emerald-600 text-white font-semibold text-xs tracking-wider uppercase hover:bg-emerald-700 transition"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuickSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  {formError && (
                    <div className="p-3.5 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs font-medium">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rajesh Sharma"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#094b57]/20 focus:border-[#094b57] bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 99285 29222"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#094b57]/20 focus:border-[#094b57] bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        Enterprise / Company Name
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Sharma Precision Works Pvt Ltd"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#094b57]/20 focus:border-[#094b57] bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        Annual Turnover Bracket
                      </label>
                      <select
                        value={turnover}
                        onChange={(e) => setTurnover(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#094b57]/20 focus:border-[#094b57] bg-white"
                      >
                        <option value="Below ₹1 Cr">Below ₹1 Crore</option>
                        <option value="₹1 Cr - ₹5 Cr">₹1 Crore - ₹5 Crore</option>
                        <option value="₹5 Cr - ₹25 Cr">₹5 Crore - ₹25 Crore</option>
                        <option value="₹25 Cr - ₹100 Cr">₹25 Crore - ₹100 Crore</option>
                        <option value="Above ₹100 Cr">Above ₹100 Crore</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        Primary Service Needed *
                      </label>
                      <select
                        value={serviceNeeded}
                        onChange={(e) => setServiceNeeded(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#094b57]/20 focus:border-[#094b57] bg-white font-medium"
                      >
                        {MSME_SERVICES.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        City / Location
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Jaipur, Rajasthan"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#094b57]/20 focus:border-[#094b57] bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                      Brief Business / Funding Requirement
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Mention your target loan amount, expansion plan, subsidy interest, or specific questions..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#094b57]/20 focus:border-[#094b57] bg-white"
                    />
                  </div>

                  <div className="pt-2 text-center">
                    <button
                      type="submit"
                      disabled={formLoading}
                      style={{
                        backgroundColor: "#094b57",
                        color: "#ffffff",
                        border: "none",
                        cursor: "pointer"
                      }}
                      className="w-full sm:w-auto min-w-[260px] h-12 px-8 rounded-full hover:bg-[#0c5e6d] font-bold text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 mx-auto disabled:opacity-60"
                    >
                      {formLoading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Submit MSME Assessment Request</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-gray-500 mt-2.5">
                      Your business information is kept 100% confidential under strict professional privacy standards.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ================= 5. FREQUENTLY ASKED QUESTIONS ================= */}
        <section style={{ padding: "80px 0" }} className="bg-[#f9f8f5] border-t border-gray-200">
          <div style={{ maxWidth: "1200px", width: "100%", margin: "0 auto", padding: "0 20px" }}>
            {/* Section Header */}
            <div className="max-w-3xl mx-auto text-center" style={{ marginBottom: "28px" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  backgroundColor: "rgba(9, 75, 87, 0.1)",
                  color: "#094b57",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "14px"
                }}
              >
                Clear Answers
              </span>
              <h2
                style={{
                  textTransform: "none",
                  color: "#094b57",
                  fontSize: "clamp(26px, 3vw, 36px)",
                  fontWeight: 700,
                  lineHeight: 1.25,
                  margin: "0 0 14px 0"
                }}
                className="font-serif"
              >
                MSME Advisory FAQs
              </h2>
              <p
                style={{
                  color: "#4b5563",
                  fontSize: "15px",
                  lineHeight: 1.6,
                  margin: 0
                }}
              >
                Everything you need to know about loan limits, state subsidies, TReDS invoice discounting, and SME IPO eligibility.
              </p>
            </div>

            {/* Centered FAQ items with max-width ~850px */}
            <div
              style={{
                maxWidth: "850px",
                width: "100%",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                gap: "14px"
              }}
            >
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "16px",
                      border: "1px solid #e5e7eb",
                      overflow: "hidden",
                      boxShadow: "0 1px 4px rgba(0, 0, 0, 0.03)",
                      transition: "box-shadow 0.2s ease"
                    }}
                    className="hover:shadow-md"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      style={{
                        width: "100%",
                        padding: "18px 20px",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "16px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#094b57",
                        fontWeight: 700,
                        fontSize: "15px",
                        lineHeight: 1.35
                      }}
                      className="hover:text-[#b69455] transition-colors"
                    >
                      <span style={{ flex: 1 }}>{faq.q}</span>
                      <span
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.2s ease",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0
                        }}
                      >
                        <ChevronDown
                          size={18}
                          className={isOpen ? "text-[#b69455]" : "text-gray-400"}
                        />
                      </span>
                    </button>

                    {isOpen && (
                      <div
                        style={{
                          padding: "0 20px 20px 20px",
                          fontSize: "13.5px",
                          color: "#4b5563",
                          lineHeight: 1.65,
                          borderTop: "1px solid #f3f4f6",
                          paddingTop: "14px"
                        }}
                      >
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= 6. DIRECT CONTACT & HOTLINE BANNER ================= */}
        <section
          style={{ padding: "72px 0" }}
          className="msme-dark-sec bg-gradient-to-r from-[#094b57] via-[#0b5462] to-[#094b57] text-white"
        >
          <div style={{ maxWidth: "1200px", width: "100%", margin: "0 auto", padding: "0 20px" }}>
            <div className="max-w-4xl mx-auto text-center">
              <span
                style={{
                  display: "inline-block",
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "#e9c787",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  marginBottom: "14px"
                }}
              >
                Direct Consulting Hotline
              </span>
              <h2
                style={{
                  color: "#ffffff",
                  textTransform: "none",
                  fontSize: "clamp(26px, 3.2vw, 36px)",
                  fontWeight: 700,
                  lineHeight: 1.3,
                  margin: "0 0 14px 0"
                }}
                className="font-serif"
              >
                Ready to Discuss Your MSME Financing or Subsidy?
              </h2>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: "15px",
                  fontWeight: 300,
                  lineHeight: 1.6,
                  maxWidth: "600px",
                  margin: "0 auto 26px auto"
                }}
              >
                Connect directly with our senior financial consultants in Jaipur. Doorstep advisory and pan-India coverage available.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "16px"
                }}
              >
                <a
                  href="tel:+919928529222"
                  style={{
                    backgroundColor: "#b69455",
                    color: "#094b57",
                    textDecoration: "none",
                    height: "48px",
                    padding: "0 28px",
                    borderRadius: "9999px",
                    fontWeight: 700,
                    fontSize: "14px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
                    transition: "all 0.2s ease"
                  }}
                  className="hover:bg-[#c5a365] hover:-translate-y-0.5"
                >
                  <PhoneCall size={16} />
                  <span>Call +91 99285 29222</span>
                </a>
                <a
                  href="mailto:infi@sksinfi.com"
                  style={{
                    color: "#ffffff",
                    textDecoration: "none",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                    height: "48px",
                    padding: "0 28px",
                    borderRadius: "9999px",
                    fontWeight: 600,
                    fontSize: "14px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.2s ease"
                  }}
                  className="hover:bg-white/20"
                >
                  <Mail size={16} />
                  <span>infi@sksinfi.com</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Dynamic Enquiry Modal */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialCategory="MSME Advisory"
        initialProduct={modalService}
      />
    </div>
  );
}
