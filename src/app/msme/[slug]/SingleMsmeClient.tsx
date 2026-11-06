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
  Users2
} from "lucide-react";

interface SingleMsmeClientProps {
  page: MsmePageData;
}

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
      <section className="relative overflow-hidden bg-gradient-to-b from-[#06333c] via-[#094b57] to-[#0d5967] text-white pt-14 pb-20">
        {/* Subtle decorative background grids */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#b69455_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#f4d799] text-xs sm:text-sm font-semibold tracking-wide uppercase mb-5">
              <Sparkles className="w-4 h-4 text-[#b69455]" />
              {page.badge}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-['Playfair_Display',serif] leading-[1.2] mb-5 text-white">
              {page.title}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-200 font-light leading-relaxed mb-8 max-w-3xl">
              {page.subtitle}
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#consultation-form"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#b69455] hover:bg-[#a38346] text-white font-medium text-sm sm:text-base shadow-lg shadow-black/20 hover:shadow-xl transition-all"
              >
                <span>Request Advisory Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="tel:+919928529222"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-sm sm:text-base backdrop-blur-sm transition-all"
              >
                <PhoneCall className="w-4 h-4 text-[#f4d799]" />
                <span>+91 99285 29222</span>
              </a>
            </div>
          </div>

          {/* Hero Stats Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-12 pt-8 border-t border-white/15">
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
                    Every mandate is executed under strict client confidentiality, structured by Chartered Accountants & Ex-Bankers, with end-to-end milestone management.
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
                <span>Pan-India & Rajasthan Reach</span>
                <span className="font-semibold text-[#094b57]">100% Milestone Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED OFFERINGS GRID */}
      <section className="py-16 sm:py-20 bg-[#f9f8f5] border-t border-b border-[#ece8df]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[#b69455] text-xs sm:text-sm font-bold uppercase tracking-wider block mb-2">
              Capabilities & Offerings
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

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-xs font-semibold text-[#094b57] group-hover:text-[#b69455] transition-colors">
                  <span>Enquire for this service</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
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
                    <span>info@sksinfi.com</span>
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
