"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import { BlogPost } from "@/data/blogsData";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  CheckCircle2,
  Copy,
  Check,
  PhoneCall,
  Mail,
  Shield,
  HelpCircle,
  Tag
} from "lucide-react";

interface SingleBlogClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function SingleBlogClient({ post, relatedPosts }: SingleBlogClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState<string | undefined>(post.category);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const currentUrl = "https://www.sksinfi.com/blogs/" + post.slug;
  const encodedTitle = encodeURIComponent(post.title);
  const encodedUrl = encodeURIComponent(currentUrl);

  return (
    <>
      <div className="min-h-screen flex flex-col bg-white text-[#333333]">
        <Navbar
          onOpenEnquiry={(cat) => {
            setModalCategory(cat || post.category);
            setModalOpen(true);
          }}
        />
        <main className="flex-1 w-full pb-16">
        {/* ================= BREADCRUMBS & HERO ================= */}
        <section className="bg-gradient-to-b from-gray-50 to-white pt-8 pb-10 border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Back to blogs link */}
              <div className="mb-6">
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-[#094b57] hover:text-[#b69455] transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to all Financial Insights</span>
                </Link>
              </div>

              {/* Category Pill */}
              <div className="inline-block mb-4">
                <span
                  style={{
                    backgroundColor: "#094b57",
                    color: "#ffffff",
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "6px 16px",
                    borderRadius: "9999px",
                    fontSize: "12px",
                    fontWeight: "700",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase"
                  }}
                  className="shadow-xs"
                >
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h1
                style={{ textTransform: "none", color: "#094b57" }}
                className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
              >
                {post.title}
              </h1>

              {/* Metadata & Social Share */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-gray-200">
                <div className="flex items-center gap-3">
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(9, 75, 87, 0.12)",
                      color: "#094b57",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "700",
                      fontSize: "16px",
                      flexShrink: 0
                    }}
                  >
                    {post.author.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{post.author.name}</p>
                    <p className="text-xs text-gray-500">{post.author.role}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#b69455]" />
                    {post.publishedDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#b69455]" />
                    {post.readTime}
                  </span>
                  <span>•</span>

                  {/* Share buttons */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-400 font-medium">Share:</span>
                    <a
                      href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition"
                      title="Share on WhatsApp"
                    >
                      <i className="fab fa-whatsapp text-xs"></i>
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-700 hover:text-white flex items-center justify-center transition"
                      title="Share on LinkedIn"
                    >
                      <i className="fab fa-linkedin-in text-xs"></i>
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-800 hover:text-white flex items-center justify-center transition"
                      title="Share on X"
                    >
                      <i className="fa-brands fa-x-twitter text-xs"></i>
                    </a>
                    <button
                      onClick={handleCopyLink}
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        backgroundColor: "#f1f5f9",
                        color: "#334155",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid #e2e8f0",
                        cursor: "pointer"
                      }}
                      className="hover:bg-gray-200 transition"
                      title="Copy Link"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FEATURED COVER IMAGE ================= */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="rounded-[24px] overflow-hidden shadow-lg border border-gray-200 max-h-[460px] bg-gray-100">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover max-h-[460px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= ARTICLE BODY & SIDEBAR ================= */}
        <section className="py-4">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Key Takeaways Card */}
              {post.takeaways && post.takeaways.length > 0 && (
                <div className="bg-[#f9f0df]/70 border-l-4 border-[#b69455] p-6 rounded-r-[16px] mb-10 shadow-xs">
                  <h3 className="text-base font-bold text-[#094b57] mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#b69455]" />
                    <span>Executive Summary &amp; Key Takeaways</span>
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-800">
                    {post.takeaways.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-[#b69455] font-bold">•</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Rich Blog Content */}
              <div
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-sans
                  [&>h2]:text-2xl [&>h2]:md:text-3xl [&>h2]:font-bold [&>h2]:text-[#094b57] [&>h2]:mt-10 [&>h2]:mb-4
                  [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-[#094b57] [&>h3]:mt-6 [&>h3]:mb-3
                  [&>p]:text-base [&>p]:leading-relaxed [&>p]:mb-5 [&>p]:text-gray-700
                  [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:mb-2 [&>ul>li]:text-gray-700
                  [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol>li]:mb-2 [&>ol>li]:text-gray-700
                  [&>blockquote]:border-l-4 [&>blockquote]:border-[#094b57] [&>blockquote]:bg-gray-50 [&>blockquote]:p-5 [&>blockquote]:rounded-r-lg [&>blockquote]:italic [&>blockquote]:text-gray-800 [&>blockquote]:my-6
                  [&>strong]:text-[#094b57]"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags Cloud */}
              <div className="mt-12 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5 mr-2">
                    <Tag className="w-3.5 h-3.5 text-[#b69455]" />
                    Related Topics:
                  </span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contextual Consultation Box */}
              <div
                style={{
                  background: "linear-gradient(135deg, #06323a 0%, #094b57 100%)",
                  color: "#ffffff",
                  borderRadius: "20px",
                  padding: "36px 40px",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "24px",
                  marginTop: "40px",
                  boxShadow: "0 10px 25px rgba(9, 75, 87, 0.25)"
                }}
              >
                <div style={{ flex: "1 1 500px", minWidth: "280px" }}>
                  <h4 style={{ color: "#ffffff", fontSize: "22px", fontWeight: "700", marginBottom: "8px", lineHeight: "1.3" }}>
                    Need Personalized Advice for Your Financial Portfolio?
                  </h4>
                  <p style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "14px", lineHeight: "1.6", margin: "0" }}>
                    Schedule a confidential 1-on-1 session with our senior advisors in Jaipur.
                    We compare 40+ lending institutions and curate high-yielding, tax-efficient investments.
                  </p>
                </div>
                <div style={{ flex: "0 0 auto" }}>
                  <button
                    onClick={() => {
                      setModalCategory(post.category);
                      setModalOpen(true);
                    }}
                    style={{
                      backgroundColor: "#b69455",
                      color: "#ffffff",
                      fontSize: "14px",
                      fontWeight: "600",
                      padding: "14px 32px",
                      borderRadius: "9999px",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                      whiteSpace: "nowrap",
                      display: "inline-block"
                    }}
                    className="hover:opacity-90 transition"
                  >
                    Request Consultation
                  </button>
                </div>
              </div>

              {/* Author Bio Box */}
              <div
                style={{
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "20px",
                  padding: "32px",
                  marginTop: "48px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "24px"
                }}
                className="shadow-xs flex-col sm:flex-row items-center sm:items-start"
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    backgroundColor: "#094b57",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    fontWeight: "700",
                    flexShrink: 0,
                    boxShadow: "0 4px 12px rgba(9, 75, 87, 0.25)"
                  }}
                >
                  {post.author.name.charAt(0)}
                </div>
                <div style={{ flex: "1 1 auto", textAlign: "left" }}>
                  <div className="flex flex-wrap items-center justify-start gap-2 mb-1">
                    <h4 style={{ color: "#111827", fontSize: "18px", fontWeight: "700", margin: "0", textAlign: "left" }}>
                      Written by {post.author.name}
                    </h4>
                    <span
                      style={{
                        backgroundColor: "rgba(9, 75, 87, 0.1)",
                        color: "#094b57",
                        fontSize: "11px",
                        fontWeight: "600",
                        padding: "2px 8px",
                        borderRadius: "9999px"
                      }}
                    >
                      Verified Advisor
                    </span>
                  </div>
                  <p style={{ color: "#b69455", fontSize: "13px", fontWeight: "600", marginBottom: "12px", textAlign: "left" }}>
                    {post.author.role}
                  </p>
                  <p style={{ color: "#4b5563", fontSize: "14px", lineHeight: "1.6", marginBottom: "16px", textAlign: "left" }}>
                    Specializing in custom loan syndication, portfolio asset allocation, and regulatory compliance for families, entrepreneurs, and NRIs across Rajasthan and globally.
                  </p>
                  <div className="flex flex-wrap justify-start gap-4 text-xs font-semibold" style={{ color: "#094b57" }}>
                    <a href="tel:+919928529222" className="flex items-center gap-1.5 hover:underline" style={{ color: "#094b57" }}>
                      <PhoneCall className="w-3.5 h-3.5" style={{ color: "#b69455" }} />
                      <span>+91 99285 29222</span>
                    </a>
                    <a href="mailto:infi@sksinfi.com" className="flex items-center gap-1.5 hover:underline" style={{ color: "#094b57" }}>
                      <Mail className="w-3.5 h-3.5" style={{ color: "#b69455" }} />
                      <span>infi@sksinfi.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= RELATED ARTICLES ================= */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-gray-50 border-t border-gray-200 mt-12">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#094b57]">
                      Explore Related Financial Insights
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">
                      More articles to help guide your financial decisions
                    </p>
                  </div>
                  <Link
                    href="/blogs"
                    className="text-xs md:text-sm font-semibold text-[#094b57] hover:text-[#b69455] flex items-center gap-1"
                  >
                    <span>View All Articles</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((rel) => (
                    <article
                      key={rel.slug}
                      className="bg-white rounded-[20px] border border-gray-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
                    >
                      <Link
                        href={`/blogs/${rel.slug}`}
                        className="relative block h-40 overflow-hidden bg-gray-100 group"
                      >
                        <img
                          src={rel.coverImage}
                          alt={rel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span
                            style={{
                              backgroundColor: "rgba(9, 75, 87, 0.95)",
                              color: "#ffffff",
                              fontSize: "11px",
                              fontWeight: "700",
                              padding: "4px 10px",
                              borderRadius: "9999px",
                              textTransform: "uppercase",
                              letterSpacing: "0.04em",
                              display: "inline-block",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.25)"
                            }}
                          >
                            {rel.category}
                          </span>
                        </div>
                      </Link>

                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-[10px] text-gray-400 mb-2">
                            <span>{rel.publishedDate}</span>
                            <span>•</span>
                            <span>{rel.readTime}</span>
                          </div>
                          <h4
                            className="text-sm font-bold leading-snug mb-2 hover:text-[#b69455] transition line-clamp-2 min-h-[42px] flex items-center"
                            style={{ color: "#094b57" }}
                          >
                            <Link
                              href={`/blogs/${rel.slug}`}
                              style={{ color: "#094b57", textDecoration: "none" }}
                              className="hover:text-[#b69455]"
                            >
                              {rel.title}
                            </Link>
                          </h4>
                          <p className="text-xs text-gray-600 line-clamp-2 mb-3 min-h-[36px]">
                            {rel.excerpt}
                          </p>
                        </div>

                        <Link
                          href={`/blogs/${rel.slug}`}
                          style={{ color: "#094b57", textDecoration: "none" }}
                          className="text-xs font-bold hover:text-[#b69455] flex items-center gap-1.5 transition pt-3 border-t border-gray-100"
                        >
                          <span>Read Full Story</span>
                          <ArrowRight className="w-3.5 h-3.5" style={{ color: "#b69455" }} />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
        </main>
        <Footer />
      </div>
      {modalOpen ? (
        <EnquiryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialCategory={modalCategory}
        />
      ) : null}
    </>
  );
}
