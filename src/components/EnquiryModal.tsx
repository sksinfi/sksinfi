"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, ShieldCheck, Sparkles, Send, Loader2 } from "lucide-react";
import { submitLoanEnquiry } from "@/lib/supabase";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
  initialProduct?: string;
}

const categoryProductsMap: Record<string, string[]> = {
  "Loans": [
    "Home Loan",
    "Loan Against Property (LAP)",
    "Business Loan",
    "Personal Loan",
    "Education Loan",
    "New Car Loan",
    "Used Car Loan",
    "Commercial Vehicle Loan",
    "Commercial Equipment Loan",
    "Machinery Loan",
    "Term Loan",
    "Cash Credit / Overdraft",
    "Project Finance",
    "CGTMSE Collateral-Free Loan",
    "Working Capital Loan"
  ],
  "MSME Advisory": [
    "MSME Subsidy & Incentive Schemes",
    "MSME Loan & Financial Solutions",
    "MSME IPO & Listing",
    "MSME Growth & Business Solutions",
    "MSME Set-up & Registration (UDYAM)",
    "Advisory on Venture Capital & Private Equity",
    "Invoice Discounting (TReDS Set-ups)",
    "CGTMSE Collateral-Free Funding",
    "Project Finance & Machinery Setup"
  ],
  "Investments": [
    "Mutual Funds & SIP",
    "Bonds & Debentures",
    "Non Convertible Debentures (NCDs)",
    "Govt. Securities (G-Sec)",
    "Unlisted & Pre-IPO Shares",
    "Fixed Deposit (Corporate & Bank)",
    "Equity & Demat",
    "Portfolio Management Services (PMS)",
    "Alternative Investment Funds (AIF)",
    "Sovereign Gold Bonds (SGB)"
  ],
  "Insurance": [
    "Health Insurance (Comprehensive)",
    "Term & Life Insurance",
    "General Insurance",
    "Factory Insurance",
    "Property & Fire Insurance",
    "Stock Insurance",
    "Workmen Compensation Insurance",
    "Travel Insurance",
    "Motor & Vehicle Insurance",
    "Marine & Transit Insurance",
    "Keyman & Corporate Insurance"
  ],
  "Real Estate": [
    "Residential (Plots, Villa & Flats)",
    "Commercial Offices & Retail Spaces",
    "Industrial Properties & Warehouses",
    "Farm Houses & Out Houses",
    "Approved Open Land & Plots",
    "RERA Advisory & Legal Title Verification"
  ],
  "Taxation": [
    "ITR Filing & Tax Audit",
    "GST Registration & Return Filing",
    "Firm & Company Set-up (LLP / Pvt Ltd)",
    "Statutory Compliances & ROC",
    "Insolvency Audit",
    "Insolvency Compliances",
    "Accounting & Bookkeeping Services",
    "Income Tax Appeals & Litigation"
  ],
  "NRI Services": [
    "NRI Home Loan in India",
    "NRI Real Estate & Property Advisory",
    "NRI Mutual Funds & Demat Investment",
    "NRE / NRO Account & Banking Advisory",
    "NRI Taxation & FEMA Compliances",
    "NRI Insurance Solutions"
  ]
};

export default function EnquiryModal({
  isOpen,
  onClose,
  initialCategory = "Loans",
  initialProduct = "Home Loan"
}: EnquiryModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Jaipur");
  const [category, setCategory] = useState(initialCategory);
  const [product, setProduct] = useState(initialProduct);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (initialCategory) setCategory(initialCategory);
    if (initialProduct) setProduct(initialProduct);
  }, [initialCategory, initialProduct]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMsg("Please enter your name and contact phone number.");
      return;
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setErrorMsg("Please enter a valid 10-digit contact phone number.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      await submitLoanEnquiry({
        name,
        phone,
        email: email || undefined,
        service_category: category,
        product_name: product,
        loan_amount: amount ? Number(amount.replace(/[^0-9]/g, "")) : undefined,
        city,
        message: message || undefined
      });

      const serviceDisplay = product ? `${category} - ${product}` : category;
      const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "d18ec79a-acd1-49fd-91aa-e1c3c0f73983";

      // 1. Direct Web3Forms submission from client browser for instant email delivery
      try {
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            access_key: web3Key,
            subject: `New Lead Enquiry: ${serviceDisplay} from ${name}`,
            from_name: "SKS INFI Fast-Track Desk",
            name,
            phone,
            email: email || "Not provided",
            service: serviceDisplay,
            location: city || "Jaipur, India",
            message: message ? `${message} | Amount: ₹${amount || "N/A"}` : `Loan Amount: ₹${amount || "N/A"}`
          })
        }).catch((w3Err) => console.warn("Web3Forms modal dispatch notice:", w3Err));
      } catch (wErr) {
        console.warn("Web3Forms modal error:", wErr);
      }

      // 2. Dispatch SMS notification to SKS INFI admin (+91 99285 93122)
      try {
        fetch("/api/send-sms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            phone,
            email,
            service: category,
            subService: product,
            city,
            message: amount ? `Amount: ₹${amount}. ${message}` : message
          })
        }).catch((err) => console.warn("SMS modal notification error:", err));
      } catch (smsErr) {
        console.warn("SMS dispatch notice:", smsErr);
      }

      // 3. Dispatch Server Email notification
      try {
        fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            phone,
            email,
            service: category,
            subService: product,
            city,
            message: amount ? `Amount: ₹${amount}. ${message}` : message
          })
        }).catch((err) => console.warn("Email modal notification error:", err));
      } catch (emailErr) {
        console.warn("Email dispatch notice:", emailErr);
      }

      setSuccess(true);
      setTimeout(() => {
        // Reset after short delay
        setName("");
        setPhone("");
        setEmail("");
        setMessage("");
      }, 500);
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to submit inquiry. Please try again or call +91 99285 93122 directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#052b32] via-[#094b57] to-[#0d5e6d] p-6 text-white flex justify-between items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#f9f0df] uppercase tracking-wider bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
              <Sparkles size={12} className="text-[#b69455]" />
              <span>SKS INFI Fast-Track Desk</span>
            </div>
            <h3 className="text-xl font-black text-white mt-1">
              Get Free Instant Eligibility & Quote
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {success ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
                <CheckCircle2 size={36} />
              </div>
              <h4 className="text-2xl font-black text-[#094b57]">
                Application Received Successfully!
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you, <strong>{name}</strong>. Our senior loan and investment advisor will contact you on <strong>{phone}</strong> within 30 minutes with tailored bank rates.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSuccess(false);
                    onClose();
                  }}
                  className="btn-gold px-6 py-2.5 rounded-full font-bold text-sm shadow hover:shadow-lg transition"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    City / Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Jaipur, Rajasthan"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => {
                      const newCat = e.target.value;
                      setCategory(newCat);
                      const prods = categoryProductsMap[newCat] || categoryProductsMap["Loans"];
                      setProduct(prods[0]);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm bg-white"
                  >
                    <option value="MSME Advisory">MSME & Corporate Growth</option>
                    <option value="Loans">Loans & Financing</option>
                    <option value="Investments">Investments & Wealth</option>
                    <option value="Insurance">Insurance & Protection</option>
                    <option value="Real Estate">Real Estate Advisory</option>
                    <option value="Taxation">Taxation & Legal</option>
                    <option value="NRI Services">NRI Financial Concierge</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Product / Loan Type
                  </label>
                  <select
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm bg-white"
                  >
                    {(categoryProductsMap[category] || categoryProductsMap["Loans"]).map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Expected Loan / Investment Amount (₹)
                </label>
                <input
                  type="text"
                  placeholder="e.g. ₹25,00,000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Any Specific Requirement or Query
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your property, requirement or urgency..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#094b57] via-[#0d6170] to-[#094b57] hover:from-[#06333b] hover:to-[#094b57] text-white py-3.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Submitting to Supabase...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Submit Application (Free & Instant)</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center pt-1">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>Your information is 100% confidential. No spam guaranteed.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
