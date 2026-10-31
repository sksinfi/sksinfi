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
      setErrorMsg("Failed to submit inquiry. Please try again or call +91 99285 29222 directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
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
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm bg-white"
                  >
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
                    <option value="Home Loan">Home Loan</option>
                    <option value="Business Loan">Business / MSME Loan</option>
                    <option value="Loan Against Property">Loan Against Property (LAP)</option>
                    <option value="Personal Loan">Personal Loan</option>
                    <option value="Mutual Funds & SIP">Mutual Funds & SIP</option>
                    <option value="Govt & Corporate Bonds">Govt / Corporate Bonds</option>
                    <option value="Unlisted Pre-IPO Shares">Unlisted Pre-IPO Shares</option>
                    <option value="Term / Life Insurance">Term & Life Insurance</option>
                    <option value="Health Insurance">Health Insurance</option>
                    <option value="Jaipur Real Estate">Jaipur Real Estate / Plots</option>
                    <option value="Taxation & ITR">Taxation & ITR Filing</option>
                    <option value="NRI Advisory">NRI Financial Solutions</option>
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
