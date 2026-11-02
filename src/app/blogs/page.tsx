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

  const categories = getAllCategories();

  // Filter blogs based on category & search term
  const filteredBlogs = useMemo(() => {
    return BLOGS_DATA.filter((post) => {
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
  }, [selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return BLOGS_DATA.find((p) => p.featured) || BLOGS_DATA[0];
  }, []);

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
          <section className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-xs">
            <div className="container mx-auto px-4 py-3.5">
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
                        backgroundColor: isActive ? "#094b57" : "#f1f5f9",
                        color: isActive ? "#ffffff" : "#334155"
                      }}
                      className={`whitespace-nowrap px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                        isActive
                          ? "shadow-md shadow-[#094b57]/25 ring-2 ring-[#094b57]/30"
                          : "hover:bg-gray-200 hover:text-gray-900"
                      }`}
                    >
                      <span>{cat}</span>
                      <span
                        style={{
                          backgroundColor: isActive ? "#b69455" : "#e2e8f0",
                          color: isActive ? "#ffffff" : "#475569"
                        }}
                        className="text-[10px] px-2 py-0.5 rounded-full font-bold"
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
            <section className="py-10 md:py-14 bg-gradient-to-b from-gray-50/80 to-transparent">
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#b69455]" />
                    <h2
                      style={{ textTransform: "none", color: "#094b57" }}
                      className="text-xs uppercase tracking-widest font-bold"
                    >
                      Featured Editorial
                    </h2>
                  </div>

                  <div className="bg-white rounded-[24px] border border-gray-200/90 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
                    {/* Left Column: Image */}
                    <div className="lg:col-span-5 relative h-64 lg:h-auto min-h-[300px] overflow-hidden bg-gray-100">
                      <img
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span
                          style={{
                            backgroundColor: "#094b57",
                            color: "#ffffff",
                            fontSize: "11px",
                            fontWeight: "700",
                            padding: "5px 14px",
                            borderRadius: "9999px",
                            letterSpacing: "0.05em",
                            display: "inline-block",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
                          }}
                        >
                          {featuredPost.category}
                        </span>
                      </div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="lg:col-span-7 p-6 md:p-10 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
                          <span className="flex items-center gap-1.5 font-medium">
                            <Calendar className="w-3.5 h-3.5 text-[#b69455]" />
                            {featuredPost.publishedDate}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1.5 font-medium">
                            <Clock className="w-3.5 h-3.5 text-[#b69455]" />
                            {featuredPost.readTime}
                          </span>
                        </div>

                        <h3
                          style={{ textTransform: "none", color: "#094b57" }}
                          className="text-xl md:text-2xl lg:text-3xl font-bold leading-snug mb-4 hover:text-[#b69455] transition"
                        >
                          <Link
                            href={`/blogs/${featuredPost.slug}`}
                            style={{ color: "#094b57", textDecoration: "none" }}
                            className="hover:text-[#b69455] transition"
                          >
                            {featuredPost.title}
                          </Link>
                        </h3>

                        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                          {featuredPost.excerpt}
                        </p>

                        {/* Key Takeaway snippet */}
                        <div className="bg-[#faf1e0]/80 border-l-4 border-[#b69455] p-4 rounded-r-xl mb-6 shadow-2xs">
                          <p className="text-xs md:text-sm text-gray-800 font-medium leading-relaxed">
                            <strong className="text-[#094b57] font-bold">Key Insight: </strong>
                            {featuredPost.takeaways[0]}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              backgroundColor: "rgba(9, 75, 87, 0.12)",
                              color: "#094b57",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: "700",
                              fontSize: "15px",
                              flexShrink: 0
                            }}
                          >
                            {featuredPost.author.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs md:text-sm font-bold text-gray-900">
                              {featuredPost.author.name}
                            </p>
                            <p className="text-[11px] text-gray-500">
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
                          className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold px-6 py-2.5 rounded-full transition shadow-md hover:bg-[#073942]"
                        >
                          <span style={{ color: "#ffffff" }}>Read Full Article</span>
                          <ArrowRight className="w-4 h-4" style={{ color: "#ffffff" }} />
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
                                    backgroundColor: "rgba(9, 75, 87, 0.12)",
                                    color: "#094b57",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: "700",
                                    fontSize: "12px",
                                    flexShrink: 0
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
