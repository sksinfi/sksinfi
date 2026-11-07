"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { submitPartnerEnquiry } from "@/lib/supabase";
import {
  Handshake,
  DollarSign,
  Award,
  Users,
  CheckCircle2,
  Send,
  Loader2,
  ShieldCheck,
  TrendingUp
} from "lucide-react";

export default function PartnerPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("India");
  const [city, setCity] = useState("Jaipur");
  const [product, setProduct] = useState("All Loan Products");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !mobile.trim()) {
      setErrorMsg("Please fill in your name and mobile number.");
      return;
    }

    const cleanPhone = mobile.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      await submitPartnerEnquiry({
        name,
        email: email || "partner@sksinfi.com",
        mobile,
        country,
        city,
        product_interest: product,
        message: message || undefined
      });

      setSuccess(true);
      setName("");
      setEmail("");
      setMobile("");
      setMessage("");
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to register. Please call +91 99285 29222 directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfa] overflow-x-clip w-full" suppressHydrationWarning>
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-[#094b57] via-[#0d6170] to-[#094b57] text-white py-12 sm:py-14 px-4 sm:px-6 shadow-md">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#f9f0df] text-xs font-semibold tracking-wide border border-white/15">
            <Handshake size={14} className="text-[#b69455]" />
            <span>DSA & Channel Partner Program</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Partner With SKS INFI & Grow Your Business
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto font-light">
            Join Rajasthan’s largest financial distribution network. Refer home loans, business financing, mutual funds, and earn lucrative payouts with on-time payouts.
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-[1240px] mx-auto px-4 sm:px-6 py-10 sm:py-12 w-full space-y-12">
        {/* Value Proposition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#094b57]/10 text-[#094b57] flex items-center justify-center font-bold">
              <DollarSign size={24} />
            </div>
            <h3 className="text-lg font-black text-[#094b57]">Industry-Best Payouts</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Attractive tiered commission structures with timely settlements directly into your bank account on every loan disbursal.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#b69455]/15 text-[#b69455] flex items-center justify-center font-bold">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-lg font-black text-[#094b57]">50+ Bank Access</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Offer your clients loans from HDFC, SBI, ICICI, Axis, Kotak, and top NBFCs without maintaining individual bank empanelments.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#094b57]/10 text-[#094b57] flex items-center justify-center font-bold">
              <Award size={24} />
            </div>
            <h3 className="text-lg font-black text-[#094b57]">Full Operations Support</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Our central operations desk in Jaipur handles login, legal verification, valuations, and follow-ups so you can focus on building relationships.
            </p>
          </div>
        </div>

        {/* Form and Eligibility */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Who Can Partner */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <h3 className="text-xl font-black text-[#072238]">Who Can Partner With Us?</h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Chartered Accountants & Tax Advocates:</strong> Monetize client debt syndication and business loan requirements.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Real Estate Agents & Property Dealers:</strong> Fast home loan sanctions for property buyers with zero delay.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Financial Consultants & Insurance Agents:</strong> Cross-sell mutual funds, LAP, and corporate credit.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Freelance Connectors & Referral Partners:</strong> Simply refer potential borrowers and earn commission upon disbursal.
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 text-xs text-sky-800 leading-relaxed">
                📞 <strong>Direct Partner Desk:</strong> Call our Partner Relationship Manager at <strong>+91 99285 29222</strong> for instant onboarding.
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80">
              <h3 className="text-2xl font-black text-[#072238] mb-1">
                Channel Partner Registration
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-8">
                Submit your partner details. Your profile will be registered in our Supabase partner desk.
              </p>

              {success ? (
                <div className="p-8 text-center space-y-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-xl font-black text-emerald-900">
                    Partner Application Submitted!
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto">
                    Welcome to the SKS INFI Network! Our Partner Relationship Manager will contact you within 24 hours with your DSA code and payout schedule.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="bg-emerald-700 text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-emerald-800 transition"
                  >
                    Register Another Profile
                  </button>
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
                        Full Name / Firm Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alok Joshi"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Mobile Number (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="alok@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        City / Base Location
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Jaipur, Rajasthan"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Primary Products of Interest
                    </label>
                    <select
                      value={product}
                      onChange={(e) => setProduct(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm bg-white"
                    >
                      <option value="All Loan Products">All Loan Products (Home, LAP, Business, MSME)</option>
                      <option value="Home Loans & LAP Only">Home Loans & LAP Only</option>
                      <option value="Business & MSME Loans">Business & MSME Loans</option>
                      <option value="Mutual Funds & Investments">Mutual Funds & Wealth Products</option>
                      <option value="Jaipur Real Estate Referrals">Jaipur Real Estate Referrals</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Current Profession / Experience
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Chartered Accountant with 8 years practice / Property Consultant in Vaishali Nagar..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-[#094b57] to-[#0c5967] hover:from-[#0c5967] hover:to-[#094b57] text-white py-4 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Registering Profile...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Submit Channel Partner Application</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-center text-[11px] text-slate-400 pt-1">
                    Zero onboarding fees • Direct bank payout agreement
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
