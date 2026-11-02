"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { BlogPost, getAllCategories } from "@/data/blogsData";

interface BlogFormState {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  publishedDate: string;
  readTime: string;
  coverImage: string;
  tags: string;
  featured: boolean;
  takeaways: string;
  content: string;
}

const DEFAULT_BLOG_FORM: BlogFormState = {
  title: "",
  slug: "",
  excerpt: "",
  category: "Loans",
  authorName: "Arun Mehta",
  authorRole: "Senior Financial Consultant, SKS INFI",
  authorAvatar: "/images/user (1).png",
  publishedDate: "",
  readTime: "5 min read",
  coverImage: "/images/homeloan.avif",
  tags: "Loan, Finance, Jaipur, SKS INFI",
  featured: false,
  takeaways:
    "Securing optimal interest spreads can reduce total outflow significantly.\nStructured documentation ensures fastest approval turnaround.\nAlways evaluate total processing fees and pre-closure terms.",
  content: `<h2>Executive Overview</h2>
<p>Write your detailed article introduction and strategic analysis here. Jaipur's growing financial market provides ample opportunities for informed borrowers and investors.</p>

<h2>Key Criteria & Regulatory Framework</h2>
<p>Lenders and financial institutions assess applicants based on risk mitigation, disposable surplus, and verifiable credit history.</p>
<ul>
  <li><strong>Credit Eligibility:</strong> High CIBIL standing unlocks prime tier interest brackets.</li>
  <li><strong>Income Documentation:</strong> Audited statements or salary certificates ensure swift underwriting.</li>
</ul>

<h2>Strategic Recommendations from SKS INFI</h2>
<p>Consult with our certified advisors before finalizing your financial strategy to unlock bespoke rate waivers and institutional benefits.</p>`
};

const PRESET_COVERS = [
  { label: "Home Loan", url: "/images/homeloan.avif" },
  { label: "Mutual Fund & SIP", url: "/images/sip.png" },
  { label: "Corporate Finance", url: "/img/aboutus.png" },
  { label: "Consultant / Advisory", url: "/img/sksl.jpg" }
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<
    "blogs" | "contact" | "loan" | "partner" | "banner"
  >("blogs");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  // --- Leads & Banners State ---
  const [contactLeads, setContactLeads] = useState<any[]>([]);
  const [partnerLeads, setPartnerLeads] = useState<any[]>([]);
  const [loanLeads, setLoanLeads] = useState<any[]>([]);
  const [banners, setBanners] = useState<any[]>([
    { id: 1, homeslider: "homeloan (1).jpg" },
    { id: 2, homeslider: "mortageloan.jpg" }
  ]);
  const [showAddBannerModal, setShowAddBannerModal] = useState(false);
  const [newBannerName, setNewBannerName] = useState("");

  // --- Blogs Management State ---
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [blogSearch, setBlogSearch] = useState("");
  const [blogCategoryFilter, setBlogCategoryFilter] = useState("All");
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [blogForm, setBlogForm] = useState<BlogFormState>(DEFAULT_BLOG_FORM);
  const [blogSaving, setBlogSaving] = useState(false);
  const [blogModalTab, setBlogModalTab] = useState<"edit" | "preview">("edit");
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const isConfigured = isSupabaseConfigured();

  // Dismiss notification after 4 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Fetch blogs from API
  const fetchBlogs = async () => {
    setBlogsLoading(true);
    try {
      const res = await fetch("/api/admin/blogs");
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (e) {
      console.error("Failed to load blogs:", e);
    } finally {
      setBlogsLoading(false);
    }
  };

  // Fetch all leads & banners data
  const fetchAllData = async () => {
    setLoading(true);
    try {
      fetchBlogs();

      if (isConfigured && supabase) {
        const { data: contacts } = await supabase
          .from("contact_enquiries")
          .select("*")
          .order("created_at", { ascending: false });

        const { data: partners } = await supabase
          .from("partner_enquiries")
          .select("*")
          .order("created_at", { ascending: false });

        const { data: loans } = await supabase
          .from("loan_enquiries")
          .select("*")
          .order("created_at", { ascending: false });

        if (contacts) setContactLeads(contacts);
        if (partners) setPartnerLeads(partners);
        if (loans) setLoanLeads(loans);
      } else {
        // LocalStorage fallback
        if (typeof window !== "undefined") {
          let contacts = JSON.parse(localStorage.getItem("sks_local_contacts") || "[]");
          let partners = JSON.parse(localStorage.getItem("sks_local_partners") || "[]");
          let loans = JSON.parse(localStorage.getItem("sks_local_loans") || "[]");

          if (contacts.length === 0) {
            contacts = [
              {
                id: 1,
                name: "Vikram Sharma",
                phone: "9928529222",
                email: "vikram@example.com",
                address: "New Aatish Market, Jaipur",
                message: "Need consulting for Commercial Vehicle Loan"
              },
              {
                id: 2,
                name: "Amit Mehta",
                phone: "9829012345",
                email: "amit.mehta@example.com",
                address: "Patrakar Colony, Mansarovar",
                message: "Looking for Home loan & property insurance"
              }
            ];
            localStorage.setItem("sks_local_contacts", JSON.stringify(contacts));
          }

          if (partners.length === 0) {
            partners = [
              {
                id: 1,
                name: "Ramesh Chand Agrawal",
                email: "ramesh@partner.com",
                mobile: "9414011223",
                country: "India",
                city: "Jaipur",
                product: "Loan",
                message: "Interested in becoming a business loan DSA partner"
              }
            ];
            localStorage.setItem("sks_local_partners", JSON.stringify(partners));
          }

          if (loans.length === 0) {
            loans = [
              {
                id: 1,
                name: "Pooja Verma",
                phone: "9829144556",
                email: "pooja.v@example.com",
                amount: "₹ 45,00,000",
                loan_type: "Home Loan"
              },
              {
                id: 2,
                name: "Deepak Soni",
                phone: "9785233112",
                email: "deepak@example.com",
                amount: "₹ 15,00,000",
                loan_type: "Business LOAN"
              }
            ];
            localStorage.setItem("sks_local_loans", JSON.stringify(loans));
          }

          setContactLeads(contacts);
          setPartnerLeads(partners);
          setLoanLeads(loans);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // --- Lead Deletion Handlers ---
  const handleDelete = async (type: "contact" | "partner" | "loan" | "banner", id: any) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    if (type === "contact") {
      setContactLeads((prev) => prev.filter((item) => item.id !== id));
      if (isConfigured && supabase) {
        await supabase.from("contact_enquiries").delete().eq("id", id);
      } else {
        const stored = JSON.parse(localStorage.getItem("sks_local_contacts") || "[]");
        localStorage.setItem(
          "sks_local_contacts",
          JSON.stringify(stored.filter((i: any) => i.id !== id))
        );
      }
    } else if (type === "partner") {
      setPartnerLeads((prev) => prev.filter((item) => item.id !== id));
      if (isConfigured && supabase) {
        await supabase.from("partner_enquiries").delete().eq("id", id);
      } else {
        const stored = JSON.parse(localStorage.getItem("sks_local_partners") || "[]");
        localStorage.setItem(
          "sks_local_partners",
          JSON.stringify(stored.filter((i: any) => i.id !== id))
        );
      }
    } else if (type === "loan") {
      setLoanLeads((prev) => prev.filter((item) => item.id !== id));
      if (isConfigured && supabase) {
        await supabase.from("loan_enquiries").delete().eq("id", id);
      } else {
        const stored = JSON.parse(localStorage.getItem("sks_local_loans") || "[]");
        localStorage.setItem(
          "sks_local_loans",
          JSON.stringify(stored.filter((i: any) => i.id !== id))
        );
      }
    } else if (type === "banner") {
      setBanners((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleAddBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBannerName) return;
    setBanners((prev) => [
      ...prev,
      {
        id: Date.now(),
        homeslider: newBannerName
      }
    ]);
    setNewBannerName("");
    setShowAddBannerModal(false);
  };

  // --- Blog Handlers ---
  const handleOpenCreateBlog = () => {
    setEditingBlog(null);
    setBlogForm({
      ...DEFAULT_BLOG_FORM,
      publishedDate: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      })
    });
    setBlogModalTab("edit");
    setShowBlogModal(true);
  };

  const handleOpenEditBlog = (blog: BlogPost) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt || "",
      category: blog.category,
      authorName: blog.author.name,
      authorRole: blog.author.role,
      authorAvatar: blog.author.avatar || "/images/user (1).png",
      publishedDate: blog.publishedDate,
      readTime: blog.readTime,
      coverImage: blog.coverImage,
      tags: blog.tags.join(", "),
      featured: Boolean(blog.featured),
      takeaways: blog.takeaways.join("\n"),
      content: blog.content
    });
    setBlogModalTab("edit");
    setShowBlogModal(true);
  };

  const handleDeleteBlog = async (slug: string, title: string) => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${title}"? This will permanently remove the article.`
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/blogs?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE"
      });

      if (res.ok) {
        setNotification({
          type: "success",
          message: `Article "${title}" deleted successfully.`
        });
        setBlogs((prev) => prev.filter((b) => b.slug !== slug));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete article.");
      }
    } catch (err: any) {
      alert("Error deleting article: " + err.message);
    }
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title.trim() || !blogForm.content.trim()) {
      alert("Please enter both article Title and Content.");
      return;
    }

    setBlogSaving(true);
    try {
      const payload = {
        title: blogForm.title,
        slug: blogForm.slug,
        category: blogForm.category,
        author: {
          name: blogForm.authorName,
          role: blogForm.authorRole,
          avatar: blogForm.authorAvatar
        },
        publishedDate: blogForm.publishedDate,
        readTime: blogForm.readTime,
        coverImage: blogForm.coverImage,
        tags: blogForm.tags,
        featured: blogForm.featured,
        takeaways: blogForm.takeaways,
        content: blogForm.content,
        originalSlug: editingBlog?.slug
      };

      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        setNotification({
          type: "success",
          message: editingBlog
            ? `Article "${data.blog.title}" updated successfully.`
            : `Article "${data.blog.title}" published successfully!`
        });
        setShowBlogModal(false);
        fetchBlogs();
      } else {
        alert(data.error || "Failed to save article.");
      }
    } catch (err: any) {
      alert("Network error: " + err.message);
    } finally {
      setBlogSaving(false);
    }
  };

  // Quick insertion helpers for rich content editor
  const insertContentSnippet = (snippet: string) => {
    setBlogForm((prev) => ({
      ...prev,
      content: prev.content + "\n\n" + snippet
    }));
  };

  // Filtered blogs list
  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const matchesCat =
        blogCategoryFilter === "All" || b.category === blogCategoryFilter;
      const q = blogSearch.toLowerCase().trim();
      const matchesSearch =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.slug.toLowerCase().includes(q) ||
        b.author.name.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCat && matchesSearch;
    });
  }, [blogs, blogCategoryFilter, blogSearch]);

  const allCategories = getAllCategories();

  return (
    <div className="flex min-h-screen bg-[#f1f2f7] font-sans antialiased text-[#333]">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-[10000] px-5 py-3 rounded-lg shadow-xl text-white text-sm font-semibold flex items-center gap-3 transition-all duration-300 ${
            notification.type === "success" ? "bg-emerald-600" : "bg-red-600"
          }`}
        >
          <i
            className={`fa ${
              notification.type === "success" ? "fa-circle-check" : "fa-triangle-exclamation"
            }`}
          ></i>
          <span>{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            className="text-white/80 hover:text-white ml-2 text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Left Panel Sidebar */}
      <aside
        id="left-panel"
        className={`bg-[#272c33] text-white flex-shrink-0 transition-all duration-300 min-h-screen ${
          sidebarOpen ? "w-[240px]" : "w-0 overflow-hidden"
        }`}
      >
        <div className="p-4 border-b border-[#343b45]">
          <Link
            href="/"
            className="text-lg font-bold tracking-wider text-white flex items-center gap-2 no-underline"
          >
            <span className="text-[#b69455]">SKS INFI</span> ADMIN
          </Link>
        </div>

        <nav className="p-4">
          <div className="text-[11px] uppercase tracking-wider text-[#7e8d9f] font-bold mb-3">
            Menu
          </div>

          <ul className="space-y-1 text-sm list-none p-0 m-0">
            {/* Blogs Tab (Primary) */}
            <li>
              <button
                type="button"
                onClick={() => setActiveTab("blogs")}
                className={`w-full text-left px-3 py-2.5 rounded transition flex items-center justify-between border-none cursor-pointer ${
                  activeTab === "blogs"
                    ? "bg-[#b69455] text-white font-bold shadow-sm"
                    : "text-[#a4b0be] hover:bg-[#343b45] hover:text-white bg-transparent"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <i className="fa fa-newspaper text-xs"></i>
                  <span>Blog Articles</span>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    activeTab === "blogs"
                      ? "bg-black/25 text-white"
                      : "bg-[#343b45] text-slate-300"
                  }`}
                >
                  {blogs.length}
                </span>
              </button>
            </li>

            {/* Leads Tabs */}
            <li>
              <button
                type="button"
                onClick={() => setActiveTab("contact")}
                className={`w-full text-left px-3 py-2.5 rounded transition flex items-center justify-between border-none cursor-pointer ${
                  activeTab === "contact"
                    ? "bg-[#083d5d] text-white font-bold shadow-sm"
                    : "text-[#a4b0be] hover:bg-[#343b45] hover:text-white bg-transparent"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <i className="fa fa-envelope text-xs"></i>
                  <span>Contact Leads</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#343b45] text-slate-300">
                  {contactLeads.length}
                </span>
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => setActiveTab("loan")}
                className={`w-full text-left px-3 py-2.5 rounded transition flex items-center justify-between border-none cursor-pointer ${
                  activeTab === "loan"
                    ? "bg-[#083d5d] text-white font-bold shadow-sm"
                    : "text-[#a4b0be] hover:bg-[#343b45] hover:text-white bg-transparent"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <i className="fa fa-money-bill-wave text-xs"></i>
                  <span>Loan Enquiry</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#343b45] text-slate-300">
                  {loanLeads.length}
                </span>
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => setActiveTab("partner")}
                className={`w-full text-left px-3 py-2.5 rounded transition flex items-center justify-between border-none cursor-pointer ${
                  activeTab === "partner"
                    ? "bg-[#083d5d] text-white font-bold shadow-sm"
                    : "text-[#a4b0be] hover:bg-[#343b45] hover:text-white bg-transparent"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <i className="fa fa-handshake text-xs"></i>
                  <span>Partner With Us</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#343b45] text-slate-300">
                  {partnerLeads.length}
                </span>
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => setActiveTab("banner")}
                className={`w-full text-left px-3 py-2.5 rounded transition flex items-center justify-between border-none cursor-pointer ${
                  activeTab === "banner"
                    ? "bg-[#083d5d] text-white font-bold shadow-sm"
                    : "text-[#a4b0be] hover:bg-[#343b45] hover:text-white bg-transparent"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <i className="fa fa-image text-xs"></i>
                  <span>POP UP Banner</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#343b45] text-slate-300">
                  {banners.length}
                </span>
              </button>
            </li>
          </ul>

          <div className="mt-8 pt-4 border-t border-[#343b45] space-y-2">
            <Link
              href="/blogs"
              target="_blank"
              className="text-xs text-[#b69455] hover:text-[#d3b477] flex items-center gap-2 no-underline"
            >
              <i className="fa fa-arrow-up-right-from-square"></i> View Live Blog Section
            </Link>
            <Link
              href="/"
              target="_blank"
              className="text-xs text-[#a4b0be] hover:text-white flex items-center gap-2 no-underline"
            >
              <i className="fa fa-globe"></i> Visit Website
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none bg-transparent border-none cursor-pointer p-1"
              title="Toggle Menu"
            >
              <i className="fa fa-bars text-lg"></i>
            </button>
            <span className="text-sm font-semibold text-slate-800">
              {activeTab === "blogs" && "Blog Articles & Editorial Management"}
              {activeTab === "contact" && "Contact Leads"}
              {activeTab === "partner" && "Partner Applications"}
              {activeTab === "loan" && "Loan Inquiries"}
              {activeTab === "banner" && "Banner & Pop-Up Images"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={fetchAllData}
              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded flex items-center gap-1.5 transition border-none cursor-pointer"
              title="Refresh Data"
            >
              <i
                className={`fa fa-rotate-right ${
                  loading || blogsLoading ? "animate-spin" : ""
                }`}
              ></i>
              <span>Refresh</span>
            </button>

            <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
              <span className="text-xs font-semibold text-slate-700">Admin Mode</span>
              <Link
                href="/"
                className="text-xs bg-[#b69455] hover:bg-[#96773d] text-white px-2.5 py-1 rounded transition no-underline flex items-center gap-1"
              >
                <i className="fa fa-house text-[11px]"></i> Home
              </Link>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-6 flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            {/* ============================================================== */}
            {/* TAB 1: BLOGS MANAGEMENT                                        */}
            {/* ============================================================== */}
            {activeTab === "blogs" && (
              <div>
                {/* Header row with Add Button */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-slate-200">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900 m-0">
                      Blog Articles & Guides
                    </h1>
                    <p className="text-xs text-slate-500 m-0 mt-1">
                      Publish, edit, and optimize financial articles with real-time slug routing.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleOpenCreateBlog}
                    style={{ backgroundColor: "#b69455" }}
                    className="hover:bg-[#96773d] text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-sm transition border-none cursor-pointer"
                  >
                    <i className="fa fa-plus"></i>
                    <span>Add New Article</span>
                  </button>
                </div>

                {/* Filter and Search Bar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
                  {/* Search Input */}
                  <div className="md:col-span-2 relative">
                    <input
                      type="text"
                      placeholder="Search articles by title, author, slug or tag..."
                      value={blogSearch}
                      onChange={(e) => setBlogSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-[#b69455] transition"
                    />
                    <i className="fa fa-search absolute left-3 top-3 text-slate-400 text-xs pointer-events-none"></i>
                    {blogSearch && (
                      <button
                        onClick={() => setBlogSearch("")}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Category Filter */}
                  <div>
                    <select
                      value={blogCategoryFilter}
                      onChange={(e) => setBlogCategoryFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-700 focus:outline-none focus:border-[#b69455]"
                    >
                      {allCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat === "All" ? "All Categories" : cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Blog Articles Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-xs text-slate-700">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                        <th className="p-3 w-12 text-center">#</th>
                        <th className="p-3 w-20">Cover</th>
                        <th className="p-3">Title & URL Slug</th>
                        <th className="p-3 w-32">Category</th>
                        <th className="p-3 w-36">Author</th>
                        <th className="p-3 w-28">Date</th>
                        <th className="p-3 w-24 text-center">Featured</th>
                        <th className="p-3 w-40 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {blogsLoading ? (
                        <tr>
                          <td colSpan={8} className="text-center py-12 text-slate-400">
                            <i className="fa fa-spinner fa-spin text-lg mr-2"></i> Loading articles...
                          </td>
                        </tr>
                      ) : filteredBlogs.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="text-center py-12 text-slate-400">
                            No articles match your search criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredBlogs.map((blog, idx) => (
                          <tr key={blog.slug} className="hover:bg-slate-50/80 transition">
                            <td className="p-3 text-center font-bold text-slate-400">
                              {idx + 1}
                            </td>
                            <td className="p-3">
                              <img
                                src={blog.coverImage || "/images/homeloan.avif"}
                                alt={blog.title}
                                className="w-16 h-12 object-cover rounded-md border border-slate-200"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "/images/homeloan.avif";
                                }}
                              />
                            </td>
                            <td className="p-3">
                              <div className="font-bold text-slate-900 text-sm mb-0.5 line-clamp-1">
                                {blog.title}
                              </div>
                              <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                                <span>/blogs/{blog.slug}</span>
                                <Link
                                  href={`/blogs/${blog.slug}`}
                                  target="_blank"
                                  className="text-[#b69455] hover:underline"
                                  title="Open live article"
                                >
                                  <i className="fa fa-arrow-up-right-from-square text-[10px]"></i>
                                </Link>
                              </div>
                            </td>
                            <td className="p-3">
                              <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#eef7f8] text-[#094b57]">
                                {blog.category}
                              </span>
                            </td>
                            <td className="p-3">
                              <div className="font-semibold text-slate-800">
                                {blog.author?.name || "Arun Mehta"}
                              </div>
                              <div className="text-[11px] text-slate-400 truncate max-w-[130px]">
                                {blog.author?.role || "Consultant"}
                              </div>
                            </td>
                            <td className="p-3 text-slate-500 font-medium">
                              {blog.publishedDate}
                            </td>
                            <td className="p-3 text-center">
                              {blog.featured ? (
                                <span className="inline-flex items-center gap-1 text-amber-600 font-bold text-[11px] bg-amber-50 px-2 py-0.5 rounded-full">
                                  <i className="fa fa-star text-[10px]"></i> Yes
                                </span>
                              ) : (
                                <span className="text-slate-300 text-xs">—</span>
                              )}
                            </td>
                            <td className="p-3 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <Link
                                  href={`/blogs/${blog.slug}`}
                                  target="_blank"
                                  className="p-1.5 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                                  title="Preview live"
                                >
                                  <i className="fa fa-eye"></i>
                                </Link>
                                <button
                                  type="button"
                                  onClick={() => handleOpenEditBlog(blog)}
                                  className="p-1.5 rounded text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition border-none bg-transparent cursor-pointer"
                                  title="Edit Article"
                                >
                                  <i className="fa fa-pen-to-square"></i>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteBlog(blog.slug, blog.title)}
                                  className="p-1.5 rounded text-red-600 hover:text-red-800 hover:bg-red-50 transition border-none bg-transparent cursor-pointer"
                                  title="Delete Article"
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* TAB 2: CONTACT DETAILS                                         */}
            {/* ============================================================== */}
            {activeTab === "contact" && (
              <div>
                <h1 className="text-2xl font-bold text-center mb-2 text-slate-800">
                  Contact Details
                </h1>
                <hr className="mb-6 border-slate-200" />

                <div className="overflow-x-auto">
                  <table id="customers" className="w-full">
                    <thead>
                      <tr>
                        <th style={{ width: "50px" }}>Id</th>
                        <th>Firstname</th>
                        <th>Mobile No.</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Message</th>
                        <th style={{ width: "100px", textAlign: "center" }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contactLeads.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-6 text-slate-500">
                            No contact inquiries found.
                          </td>
                        </tr>
                      ) : (
                        contactLeads.map((row, idx) => (
                          <tr key={row.id || idx}>
                            <td className="serial font-semibold text-center">{idx + 1}</td>
                            <td className="font-medium text-slate-900">{row.name}</td>
                            <td>
                              <a
                                href={`tel:${row.phone}`}
                                className="text-blue-600 hover:underline"
                              >
                                {row.phone}
                              </a>
                            </td>
                            <td>{row.email}</td>
                            <td>{row.address || "Jaipur"}</td>
                            <td className="text-slate-600 text-xs">{row.message}</td>
                            <td className="text-center">
                              <button
                                type="button"
                                onClick={() => handleDelete("contact", row.id)}
                                className="bg-[#dc3545] hover:bg-[#bb2d3b] text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider transition border-none cursor-pointer"
                              >
                                DELETE
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* TAB 3: PARTNER LEADS                                           */}
            {/* ============================================================== */}
            {activeTab === "partner" && (
              <div>
                <h1 className="text-2xl font-bold text-center mb-2 text-slate-800">
                  Partner with Us Leads
                </h1>
                <hr className="mb-6 border-slate-200" />

                <div className="overflow-x-auto">
                  <table id="customers" className="w-full">
                    <thead>
                      <tr>
                        <th style={{ width: "50px" }}>Id</th>
                        <th>Firstname</th>
                        <th>Email</th>
                        <th>Mobile No.</th>
                        <th>Country</th>
                        <th>City</th>
                        <th>Product</th>
                        <th>Message</th>
                        <th style={{ width: "100px", textAlign: "center" }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {partnerLeads.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="text-center py-6 text-slate-500">
                            No partner inquiries found.
                          </td>
                        </tr>
                      ) : (
                        partnerLeads.map((row, idx) => (
                          <tr key={row.id || idx}>
                            <td className="serial font-semibold text-center">{idx + 1}</td>
                            <td className="font-medium text-slate-900">{row.name}</td>
                            <td>{row.email}</td>
                            <td>
                              <a
                                href={`tel:${row.mobile}`}
                                className="text-blue-600 hover:underline"
                              >
                                {row.mobile}
                              </a>
                            </td>
                            <td>{row.country || "India"}</td>
                            <td>{row.city || "Jaipur"}</td>
                            <td>
                              <span className="font-semibold text-[#083d5d]">
                                {row.product || row.product_interest || "All"}
                              </span>
                            </td>
                            <td className="text-slate-600 text-xs">{row.message}</td>
                            <td className="text-center">
                              <button
                                type="button"
                                onClick={() => handleDelete("partner", row.id)}
                                className="bg-[#dc3545] hover:bg-[#bb2d3b] text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider transition border-none cursor-pointer"
                              >
                                DELETE
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* TAB 4: LOAN ENQUIRY                                            */}
            {/* ============================================================== */}
            {activeTab === "loan" && (
              <div>
                <h1 className="text-2xl font-bold text-center mb-2 text-slate-800">
                  Loan Enquiry Details
                </h1>
                <hr className="mb-6 border-slate-200" />

                <div className="overflow-x-auto">
                  <table id="customers" className="w-full">
                    <thead>
                      <tr>
                        <th style={{ width: "50px" }}>Id</th>
                        <th>Firstname</th>
                        <th>Mobile No.</th>
                        <th>Email</th>
                        <th>Loan Amount</th>
                        <th>Loan Type</th>
                        <th style={{ width: "100px", textAlign: "center" }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loanLeads.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-6 text-slate-500">
                            No loan inquiries found.
                          </td>
                        </tr>
                      ) : (
                        loanLeads.map((row, idx) => (
                          <tr key={row.id || idx}>
                            <td className="serial font-semibold text-center">{idx + 1}</td>
                            <td className="font-medium text-slate-900">{row.name}</td>
                            <td>
                              <a
                                href={`tel:${row.phone}`}
                                className="text-blue-600 hover:underline"
                              >
                                {row.phone}
                              </a>
                            </td>
                            <td>{row.email || "—"}</td>
                            <td className="font-semibold text-emerald-700">
                              {row.amount || row.loan_amount || "—"}
                            </td>
                            <td>
                              <span className="bg-[#083d5d]/10 text-[#083d5d] px-2 py-0.5 rounded text-xs font-bold">
                                {row.loan_type || row.product_name || "Loan"}
                              </span>
                            </td>
                            <td className="text-center">
                              <button
                                type="button"
                                onClick={() => handleDelete("loan", row.id)}
                                className="bg-[#dc3545] hover:bg-[#bb2d3b] text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider transition border-none cursor-pointer"
                              >
                                DELETE
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* TAB 5: POP UP BANNER                                           */}
            {/* ============================================================== */}
            {activeTab === "banner" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <button
                    type="button"
                    onClick={() => setShowAddBannerModal(true)}
                    className="bg-[#0d6efd] hover:bg-[#0b5ed7] text-white px-4 py-2 rounded font-semibold text-sm transition border-none cursor-pointer"
                  >
                    POP UP Image Add
                  </button>
                </div>

                <h1 className="text-2xl font-bold text-center mb-2 text-slate-800">
                  POP UP Image
                </h1>
                <hr className="mb-6 border-slate-200" />

                <div className="overflow-x-auto">
                  <table id="customers" className="w-full">
                    <thead>
                      <tr>
                        <th style={{ width: "50px" }}>Id</th>
                        <th>Slider</th>
                        <th style={{ width: "100px", textAlign: "center" }}>Delete</th>
                        <th style={{ width: "100px", textAlign: "center" }}>Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {banners.map((row, idx) => (
                        <tr key={row.id || idx}>
                          <td className="serial font-semibold text-center">{idx + 1}</td>
                          <td>
                            <img
                              src={`/admin/upload_doc/${row.homeslider}`}
                              alt="Slider"
                              className="h-20 max-w-[200px] object-cover rounded border border-slate-200"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = `/img/${row.homeslider}`;
                              }}
                            />
                            <span className="text-xs text-slate-500 block mt-1">
                              {row.homeslider}
                            </span>
                          </td>
                          <td className="text-center">
                            <button
                              type="button"
                              onClick={() => handleDelete("banner", row.id)}
                              className="bg-[#dc3545] hover:bg-[#bb2d3b] text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider transition border-none cursor-pointer"
                            >
                              DELETE
                            </button>
                          </td>
                          <td className="text-center">
                            <button
                              type="button"
                              onClick={() => alert(`Editing slider: ${row.homeslider}`)}
                              className="bg-[#0d6efd] hover:bg-[#0b5ed7] text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider transition border-none cursor-pointer"
                            >
                              EDIT
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ==================================================================== */}
      {/* ADD / EDIT BLOG ARTICLE MODAL                                        */}
      {/* ==================================================================== */}
      {showBlogModal && (
        <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-3 sm:p-5 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#b69455] flex items-center justify-center font-bold text-white text-sm">
                  <i className={`fa ${editingBlog ? "fa-pen-to-square" : "fa-plus"}`}></i>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white m-0">
                    {editingBlog ? "Edit Blog Article" : "Create New Blog Article"}
                  </h3>
                  <p className="text-[11px] text-slate-400 m-0">
                    {editingBlog
                      ? `Updating: ${editingBlog.title}`
                      : "Fill in the details to publish a new financial advisory article"}
                  </p>
                </div>
              </div>

              {/* Mode Toggle (Edit vs Preview) */}
              <div className="flex items-center gap-2">
                <div className="bg-slate-800 p-0.5 rounded-lg flex items-center text-xs">
                  <button
                    type="button"
                    onClick={() => setBlogModalTab("edit")}
                    className={`px-3 py-1.5 rounded-md font-semibold border-none cursor-pointer transition ${
                      blogModalTab === "edit"
                        ? "bg-[#b69455] text-white"
                        : "bg-transparent text-slate-400 hover:text-white"
                    }`}
                  >
                    <i className="fa fa-code mr-1.5"></i> Editor
                  </button>
                  <button
                    type="button"
                    onClick={() => setBlogModalTab("preview")}
                    className={`px-3 py-1.5 rounded-md font-semibold border-none cursor-pointer transition ${
                      blogModalTab === "preview"
                        ? "bg-[#b69455] text-white"
                        : "bg-transparent text-slate-400 hover:text-white"
                    }`}
                  >
                    <i className="fa fa-eye mr-1.5"></i> Live Preview
                  </button>
                </div>

                <button
                  onClick={() => setShowBlogModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center border-none cursor-pointer transition ml-2"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {blogModalTab === "edit" ? (
                <form id="blog-editor-form" onSubmit={handleSaveBlog} className="space-y-5">
                  {/* Title & Slug */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Article Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Complete Guide to Business Loan Subsidies in Jaipur (2025)"
                        value={blogForm.title}
                        onChange={(e) => {
                          const newTitle = e.target.value;
                          setBlogForm((prev) => ({
                            ...prev,
                            title: newTitle,
                            // Auto-generate slug on new article if not manually edited
                            slug:
                              !editingBlog && (!prev.slug || prev.slug === "")
                                ? newTitle
                                    .toLowerCase()
                                    .replace(/[^a-z0-9]+/g, "-")
                                    .replace(/^-+|-+$/g, "")
                                : prev.slug
                          }));
                        }}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#b69455]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        URL Slug <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center">
                        <span className="bg-slate-100 border border-r-0 border-slate-300 px-2.5 py-2 text-xs text-slate-500 rounded-l-lg select-none font-mono">
                          /blogs/
                        </span>
                        <input
                          type="text"
                          placeholder="business-loan-subsidies-jaipur-guide"
                          value={blogForm.slug}
                          onChange={(e) =>
                            setBlogForm((prev) => ({
                              ...prev,
                              slug: e.target.value
                                .toLowerCase()
                                .replace(/[^a-z0-9-]+/g, "-")
                            }))
                          }
                          className="w-full border border-slate-300 rounded-r-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#b69455]"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Category, Read Time, Published Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Category
                      </label>
                      <select
                        value={blogForm.category}
                        onChange={(e) =>
                          setBlogForm((prev) => ({ ...prev, category: e.target.value }))
                        }
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#b69455]"
                      >
                        <option value="Loans">Loans</option>
                        <option value="Investments">Investments</option>
                        <option value="NRI Advisory">NRI Advisory</option>
                        <option value="Business Loans">Business Loans</option>
                        <option value="Insurance">Insurance</option>
                        <option value="Taxation">Taxation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Estimated Read Time
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 6 min read"
                        value={blogForm.readTime}
                        onChange={(e) =>
                          setBlogForm((prev) => ({ ...prev, readTime: e.target.value }))
                        }
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#b69455]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Published Date
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. October 24, 2025"
                        value={blogForm.publishedDate}
                        onChange={(e) =>
                          setBlogForm((prev) => ({ ...prev, publishedDate: e.target.value }))
                        }
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#b69455]"
                      />
                    </div>
                  </div>

                  {/* Author details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Author Name
                      </label>
                      <input
                        type="text"
                        placeholder="Arun Mehta"
                        value={blogForm.authorName}
                        onChange={(e) =>
                          setBlogForm((prev) => ({ ...prev, authorName: e.target.value }))
                        }
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#b69455]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Author Title / Role
                      </label>
                      <input
                        type="text"
                        placeholder="Senior Financial Consultant, SKS INFI"
                        value={blogForm.authorRole}
                        onChange={(e) =>
                          setBlogForm((prev) => ({ ...prev, authorRole: e.target.value }))
                        }
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#b69455]"
                      />
                    </div>
                  </div>

                  {/* Cover Image & Presets */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Cover Image URL or Path
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="/images/homeloan.avif or https://..."
                        value={blogForm.coverImage}
                        onChange={(e) =>
                          setBlogForm((prev) => ({ ...prev, coverImage: e.target.value }))
                        }
                        className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#b69455]"
                      />
                      {blogForm.coverImage && (
                        <img
                          src={blogForm.coverImage}
                          alt="Cover Preview"
                          className="w-10 h-9 object-cover rounded border border-slate-200"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/homeloan.avif";
                          }}
                        />
                      )}
                    </div>
                    {/* Quick Presets */}
                    <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-500">
                      <span>Presets:</span>
                      {PRESET_COVERS.map((preset) => (
                        <button
                          key={preset.url}
                          type="button"
                          onClick={() =>
                            setBlogForm((prev) => ({ ...prev, coverImage: preset.url }))
                          }
                          className="bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded text-slate-700 text-[11px] border-none cursor-pointer transition"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Featured Checkbox */}
                  <div className="flex items-center gap-2.5 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <input
                      type="checkbox"
                      id="featured-checkbox"
                      checked={blogForm.featured}
                      onChange={(e) =>
                        setBlogForm((prev) => ({ ...prev, featured: e.target.checked }))
                      }
                      className="w-4 h-4 text-[#b69455] rounded cursor-pointer"
                    />
                    <label
                      htmlFor="featured-checkbox"
                      className="text-xs font-semibold text-slate-800 cursor-pointer select-none"
                    >
                      ⭐ Mark as Featured Article (Prominently displayed at the top of the blog page)
                    </label>
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Short Excerpt & SEO Meta Description
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Brief 1-2 sentence overview shown on blog cards and Google search results (150-200 chars)..."
                      value={blogForm.excerpt}
                      onChange={(e) =>
                        setBlogForm((prev) => ({ ...prev, excerpt: e.target.value }))
                      }
                      className="w-full border border-slate-300 rounded-lg p-3 text-xs focus:outline-none focus:border-[#b69455]"
                    />
                  </div>

                  {/* Key Takeaways */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Key Takeaways & Highlights (One per line)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Enter 3-4 bullet takeaways, one per line..."
                      value={blogForm.takeaways}
                      onChange={(e) =>
                        setBlogForm((prev) => ({ ...prev, takeaways: e.target.value }))
                      }
                      className="w-full border border-slate-300 rounded-lg p-3 text-xs font-mono focus:outline-none focus:border-[#b69455]"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Tags / Keywords (Comma-separated)
                    </label>
                    <input
                      type="text"
                      placeholder="Home Loan, Jaipur, Interest Rates, CIBIL, Subsidy"
                      value={blogForm.tags}
                      onChange={(e) =>
                        setBlogForm((prev) => ({ ...prev, tags: e.target.value }))
                      }
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#b69455]"
                    />
                  </div>

                  {/* Rich Content Editor */}
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase m-0">
                        Article Content (HTML / Rich Text) <span className="text-red-500">*</span>
                      </label>

                      {/* Quick formatting toolbar */}
                      <div className="flex flex-wrap items-center gap-1">
                        <button
                          type="button"
                          onClick={() =>
                            insertContentSnippet(
                              "<h2>Section Subtitle Here</h2>\n<p>Explain the detailed regulatory or advisory concept here...</p>"
                            )
                          }
                          className="text-[11px] bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded text-slate-700 border-none cursor-pointer"
                        >
                          + H2 Heading
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            insertContentSnippet(
                              "<h3>Sub-topic Detail</h3>\n<p>Elaborate specific points...</p>"
                            )
                          }
                          className="text-[11px] bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded text-slate-700 border-none cursor-pointer"
                        >
                          + H3
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            insertContentSnippet(
                              "<ul>\n  <li><strong>Point 1:</strong> Benefit explanation</li>\n  <li><strong>Point 2:</strong> Documentation prerequisite</li>\n</ul>"
                            )
                          }
                          className="text-[11px] bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded text-slate-700 border-none cursor-pointer"
                        >
                          + Bullet List
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            insertContentSnippet(
                              '<div style="background:#f1f7f8;border-left:4px solid #094b57;padding:16px;border-radius:8px;margin:20px 0;">\n  <strong>Expert Recommendation:</strong> Consult SKS INFI advisors to verify your eligibility before formal credit submission.\n</div>'
                            )
                          }
                          className="text-[11px] bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded text-[#094b57] font-semibold border-none cursor-pointer"
                        >
                          + Callout Box
                        </button>
                      </div>
                    </div>

                    <textarea
                      rows={12}
                      placeholder="Write your article HTML content here..."
                      value={blogForm.content}
                      onChange={(e) =>
                        setBlogForm((prev) => ({ ...prev, content: e.target.value }))
                      }
                      className="w-full border border-slate-300 rounded-lg p-3 text-xs font-mono leading-relaxed focus:outline-none focus:border-[#b69455]"
                      required
                    />
                  </div>
                </form>
              ) : (
                /* LIVE ARTICLE PREVIEW TAB */
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 space-y-6">
                  {/* Category & Date */}
                  <div className="flex items-center gap-3 text-xs">
                    <span className="px-3 py-1 rounded-full font-bold bg-[#eef7f8] text-[#094b57]">
                      {blogForm.category}
                    </span>
                    <span className="text-slate-500">{blogForm.publishedDate}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500">{blogForm.readTime}</span>
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#094b57] leading-tight m-0">
                    {blogForm.title || "Untitled Article"}
                  </h1>

                  {/* Excerpt */}
                  {blogForm.excerpt && (
                    <p className="text-sm text-slate-600 leading-relaxed italic m-0">
                      {blogForm.excerpt}
                    </p>
                  )}

                  {/* Author Card */}
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 w-fit">
                    <img
                      src={blogForm.authorAvatar || "/images/user (1).png"}
                      alt={blogForm.authorName}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {blogForm.authorName}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {blogForm.authorRole}
                      </div>
                    </div>
                  </div>

                  {/* Cover Image */}
                  {blogForm.coverImage && (
                    <img
                      src={blogForm.coverImage}
                      alt={blogForm.title}
                      className="w-full max-h-80 object-cover rounded-xl shadow-sm"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/homeloan.avif";
                      }}
                    />
                  )}

                  {/* Key Takeaways Box */}
                  {blogForm.takeaways && (
                    <div className="bg-emerald-50/70 border-l-4 border-emerald-600 p-4 rounded-r-xl">
                      <div className="font-bold text-xs uppercase tracking-wider text-emerald-900 mb-2">
                        Key Takeaways
                      </div>
                      <ul className="text-xs space-y-1.5 text-emerald-800 m-0 pl-4">
                        {blogForm.takeaways
                          .split("\n")
                          .filter(Boolean)
                          .map((t, idx) => (
                            <li key={idx}>{t}</li>
                          ))}
                      </ul>
                    </div>
                  )}

                  {/* Rendered HTML Content */}
                  <div
                    className="prose prose-sm max-w-none text-slate-800 leading-relaxed bg-white p-6 rounded-xl border border-slate-200"
                    dangerouslySetInnerHTML={{ __html: blogForm.content }}
                  />

                  {/* Tags */}
                  {blogForm.tags && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-2">
                      <span className="text-xs font-bold text-slate-500">Tags:</span>
                      {blogForm.tags.split(",").map((t, i) => (
                        <span
                          key={i}
                          className="text-[11px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded"
                        >
                          {t.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
              <div className="text-xs text-slate-500">
                {blogModalTab === "edit" ? (
                  <span>Click 'Live Preview' above to see formatted article layout.</span>
                ) : (
                  <span>Reviewing layout preview. Switch back to Edit to make changes.</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowBlogModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition bg-white cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  form="blog-editor-form"
                  disabled={blogSaving}
                  style={{ backgroundColor: "#b69455" }}
                  className="px-5 py-2 rounded-lg text-xs font-bold text-white hover:bg-[#96773d] transition flex items-center gap-2 shadow-sm border-none cursor-pointer disabled:opacity-50"
                >
                  {blogSaving && <i className="fa fa-spinner fa-spin"></i>}
                  <span>
                    {editingBlog ? "Save Article Changes" : "Publish Article Now"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* ADD BANNER MODAL                                                     */}
      {/* ==================================================================== */}
      {showAddBannerModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Add POP UP Image</h3>
            <form onSubmit={handleAddBanner}>
              <div className="mb-4">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Image File Name or Path (in admin/upload_doc)
                </label>
                <input
                  type="text"
                  placeholder="e.g. homeloan (1).jpg or mortageloan.jpg"
                  value={newBannerName}
                  onChange={(e) => setNewBannerName(e.target.value)}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#083d5d]"
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddBannerModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded text-sm text-slate-600 hover:bg-slate-50 border-none cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#083d5d] text-white rounded text-sm font-semibold hover:bg-[#062c43] border-none cursor-pointer"
                >
                  Save Image
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
