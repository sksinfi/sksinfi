"use client";

import React, { useState, useMemo } from "react";
import { Landmark, ArrowRight, CheckCircle2 } from "lucide-react";

interface LoanEMICalculatorProps {
  onApplyLoan?: (loanType?: string) => void;
}

export default function LoanEMICalculator({ onApplyLoan }: LoanEMICalculatorProps) {
  const [loanAmount, setLoanAmount] = useState<number>(3500000); // 35 Lakhs default
  const [interestRate, setInterestRate] = useState<number>(8.75); // 8.75% default
  const [tenureYears, setTenureYears] = useState<number>(20); // 20 years default

  const { monthlyEMI, totalPayment, totalInterest } = useMemo(() => {
    const P = loanAmount;
    const r = interestRate / (12 * 100);
    const n = tenureYears * 12;

    let emi = 0;
    if (r > 0 && n > 0) {
      emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else {
      emi = P / (n || 1);
    }

    const total = emi * n;
    const interest = total - P;

    return {
      monthlyEMI: Math.round(emi),
      totalPayment: Math.round(total),
      totalInterest: Math.round(interest)
    };
  }, [loanAmount, interestRate, tenureYears]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(val);
  };

  const principalPercent = totalPayment > 0 ? (loanAmount / totalPayment) * 100 : 50;
  const interestPercent = 100 - principalPercent;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-100 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-slate-100 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold mb-2">
            <Landmark size={14} />
            <span>Loan EMI & Repayment Planner</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#094b57]">
            Calculate Your Monthly Loan EMI
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Compare monthly installments for Home Loans, Business Loans, and LAP.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sliders */}
        <div className="lg:col-span-7 space-y-8">
          {/* Loan Amount */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-700">
                Loan Amount Required
              </label>
              <div className="px-3 py-1.5 rounded-lg bg-sky-50 text-sky-800 font-extrabold text-sm border border-sky-200">
                {formatCurrency(loanAmount)}
              </div>
            </div>
            <input
              type="range"
              min={100000}
              max={30000000}
              step={50000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-semibold text-slate-400">
              <span>₹1 Lakh</span>
              <span>₹1.5 Crore</span>
              <span>₹3 Crore+</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-700">
                Annual Interest Rate (% p.a.)
              </label>
              <div className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-extrabold text-sm border border-emerald-200">
                {interestRate}%
              </div>
            </div>
            <input
              type="range"
              min={7.5}
              max={18}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-semibold text-slate-400">
              <span>7.5% (Prime Home Loan)</span>
              <span>11% (Business Loan)</span>
              <span>18%</span>
            </div>
          </div>

          {/* Tenure */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-700">
                Loan Tenure
              </label>
              <div className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 font-extrabold text-sm border border-amber-200">
                {tenureYears} Years ({tenureYears * 12} Months)
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-semibold text-slate-400">
              <span>1 Year</span>
              <span>15 Years</span>
              <span>30 Years</span>
            </div>
          </div>
        </div>

        {/* Breakdown Card */}
        <div
          style={{
            background: "linear-gradient(135deg, #094b57 0%, #04242a 100%)",
            color: "#ffffff"
          }}
          className="lg:col-span-5 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl text-white"
        >
          <div>
            <div className="text-xs uppercase tracking-wider text-[#f9f0df] font-bold mb-1">
              Monthly Payable EMI
            </div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-6">
              {formatCurrency(monthlyEMI)}
              <span className="text-xs font-normal text-slate-300"> / month</span>
            </div>

            <div className="space-y-2 mb-6">
              <div className="text-xs font-semibold text-slate-300 flex justify-between">
                <span>Principal: {Math.round(principalPercent)}%</span>
                <span className="text-[#e2c58a]">Interest: {Math.round(interestPercent)}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-black/30 overflow-hidden flex">
                <div
                  style={{ width: `${principalPercent}%` }}
                  className="bg-[#c2d7da] h-full transition-all duration-300"
                />
                <div
                  style={{ width: `${interestPercent}%` }}
                  className="bg-[#b69455] h-full transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c2d7da] inline-block" />
                  Principal Loan Amount
                </span>
                <span className="font-bold">{formatCurrency(loanAmount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#b69455] inline-block" />
                  Total Interest Payable
                </span>
                <span className="font-bold text-[#f9f0df]">{formatCurrency(totalInterest)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-white/5 font-extrabold text-base">
                <span className="text-white">Total Repayment</span>
                <span className="text-white">{formatCurrency(totalPayment)}</span>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <button
              onClick={() => onApplyLoan && onApplyLoan("Loan")}
              style={{
                background: "linear-gradient(to right, #b69455, #cba96e)",
                color: "#ffffff"
              }}
              className="w-full font-bold py-3.5 px-6 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-transform transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Apply for this Loan at Lowest Rates</span>
              <ArrowRight size={16} />
            </button>
            <div className="text-center text-[11px] text-slate-300 mt-2">
              Sanction in 48-72 hours • 50+ Banks Compared
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
