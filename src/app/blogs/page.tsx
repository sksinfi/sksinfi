"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import { BLOGS_DATA, getAllCategories } from "@/data/blogsData";
import {
  Search,
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  User,
  Sparkles,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  ShieldCheck,
  Building,
  DollarSign
} from "lucide-react";

function BlogsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState<string | undefined>("Loans");

  useEffect(() => {
    if (searchParams.get("category")) {
      setSelectedCategory(searchParams.get("category")!);
    }
    if (searchParams.get("search")) {
      setSearchQuery(searchParams.get("search")!);
    }
  }, [searchParams]);

  const [blogsList, setBlogsList] = useState(BLOGS_DATA);

  // Sync with dynamic blogs API if available
  useEffect(() => {
    fetch("/api/admin/blogs")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setBlogsList(data);
        }
      })
      .catch(() => {});
  }, []);

  const categories = getAllCategories();

  // Filter blogs based on category & search term
  const filteredBlogs = useMemo(() => {
    return blogsList.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q)) ||
        post.author.name.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [blogsList, selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return blogsList.find((p) => p.featured) || blogsList[0];
  }, [blogsList]);

  return (
    <>
      <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-[#333333]">
        <Navbar
          onOpenEnquiry={(cat) => {
            setModalCategory(cat);
            setModalOpen(true);
          }}
        />
        <main className="flex-1 w-full">
          {/* ================= HERO SECTION ================= */}
          <section className="relative bg-gradient-to-br from-[#06323a] via-[#094b57] to-[#0c5c6b] text-white py-16 md:py-20 overflow-hidden shadow-md">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#b69455]/15 blur-2xl pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[#e9c787] text-xs md:text-sm font-semibold mb-4 border border-white/15 shadow-xs">
                  <Sparkles className="w-4 h-4 text-[#e9c787]" />
                  <span>Financial Knowledge Hub • SKS INFI</span>
                </div>

                <h1
                  style={{ textTransform: "none", color: "#ffffff" }}
                  className="blog-hero-title text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white leading-tight"
                >
                  Expert Financial Insights &amp; Market Advisory
                </h1>

                <p
                  style={{ color: "#ffffff", opacity: 0.95 }}
                  className="blog-hero-p text-sm md:text-base lg:text-lg leading-relaxed mb-8 max-w-2xl mx-auto"
                >
                  Clear, actionable guidance on Home Loans, SIP Compounding, MSME Subsidies,
                  NRI Investments, and Tax Planning from Jaipur&apos;s leading financial consultants.
                </p>

                {/* Search Bar */}
                <div className="relative max-w-xl mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search articles by topic, loan type, mutual funds, or tax..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ color: "#111827", backgroundColor: "#ffffff" }}
                    className="w-full pl-12 pr-12 py-3.5 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-[#b69455]/40 text-sm md:text-base border border-transparent"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-2.5 py-1 rounded-full transition font-medium"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ================= CATEGORY FILTER BAR ================= */}
          <section className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none justify-start md:justify-center">
                {categories.map((cat) => {
                  const count =
                    cat === "All"
                      ? BLOGS_DATA.length
                      : BLOGS_DATA.filter((b) => b.category === cat).length;
                  const isActive = selectedCategory === cat;

                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        backgroundColor: isActive ? "#094b57" : "transparent",
                        color: isActive ? "#ffffff" : "#475569",
                        border: isActive ? "1.5px solid #094b57" : "1.5px solid #d1d5db"
                      }}
                      className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                        isActive
                          ? "shadow-md shadow-[#094b57]/20"
                          : "hover:border-[#094b57] hover:text-[#094b57] hover:bg-[#094b57]/5"
                      }`}
                    >
                      <span>{cat}</span>
                      <span
                        style={{
                          backgroundColor: isActive ? "rgba(182,148,85,0.9)" : "#e5e7eb",
                          color: isActive ? "#ffffff" : "#6b7280"
                        }}
                        className="text-[10px] px-1.5 py-0.5 rounded-full font-bold min-w-[18px] text-center"
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ================= FEATURED POST SPOTLIGHT ================= */}
          {selectedCategory === "All" && !searchQuery && featuredPost && (
            <section className="py-8 md:py-10">
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  {/* Section label */}
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="w-1 h-4 rounded-full bg-[#b69455]" />
                    <span
                      style={{
                        color: "#b69455",
                        fontSize: "11px",
                        fontWeight: "700",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase"
                      }}
                    >
                      Featured Editorial
                    </span>
                  </div>

                  {/* Card — flex row */}
                  {/* Card — flex row */}
                  <div className="bg-white rounded-[20px] border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col lg:flex-row">
                    {/* Image side — self-stretch makes it take full card height */}
                    <div className="relative lg:w-[42%] shrink-0 h-64 sm:h-72 lg:h-auto self-stretch overflow-hidden bg-gray-100 min-h-[260px]">
                      <img
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block"
                        }}
                        className="transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-4 left-4">
                        <span
                          style={{
                            backgroundColor: "#094b57",
                            color: "#ffffff",
                            fontSize: "10px",
                            fontWeight: "700",
                            padding: "5px 13px",
                            borderRadius: "9999px",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            display: "inline-block",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.35)"
                          }}
                        >
                          {featuredPost.category}
                        </span>
                      </div>
                    </div>

                    {/* Content side */}
                    <div className="flex-1 p-6 sm:p-8 md:p-9 flex flex-col justify-between gap-4">
                      <div className="flex flex-col gap-3">
                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 font-medium">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#b69455]" />
                            {featuredPost.publishedDate}
                          </span>
                          <span className="text-gray-300">•</span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#b69455]" />
                            {featuredPost.readTime}
                          </span>
                          <span className="text-gray-300">•</span>
                          <span className="text-[#b69455] font-semibold flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5" />
                            Top Editorial Pick
                          </span>
                        </div>

                        {/* Title */}
                        <h3
                          style={{ textTransform: "none", color: "#0d2b33", lineHeight: "1.3" }}
                          className="text-xl sm:text-2xl lg:text-[26px] font-bold tracking-tight"
                        >
                          <Link
                            href={`/blogs/${featuredPost.slug}`}
                            style={{ color: "#0d2b33", textDecoration: "none" }}
                            className="hover:text-[#094b57] transition-colors"
                          >
                            {featuredPost.title}
                          </Link>
                        </h3>

                        {/* Excerpt */}
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                          {featuredPost.excerpt}
                        </p>

                        {/* Key Takeaway */}
                        {featuredPost.takeaways && featuredPost.takeaways.length > 0 && (
                          <div className="bg-[#fcf8f0] border-l-[3px] border-[#b69455] px-4 py-3 rounded-r-xl">
                            <p className="text-xs text-gray-700 leading-relaxed">
                              <strong className="text-[#094b57] font-semibold">Key Insight: </strong>
                              {featuredPost.takeaways[0]}
                            </p>
                          </div>
                        )}

                        {/* Tags */}
                        {featuredPost.tags && featuredPost.tags.length > 0 && (
                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            {featuredPost.tags.slice(0, 4).map((tag) => (
                              <span
                                key={tag}
                                className="text-[11px] font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-md transition"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Footer row */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100 mt-2">
                        <div className="flex items-center gap-3">
                          {featuredPost.author.avatar ? (
                            <img
                              src={featuredPost.author.avatar}
                              alt={featuredPost.author.name}
                              className="w-10 h-10 rounded-full object-cover border border-gray-200"
                              style={{ width: "40px", height: "40px" }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, #094b57, #0d6b7a)",
                                color: "#ffffff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: "700",
                                fontSize: "14px",
                                flexShrink: 0
                              }}
                            >
                              {featuredPost.author.name.charAt(0)}
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-bold text-gray-900 leading-tight">
                              {featuredPost.author.name}
                            </p>
                            <p className="text-[11px] text-gray-400 mt-0.5">
                              {featuredPost.author.role}
                            </p>
                          </div>
                        </div>

                        <Link
                          href={`/blogs/${featuredPost.slug}`}
                          style={{
                            backgroundColor: "#094b57",
                            color: "#ffffff",
                            textDecoration: "none"
                          }}
                          className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-[#073942] transition-all shadow-xs group"
                        >
                          <span>Read Full Article</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}


          {/* ================= ARTICLES GRID ================= */}
          <section className="py-10 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-4 border-b border-gray-200">
                  <div>
                    <h2
                      style={{ textTransform: "none", color: "#094b57" }}
                      className="text-2xl md:text-3xl font-bold"
                    >
                      {selectedCategory === "All"
                        ? "All Financial Articles"
                        : `${selectedCategory} Insights`}
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">
                      Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? "article" : "articles"}
                      {searchQuery ? ` matching "${searchQuery}"` : ""}
                    </p>
                  </div>

                  {(selectedCategory !== "All" || searchQuery) && (
                    <button
                      onClick={() => {
                        setSelectedCategory("All");
                        setSearchQuery("");
                      }}
                      className="text-xs font-semibold text-[#094b57] hover:text-[#b69455] self-start sm:self-auto underline cursor-pointer"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>

                {filteredBlogs.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-[24px] border border-gray-200 p-8 max-w-lg mx-auto shadow-sm">
                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      No articles found
                    </h3>
                    <p className="text-sm text-gray-500 mb-6">
                      We couldn&apos;t find any articles matching &quot;{searchQuery}&quot; in the &quot;{selectedCategory}&quot; category.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedCategory("All");
                        setSearchQuery("");
                      }}
                      style={{ backgroundColor: "#094b57", color: "#ffffff" }}
                      className="text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-[#073942] transition shadow-sm cursor-pointer"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredBlogs.map((post) => (
                      <article
                        key={post.slug}
                        className="bg-white rounded-[20px] border border-gray-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden"
                      >
                        {/* Card Thumbnail */}
                        <Link
                          href={`/blogs/${post.slug}`}
                          className="relative block h-52 overflow-hidden bg-gray-100 group"
                        >
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute top-3 left-3">
                            <span
                              style={{
                                backgroundColor: "rgba(9, 75, 87, 0.92)",
                                color: "#ffffff",
                                backdropFilter: "blur(4px)"
                              }}
                              className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm"
                            >
                              {post.category}
                            </span>
                          </div>
                        </Link>

                        {/* Card Body */}
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            {/* Metadata */}
                            <div className="flex items-center gap-3 text-[11px] text-gray-500 font-medium mb-3">
                              <span className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-[#b69455]" />
                                {post.publishedDate}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-[#b69455]" />
                                {post.readTime}
                              </span>
                            </div>

                            {/* Title with uniform height */}
                            <h3
                              style={{ textTransform: "none", color: "#094b57" }}
                              className="text-base md:text-lg font-bold leading-snug mb-3 hover:text-[#b69455] transition line-clamp-2 min-h-[52px] flex items-start"
                            >
                              <Link
                                href={`/blogs/${post.slug}`}
                                style={{ color: "#094b57", textDecoration: "none" }}
                                className="hover:text-[#b69455] transition"
                              >
                                {post.title}
                              </Link>
                            </h3>

                            {/* Excerpt with uniform height */}
                            <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3 min-h-[64px]">
                              {post.excerpt}
                            </p>
                          </div>

                          {/* Card Footer */}
                          <div>
                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {post.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-md font-medium"
                                >
                                  #{tag}
                                </span>
                              ))}
                              {post.tags.length > 2 && (
                                <span className="text-[10px] text-gray-400 self-center font-medium">
                                  +{post.tags.length - 2} more
                                </span>
                              )}
                            </div>

                            <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <div
                                  style={{
                                    width: "28px",
                                    height: "28px",
                                    borderRadius: "50%",
                                    background: "linear-gradient(135deg, #094b57, #0d6b7a)",
                                    color: "#ffffff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: "700",
                                    fontSize: "11px",
                                    flexShrink: 0,
                                    boxShadow: "0 1px 6px rgba(9,75,87,0.3)"
                                  }}
                                >
                                  {post.author.name.charAt(0)}
                                </div>
                                <span className="text-xs font-semibold text-gray-700 truncate">
                                  {post.author.name}
                                </span>
                              </div>

                              <Link
                                href={`/blogs/${post.slug}`}
                                style={{ color: "#094b57", textDecoration: "none" }}
                                className="text-xs font-bold hover:text-[#b69455] flex items-center gap-1 transition shrink-0"
                              >
                                <span>Read More</span>
                                <ArrowRight className="w-3.5 h-3.5 text-[#b69455]" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ================= ADVISORY CALL TO ACTION ================= */}
          <section className="py-16 bg-[#094b57] text-white relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <div
                className="max-w-4xl mx-auto p-8 md:p-12 rounded-[24px] border border-white/15 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8"
                style={{
                  background: "linear-gradient(135deg, #06323a 0%, #094b57 100%)",
                  color: "#ffffff"
                }}
              >
                <div className="text-center md:text-left">
                  <span className="text-[#e9c787] text-xs font-bold uppercase tracking-widest block mb-2">
                    Complimentary Financial Advisory
                  </span>
                  <h3
                    style={{ textTransform: "none", color: "#ffffff" }}
                    className="text-2xl md:text-3xl font-bold mb-3"
                  >
                    Have a Question About Your Loans or Investments?
                  </h3>
                  <p
                    style={{ color: "rgba(255, 255, 255, 0.88)" }}
                    className="text-sm max-w-xl leading-relaxed"
                  >
                    Our certified consultants evaluate your loan eligibility, mutual fund
                    portfolios, and tax obligations to deliver tailored, zero-conflict advice.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                  <button
                    onClick={() => {
                      setModalCategory("Loans");
                      setModalOpen(true);
                    }}
                    style={{ backgroundColor: "#b69455", color: "#ffffff" }}
                    className="font-semibold text-sm px-7 py-3.5 rounded-full transition shadow-md text-center hover:bg-[#a58446] cursor-pointer"
                  >
                    Book Free Consultation
                  </button>
                  <a
                    href="tel:+919928529222"
                    className="bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-6 py-3.5 rounded-full transition text-center border border-white/20"
                  >
                    Call +91 99285 29222
                  </a>
                </div>
              </div>
            </div>
          </section>
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

export default function BlogsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading insights...</div>}>
      <BlogsContent />
    </Suspense>
  );
}
