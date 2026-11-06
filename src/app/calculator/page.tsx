"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SIPCalculator from "@/components/SIPCalculator";
import LoanEMICalculator from "@/components/LoanEMICalculator";
import EnquiryModal from "@/components/EnquiryModal";
import { Calculator, ArrowLeft } from "lucide-react";

export default function CalculatorPage() {
  const [activeTab, setActiveTab] = useState<"sip" | "emi">("sip");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState("Investments");
  const [modalProduct, setModalProduct] = useState("Mutual Fund SIP");

  const openEnquiry = (category = "Investments", product = "Mutual Fund SIP") => {
    setModalCategory(category);
    setModalProduct(product);
    setModalOpen(true);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-[#fbfbfa] overflow-x-hidden w-full">
        <Navbar onOpenEnquiry={openEnquiry} />
        <div
        style={{
          background: "linear-gradient(135deg, #094b57 0%, #0d6170 50%, #094b57 100%)",
          color: "#ffffff"
        }}
        className="py-10 sm:py-12 px-4 sm:px-6 shadow-md"
      >
        <div className="max-w-5xl mx-auto text-center space-y-3">
          <div
            style={{ backgroundColor: "rgba(255, 255, 255, 0.12)", borderColor: "rgba(255, 255, 255, 0.2)" }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[#f9f0df] text-xs font-semibold tracking-wide border"
          >
            <Calculator size={14} className="text-[#b69455]" />
            <span>Financial Planning Hub</span>
          </div>
          <h1
            style={{ color: "#ffffff" }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2"
          >
            Financial Calculators & Wealth Planners
          </h1>
          <p style={{ color: "#e2e8f0" }} className="text-sm max-w-xl mx-auto font-light">
            Simulate your Systematic Investment Plan (SIP) compounding returns and compute accurate monthly loan EMIs.
          </p>

          <div className="pt-4 flex justify-center">
            <div
              style={{ backgroundColor: "rgba(0, 0, 0, 0.25)", borderColor: "rgba(255, 255, 255, 0.15)" }}
              className="inline-flex p-1.5 rounded-2xl backdrop-blur-md border"
            >
              <button
                onClick={() => setActiveTab("sip")}
                style={{
                  backgroundColor: activeTab === "sip" ? "#b69455" : "transparent",
                  color: "#ffffff"
                }}
                className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 shadow-sm"
              >
                SIP Wealth Calculator
              </button>
              <button
                onClick={() => setActiveTab("emi")}
                style={{
                  backgroundColor: activeTab === "emi" ? "#b69455" : "transparent",
                  color: "#ffffff"
                }}
                className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 shadow-sm"
              >
                Loan EMI Calculator
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-[1240px] mx-auto px-4 sm:px-6 py-12 w-full">
        {activeTab === "sip" ? (
          <SIPCalculator onStartSIP={() => openEnquiry("Investments", "Mutual Fund SIP")} />
        ) : (
          <LoanEMICalculator onApplyLoan={(loanType) => openEnquiry("Loans", loanType || "Home Loan")} />
        )}
      </main>

        <Footer />
      </div>
      {modalOpen ? (
        <EnquiryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialCategory={modalCategory}
          initialProduct={modalProduct}
        />
      ) : null}
    </>
  );
}
