"use client";

import React, { useState, useMemo } from "react";
import { TrendingUp, ArrowRight, ShieldCheck, Sparkles, PieChart } from "lucide-react";

interface SIPCalculatorProps {
  onStartSIP?: () => void;
}

export default function SIPCalculator({ onStartSIP }: SIPCalculatorProps) {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(10000);
  const [expectedReturn, setExpectedReturn] = useState<number>(14);
  const [timePeriodYears, setTimePeriodYears] = useState<number>(10);

  const { totalInvested, futureValue, wealthGained } = useMemo(() => {
    const months = timePeriodYears * 12;
    const monthlyRate = expectedReturn / (12 * 100);

    let fv = 0;
    if (monthlyRate > 0) {
      fv = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    } else {
      fv = monthlyInvestment * months;
    }

    const invested = monthlyInvestment * months;
    const gain = Math.max(0, fv - invested);

    return {
      totalInvested: Math.round(invested),
      futureValue: Math.round(fv),
      wealthGained: Math.round(gain)
    };
  }, [monthlyInvestment, expectedReturn, timePeriodYears]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(val);
  };

  const investedPercent = futureValue > 0 ? (totalInvested / futureValue) * 100 : 50;
  const gainPercent = 100 - investedPercent;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-100 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-slate-100 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-2">
            <TrendingUp size={14} />
            <span>SIP Wealth Accumulator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#094b57]">
            Calculate Your Mutual Fund SIP Returns
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            See the compounding power of disciplined monthly investing over time.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <ShieldCheck size={16} className="text-emerald-500" />
          <span>Formula Verified (Compound Growth)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sliders Side */}
        <div className="lg:col-span-7 space-y-8">
          {/* Monthly Investment */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-700">
                Monthly Investment
              </label>
              <div className="px-3 py-1.5 rounded-lg bg-sky-50 text-sky-800 font-extrabold text-sm border border-sky-200">
                {formatCurrency(monthlyInvestment)}
              </div>
            </div>
            <input
              type="range"
              min={500}
              max={100000}
              step={500}
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-semibold text-slate-400">
              <span>₹500</span>
              <span>₹50,000</span>
              <span>₹1,00,000</span>
            </div>
          </div>

          {/* Expected Return */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-700">
                Expected Annual Return Rate (CAGR)
              </label>
              <div className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-extrabold text-sm border border-emerald-200">
                {expectedReturn}% p.a.
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              step={0.5}
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-semibold text-slate-400">
              <span>1% (Debt/Liquid)</span>
              <span>12% (Balanced)</span>
              <span>18%+ (High Equity)</span>
            </div>
          </div>

          {/* Time Horizon */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-700">
                Investment Duration
              </label>
              <div className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 font-extrabold text-sm border border-amber-200">
                {timePeriodYears} {timePeriodYears === 1 ? "Year" : "Years"}
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={timePeriodYears}
              onChange={(e) => setTimePeriodYears(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-semibold text-slate-400">
              <span>1 Year</span>
              <span>10 Years</span>
              <span>30 Years</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-500 leading-relaxed">
            💡 <strong>SKS INFI Wealth Tip:</strong> Increasing your SIP by just 10% each year (Step-up SIP) can double your retirement corpus compared to a flat monthly installment.
          </div>
        </div>

        {/* Results Card Side */}
        <div
          style={{
            background: "linear-gradient(135deg, #094b57 0%, #04242a 100%)",
            color: "#ffffff"
          }}
          className="lg:col-span-5 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl text-white"
        >
          <div>
            <div className="text-xs uppercase tracking-wider text-[#f9f0df] font-bold mb-1">
              Estimated Total Corpus Value
            </div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-6">
              {formatCurrency(futureValue)}
            </div>

            {/* Visual Bar Breakdown */}
            <div className="space-y-2 mb-6">
              <div className="text-xs font-semibold text-slate-300 flex justify-between">
                <span>Invested: {Math.round(investedPercent)}%</span>
                <span className="text-[#e2c58a]">Growth: {Math.round(gainPercent)}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-black/30 overflow-hidden flex">
                <div
                  style={{ width: `${investedPercent}%` }}
                  className="bg-[#c2d7da] h-full transition-all duration-300"
                />
                <div
                  style={{ width: `${gainPercent}%` }}
                  className="bg-[#b69455] h-full transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c2d7da] inline-block" />
                  Total Invested Amount
                </span>
                <span className="font-bold">{formatCurrency(totalInvested)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#b69455] inline-block" />
                  Estimated Wealth Gain
                </span>
                <span className="font-bold text-[#f9f0df]">{formatCurrency(wealthGained)}</span>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <button
              onClick={onStartSIP}
              style={{
                background: "linear-gradient(to right, #b69455, #cba96e)",
                color: "#ffffff"
              }}
              className="w-full font-bold py-3.5 px-6 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-transform transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Get Free Personalized SIP Plan</span>
              <ArrowRight size={16} />
            </button>
            <div className="text-center text-[11px] text-slate-300 mt-2">
              Zero advisory fees • AMFI Registered Advisory
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
