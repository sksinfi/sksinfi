"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import { MsmePageData, MSME_PAGES_DATA } from "@/data/msmePagesData";
import { submitLoanEnquiry } from "@/lib/supabase";
import {
  Landmark,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Mail,
  Award,
  Clock,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Loader2,
  Send,
  FileText,
  Briefcase,
  TrendingUp,
  Building2,
  Check,
  Sparkles,
  HelpCircle,
  BarChart3,
  Users2,
  Scale,
  Calculator,
  Layers,
  ArrowLeftRight,
  Percent,
  Coins,
  ShieldAlert,
  Sliders,
  DollarSign,
  AlertCircle
} from "lucide-react";

interface SingleMsmeClientProps {
  page: MsmePageData;
}

/* =========================================================================
   SPECIALIZED UNIQUE INTERACTIVE SECTIONS FOR EACH DEDICATED MSME PAGE
   ========================================================================= */

// 1. FINANCIAL SOLUTIONS: Interactive Working Capital & MPBF Calculator
function FinancialSolutionsInteractive() {
  const [turnover, setTurnover] = useState(10); // in Crores
  const [cycleDays, setCycleDays] = useState(75); // in Days

  const annualTurnoverRs = turnover * 10000000;
  const workingCapitalGap = Math.round((annualTurnoverRs * (cycleDays / 365)));
  const bankLimit = Math.round(workingCapitalGap * 0.75);
  const promoterMargin = Math.round(workingCapitalGap * 0.25);
  const unoptimizedInterest = Math.round(bankLimit * 0.125);
  const sksNegotiatedInterest = Math.round(bankLimit * 0.0875);
  const annualSavings = unoptimizedInterest - sksNegotiatedInterest;

  return (
    <div className="bg-[#f4f7f6] rounded-2xl p-6 sm:p-8 border border-[#d2dfdc] my-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#094b57] text-white flex items-center justify-center">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs font-bold text-[#b69455] uppercase tracking-wider block">
            Interactive Financial Tool
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#094b57] font-['Playfair_Display',serif]">
            Working Capital & MPBF Estimator
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-gray-700">Annual Business Turnover</label>
              <span className="text-base font-bold text-[#094b57]">₹{turnover} Crore</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={turnover}
              onChange={(e) => setTurnover(Number(e.target.value))}
              className="w-full accent-[#094b57] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-gray-500 mt-1">
              <span>₹1 Cr</span>
              <span>₹25 Cr</span>
              <span>₹50 Cr</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-gray-700">Operating Cash Cycle (Debtors + Inventory)</label>
              <span className="text-base font-bold text-[#b69455]">{cycleDays} Days</span>
            </div>
            <input
              type="range"
              min="30"
              max="150"
              step="5"
              value={cycleDays}
              onChange={(e) => setCycleDays(Number(e.target.value))}
              className="w-full accent-[#b69455] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-gray-500 mt-1">
              <span>30 Days (Fast)</span>
              <span>90 Days (Average)</span>
              <span>150 Days (Long)</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-gray-200 text-xs text-gray-600">
            💡 <strong>SKS INFI Debt Structuring Insight:</strong> Banks use Tandon / Nayak Committee guidelines to calculate Maximum Permissible Bank Finance (MPBF). By optimizing debtor turns and inventory holding, we help you access higher drawing power at prime commercial rates.
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-6 bg-gradient-to-br from-[#06333c] to-[#094b57] text-white p-6 sm:p-7 rounded-2xl shadow-lg">
          <span className="text-xs text-[#f4d799] font-bold uppercase tracking-wider block mb-4">
            Estimated Credit Facility Breakdown
          </span>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
              <span className="text-xs text-gray-300 block">Est. Bank CC/OD Limit</span>
              <span className="text-xl sm:text-2xl font-bold text-white font-['Playfair_Display',serif]">
                ₹{(bankLimit / 10000000).toFixed(2)} Cr
              </span>
            </div>
            <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
              <span className="text-xs text-gray-300 block">Promoter Margin (25%)</span>
              <span className="text-xl sm:text-2xl font-bold text-[#f4d799] font-['Playfair_Display',serif]">
                ₹{(promoterMargin / 10000000).toFixed(2)} Cr
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/15 border border-[#f4d799]/30">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs text-gray-200 block">Estimated Annual Interest Saved</span>
                <span className="text-xl sm:text-2xl font-bold text-[#f4d799]">
                  ₹{(annualSavings / 100000).toFixed(2)} Lakhs / year
                </span>
              </div>
              <span className="text-[11px] bg-[#b69455] text-white px-2.5 py-1 rounded-full font-bold">
                ROI ~8.75%
              </span>
            </div>
            <p className="text-[11px] text-gray-300 mt-2">
              Based on negotiating rates down from unoptimized 12.5% to prime 8.75% across our 40+ lending banking partners.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. REGISTRATION: MSME Classification & Samadhaan Delayed Payment Tool
function RegistrationInteractive() {
  const [invoiceAmount, setInvoiceAmount] = useState(1500000); // 15 Lakhs
  const [daysOverdue, setDaysOverdue] = useState(60);

  // MSMED Act: 3x RBI Bank Rate (~6.5% x 3 = 19.5% p.a. monthly compound)
  const annualRate = 0.195;
  const monthlyRate = annualRate / 12;
  const months = daysOverdue / 30;
  const totalAmountDue = Math.round(invoiceAmount * Math.pow(1 + monthlyRate, months));
  const compoundInterestOwed = totalAmountDue - invoiceAmount;

  return (
    <div className="my-10 space-y-8">
      {/* Classification Matrix */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-xs font-bold text-[#b69455] uppercase tracking-wider block mb-1">
            Statutory Framework
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#094b57] font-['Playfair_Display',serif]">
            Official Government MSME Classification Thresholds
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Composite criteria of Investment in Plant & Machinery and Annual Turnover (w.e.f. July 1, 2020).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-xl bg-[#f8faf9] border-2 border-[#094b57]/20 flex flex-col justify-between">
            <div>
              <span className="px-2.5 py-1 rounded-full bg-[#094b57]/10 text-[#094b57] text-xs font-bold uppercase inline-block mb-2">
                Micro Enterprise
              </span>
              <h4 className="text-lg font-bold text-[#094b57] mb-3">Plant & Machinery &lt; ₹1 Cr</h4>
              <ul className="text-xs text-gray-600 space-y-2">
                <li>• <strong>Investment:</strong> Does not exceed ₹1 Crore</li>
                <li>• <strong>Annual Turnover:</strong> Does not exceed ₹5 Crore</li>
                <li>• <strong>Key Privilege:</strong> Highest subsidy slabs in PMEGP and ZED</li>
              </ul>
            </div>
            <span className="mt-4 text-[11px] font-semibold text-[#094b57]">100% PSL Priority Bank Credit</span>
          </div>

          <div className="p-5 rounded-xl bg-[#faf9f6] border-2 border-[#b69455]/40 flex flex-col justify-between shadow-sm">
            <div>
              <span className="px-2.5 py-1 rounded-full bg-[#b69455]/20 text-[#8c6f37] text-xs font-bold uppercase inline-block mb-2">
                Small Enterprise
              </span>
              <h4 className="text-lg font-bold text-[#094b57] mb-3">Plant & Machinery &lt; ₹10 Cr</h4>
              <ul className="text-xs text-gray-600 space-y-2">
                <li>• <strong>Investment:</strong> Does not exceed ₹10 Crore</li>
                <li>• <strong>Annual Turnover:</strong> Does not exceed ₹50 Crore</li>
                <li>• <strong>Key Privilege:</strong> Full CGTMSE coverage up to ₹5–10 Crore</li>
              </ul>
            </div>
            <span className="mt-4 text-[11px] font-semibold text-[#b69455]">Tender EMD & Fee Waivers</span>
          </div>

          <div className="p-5 rounded-xl bg-[#f7f8fa] border-2 border-gray-300 flex flex-col justify-between">
            <div>
              <span className="px-2.5 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-bold uppercase inline-block mb-2">
                Medium Enterprise
              </span>
              <h4 className="text-lg font-bold text-[#094b57] mb-3">Plant & Machinery &lt; ₹50 Cr</h4>
              <ul className="text-xs text-gray-600 space-y-2">
                <li>• <strong>Investment:</strong> Does not exceed ₹50 Crore</li>
                <li>• <strong>Annual Turnover:</strong> Does not exceed ₹250 Crore</li>
                <li>• <strong>Key Privilege:</strong> Prime TReDS & BSE SME Listing Eligibility</li>
              </ul>
            </div>
            <span className="mt-4 text-[11px] font-semibold text-gray-600">RIPS 2024 Thrust Incentives</span>
          </div>
        </div>
      </div>

      {/* Delayed Payment Tool (MSME Samadhaan) */}
      <div className="bg-[#fdfaf5] p-6 sm:p-8 rounded-2xl border border-[#ecdcc3]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#b69455] text-white flex items-center justify-center">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#094b57] uppercase tracking-wider block">
              Legal Protection Calculator (MSMED Act Section 16)
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#094b57] font-['Playfair_Display',serif]">
              Delayed Payment Interest Estimator (MSME Samadhaan)
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Outstanding Invoice Amount (₹)
              </label>
              <input
                type="number"
                value={invoiceAmount}
                step="50000"
                onChange={(e) => setInvoiceAmount(Math.max(0, Number(e.target.value)))}
                className="w-full px-3.5 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#094b57] text-sm font-semibold"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-700">Days Delayed Beyond 45-Day Statutory Cap</label>
                <span className="text-sm font-bold text-[#b69455]">{daysOverdue} Days</span>
              </div>
              <input
                type="range"
                min="15"
                max="365"
                step="5"
                value={daysOverdue}
                onChange={(e) => setDaysOverdue(Number(e.target.value))}
                className="w-full accent-[#b69455] cursor-pointer"
              />
            </div>

            <p className="text-[11px] text-gray-500 leading-relaxed">
              ⚖️ Under the MSMED Act, defaulting buyers must pay compound interest with monthly rests at <strong>3 times the Bank Rate notified by the RBI</strong> (currently ~19.5% p.a.). SKS INFI files and defends claims before the MSME Facilitation Council.
            </p>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-xl border border-[#ecdcc3] shadow-sm">
            <span className="text-xs font-bold text-gray-500 uppercase block mb-1">Total Recoverable by Law</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#094b57] font-['Playfair_Display',serif] block mb-3">
              ₹{totalAmountDue.toLocaleString("en-IN")}
            </span>
            <div className="space-y-2 text-xs border-t pt-3">
              <div className="flex justify-between text-gray-600">
                <span>Principal Invoice Amount:</span>
                <span className="font-semibold text-gray-800">₹{invoiceAmount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Mandatory Compound Interest:</span>
                <span>+ ₹{compoundInterestOwed.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. SUBSIDY SCHEMES: Scheme Comparison & Sector Matrix
function SubsidySchemesInteractive() {
  const schemes = [
    {
      name: "RIPS 2024 (Rajasthan)",
      benefit: "Up to 40% Capital Subsidy",
      subvention: "5% to 8% Interest Subvention (7 yrs)",
      exemption: "100% Electricity, Mandi & Stamp Duty (7 yrs)",
      target: "Greenfield & Expansion in Rajasthan"
    },
    {
      name: "MLUPY (Mukhyamantri Scheme)",
      benefit: "Collateral-free loans up to ₹10 Crore",
      subvention: "8% on <₹25L, 6% on <₹5Cr, 5% on <₹10Cr",
      exemption: "Priority Bank Guarantee & DIC Support",
      target: "Micro & Small Units in Rajasthan"
    },
    {
      name: "PMEGP (Central Govt)",
      benefit: "Up to 35% Govt Margin Money Subsidy",
      subvention: "Bankable Term Debt at commercial ROI",
      exemption: "Zero Collateral on projects up to ₹50 Lakhs",
      target: "New Manufacturing & Service Ventures"
    },
    {
      name: "ZED Certification Grant",
      benefit: "Up to 80% Reimbursement of Audit Costs",
      subvention: "0.5% Concession on Bank Interest Rates",
      exemption: "Preference in Central Govt PSU Tenders",
      target: "Manufacturing MSMEs nationwide"
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm my-10">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <span className="text-xs font-bold text-[#b69455] uppercase tracking-wider block mb-1">
          Government Grants Matrix
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-[#094b57] font-['Playfair_Display',serif]">
          Flagship Sovereign Subsidy Schemes Comparison
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
          Direct non-dilutive capital grants and interest subventions actively managed by SKS INFI.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="bg-[#094b57] text-white">
              <th className="p-3.5 rounded-l-xl font-semibold">Government Scheme</th>
              <th className="p-3.5 font-semibold">Capital Grant / Subsidy</th>
              <th className="p-3.5 font-semibold">Interest Subvention</th>
              <th className="p-3.5 font-semibold">Statutory Exemptions</th>
              <th className="p-3.5 rounded-r-xl font-semibold">Ideal Target</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {schemes.map((s, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="p-3.5 font-bold text-[#094b57]">{s.name}</td>
                <td className="p-3.5 font-semibold text-emerald-700">{s.benefit}</td>
                <td className="p-3.5 text-gray-700">{s.subvention}</td>
                <td className="p-3.5 text-gray-600">{s.exemption}</td>
                <td className="p-3.5 text-xs text-gray-500">{s.target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 rounded-xl bg-[#f9f8f5] border border-[#ece4d6] flex items-center justify-between flex-wrap gap-4 text-xs">
        <span className="text-gray-700">
          🎯 <strong>Thrust Sectors under RIPS 2024:</strong> Agro-Processing, Textiles, Solar/Renewable, Pharmaceuticals, IT/Electronics, and Logistics receive top-tier subsidy allocations.
        </span>
        <a href="#consultation-form" className="text-[#094b57] font-bold hover:text-[#b69455] inline-flex items-center gap-1">
          <span>Check Your DPR Eligibility</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

// 4. IPO LISTING: BSE SME vs NSE Emerge & Valuation Multiplier
function IpoListingInteractive() {
  const [activeStep, setActiveStep] = useState(0);

  const ipoTimeline = [
    {
      month: "Month 01",
      title: "Diagnostic & Corporate Restructuring",
      desc: "Financial ratio audits, corporate conversion from Pvt Ltd to Public Ltd, bonus share issuance, and capital structuring."
    },
    {
      month: "Month 02",
      title: "Merchant Banker & Underwriter Appointment",
      desc: "Selection of SEBI-registered Lead Managers, Underwriters, Legal Counsels, and Market Makers at optimal syndication fees."
    },
    {
      month: "Month 03",
      title: "Due Diligence & DRHP Drafting",
      desc: "Rigorous statutory due diligence, drafting of Draft Red Herring Prospectus, and business model narrative perfection."
    },
    {
      month: "Month 04",
      title: "Stock Exchange Review & In-Principle Approval",
      desc: "Presentation before BSE SME / NSE Emerge listing committee, query resolution, and in-principle observation clearance."
    },
    {
      month: "Month 05",
      title: "Anchor Investor & HNI Roadshows",
      desc: "Investor roadshows across Mumbai, Delhi, Gujarat, and Rajasthan to secure Anchor placement and High Net-Worth Individual bids."
    },
    {
      month: "Month 06",
      title: "Public Bidding, Allotment & Bell-Ringing",
      desc: "Public issue window opens, oversubscription management, basis of allotment finalization, and trading floor bell-ringing!"
    }
  ];

  return (
    <div className="my-10 space-y-8">
      {/* 6-Month Roadmap Tabs */}
      <div className="bg-gradient-to-br from-[#06333c] to-[#094b57] text-white p-6 sm:p-8 rounded-2xl shadow-lg">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-[#f4d799] uppercase tracking-wider block mb-1">
            Capital Markets Roadmap
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-['Playfair_Display',serif]">
            The 6-Month Journey to Ringing the Opening Bell
          </h3>
        </div>

        {/* Step Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
          {ipoTimeline.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-3 rounded-xl text-left transition-all text-xs ${
                activeStep === idx
                  ? "bg-[#b69455] text-white shadow-md font-bold"
                  : "bg-white/10 hover:bg-white/15 text-gray-300"
              }`}
            >
              <span className="block text-[10px] uppercase tracking-wide opacity-80">{item.month}</span>
              <span className="line-clamp-1">{item.title}</span>
            </button>
          ))}
        </div>

        {/* Active Step Card */}
        <div className="bg-white/10 p-5 sm:p-6 rounded-xl border border-white/15 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#f4d799] text-[#094b57] font-bold">
              {ipoTimeline[activeStep].month}
            </span>
            <h4 className="text-lg font-bold text-white font-['Playfair_Display',serif]">
              {ipoTimeline[activeStep].title}
            </h4>
          </div>
          <p className="text-sm text-gray-200 leading-relaxed">
            {ipoTimeline[activeStep].desc}
          </p>
        </div>
      </div>

      {/* BSE SME vs NSE Emerge Matrix */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <h4 className="text-lg sm:text-xl font-bold text-[#094b57] font-['Playfair_Display',serif] mb-4 text-center">
          BSE SME vs NSE Emerge Comparison
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left">
            <thead>
              <tr className="bg-[#f9f8f5] text-[#094b57]">
                <th className="p-3 font-semibold border-b">Parameter</th>
                <th className="p-3 font-semibold border-b">BSE SME Platform</th>
                <th className="p-3 font-semibold border-b">NSE Emerge Platform</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-3 font-semibold text-gray-700">Post-Issue Paid Up Capital</td>
                <td className="p-3 text-gray-600">Up to ₹25 Crore</td>
                <td className="p-3 text-gray-600">Up to ₹25 Crore</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-gray-700">Track Record</td>
                <td className="p-3 text-gray-600">Minimum 2-3 years operational history</td>
                <td className="p-3 text-gray-600">Minimum 3 years operational history</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-gray-700">Profitability Norms</td>
                <td className="p-3 text-gray-600">Operating profit in at least 2 out of 3 years</td>
                <td className="p-3 text-gray-600">Positive operating profit in at least 2 years</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-gray-700">Underwriting Obligation</td>
                <td className="p-3 text-emerald-700 font-medium">100% Underwritten (15% by Lead Manager)</td>
                <td className="p-3 text-emerald-700 font-medium">100% Underwritten (15% by Lead Manager)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-gray-700">Main Board Migration</td>
                <td className="p-3 text-gray-600">After 2 yrs &amp; paid-up capital &gt; ₹10 Cr</td>
                <td className="p-3 text-gray-600">After 2 yrs &amp; market cap &gt; ₹25 Cr</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 5. INVOICE DISCOUNTING: TReDS 4-Step Diagram & Savings Calculator
function InvoiceDiscountingInteractive() {
  const [invoiceTotal, setInvoiceTotal] = useState(25); // Lakhs

  const totalRs = invoiceTotal * 100000;
  const bankOdCost = Math.round(totalRs * (0.13 / 12)); // 13% p.a.
  const tredsAuctionCost = Math.round(totalRs * (0.0825 / 12)); // 8.25% p.a.
  const monthlySavings = bankOdCost - tredsAuctionCost;
  const annualSavings = monthlySavings * 12;

  return (
    <div className="my-10 space-y-8">
      {/* 4-Step Visual Workflow */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-[#b69455] uppercase tracking-wider block mb-1">
            RBI Authorized Mechanism
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#094b57] font-['Playfair_Display',serif]">
            How TReDS Invoice Discounting Works
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#f4f7f6] border border-[#d2dfdc] flex flex-col justify-between">
            <div>
              <span className="w-7 h-7 rounded-full bg-[#094b57] text-white flex items-center justify-center text-xs font-bold mb-3">1</span>
              <h5 className="font-bold text-[#094b57] text-sm mb-1">Upload Invoice</h5>
              <p className="text-xs text-gray-600">MSME delivers goods/services and uploads GST invoice &amp; e-way bill to TReDS.</p>
            </div>
            <span className="text-[10px] text-gray-400 mt-3">RXIL / M1xchange / Invoicemart</span>
          </div>

          <div className="p-4 rounded-xl bg-[#faf9f6] border border-[#ecdcc3] flex flex-col justify-between">
            <div>
              <span className="w-7 h-7 rounded-full bg-[#b69455] text-white flex items-center justify-center text-xs font-bold mb-3">2</span>
              <h5 className="font-bold text-[#094b57] text-sm mb-1">Buyer Acceptance</h5>
              <p className="text-xs text-gray-600">Corporate or PSU client digitally verifies and accepts the factoring request online.</p>
            </div>
            <span className="text-[10px] text-gray-400 mt-3">Legally Binding Mandate</span>
          </div>

          <div className="p-4 rounded-xl bg-[#f4f7f6] border border-[#d2dfdc] flex flex-col justify-between">
            <div>
              <span className="w-7 h-7 rounded-full bg-[#094b57] text-white flex items-center justify-center text-xs font-bold mb-3">3</span>
              <h5 className="font-bold text-[#094b57] text-sm mb-1">Reverse Auction</h5>
              <p className="text-xs text-gray-600">35+ participating banks bid lowest discount rates. You select the best bid with 1-click.</p>
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold mt-3">Rates as low as 7.5% - 9%</span>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-[#094b57] to-[#06333c] text-white flex flex-col justify-between">
            <div>
              <span className="w-7 h-7 rounded-full bg-[#f4d799] text-[#094b57] flex items-center justify-center text-xs font-bold mb-3">4</span>
              <h5 className="font-bold text-white text-sm mb-1">24-Hr Escrow Credit</h5>
              <p className="text-xs text-gray-200">80% - 95% cash hits your account in 24 hours without recourse or property collateral!</p>
            </div>
            <span className="text-[10px] text-[#f4d799] font-bold mt-3">Zero Repayment Liability</span>
          </div>
        </div>
      </div>

      {/* Factoring Savings Calculator */}
      <div className="bg-[#f9f8f5] p-6 sm:p-8 rounded-2xl border border-[#ece4d6]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#b69455] text-white flex items-center justify-center">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#094b57] uppercase tracking-wider block">
              Cost Comparison
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#094b57] font-['Playfair_Display',serif]">
              TReDS Auction vs Conventional Bank Overdraft
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-gray-700">Monthly Trade Invoices Discounted</label>
              <span className="text-base font-bold text-[#094b57]">₹{invoiceTotal} Lakhs</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={invoiceTotal}
              onChange={(e) => setInvoiceTotal(Number(e.target.value))}
              className="w-full accent-[#094b57] cursor-pointer"
            />
            <p className="text-xs text-gray-500 mt-2">
              TReDS discount rates depend on the buyer's corporate credit rating rather than yours, slashing borrowing costs.
            </p>
          </div>

          <div className="md:col-span-6 grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <span className="text-xs text-gray-500 block">Bank CC/OD Cost (~13%)</span>
              <span className="text-lg font-bold text-gray-700">₹{bankOdCost.toLocaleString("en-IN")}/mo</span>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
              <span className="text-xs text-emerald-700 font-bold block">TReDS Auction (~8.25%)</span>
              <span className="text-lg font-bold text-emerald-800">₹{tredsAuctionCost.toLocaleString("en-IN")}/mo</span>
            </div>
            <div className="col-span-2 bg-[#094b57] text-white p-4 rounded-xl flex justify-between items-center">
              <div>
                <span className="text-xs text-gray-300 block">Annual Cash Saved</span>
                <span className="text-xl font-bold text-[#f4d799]">₹{annualSavings.toLocaleString("en-IN")} / year</span>
              </div>
              <span className="text-xs bg-[#b69455] text-white px-3 py-1 rounded-full font-semibold">
                Off-Balance Sheet
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 6. GROWTH SOLUTIONS: Credit Rating Impact Matrix
function GrowthSolutionsInteractive() {
  const ratings = [
    { rating: "A+", spread: "Base + 0.85%", indicativeROI: "8.35%", costOn10Cr: "₹83.5 Lakhs" },
    { rating: "A", spread: "Base + 1.25%", indicativeROI: "8.75%", costOn10Cr: "₹87.5 Lakhs" },
    { rating: "A-", spread: "Base + 1.65%", indicativeROI: "9.15%", costOn10Cr: "₹91.5 Lakhs" },
    { rating: "BBB+", spread: "Base + 2.25%", indicativeROI: "9.75%", costOn10Cr: "₹97.5 Lakhs" },
    { rating: "BBB", spread: "Base + 2.95%", indicativeROI: "10.45%", costOn10Cr: "₹104.5 Lakhs" },
    { rating: "BBB-", spread: "Base + 3.85%", indicativeROI: "11.35%", costOn10Cr: "₹113.5 Lakhs" }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm my-10">
      <div className="text-center max-w-2xl mx-auto mb-6">
        <span className="text-xs font-bold text-[#b69455] uppercase tracking-wider block mb-1">
          Rating Advisory Impact
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-[#094b57] font-['Playfair_Display',serif]">
          How Credit Rating Upgrades Slash Bank Borrowing Costs
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
          External ratings (CRISIL, ICRA, CARE) dictate the mandatory spread added to repo rate benchmarks.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm text-left">
          <thead>
            <tr className="bg-[#094b57] text-white">
              <th className="p-3 rounded-l-xl font-semibold">CRISIL / ICRA Rating</th>
              <th className="p-3 font-semibold">Bank Risk Spread</th>
              <th className="p-3 font-semibold">Indicative Interest Rate</th>
              <th className="p-3 rounded-r-xl font-semibold">Annual Interest on ₹10 Cr Line</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {ratings.map((r, idx) => (
              <tr key={idx} className={idx < 3 ? "bg-emerald-50/50 hover:bg-emerald-50" : "hover:bg-gray-50"}>
                <td className="p-3 font-bold text-[#094b57] flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${idx < 3 ? "bg-emerald-500" : "bg-amber-400"}`} />
                  <span>{r.rating}</span>
                </td>
                <td className="p-3 text-gray-700">{r.spread}</td>
                <td className="p-3 font-bold text-gray-800">{r.indicativeROI}</td>
                <td className="p-3 font-semibold text-[#094b57]">{r.costOn10Cr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-4 rounded-xl bg-[#faf8f5] border border-[#ede7dc] text-xs text-gray-600">
        🚀 <strong>SKS INFI Value Unlocked:</strong> Moving your enterprise rating from <strong>BBB- to A-</strong> slashes borrowing costs by ~2.2% annually, saving <strong>₹22 Lakhs to ₹55 Lakhs</strong> per year on a running ₹10–25 Cr credit line.
      </div>
    </div>
  );
}

// 7. VENTURE CAPITAL: Funding Ladder & Stages
function VentureCapitalInteractive() {
  const stages = [
    { stage: "Seed & Angel", check: "₹1 Cr - ₹5 Cr", arr: "₹1 Cr - ₹5 Cr ARR", dilution: "15% - 20%", focus: "Product-Market Fit & Initial Traction" },
    { stage: "Pre-Series A", check: "₹5 Cr - ₹15 Cr", arr: "₹5 Cr - ₹20 Cr ARR", dilution: "12% - 18%", focus: "Unit Economics & Customer Retention" },
    { stage: "Series A / Growth", check: "₹15 Cr - ₹40 Cr", arr: "₹20 Cr - ₹75 Cr ARR", dilution: "10% - 15%", focus: "Scale, Distribution & National Footprint" },
    { stage: "Venture Debt", check: "₹2 Cr - ₹15 Cr", arr: "High Growth Run-Rate", dilution: "1% - 3% Warrants", focus: "Runway Extension without Equity Dilution" }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm my-10">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-bold text-[#b69455] uppercase tracking-wider block mb-1">
          Institutional Growth Ladder
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-[#094b57] font-['Playfair_Display',serif]">
          VC &amp; Private Equity Fundraising Stages
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stages.map((s, idx) => (
          <div key={idx} className="p-5 rounded-xl bg-[#faf9f6] border border-[#ecdcc3] flex flex-col justify-between">
            <div>
              <span className="px-2.5 py-1 rounded-full bg-[#094b57]/10 text-[#094b57] text-xs font-bold uppercase inline-block mb-2">
                {s.stage}
              </span>
              <h4 className="text-xl font-bold text-[#094b57] mb-2">{s.check}</h4>
              <ul className="text-xs text-gray-600 space-y-1.5">
                <li>• <strong>Target ARR:</strong> {s.arr}</li>
                <li>• <strong>Dilution:</strong> {s.dilution}</li>
                <li>• <strong>Key Objective:</strong> {s.focus}</li>
              </ul>
            </div>
            <span className="mt-4 text-[11px] font-semibold text-[#b69455]">Pitch Deck Advisory Included</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 8. CGTMSE: Guarantee Coverage Tiers & Collateral vs Collateral-Free Matrix
function CgtmseInteractive() {
  return (
    <div className="my-10 space-y-8">
      {/* Tiers Matrix */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-xs font-bold text-[#b69455] uppercase tracking-wider block mb-1">
            Government Guarantee Coverage
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#094b57] font-['Playfair_Display',serif]">
            CGTMSE Scheme Guarantee Tiers &amp; Limits
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-[#f4f7f6] border border-[#d2dfdc]">
            <span className="text-xs font-bold text-[#094b57] uppercase block mb-1">Tier 01: Micro Units</span>
            <h4 className="text-lg font-bold text-[#094b57]">Up to ₹5 Lakhs</h4>
            <span className="text-2xl font-extrabold text-emerald-700 block my-2 font-['Playfair_Display',serif]">85%</span>
            <p className="text-xs text-gray-600">Guaranteed by the trust. Zero collateral or third-party guarantee permitted.</p>
          </div>

          <div className="p-5 rounded-xl bg-[#f4f7f6] border border-[#d2dfdc]">
            <span className="text-xs font-bold text-[#094b57] uppercase block mb-1">Tier 02: Small Units</span>
            <h4 className="text-lg font-bold text-[#094b57]">₹5 Lakhs – ₹50 Lakhs</h4>
            <span className="text-2xl font-extrabold text-emerald-700 block my-2 font-['Playfair_Display',serif]">75%</span>
            <p className="text-xs text-gray-600">Standard coverage for manufacturing and service MSMEs.</p>
          </div>

          <div className="p-5 rounded-xl bg-[#faf9f6] border-2 border-[#b69455]">
            <span className="text-xs font-bold text-[#b69455] uppercase block mb-1">Tier 03: Scaled MSMEs</span>
            <h4 className="text-lg font-bold text-[#094b57]">₹50 Lakhs – ₹5 Crore</h4>
            <span className="text-2xl font-extrabold text-[#b69455] block my-2 font-['Playfair_Display',serif]">75%</span>
            <p className="text-xs text-gray-600">High-ticket machinery and working capital facilities backed by sovereign trust.</p>
          </div>

          <div className="p-5 rounded-xl bg-gradient-to-br from-[#094b57] to-[#06333c] text-white">
            <span className="text-xs font-bold text-[#f4d799] uppercase block mb-1">Special Categories</span>
            <h4 className="text-lg font-bold text-white">Women / SC / ST / NER</h4>
            <span className="text-2xl font-extrabold text-[#f4d799] block my-2 font-['Playfair_Display',serif]">85%</span>
            <p className="text-xs text-gray-200">Expanded guarantee cover + concessional annual guarantee fee structure.</p>
          </div>
        </div>
      </div>

      {/* Comparison: Mortgage Loan vs CGTMSE */}
      <div className="bg-[#fdfaf5] p-6 sm:p-8 rounded-2xl border border-[#ecdcc3]">
        <h4 className="text-lg font-bold text-[#094b57] font-['Playfair_Display',serif] mb-4 text-center">
          Traditional Mortgage Loan vs CGTMSE Collateral-Free Loan
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="bg-white p-5 rounded-xl border border-red-200">
            <span className="text-red-700 font-bold uppercase text-xs block mb-2">❌ Traditional Bank Loan</span>
            <ul className="space-y-2 text-gray-600">
              <li>• Mandatory 100% to 150% property collateral (land, home, commercial building).</li>
              <li>• Risk of losing personal family assets in business distress.</li>
              <li>• Costly property search, legal valuation, and stamp duty mortgage charges.</li>
              <li>• Long 45-60 day processing timelines through multiple bank committees.</li>
            </ul>
          </div>

          <div className="bg-white p-5 rounded-xl border border-emerald-300 shadow-sm">
            <span className="text-emerald-700 font-bold uppercase text-xs block mb-2">✅ CGTMSE Loan with SKS INFI</span>
            <ul className="space-y-2 text-gray-700 font-medium">
              <li>• <strong>Zero immovable property collateral</strong> required up to ₹5–10 Crore.</li>
              <li>• Business cash flow &amp; asset hypothecation serve as primary security.</li>
              <li>• 100% protection of ancestral &amp; personal residential assets.</li>
              <li>• Fast-track 7 to 10-day approval through SKS INFI Zonal Hub empanelment.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// 9. WHY SKS INFI: Head-to-Head Comparison Table
function WhySksInfiInteractive() {
  const comparison = [
    { point: "Advisory Team", sks: "Chartered Accountants, Ex-Bankers & SEBI Advisors", dsa: "Commission-only Sales Agents", branch: "Clerical Branch Managers with targets" },
    { point: "Institutional Network", sks: "95+ Nationalized, Private Banks & AIFs", dsa: "2 to 3 personal DSA contacts", branch: "Only 1 single bank's fixed products" },
    { point: "Government Subsidies", sks: "Turnkey DPR & liaising for RIPS 2024 / PMEGP", dsa: "Zero knowledge of subsidy schemes", branch: "Unwilling to handle subsidy paperwork" },
    { point: "Collateral Optimization", sks: "CGTMSE & Hybrid structuring to minimize security", dsa: "Demands whatever collateral bank asks", branch: "Demands max possible 150% property pledge" },
    { point: "Turnaround Time", sks: "7 to 14 days via Zonal SME Hubs", dsa: "30 to 60 days of indefinite delays", branch: "Subject to transfer & local audit backlogs" },
    { point: "Pre-IPO & Growth Equity", sks: "BSE SME & NSE Emerge Merchant Banking", dsa: "Not available", branch: "Not available" }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm my-10">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-bold text-[#b69455] uppercase tracking-wider block mb-1">
          The SKS INFI Advantage
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-[#094b57] font-['Playfair_Display',serif]">
          SKS INFI vs Local DSAs vs Direct Bank Branches
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm text-left">
          <thead>
            <tr className="bg-[#094b57] text-white">
              <th className="p-3.5 rounded-l-xl font-semibold">Parameter</th>
              <th className="p-3.5 bg-[#b69455] text-white font-bold">SKS INFI Strategic Advisory</th>
              <th className="p-3.5 font-semibold text-gray-200">Local Loan Agent / DSA</th>
              <th className="p-3.5 rounded-r-xl font-semibold text-gray-200">Visiting Direct Bank Branch</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {comparison.map((c, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="p-3.5 font-bold text-[#094b57]">{c.point}</td>
                <td className="p-3.5 font-bold text-[#094b57] bg-[#f9f8f5]">{c.sks}</td>
                <td className="p-3.5 text-gray-500">{c.dsa}</td>
                <td className="p-3.5 text-gray-500">{c.branch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Router for rendering the appropriate interactive section
function SpecializedMsmeSection({ slug }: { slug: string }) {
  switch (slug) {
    case "financial-solutions":
      return <FinancialSolutionsInteractive />;
    case "registration":
      return <RegistrationInteractive />;
    case "subsidy-schemes":
    case "subsidy-solutions":
      return <SubsidySchemesInteractive />;
    case "ipo-listing":
    case "msme-ipo":
      return <IpoListingInteractive />;
    case "invoice-discounting":
    case "treds-setup":
      return <InvoiceDiscountingInteractive />;
    case "growth-solutions":
      return <GrowthSolutionsInteractive />;
    case "venture-capital":
      return <VentureCapitalInteractive />;
    case "cgtmse":
    case "cgtsme":
    case "loan-services":
      return <CgtmseInteractive />;
    case "why-sks-infi":
    case "sksinfin":
      return <WhySksInfiInteractive />;
    default:
      return null;
  }
}

/* =========================================================================
   MAIN CLIENT COMPONENT
   ========================================================================= */

export default function SingleMsmeClient({ page }: SingleMsmeClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState<string | undefined>(undefined);
  const [modalProduct, setModalProduct] = useState<string | undefined>(undefined);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    businessName: "",
    turnover: "₹1 Cr - ₹5 Cr",
    message: ""
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError("");

    if (!formData.name.trim() || !formData.phone.trim()) {
      setFormError("Please enter your name and contact phone number.");
      setFormSubmitting(false);
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setFormError("Please enter a valid 10-digit mobile number.");
      setFormSubmitting(false);
      return;
    }

    try {
      const res = await submitLoanEnquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        service_category: "MSME",
        product_name: page.navLabel,
        city: "Jaipur / India",
        message: `Turnover: ${formData.turnover}. Business: ${formData.businessName || "N/A"}. Note: ${formData.message || "Consultation Request"}`
      });

      if (res.success) {
        setFormSuccess(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          businessName: "",
          turnover: "₹1 Cr - ₹5 Cr",
          message: ""
        });
      } else {
        setFormError("Something went wrong. Please try calling us directly.");
      }
    } catch (err: any) {
      setFormError(err?.message || "Failed to submit enquiry. Please call us directly.");
    } finally {
      setFormSubmitting(false);
    }
  };

  const otherPages = Object.values(MSME_PAGES_DATA).filter((p) => p.slug !== page.slug);

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfdfb] text-[#2d3748]">
      <Navbar
        onOpenEnquiry={(category, product) => {
          setModalCategory(category || "MSME");
          setModalProduct(product || page.navLabel);
          setModalOpen(true);
        }}
      />

      {/* Breadcrumb Bar */}
      <div className="bg-[#f4f7f6] border-b border-[#e2e8f0] py-3 text-xs sm:text-sm">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-gray-500">
          <Link href="/" className="hover:text-[#094b57] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/msme" className="hover:text-[#094b57] transition-colors">
            MSME Solutions
          </Link>
          <span>/</span>
          <span className="text-[#094b57] font-semibold">{page.navLabel}</span>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#06333c] via-[#094b57] to-[#0d5967] text-white pt-12 pb-14">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#b69455_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#f4d799] text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4">
              <Sparkles className="w-4 h-4 text-[#b69455]" />
              {page.badge}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-['Playfair_Display',serif] leading-[1.2] mb-4 text-white">
              {page.title}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-200 font-light leading-relaxed mb-6 max-w-3xl">
              {page.subtitle}
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <a
                href="#consultation-form"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#b69455] hover:bg-[#a38346] text-white font-medium text-sm sm:text-base shadow-lg shadow-black/20 hover:shadow-xl transition-all"
              >
                <span>Request Advisory Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="tel:+919928529222"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-sm sm:text-base backdrop-blur-sm transition-all"
              >
                <PhoneCall className="w-4 h-4 text-[#f4d799]" />
                <span>+91 99285 29222</span>
              </a>
            </div>
          </div>

          {/* Hero Stats Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-white/15">
            {page.heroStats.map((stat, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-md rounded-xl p-4 sm:p-5 border border-white/10 flex flex-col justify-center"
              >
                <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#f4d799] font-['Playfair_Display',serif]">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-gray-300 font-medium mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OVERVIEW & STRATEGIC IMPORTANCE */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Narrative */}
            <div className="lg:col-span-7">
              <span className="text-[#b69455] text-xs sm:text-sm font-bold uppercase tracking-wider block mb-2">
                Strategic Executive Summary
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#094b57] font-['Playfair_Display',serif] leading-tight mb-6">
                {page.heroHeadline}
              </h2>

              <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed text-justify">
                {page.overview.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Callout quote box */}
              <div className="mt-8 p-5 sm:p-6 rounded-xl bg-[#f4f7f6] border-l-4 border-[#094b57] flex items-start gap-4">
                <ShieldCheck className="w-8 h-8 text-[#094b57] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[#094b57] font-bold text-sm sm:text-base">
                    SKS INFI Institutional Assurance
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    Every mandate is executed under strict client confidentiality, structured by Chartered Accountants &amp; Ex-Bankers, with end-to-end milestone management.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Key Benefits Cards */}
            <div className="lg:col-span-5 bg-[#faf8f5] p-6 sm:p-8 rounded-2xl border border-[#ede7dc]">
              <span className="text-[#094b57] text-xs font-bold uppercase tracking-wider block mb-2">
                Value Unlocked
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#094b57] font-['Playfair_Display',serif] mb-6">
                Measurable Enterprise Benefits
              </h3>

              <div className="space-y-4">
                {page.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <div className="w-7 h-7 rounded-full bg-[#094b57]/10 text-[#094b57] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-[#094b57]">{b.title}</h5>
                      <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-[#ede7dc] flex items-center justify-between text-xs text-gray-500">
                <span>Pan-India &amp; Rajasthan Reach</span>
                <span className="font-semibold text-[#094b57]">100% Milestone Tracking</span>
              </div>
            </div>
          </div>

          {/* DEDICATED UNIQUE INTERACTIVE SECTION (Custom for this slug) */}
          <SpecializedMsmeSection slug={page.slug} />
        </div>
      </section>

      {/* DETAILED OFFERINGS GRID */}
      <section className="py-16 sm:py-20 bg-[#f9f8f5] border-t border-b border-[#ece8df]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[#b69455] text-xs sm:text-sm font-bold uppercase tracking-wider block mb-2">
              Capabilities &amp; Offerings
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#094b57] font-['Playfair_Display',serif]">
              End-to-End Scope of Advisory
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-3">
              Institutional execution tailored to micro, small, and medium enterprises at every stage of their financial growth cycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {page.offerings.map((off, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200 hover:border-[#b69455] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {off.highlight ? (
                    <span className="inline-block px-3 py-1 rounded-full bg-[#094b57]/8 text-[#094b57] text-xs font-semibold tracking-wide mb-4">
                      {off.highlight}
                    </span>
                  ) : null}

                  <h3 className="text-lg sm:text-xl font-bold text-[#094b57] mb-3 group-hover:text-[#b69455] transition-colors">
                    {off.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {off.description}
                  </p>
                </div>

                <a
                  href="#consultation-form"
                  className="mt-6 pt-4 border-t border-gray-100 flex items-center text-xs font-semibold text-[#094b57] group-hover:text-[#b69455] transition-colors"
                >
                  <span>Enquire for this service</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ELIGIBILITY & DOCUMENTS */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Eligibility Card */}
            <div className="bg-[#f8faf9] p-7 sm:p-9 rounded-2xl border border-[#dce6e3]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#094b57] text-white flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#b69455] font-bold uppercase tracking-wider block">
                    Criteria
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#094b57] font-['Playfair_Display',serif]">
                    Who is Eligible?
                  </h3>
                </div>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-gray-700">
                {page.eligibility.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#094b57] flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Documents Required Card */}
            <div className="bg-[#faf9f6] p-7 sm:p-9 rounded-2xl border border-[#ece4d6]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#b69455] text-white flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#094b57] font-bold uppercase tracking-wider block">
                    Checklist
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#094b57] font-['Playfair_Display',serif]">
                    Required Documentation
                  </h3>
                </div>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-gray-700">
                {page.documentsRequired.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#b69455]/15 text-[#b69455] flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                      ✓
                    </div>
                    <span className="leading-relaxed">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* STEP-BY-STEP PROCESS ROADMAP */}
      <section className="py-16 sm:py-20 bg-[#094b57] text-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[#f4d799] text-xs sm:text-sm font-bold uppercase tracking-wider block mb-2">
              Execution Roadmap
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Playfair_Display',serif]">
              How We Execute Your Mandate
            </h2>
            <p className="text-sm sm:text-base text-gray-200 mt-3">
              A transparent, structured 5-stage advisory lifecycle from initial diagnostic to disbursement and ongoing support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {page.processSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-sm flex flex-col justify-between hover:bg-white/10 transition-colors"
              >
                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#f4d799] font-['Playfair_Display',serif] block mb-3">
                    {step.step}
                  </span>
                  <h4 className="text-base font-bold text-white mb-2 leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD CONSULTATION FORM SECTION */}
      <section id="consultation-form" className="py-16 sm:py-20 bg-[#f9f8f5]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            {/* Left side: Pitch */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#06333c] to-[#094b57] p-8 sm:p-10 text-white flex flex-col justify-between">
              <div>
                <span className="text-[#f4d799] text-xs font-bold uppercase tracking-wider block mb-2">
                  Direct Advisory Line
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-['Playfair_Display',serif] mb-4">
                  Schedule Your Strategic Consultation
                </h3>
                <p className="text-sm text-gray-200 leading-relaxed mb-6">
                  Share your enterprise requirements. A dedicated senior relationship manager will review your file and respond within 4 business hours.
                </p>

                <div className="space-y-4 pt-4 border-t border-white/15 text-xs sm:text-sm">
                  <div className="flex items-center gap-3">
                    <PhoneCall className="w-5 h-5 text-[#f4d799]" />
                    <span>+91 99285 29222 / 0141-4045222</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#f4d799]" />
                    <span>infi@sksinfi.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-[#f4d799]" />
                    <span>Sunny Trade Center, New Aatish Market, Jaipur</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/15">
                <span className="text-xs text-gray-300 block">
                  Associated with 95+ Leading Financial Institutions across India.
                </span>
              </div>
            </div>

            {/* Right side: Interactive Form */}
            <div className="lg:col-span-7 p-8 sm:p-10">
              {formSuccess ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-[#094b57] mb-2 font-['Playfair_Display',serif]">
                    Enquiry Received Successfully!
                  </h4>
                  <p className="text-sm text-gray-600 max-w-md mx-auto mb-6">
                    Thank you for connecting with SKS INFI. Our MSME advisory desk has logged your request and will reach out shortly.
                  </p>
                  <button
                    onClick={() => setFormSuccess(false)}
                    className="px-6 py-2.5 rounded-lg bg-[#094b57] text-white text-sm font-medium hover:bg-[#06333c] transition-colors"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <h4 className="text-xl font-bold text-[#094b57] font-['Playfair_Display',serif] mb-2">
                    Enquire for {page.navLabel}
                  </h4>

                  {formError ? (
                    <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs sm:text-sm border border-red-200">
                      {formError}
                    </div>
                  ) : null}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rajesh Sharma"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#094b57] text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 9829012345"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#094b57] text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rajesh@enterprise.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#094b57] text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Enterprise Name
                      </label>
                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="e.g. Apex Industries Pvt Ltd"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#094b57] text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Annual Turnover
                    </label>
                    <select
                      value={formData.turnover}
                      onChange={(e) => setFormData({ ...formData, turnover: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#094b57] text-sm bg-white"
                    >
                      <option value="Under ₹1 Cr">Under ₹1 Crore</option>
                      <option value="₹1 Cr - ₹5 Cr">₹1 Crore – ₹5 Crore</option>
                      <option value="₹5 Cr - ₹25 Cr">₹5 Crore – ₹25 Crore</option>
                      <option value="₹25 Cr - ₹100 Cr">₹25 Crore – ₹100 Crore</option>
                      <option value="Above ₹100 Cr">Above ₹100 Crore</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Brief Requirement or Questions
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your loan size, subsidy query, or business requirement..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#094b57] text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full py-3.5 rounded-lg bg-[#094b57] hover:bg-[#06333c] text-white font-medium text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-70"
                  >
                    {formSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Transmitting Advisory Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Advisory Request</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-gray-500 text-center mt-2">
                    🔒 Strict Confidentiality Guaranteed. Zero spam policy.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* TAILORED FAQS SECTION */}
      <section className="py-16 sm:py-20 bg-white border-t border-gray-200">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#b69455] text-xs sm:text-sm font-bold uppercase tracking-wider block mb-2">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#094b57] font-['Playfair_Display',serif]">
              {page.navLabel} FAQs
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Clear, transparent answers to help you make informed corporate financing decisions.
            </p>
          </div>

          <div className="space-y-4">
            {page.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-gray-200 overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left bg-white hover:bg-gray-50 flex items-center justify-between gap-4 transition-colors"
                  >
                    <span className="font-semibold text-sm sm:text-base text-[#094b57]">
                      {idx + 1}.) {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#b69455] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>

                  {isOpen ? (
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-gray-600 bg-white leading-relaxed border-t border-gray-100">
                      {faq.a}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CROSS-NAVIGATION TO OTHER MSME SERVICES */}
      <section className="py-16 sm:py-20 bg-[#faf8f5] border-t border-[#ede7dc]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[#b69455] text-xs sm:text-sm font-bold uppercase tracking-wider block mb-1">
                Explore More Solutions
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#094b57] font-['Playfair_Display',serif]">
                Other MSME Advisory Services
              </h2>
            </div>
            <Link
              href="/msme"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#094b57] hover:text-[#b69455] transition-colors"
            >
              <span>View All MSME Solutions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {otherPages.map((op, idx) => (
              <Link
                key={idx}
                href={`/msme/${op.slug}`}
                className="bg-white p-5 rounded-xl border border-gray-200 hover:border-[#b69455] hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-[#b69455] uppercase tracking-wider block mb-1">
                    {op.badge}
                  </span>
                  <h4 className="text-sm font-bold text-[#094b57] group-hover:text-[#b69455] transition-colors">
                    {op.navLabel}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {op.subtitle}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#094b57] group-hover:text-[#b69455]">
                  <span>Explore</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {modalOpen ? (
        <EnquiryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialCategory={modalCategory}
          initialProduct={modalProduct}
        />
      ) : null}
    </div>
  );
}
