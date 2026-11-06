"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  Briefcase,
  Upload,
  CheckCircle2,
  Send,
  Loader2,
  Users,
  Award,
  Sparkles,
  MapPin
} from "lucide-react";

export default function CareersPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("Jaipur");
  const [position, setPosition] = useState("Loan Relationship Manager");
  const [vertical, setVertical] = useState("Retail & MSME Lending");
  const [appInfo, setAppInfo] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !mobile.trim()) {
      setErrorMsg("Please provide your name and mobile number.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      if (isSupabaseConfigured() && supabase) {
        const { error } = await supabase.from("career_applications").insert([
          {
            name,
            email: email || "candidate@sksinfi.com",
            mobile,
            location,
            position,
            vertical,
            app_info: appInfo,
            resume_url: resumeFileName ? `uploads/${resumeFileName}` : null
          }
        ]);
        if (error) throw error;
      } else {
        console.info("Saved local career application:", { name, mobile, position, resumeFileName });
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setMobile("");
      setAppInfo("");
      setResumeFileName("");
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to submit application. Please email your CV directly to info@sksinfi.com.");
    } finally {
      setLoading(false);
    }
  };

  const openPositions = [
    {
      title: "Senior Loan Relationship Manager",
      department: "Retail Credit",
      type: "Full-Time",
      location: "Jaipur, Rajasthan",
      experience: "2-5 Years",
      desc: "Drive home loan and mortgage origination, assess client financials, and manage bank sanction pipelines."
    },
    {
      title: "Wealth & Mutual Fund Advisor",
      department: "Investment Desk",
      type: "Full-Time",
      location: "Jaipur, Rajasthan",
      experience: "1-4 Years",
      desc: "Advise retail and HNI clients on SIP allocation, debt bonds, and portfolio rebalancing."
    },
    {
      title: "Corporate Credit Underwriter",
      department: "Risk & Operations",
      type: "Full-Time",
      location: "Jaipur, Rajasthan",
      experience: "3+ Years",
      desc: "Evaluate balance sheets, GST returns, and project reports for high-ticket MSME credit."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfa] overflow-x-hidden w-full" suppressHydrationWarning>
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-[#094b57] via-[#0d6170] to-[#094b57] text-white py-16 px-4 sm:px-6 shadow-md">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#f9f0df] text-xs font-semibold tracking-wide border border-white/15">
            <Briefcase size={14} className="text-[#b69455]" />
            <span>Join Our Growing Team</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Build Your Career with SKS INFI
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto font-light">
            Work with Rajasthan’s top financial minds in credit underwriting, wealth compounding, and real estate advisory.
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-[1240px] mx-auto px-4 sm:px-6 py-16 w-full space-y-16">
        {/* Open Positions Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b69455]">
              Current Openings
            </span>
            <h2 className="text-3xl font-black text-[#094b57]">
              Exciting Roles in Jaipur
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {openPositions.map((job) => (
              <div
                key={job.title}
                className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="px-2.5 py-1 rounded-full bg-sky-50 text-sky-700">
                      {job.department}
                    </span>
                    <span className="text-slate-400">{job.type}</span>
                  </div>
                  <h3 className="text-lg font-black text-[#072238]">{job.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{job.desc}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
                  <div className="flex items-center gap-1 text-slate-400">
                    <MapPin size={13} />
                    <span>{job.location}</span>
                  </div>
                  <button
                    onClick={() => {
                      setPosition(job.title);
                      window.scrollTo({ top: 750, behavior: "smooth" });
                    }}
                    className="text-sky-700 hover:underline"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm">
          <h3 className="text-2xl font-black text-[#072238] mb-1">
            Apply for a Position
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mb-8">
            Submit your resume and contact details. Our HR department reviews all applications within 48 hours.
          </p>

          {success ? (
            <div className="p-8 text-center space-y-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-xl font-black text-emerald-900">
                Application Submitted Successfully!
              </h4>
              <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto">
                Thank you for applying. If your credentials match our current openings, our HR talent team will call you for an interview.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="bg-emerald-700 text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-emerald-800 transition"
              >
                Submit Another Application
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
                    Candidate Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit number"
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
                    placeholder="rahul@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Current Location / City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Jaipur, Rajasthan"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Position Applied For
                  </label>
                  <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Vertical Domain
                  </label>
                  <select
                    value={vertical}
                    onChange={(e) => setVertical(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm bg-white"
                  >
                    <option value="Retail & MSME Lending">Retail & MSME Lending</option>
                    <option value="Wealth & Mutual Funds">Wealth & Mutual Funds</option>
                    <option value="Corporate Debt Syndication">Corporate Debt Syndication</option>
                    <option value="Real Estate Operations">Real Estate Operations</option>
                    <option value="Taxation & Accounts">Taxation & Accounts</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Upload Resume / CV (PDF or DOC)
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:bg-slate-50 transition cursor-pointer relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center gap-1.5 text-xs text-slate-500">
                    <Upload size={20} className="text-sky-600" />
                    <span className="font-bold text-slate-700">
                      {resumeFileName || "Click to select or drag & drop your resume"}
                    </span>
                    <span className="text-[11px] text-slate-400">PDF, DOC, DOCX up to 5MB</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Summary / Professional Achievements
                </label>
                <textarea
                  rows={3}
                  placeholder="Share a brief overview of your banking or financial experience..."
                  value={appInfo}
                  onChange={(e) => setAppInfo(e.target.value)}
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
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Submit Job Application</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
