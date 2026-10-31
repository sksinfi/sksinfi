"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"banner" | "partner" | "loan" | "contact">("contact");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const [contactLeads, setContactLeads] = useState<any[]>([]);
  const [partnerLeads, setPartnerLeads] = useState<any[]>([]);
  const [loanLeads, setLoanLeads] = useState<any[]>([]);
  const [banners, setBanners] = useState<any[]>([
    { id: 1, homeslider: "homeloan (1).jpg" },
    { id: 2, homeslider: "mortageloan.jpg" },
  ]);

  const [showAddBannerModal, setShowAddBannerModal] = useState(false);
  const [newBannerName, setNewBannerName] = useState("");

  const isConfigured = isSupabaseConfigured();

  const fetchAllData = async () => {
    setLoading(true);
    try {
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

          // Default initial rows matching legacy table
          if (contacts.length === 0) {
            contacts = [
              {
                id: 1,
                name: "Vikram Sharma",
                phone: "9928529222",
                email: "vikram@example.com",
                address: "New Aatish Market, Jaipur",
                message: "Need consulting for Commercial Vehicle Loan",
              },
              {
                id: 2,
                name: "Amit Mehta",
                phone: "9829012345",
                email: "amit.mehta@example.com",
                address: "Patrakar Colony, Mansarovar",
                message: "Looking for Home loan & property insurance",
              },
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
                message: "Interested in becoming a business loan DSA partner",
              },
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
                loan_type: "Home Loan",
              },
              {
                id: 2,
                name: "Deepak Soni",
                phone: "9785233112",
                email: "deepak@example.com",
                amount: "₹ 15,00,000",
                loan_type: "Business LOAN",
              },
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

  const handleDelete = async (type: "contact" | "partner" | "loan" | "banner", id: any) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    if (type === "contact") {
      setContactLeads((prev) => prev.filter((item) => item.id !== id));
      if (isConfigured && supabase) {
        await supabase.from("contact_enquiries").delete().eq("id", id);
      } else {
        const stored = JSON.parse(localStorage.getItem("sks_local_contacts") || "[]");
        localStorage.setItem("sks_local_contacts", JSON.stringify(stored.filter((i: any) => i.id !== id)));
      }
    } else if (type === "partner") {
      setPartnerLeads((prev) => prev.filter((item) => item.id !== id));
      if (isConfigured && supabase) {
        await supabase.from("partner_enquiries").delete().eq("id", id);
      } else {
        const stored = JSON.parse(localStorage.getItem("sks_local_partners") || "[]");
        localStorage.setItem("sks_local_partners", JSON.stringify(stored.filter((i: any) => i.id !== id)));
      }
    } else if (type === "loan") {
      setLoanLeads((prev) => prev.filter((item) => item.id !== id));
      if (isConfigured && supabase) {
        await supabase.from("loan_enquiries").delete().eq("id", id);
      } else {
        const stored = JSON.parse(localStorage.getItem("sks_local_loans") || "[]");
        localStorage.setItem("sks_local_loans", JSON.stringify(stored.filter((i: any) => i.id !== id)));
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
        homeslider: newBannerName,
      },
    ]);
    setNewBannerName("");
    setShowAddBannerModal(false);
  };

  return (
    <div className="flex min-h-screen bg-[#f1f2f7] font-sans antialiased text-[#333]">
      {/* Left Panel Sidebar */}
      <aside
        id="left-panel"
        className={`bg-[#272c33] text-white flex-shrink-0 transition-all duration-300 min-h-screen ${
          sidebarOpen ? "w-[240px]" : "w-0 overflow-hidden"
        }`}
      >
        <div className="p-4 border-b border-[#343b45]">
          <Link href="/" className="text-lg font-bold tracking-wider text-white flex items-center gap-2">
            <span className="text-[#b69455]">SKS INFI</span> ADMIN
          </Link>
        </div>

        <nav className="p-4">
          <div className="text-[11px] uppercase tracking-wider text-[#7e8d9f] font-bold mb-3">
            Menu
          </div>

          <ul className="space-y-1 text-sm">
            <li>
              <button
                type="button"
                onClick={() => setActiveTab("banner")}
                className={`w-full text-left px-3 py-2.5 rounded transition flex items-center gap-2.5 ${
                  activeTab === "banner"
                    ? "bg-[#083d5d] text-white font-bold"
                    : "text-[#a4b0be] hover:bg-[#343b45] hover:text-white"
                }`}
              >
                <i className="fa fa-image text-xs"></i>
                <span>POP UP Image</span>
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => setActiveTab("partner")}
                className={`w-full text-left px-3 py-2.5 rounded transition flex items-center gap-2.5 ${
                  activeTab === "partner"
                    ? "bg-[#083d5d] text-white font-bold"
                    : "text-[#a4b0be] hover:bg-[#343b45] hover:text-white"
                }`}
              >
                <i className="fa fa-handshake text-xs"></i>
                <span>Partner With Us</span>
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => setActiveTab("loan")}
                className={`w-full text-left px-3 py-2.5 rounded transition flex items-center gap-2.5 ${
                  activeTab === "loan"
                    ? "bg-[#083d5d] text-white font-bold"
                    : "text-[#a4b0be] hover:bg-[#343b45] hover:text-white"
                }`}
              >
                <i className="fa fa-money-bill-wave text-xs"></i>
                <span>Loan enquiry</span>
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => setActiveTab("contact")}
                className={`w-full text-left px-3 py-2.5 rounded transition flex items-center gap-2.5 ${
                  activeTab === "contact"
                    ? "bg-[#083d5d] text-white font-bold"
                    : "text-[#a4b0be] hover:bg-[#343b45] hover:text-white"
                }`}
              >
                <i className="fa fa-envelope text-xs"></i>
                <span>Contact Us</span>
              </button>
            </li>
          </ul>

          <div className="mt-8 pt-4 border-t border-[#343b45]">
            <Link
              href="/"
              className="text-xs text-[#a4b0be] hover:text-white flex items-center gap-2"
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
              className="text-slate-600 hover:text-slate-900 focus:outline-none"
              title="Toggle Menu"
            >
              <i className="fa fa-bars text-lg"></i>
            </button>
            <span className="text-sm font-semibold text-slate-700">
              {activeTab === "contact" && "Contact Leads"}
              {activeTab === "partner" && "Partner Applications"}
              {activeTab === "loan" && "Loan Inquiries"}
              {activeTab === "banner" && "Banner & Pop-Up Images"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={fetchAllData}
              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded flex items-center gap-1.5 transition"
              title="Refresh Data"
            >
              <i className={`fa fa-rotate-right ${loading ? "animate-spin" : ""}`}></i>
              <span>Refresh</span>
            </button>

            <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
              <span className="text-sm font-semibold text-slate-700">Welcome Admin</span>
              <Link
                href="/"
                className="text-xs bg-[#b69455] hover:bg-[#96773d] text-white px-2.5 py-1 rounded transition"
              >
                <i className="fa fa-power-off mr-1"></i> Logout
              </Link>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-6 flex-1">
          <div className="max-w-7xl mx-auto bg-white p-6 rounded shadow-sm border border-slate-200">
            {/* Section 1: Contact Details */}
            {activeTab === "contact" && (
              <div>
                <h1 className="text-2xl font-bold text-center mb-2 text-slate-800">
                  Contact Details
                </h1>
                <hr className="mb-6 border-slate-200" />

                <div className="overflow-x-auto">
                  <table id="customers">
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
                              <a href={`tel:${row.phone}`} className="text-blue-600 hover:underline">
                                {row.phone}
                              </a>
                            </td>
                            <td>
                              <a href={`mailto:${row.email}`} className="text-blue-600 hover:underline">
                                {row.email}
                              </a>
                            </td>
                            <td>{row.address || "-"}</td>
                            <td>{row.message || "-"}</td>
                            <td className="text-center">
                              <button
                                type="button"
                                onClick={() => handleDelete("contact", row.id)}
                                className="bg-[#dc3545] hover:bg-[#bb2d3b] text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider transition"
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

            {/* Section 2: Partner With Us */}
            {activeTab === "partner" && (
              <div>
                <h1 className="text-2xl font-bold text-center mb-2 text-slate-800">
                  Partner with us
                </h1>
                <hr className="mb-6 border-slate-200" />

                <div className="overflow-x-auto">
                  <table id="customers">
                    <thead>
                      <tr>
                        <th style={{ width: "50px" }}>Id</th>
                        <th>Name</th>
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
                            No partner submissions found.
                          </td>
                        </tr>
                      ) : (
                        partnerLeads.map((row, idx) => (
                          <tr key={row.id || idx}>
                            <td className="serial font-semibold text-center">{idx + 1}</td>
                            <td className="font-medium text-slate-900">{row.name}</td>
                            <td>
                              <a href={`mailto:${row.email}`} className="text-blue-600 hover:underline">
                                {row.email}
                              </a>
                            </td>
                            <td>
                              <a href={`tel:${row.mobile}`} className="text-blue-600 hover:underline">
                                {row.mobile}
                              </a>
                            </td>
                            <td>{row.country || "India"}</td>
                            <td>{row.city || "-"}</td>
                            <td>
                              <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded font-semibold">
                                {row.product || "General"}
                              </span>
                            </td>
                            <td>{row.message || "-"}</td>
                            <td className="text-center">
                              <button
                                type="button"
                                onClick={() => handleDelete("partner", row.id)}
                                className="bg-[#dc3545] hover:bg-[#bb2d3b] text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider transition"
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

            {/* Section 3: Loan Enquiry */}
            {activeTab === "loan" && (
              <div>
                <h1 className="text-2xl font-bold text-center mb-2 text-slate-800">
                  Loan enquiry
                </h1>
                <hr className="mb-6 border-slate-200" />

                <div className="overflow-x-auto">
                  <table id="customers">
                    <thead>
                      <tr>
                        <th style={{ width: "50px" }}>Id</th>
                        <th>Firstname</th>
                        <th>Mobile No.</th>
                        <th>Email</th>
                        <th>Amount</th>
                        <th>Type Loan</th>
                        <th style={{ width: "100px", textAlign: "center" }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loanLeads.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-6 text-slate-500">
                            No loan enquiries found.
                          </td>
                        </tr>
                      ) : (
                        loanLeads.map((row, idx) => (
                          <tr key={row.id || idx}>
                            <td className="serial font-semibold text-center">{idx + 1}</td>
                            <td className="font-medium text-slate-900">{row.name}</td>
                            <td>
                              <a href={`tel:${row.phone}`} className="text-blue-600 hover:underline">
                                {row.phone}
                              </a>
                            </td>
                            <td>
                              <a href={`mailto:${row.email}`} className="text-blue-600 hover:underline">
                                {row.email}
                              </a>
                            </td>
                            <td className="font-bold text-emerald-700">
                              {row.amount || row.loan_amount || "-"}
                            </td>
                            <td>
                              <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded font-medium">
                                {row.loan_type || row.product_name || "Loan"}
                              </span>
                            </td>
                            <td className="text-center">
                              <button
                                type="button"
                                onClick={() => handleDelete("loan", row.id)}
                                className="bg-[#dc3545] hover:bg-[#bb2d3b] text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider transition"
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

            {/* Section 4: POP UP Image */}
            {activeTab === "banner" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <button
                    type="button"
                    onClick={() => setShowAddBannerModal(true)}
                    className="bg-[#0d6efd] hover:bg-[#0b5ed7] text-white px-4 py-2 rounded font-semibold text-sm transition"
                  >
                    POP UP Image Add
                  </button>
                </div>

                <h1 className="text-2xl font-bold text-center mb-2 text-slate-800">
                  POP UP Image
                </h1>
                <hr className="mb-6 border-slate-200" />

                <div className="overflow-x-auto">
                  <table id="customers">
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
                            <span className="text-xs text-slate-500 block mt-1">{row.homeslider}</span>
                          </td>
                          <td className="text-center">
                            <button
                              type="button"
                              onClick={() => handleDelete("banner", row.id)}
                              className="bg-[#dc3545] hover:bg-[#bb2d3b] text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider transition"
                            >
                              DELETE
                            </button>
                          </td>
                          <td className="text-center">
                            <button
                              type="button"
                              onClick={() => alert(`Editing slider: ${row.homeslider}`)}
                              className="bg-[#0d6efd] hover:bg-[#0b5ed7] text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider transition"
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

      {/* Add Banner Modal */}
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
                  className="px-4 py-2 border border-slate-300 rounded text-sm text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#083d5d] text-white rounded text-sm font-semibold hover:bg-[#062c43]"
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
