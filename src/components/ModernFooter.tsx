"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Award,
  ArrowUp,
  MessageCircle,
  ExternalLink
} from "lucide-react";
import EnquiryModal from "@/components/EnquiryModal";

interface ModernFooterProps {
  onOpenEnquiry?: (category?: string, product?: string) => void;
}

export default function ModernFooter({ onOpenEnquiry }: ModernFooterProps) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalCat, setModalCat] = React.useState("General");
  const [modalProd, setModalProd] = React.useState("Consultation");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleApplyClick = (category: string, product: string) => {
    if (onOpenEnquiry) {
      onOpenEnquiry(category, product);
    } else {
      setModalCat(category);
      setModalProd(product);
      setModalOpen(true);
    }
  };

  return (
    <footer className="w-full bg-[#052e35] text-white pt-16 pb-8 border-t border-[#b69455]/20 font-sans relative overflow-hidden">
      {/* Background ambient glow matching brand */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#b69455]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#094b57]/20 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top CTA Row */}
        <div className="bg-gradient-to-r from-[#094b57] to-[#0d5966] rounded-2xl p-6 sm:p-8 mb-14 border border-[#b69455]/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#b69455]/20 text-[#f9f0df] border border-[#b69455]/40 mb-2">
              <Award size={13} className="text-[#b69455]" />
              Trusted by 15,000+ Happy Families & Businesses
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Ready to Accelerate Your Financial Growth?
            </h3>
            <p className="text-white/80 text-sm mt-1 max-w-xl">
              Get customized loans at lowest interest rates and institutional wealth advisory from Jaipur&apos;s certified consultants.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleApplyClick("General", "Free Consultation")}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#b69455] to-[#d4af37] text-white font-semibold shadow-lg hover:shadow-[#b69455]/30 hover:scale-105 transition duration-200 text-sm"
            >
              Get Free Consultation
            </button>
            <a
              href="tel:+919928593122"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium border border-white/20 transition text-sm flex items-center gap-2"
            >
              <Phone size={15} className="text-[#b69455]" />
              Call Now
            </a>
          </div>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand Info */}
          <div>
            <Link href="/" className="inline-block mb-5">
              <div className="bg-white px-3.5 py-2 rounded-xl shadow-md inline-block">
                <Image
                  src="/images/skslogo.png"
                  alt="SKS INFI Logo"
                  width={190}
                  height={65}
                  style={{ width: "auto", height: "auto" }}
                  className="h-10 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-white/75 text-sm leading-relaxed mb-5">
              SKS INFI is Jaipur&apos;s premier financial consulting and loan syndication firm. We connect individuals and enterprises with 45+ top Indian banks &amp; NBFCs for maximum savings and wealth creation.
            </p>
            <div className="space-y-2 text-xs text-[#f9f0df]">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#b69455]" />
                <span>RERA Registered Financial Consultants</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={16} className="text-[#b69455]" />
                <span>NISM Certified Mutual Fund Advisory</span>
              </div>
            </div>
          </div>

          {/* Column 2: Loan Solutions */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-[#b69455]">
              Loan Solutions
            </h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>
                <Link href="/loan" className="hover:text-[#b69455] transition flex items-center gap-1.5 group">
                  <ChevronRight size={14} className="text-[#b69455] group-hover:translate-x-1 transition-transform" />
                  Home Loan (from 8.35%*)
                </Link>
              </li>
              <li>
                <Link href="/loan" className="hover:text-[#b69455] transition flex items-center gap-1.5 group">
                  <ChevronRight size={14} className="text-[#b69455] group-hover:translate-x-1 transition-transform" />
                  Loan Against Property (LAP)
                </Link>
              </li>
              <li>
                <Link href="/loan" className="hover:text-[#b69455] transition flex items-center gap-1.5 group">
                  <ChevronRight size={14} className="text-[#b69455] group-hover:translate-x-1 transition-transform" />
                  Business &amp; MSME Loans
                </Link>
              </li>
              <li>
                <Link href="/loan" className="hover:text-[#b69455] transition flex items-center gap-1.5 group">
                  <ChevronRight size={14} className="text-[#b69455] group-hover:translate-x-1 transition-transform" />
                  Commercial Vehicle Loans
                </Link>
              </li>
              <li>
                <Link href="/loan" className="hover:text-[#b69455] transition flex items-center gap-1.5 group">
                  <ChevronRight size={14} className="text-[#b69455] group-hover:translate-x-1 transition-transform" />
                  Machinery &amp; Equipment Finance
                </Link>
              </li>
              <li>
                <Link href="/loan" className="hover:text-[#b69455] transition flex items-center gap-1.5 group">
                  <ChevronRight size={14} className="text-[#b69455] group-hover:translate-x-1 transition-transform" />
                  Education Loan in India &amp; Abroad
                </Link>
              </li>
              <li>
                <Link href="/loan" className="hover:text-[#b69455] transition flex items-center gap-1.5 group">
                  <ChevronRight size={14} className="text-[#b69455] group-hover:translate-x-1 transition-transform" />
                  Balance Transfer &amp; Top-Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Wealth & Investments */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-[#b69455]">
              Investment &amp; Wealth
            </h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>
                <Link href="/investment" className="hover:text-[#b69455] transition flex items-center gap-1.5 group">
                  <ChevronRight size={14} className="text-[#b69455] group-hover:translate-x-1 transition-transform" />
                  Mutual Funds &amp; SIP Portfolios
                </Link>
              </li>
              <li>
                <Link href="/insurance" className="hover:text-[#b69455] transition flex items-center gap-1.5 group">
                  <ChevronRight size={14} className="text-[#b69455] group-hover:translate-x-1 transition-transform" />
                  Life &amp; Term Insurance
                </Link>
              </li>
              <li>
                <Link href="/insurance" className="hover:text-[#b69455] transition flex items-center gap-1.5 group">
                  <ChevronRight size={14} className="text-[#b69455] group-hover:translate-x-1 transition-transform" />
                  Health &amp; Critical Illness Cover
                </Link>
              </li>
              <li>
                <Link href="/bonds" className="hover:text-[#b69455] transition flex items-center gap-1.5 group">
                  <ChevronRight size={14} className="text-[#b69455] group-hover:translate-x-1 transition-transform" />
                  Corporate FDs (Up to 9.1%*)
                </Link>
              </li>
              <li>
                <Link href="/bonds" className="hover:text-[#b69455] transition flex items-center gap-1.5 group">
                  <ChevronRight size={14} className="text-[#b69455] group-hover:translate-x-1 transition-transform" />
                  Listed &amp; Unlisted Bonds
                </Link>
              </li>
              <li>
                <Link href="/partner" className="hover:text-[#b69455] transition flex items-center gap-1.5 group">
                  <ChevronRight size={14} className="text-[#b69455] group-hover:translate-x-1 transition-transform" />
                  Become a Partner (DSA / Referral)
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-[#b69455] transition flex items-center gap-1.5 group">
                  <ChevronRight size={14} className="text-[#b69455] group-hover:translate-x-1 transition-transform" />
                  Financial Knowledge &amp; Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-[#b69455]">
              Jaipur Head Office
            </h4>
            <div className="space-y-3.5 text-sm text-white/80">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#b69455] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Plot No. 8, Gayatri Nagar-A, Maharani Farm, Durgapura, Jaipur, Rajasthan 302018
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[#b69455] shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+919928593122" className="hover:text-[#b69455] transition">
                    +91 99285 93122
                  </a>
                  <a href="tel:+919928529222" className="hover:text-[#b69455] transition">
                    +91 99285 29222
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#b69455] shrink-0" />
                <a href="mailto:info@sksinfi.com" className="hover:text-[#b69455] transition">
                  info@sksinfi.com
                </a>
              </div>
              <div className="pt-2 flex items-center gap-3">
                <a
                  href="https://wa.me/919928593122"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition shadow"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={18} />
                </a>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#b69455] text-white flex items-center justify-center transition"
                  aria-label="Facebook"
                >
                  <i className="fa-brands fa-facebook-f text-sm" />
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#b69455] text-white flex items-center justify-center transition"
                  aria-label="Instagram"
                >
                  <i className="fa-brands fa-instagram text-sm" />
                </a>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#b69455] text-white flex items-center justify-center transition"
                  aria-label="LinkedIn"
                >
                  <i className="fa-brands fa-linkedin-in text-sm" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <p>© {new Date().getFullYear()} SKS INFI. All Rights Reserved. Jaipur, Rajasthan.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#b69455] transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#b69455] transition">
              Terms &amp; Conditions
            </Link>
            <Link href="/contact" className="hover:text-[#b69455] transition">
              Contact Us
            </Link>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#b69455] text-white flex items-center justify-center transition"
              title="Scroll to Top"
              aria-label="Scroll to top"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 left-6 z-[9000]">
        <a
          href="https://wa.me/919928593122?text=Hello%20SKS%20INFI,%20I%20would%20like%20to%20inquire%20about%20loans%20and%20financial%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-full shadow-2xl hover:scale-105 transition font-semibold text-sm group"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={20} className="fill-white" />
          <span className="hidden sm:inline">Chat on WhatsApp</span>
        </a>
      </div>

      <div className="fixed bottom-6 right-6 z-[9000]">
        <button
          onClick={() => handleApplyClick("General", "Instant Loan Application")}
          className="flex items-center gap-2 bg-gradient-to-r from-[#094b57] to-[#b69455] text-white px-5 py-2.5 rounded-full shadow-2xl hover:scale-105 transition font-semibold text-sm border border-[#b69455]/40"
          aria-label="Apply Now"
        >
          <span>Apply Online</span>
          <ChevronRight size={16} />
        </button>
      </div>

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialCategory={modalCat}
        initialProduct={modalProd}
      />
    </footer>
  );
}
