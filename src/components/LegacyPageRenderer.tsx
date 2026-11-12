"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import { submitLoanEnquiry, submitPartnerEnquiry, submitContactEnquiry } from "@/lib/supabase";

interface LegacyPageRendererProps {
  slug: string;
  initialData?: {
    slug: string;
    title: string;
    metaDescription: string;
    html: string;
    jsonLd?: string[];
  };
}

function sanitizeAndBalanceHtml(html: string): string {
  // Strip any script tags and rogue conflicting legacy styles from HTML
  const cleaned = html
    .replace(/\r\n/g, "\n")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/section\s*\{\s*padding-top:\s*10px;[\s\S]*?background:\s*#f9f0df;[\s\S]*?\}/gi, "")
    .replace(/\.et_pb_section\s*\{\s*padding:\s*0px\s*!important;\s*\}/gi, "")
    .replace(/padding-left:\s*700px\s*!important;/gi, "")
    .replace(/\{\s*background-color:\s*#b69455\s*!important;\s*color:\s*#fff\s*!important;\s*\}/g, "");

  // Prevent rogue closing </div> tags from prematurely closing <main> and pushing content below footer
  const tokenRegex = /<!--[\s\S]*?-->|<\/?div\b[^>]*>/gi;
  let openDivs = 0;
  let result = "";
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(cleaned)) !== null) {
    const token = match[0];
    if (token.startsWith("<!--")) {
      result += cleaned.slice(lastIndex, match.index) + token;
    } else if (token.startsWith("</")) {
      if (openDivs > 0) {
        openDivs--;
        result += cleaned.slice(lastIndex, match.index) + token;
      } else {
        // Discard orphan closing div that would close the parent <main> container
        result += cleaned.slice(lastIndex, match.index);
      }
    } else {
      openDivs++;
      result += cleaned.slice(lastIndex, match.index) + token;
    }
    lastIndex = tokenRegex.lastIndex;
  }
  result += cleaned.slice(lastIndex);
  if (openDivs > 0) {
    result += "</div>".repeat(openDivs);
  }
  return result;
}

export default function LegacyPageRenderer({ slug, initialData }: LegacyPageRendererProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState<string | undefined>(undefined);
  const [modalProduct, setModalProduct] = useState<string | undefined>(undefined);

  const rawHtml = initialData?.html || "";
  const cleanHtml = sanitizeAndBalanceHtml(rawHtml);
  const jsonLd = initialData?.jsonLd || [];

  useEffect(() => {
    // Handle initial hash scrolling (e.g. /#why-sks-infi)
    if (typeof window !== "undefined" && window.location.hash) {
      setTimeout(() => {
        try {
          const hashEl = document.querySelector(window.location.hash);
          if (hashEl) {
            hashEl.scrollIntoView({ behavior: "smooth" });
          }
        } catch (_) {}
      }, 300);
    }

    // 0. FAQ Accordion Interactive Toggler (fallback only if Bootstrap is not loaded)
    const accordionButtons = document.querySelectorAll(".accordion-button");
    accordionButtons.forEach((btn) => {
      if ((btn as any)._faqBound) return;
      (btn as any)._faqBound = true;

      btn.addEventListener("click", (e) => {
        if (typeof window !== "undefined" && (window as any).bootstrap?.Collapse) {
          // Let Bootstrap 5 handle the collapse natively with smooth animation
          return;
        }

        const targetSelector = btn.getAttribute("data-bs-target");
        if (!targetSelector) return;
        const targetEl = document.querySelector(targetSelector) as HTMLElement | null;
        if (!targetEl) return;

        e.preventDefault();
        const isShown = targetEl.classList.contains("show");
        const parentSelector = targetEl.getAttribute("data-bs-parent");
        const parentContainer = parentSelector ? document.querySelector(parentSelector) : targetEl.closest(".accordion");

        if (parentContainer) {
          parentContainer.querySelectorAll(".accordion-collapse").forEach((c) => {
            c.classList.remove("show");
          });
          parentContainer.querySelectorAll(".accordion-button").forEach((b) => {
            b.classList.add("collapsed");
            b.setAttribute("aria-expanded", "false");
          });
        }

        if (!isShown) {
          targetEl.classList.add("show");
          btn.classList.remove("collapsed");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });

    // 0.1 Floating Side Popup Drawer Listener
    const popupToggle = document.getElementById("loan-popup-toggle");
    const popupContainer = document.getElementById("loan-popup-container");
    const popupClose = document.getElementById("close-popup");

    if (popupToggle && popupContainer && !(popupToggle as any)._bound) {
      (popupToggle as any)._bound = true;
      popupToggle.addEventListener("click", () => {
        popupContainer.classList.toggle("active");
      });
    }
    if (popupClose && popupContainer && !(popupClose as any)._bound) {
      (popupClose as any)._bound = true;
      popupClose.addEventListener("click", () => {
        popupContainer.classList.remove("active");
      });
    }

    // 0.25 Global Enquiry Buttons Listener (Loan & Category Pages)
    const enquiryButtons = document.querySelectorAll("[data-open-enquiry]");
    enquiryButtons.forEach((btn) => {
      if ((btn as any)._enquiryBound) return;
      (btn as any)._enquiryBound = true;
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const category = btn.getAttribute("data-enquiry-category") || "Loans";
        const product =
          btn.getAttribute("data-enquiry-product") ||
          btn.getAttribute("data-open-enquiry") ||
          "";
        setModalCategory(category);
        setModalProduct(product);
        setModalOpen(true);
      });
    });

    // 0.26 Home Page Hero & Popup Service & Sub-Service dynamic dropdown handler
    const optionsMap: Record<string, string[]> = {
      "Loan": [
        "Home Loan",
        "Loan Against Property (LAP)",
        "Business Loan",
        "Personal Loan",
        "Education Loan",
        "New Car Loan",
        "Used Car Loan",
        "Commercial Vehicle",
        "Commercial Equipment"
      ],
      "MSME": [
        "MSME Financial Solutions",
        "MSME Subsidy and Incentive Schemes",
        "MSME Registration (UDYAM)",
        "MSME IPO & Listing",
        "Invoice Discounting (TReDS)",
        "CGTMSE Collateral-Free Loan",
        "MSME Growth & Business Solutions",
        "Venture Capital",
        "Private Equity"
      ],
      "Real Estate": [
        "Residential (Plots, Villa & Flats)",
        "Commercial Offices",
        "Industrial Properties & Warehouses",
        "Farm Houses & Out Houses",
        "Approved Open Land"
      ],
      "Investment": [
        "Mutual Funds & SIP",
        "Bonds & Debentures",
        "Non-Convertible Debentures (NCD)",
        "Unlisted & Pre-IPO Shares",
        "Equity & Demat",
        "Fixed Deposit"
      ],
      "Insurance": [
        "Health Insurance (Comprehensive)",
        "Life & Term Insurance",
        "General, Factory and Property Insurance",
        "Motor & Fleet Insurance"
      ],
      "A/CS & Tax": [
        "ITR & Audit",
        "GST Registration",
        "Firm & Company Set-up",
        "Statutory Compliances",
        "Insolvency Audit",
        "Insolvency Compliances"
      ],
      "NRI Desk": [
        "NRI Home Loan in India",
        "NRI Real Estate Investment",
        "NRI Mutual Funds & SIP",
        "NRE / NRO Banking & FEMA Advisory"
      ]
    };

    const setupDropdown = (sId: string, subId: string) => {
      const s = document.getElementById(sId) as HTMLSelectElement | null;
      const sub = document.getElementById(subId) as HTMLSelectElement | null;
      if (s && sub && !(s as any)._serviceBound) {
        (s as any)._serviceBound = true;
        s.addEventListener("change", () => {
          const selected = s.value;
          const products = optionsMap[selected] || optionsMap["Loan"];
          sub.innerHTML = products
            .map((p, idx) => `<option value="${p}" ${idx === 0 ? "selected" : ""}>${p}</option>`)
            .join("");
        });
      }
    };

    setupDropdown("home-service-select", "home-subservice-select");
    setupDropdown("popup-service-select", "popup-subservice-select");

    // 0.2 Home Page Dynamic Blogs Fetching from Website Blog Database
    if (slug === "index") {
      fetch("/api/admin/blogs")
        .then((res) => (res.ok ? res.json() : null))
        .then((blogs) => {
          if (Array.isArray(blogs) && blogs.length > 0) {
            const grid = document.getElementById("home-blogs-grid");
            if (grid) {
              const topBlogs = blogs.slice(0, 3);
              grid.innerHTML = topBlogs
                .map(
                  (post: any) => `
                <div class="col-12 col-md-4">
                  <div class="card glossy-card h-100 border-0 shadow-sm overflow-hidden" style="border-radius: 18px; transition: transform 0.3s ease, box-shadow 0.3s ease;">
                    <div style="position: relative; height: 210px; overflow: hidden; background: #f1f5f9;">
                      <a href="/blogs/${post.slug}" style="display: block; width: 100%; height: 100%;">
                        <img
                          src="${post.coverImage || '/images/homeloan.avif'}"
                          class="card-img-top"
                          alt="${post.title}"
                          style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;"
                        />
                      </a>
                      <span
                        style="position: absolute; top: 14px; left: 14px; background: rgba(9, 75, 87, 0.92); color: #ffffff; padding: 4px 12px; border-radius: 50px; font-size: 11px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;"
                      >
                        ${post.category || 'Finance'}
                      </span>
                    </div>

                    <div class="card-body p-4 d-flex flex-column justify-content-between" style="flex: 1;">
                      <div>
                        <div class="d-flex align-items-center gap-2 text-muted mb-2" style="font-size: 12px; font-weight: 500;">
                          <span><i class="fa fa-calendar me-1" style="color: #b69455;"></i> ${post.publishedDate || 'Recent'}</span>
                          <span>•</span>
                          <span><i class="fa fa-clock-o me-1" style="color: #b69455;"></i> ${post.readTime || '5 min read'}</span>
                        </div>

                        <h5 class="card-title fw-bold mb-2" style="font-size: 16.5px; line-height: 1.4;">
                          <a href="/blogs/${post.slug}" style="color: #094b57; text-decoration: none;">
                            ${post.title}
                          </a>
                        </h5>

                        <p class="text-muted small mb-3" style="font-size: 13.5px; line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                          ${post.excerpt || ''}
                        </p>
                      </div>

                      <div class="pt-2 border-top border-light mt-auto d-flex align-items-center justify-content-between">
                        <a href="/blogs/${post.slug}" class="btn btn-sm fw-bold text-white px-3.5 py-1.5 rounded-pill d-inline-flex align-items-center gap-1.5" style="background: #b69455; font-size: 12px; text-decoration: none;">
                          Read Article <i class="fa fa-arrow-right" style="font-size: 10px;"></i>
                        </a>
                        <span class="text-muted small" style="font-size: 11.5px;">By ${post.author?.name || 'SKS INFI'}</span>
                      </div>
                    </div>
                  </div>
                </div>`
                )
                .join("");
            }
          }
        })
        .catch(() => {});
    }




    // 1. Initialize Loan EMI Calculator (Homepage & Loan Page)
    // Homepage variant (kebab-case IDs)
    const homeLoanAmount = document.getElementById("loan-amount") as HTMLInputElement | null;
    const homeLoanAmountInput = document.getElementById("loan-amount-input") as HTMLInputElement | null;
    const homeInterestRate = document.getElementById("interest-rate") as HTMLInputElement | null;
    const homeInterestRateInput = document.getElementById("interest-rate-input") as HTMLInputElement | null;
    const homeLoanTenure = document.getElementById("loan-tenure") as HTMLInputElement | null;
    const homeLoanTenureInput = document.getElementById("loan-tenure-input") as HTMLInputElement | null;
    const homeMonthlyEmi = document.getElementById("monthly-emi");
    const homeTotalInterest = document.getElementById("total-interest");
    const homeTotalPayment = document.getElementById("total-payment");

    if (homeLoanAmount && homeLoanAmountInput && homeInterestRate && homeInterestRateInput && homeLoanTenure && homeLoanTenureInput) {
      function calculateHomeEMI() {
        const principal = parseFloat(homeLoanAmountInput!.value) || 0;
        const annualRate = parseFloat(homeInterestRateInput!.value) || 0;
        const tenureYears = parseFloat(homeLoanTenureInput!.value) || 0;

        if (principal <= 0 || annualRate <= 0 || tenureYears <= 0) {
          if (homeMonthlyEmi) homeMonthlyEmi.textContent = "₹0";
          if (homeTotalInterest) homeTotalInterest.textContent = "₹0";
          if (homeTotalPayment) homeTotalPayment.textContent = "₹0";
          return;
        }

        const tenureMonths = tenureYears * 12;
        const monthlyRate = annualRate / 12 / 100;

        const emi =
          (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
          (Math.pow(1 + monthlyRate, tenureMonths) - 1);
        const totalPaymentVal = emi * tenureMonths;
        const interestVal = totalPaymentVal - principal;

        if (homeMonthlyEmi) homeMonthlyEmi.textContent = "₹" + Math.round(emi).toLocaleString("en-IN");
        if (homeTotalInterest) homeTotalInterest.textContent = "₹" + Math.round(interestVal).toLocaleString("en-IN");
        if (homeTotalPayment) homeTotalPayment.textContent = "₹" + Math.round(totalPaymentVal).toLocaleString("en-IN");
      }

      function syncPair(slider: HTMLInputElement, numInput: HTMLInputElement) {
        slider.addEventListener("input", () => {
          numInput.value = slider.value;
          calculateHomeEMI();
        });
        numInput.addEventListener("input", () => {
          const val = parseFloat(numInput.value);
          if (!isNaN(val)) {
            slider.value = String(val);
          }
          calculateHomeEMI();
        });
        numInput.addEventListener("change", () => {
          const val = parseFloat(numInput.value);
          if (!isNaN(val)) {
            slider.value = String(val);
          }
          calculateHomeEMI();
        });
      }

      syncPair(homeLoanAmount, homeLoanAmountInput);
      syncPair(homeInterestRate, homeInterestRateInput);
      syncPair(homeLoanTenure, homeLoanTenureInput);
      calculateHomeEMI();
    }

    // Loan page variant (camelCase IDs)
    const loanAmount = document.getElementById("loanAmount") as HTMLInputElement | null;
    const loanAmountInput = document.getElementById("loanAmountInput") as HTMLInputElement | null;
    const interestRate = document.getElementById("interestRate") as HTMLInputElement | null;
    const interestRateInput = document.getElementById("interestRateInput") as HTMLInputElement | null;
    const loanTenure = document.getElementById("loanTenure") as HTMLInputElement | null;
    const loanTenureInput = document.getElementById("loanTenureInput") as HTMLInputElement | null;

    const emiResult = document.getElementById("emiResult");
    const totalInterest = document.getElementById("totalInterest");
    const totalPayment = document.getElementById("totalPayment");
    const emiChartCanvas = document.getElementById("emiChart") as HTMLCanvasElement | null;

    let chartInstance: any = null;

    if (loanAmount && loanAmountInput && interestRate && interestRateInput && loanTenure && loanTenureInput && emiResult) {
      function calculateEMI() {
        const principal = parseFloat(loanAmount!.value);
        const annualRate = parseFloat(interestRate!.value);
        const tenureYears = parseFloat(loanTenure!.value);

        if (isNaN(principal) || isNaN(annualRate) || isNaN(tenureYears)) return;

        const tenureMonths = tenureYears * 12;
        const monthlyRate = annualRate / 12 / 100;

        const emi =
          (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
          (Math.pow(1 + monthlyRate, tenureMonths) - 1);
        const totalPaymentVal = emi * tenureMonths;
        const interest = totalPaymentVal - principal;

        if (emiResult) emiResult.textContent = "₹" + Math.round(emi).toLocaleString("en-IN");
        if (totalInterest) totalInterest.textContent = "₹" + Math.round(interest).toLocaleString("en-IN");
        if (totalPayment) totalPayment.textContent = "₹" + Math.round(totalPaymentVal).toLocaleString("en-IN");

        if (emiChartCanvas && (window as any).Chart) {
          try {
            if (chartInstance) {
              chartInstance.destroy();
            }
            const ctx = emiChartCanvas.getContext("2d");
            if (ctx) {
              chartInstance = new (window as any).Chart(ctx, {
                type: "pie",
                data: {
                  labels: ["Principal", "Interest"],
                  datasets: [
                    {
                      data: [principal, interest],
                      backgroundColor: ["#4caf50", "#ff9800"],
                    },
                  ],
                },
                options: {
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "bottom",
                    },
                  },
                },
              });
            }
          } catch (e) {
            console.error("EMI Chart Error:", e);
          }
        }
      }

      function syncInputs(slider: HTMLInputElement, input: HTMLInputElement) {
        slider.addEventListener("input", () => {
          input.value = slider.value;
          calculateEMI();
        });
        input.addEventListener("input", () => {
          const val = parseFloat(input.value);
          if (!isNaN(val)) {
            slider.value = String(val);
            calculateEMI();
          }
        });
      }

      syncInputs(loanAmount, loanAmountInput);
      syncInputs(interestRate, interestRateInput);
      syncInputs(loanTenure, loanTenureInput);

      loanAmount.value = loanAmountInput.value = "5000000";
      interestRate.value = interestRateInput.value = "10.5";
      loanTenure.value = loanTenureInput.value = "20";
      calculateEMI();
    }

    // 2. Initialize Loan Eligibility Calculator if present
    const eligiableBtn = document.querySelector('button[onclick="eligiable()"]') as HTMLButtonElement | null;
    if (eligiableBtn) {
      eligiableBtn.removeAttribute("onclick");
      eligiableBtn.addEventListener("click", () => {
        const form2 = document.forms.namedItem("formval2") as any;
        const form3 = document.forms.namedItem("formval3") as any;
        if (!form2 || !form3) return;

        const P2 = form2.pr_amt3?.value || 0;
        const PerMntConvert = parseFloat(P2) / 24;

        const P1 = parseFloat(form2.pr_amt2?.value || 100000);
        const rate1 = parseFloat(form2.int_rate2?.value || 6.4);
        const n1 = parseFloat(form2.period2?.value || 20);
        const r1 = rate1 / (12 * 100);

        const prate1 = (P1 * r1 * Math.pow(1 + r1, n1 * 12)) / (Math.pow(1 + r1, n1 * 12) - 1);
        const emi1 = Math.ceil(prate1 * 100) / 100;

        const existing = parseFloat(form2.ExLoan?.value || 0);
        const income1 = parseFloat(form2.NetIncome?.value || 0) + parseFloat(String(PerMntConvert)) - existing;

        let incomere = 0;
        if (income1 <= 100000) {
          incomere = (income1 * 65) / 100;
        } else {
          incomere = (income1 * 70) / 100;
        }

        const incomereq = Math.floor((incomere / emi1) * P1);
        const prate2 = (incomereq * r1 * Math.pow(1 + r1, n1 * 12)) / (Math.pow(1 + r1, n1 * 12) - 1);
        const emi2 = Math.ceil(prate2 * 100) / 100;

        if (form3.field12) {
          form3.field12.value =
            "You are Eligible for a maximum loan of ₹" +
            incomereq.toLocaleString("en-IN") +
            " at EMI ₹" +
            emi2.toFixed(0);
        }
      });
    }

    // 3. Initialize SIP Calculator if present
    const monthlyInvEl = document.getElementById("monthly_investment") as HTMLInputElement | null;
    const periodEl = document.getElementById("investment_period") as HTMLInputElement | null;
    const returnEl = document.getElementById("expected_return") as HTMLInputElement | null;
    const sipBtn = document.getElementById("calculateButton");
    const futureValEl = document.getElementById("future_value");
    const totalInvEl = document.getElementById("total_investment");
    const wealthGainEl = document.getElementById("wealth_gain");
    const resultsEl = document.getElementById("results");

    function calculateSIP() {
      if (!monthlyInvEl || !periodEl || !returnEl) return;

      const p = parseFloat(monthlyInvEl.value);
      const t = parseFloat(periodEl.value);
      const r = parseFloat(returnEl.value);

      if (isNaN(p) || isNaN(t) || isNaN(r) || p <= 0 || t <= 0) {
        if (futureValEl && totalInvEl && wealthGainEl) {
          futureValEl.textContent = "₹0";
          totalInvEl.textContent = "₹0";
          wealthGainEl.textContent = "+₹0";
        }
        return;
      }

      const i = r / (12 * 100);
      const n = t * 12;
      let futureValue = 0;
      if (i > 0) {
        futureValue = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
      } else {
        futureValue = p * n;
      }
      const totalInvestment = p * n;
      const wealthGain = Math.max(0, futureValue - totalInvestment);

      if (futureValEl && totalInvEl && wealthGainEl) {
        futureValEl.textContent = "₹" + Math.round(futureValue).toLocaleString("en-IN");
        totalInvEl.textContent = "₹" + Math.round(totalInvestment).toLocaleString("en-IN");
        wealthGainEl.textContent = "+₹" + Math.round(wealthGain).toLocaleString("en-IN");
      } else if (resultsEl) {
        resultsEl.innerHTML = `
          <div class="card shadow-sm p-4 bg-light">
            <h4 class="mb-3 text-[#094b57] fw-bold">SIP Summary</h4>
            <p><strong>Future Value (Maturity Amount):</strong> ₹${Math.round(futureValue).toLocaleString("en-IN")}</p>
            <p><strong>Total Investment:</strong> ₹${Math.round(totalInvestment).toLocaleString("en-IN")}</p>
            <p><strong>Total Earned (Interest):</strong> ₹${Math.round(wealthGain).toLocaleString("en-IN")}</p>
          </div>
        `;
      }
    }

    if (monthlyInvEl && periodEl && returnEl) {
      [monthlyInvEl, periodEl, returnEl].forEach((input) => {
        input.addEventListener("input", calculateSIP);
        input.addEventListener("change", calculateSIP);
      });
      calculateSIP();
    }

    if (sipBtn) {
      sipBtn.addEventListener("click", () => {
        calculateSIP();
        if (resultsEl) {
          resultsEl.style.transition = "transform 0.15s ease, box-shadow 0.15s ease";
          resultsEl.style.transform = "scale(1.02)";
          resultsEl.style.boxShadow = "0 4px 14px rgba(9, 75, 87, 0.15)";
          setTimeout(() => {
            resultsEl.style.transform = "scale(1)";
            resultsEl.style.boxShadow = "none";
          }, 200);
        }
      });
    }

    // 4. Connect any forms in HTML to Supabase
    const allForms = document.querySelectorAll("form");
    allForms.forEach((form) => {
      // Don't intercept calculator forms
      if (form.getAttribute("name") === "formval2" || form.getAttribute("name") === "formval3" || form.id === "sipForm") {
        return;
      }

      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement | null;
        const origBtnText = submitBtn ? submitBtn.innerText : "Submit";
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerText = "Submitting...";
        }

        const formData = new FormData(form);
        const name = (formData.get("name") as string) || "";
        const email = (formData.get("email") as string) || "";
        const rawPhone = (formData.get("phone") as string) || (formData.get("mobile") as string) || (formData.get("mobile_no") as string) || "";
        const countryCode = (formData.get("country_code") as string) || "";
        const phone = countryCode && !rawPhone.startsWith("+") ? `${countryCode} ${rawPhone}` : rawPhone;
        const address = (formData.get("address") as string) || "";
        const city = (formData.get("city") as string) || "";
        const country = (formData.get("country") as string) || "India";
        const message = (formData.get("message") as string) || "";
        const product = (formData.get("product") as string) || (formData.get("product_name") as string) || "loan";

        try {
          if (form.getAttribute("action")?.includes("partner") || slug.includes("partner")) {
            await submitPartnerEnquiry({
              name,
              email,
              mobile: phone,
              country,
              city,
              product_interest: product,
              message,
            });
          } else if (
            slug.includes("loan") ||
            form.querySelector('[name="typeofloan"]') ||
            form.querySelector('[name="amount"]') ||
            form.querySelector('[name="loan_amount"]') ||
            form.id === "loan-apply-form"
          ) {
            const amountStr = (formData.get("amount") as string) || (formData.get("loan_amount") as string) || "0";
            const loanType = (formData.get("typeofloan") as string) || (formData.get("selected_loan_type") as string) || product || "General Loan";
            const serviceCat = (formData.get("service") as string) || (formData.get("service_category") as string) || "Loans";
            await submitLoanEnquiry({
              name,
              email,
              phone,
              service_category: serviceCat,
              product_name: loanType,
              loan_amount: parseFloat(amountStr) || 0,
              city: city || country,
              message,
            });
          } else {
            await submitContactEnquiry({
              name,
              email,
              phone,
              address: address || city || country,
              message,
            });
          }

          // Dispatch SMS notification to SKS INFI admin
          try {
            const chosenService = (formData.get("service") as string) || (formData.get("service_category") as string) || (slug.includes("partner") ? "Partner" : "General");
            const chosenSubService = (formData.get("typeofloan") as string) || (formData.get("selected_loan_type") as string) || product || "";
            fetch("/api/send-sms", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name,
                phone,
                email,
                service: chosenService,
                subService: chosenSubService,
                country,
                city: city || address,
                message,
              }),
            }).catch((err) => console.warn("SMS notification fetch error:", err));
          } catch (smsErr) {
            console.warn("SMS notification dispatch failed:", smsErr);
          }

          // Dispatch Email notification to infi@sksinfi.com
          try {
            const chosenService = (formData.get("service") as string) || (formData.get("service_category") as string) || (slug.includes("partner") ? "Partner" : "General");
            const chosenSubService = (formData.get("typeofloan") as string) || (formData.get("selected_loan_type") as string) || product || "";
            fetch("/api/send-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name,
                phone,
                email,
                service: chosenService,
                subService: chosenSubService,
                country,
                city: city || address,
                message,
              }),
            }).catch((err) => console.warn("Email notification fetch error:", err));
          } catch (emailErr) {
            console.warn("Email notification dispatch failed:", emailErr);
          }

          const feedbackEl = form.querySelector(".form-feedback") as HTMLElement | null;
          if (feedbackEl) {
            feedbackEl.innerHTML = `
              <div class="p-3 rounded-3 text-center" style="background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.35); color: #065f46;">
                <div class="fw-bold fs-6 mb-1 d-flex align-items-center justify-center gap-1">
                  <span>✓ Enquiry Submitted Successfully!</span>
                </div>
                <div class="small" style="color: #047857;">Thank you, <b>${name || "Valued Client"}</b>. Our senior financial consultant will call you within 30 minutes.</div>
              </div>
            `;
            feedbackEl.style.display = "block";
            feedbackEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
          } else {
            alert("Thank you! Your enquiry has been received. Our senior advisor will call you within 30 minutes.");
          }
          form.reset();
        } catch (err) {
          console.error("Submission failed:", err);
          const feedbackEl = form.querySelector(".form-feedback") as HTMLElement | null;
          if (feedbackEl) {
            feedbackEl.innerHTML = `
              <div class="p-3 rounded-3 text-center" style="background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.35); color: #991b1b;">
                <div class="fw-bold small mb-1">Submission failed. Please check your network or call +91 99285 93122 directly.</div>
              </div>
            `;
            feedbackEl.style.display = "block";
          } else {
            alert("Failed to submit form. Please check your internet connection or call +91 99285 93122 directly.");
          }
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = origBtnText;
          }
        }
      });
    });

    // 5. Initialize Divi hero slider if present
    const sliderContainers = document.querySelectorAll(".et_pb_slides");
    const sliderTimers: NodeJS.Timeout[] = [];
    sliderContainers.forEach((container) => {
      const slides = Array.from(container.querySelectorAll(".et_pb_slide")) as HTMLElement[];
      if (slides.length <= 1) return;

      let current = 0;
      slides.forEach((slide, idx) => {
        slide.style.transition = "opacity 0.8s ease-in-out";
        if (idx === 0) {
          slide.style.display = "block";
          slide.style.opacity = "1";
          slide.classList.add("et-pb-active-slide");
        } else {
          slide.style.display = "none";
          slide.style.opacity = "0";
          slide.classList.remove("et-pb-active-slide");
        }
      });

      const timer = setInterval(() => {
        const curSlide = slides[current];
        current = (current + 1) % slides.length;
        const nextSlide = slides[current];

        curSlide.style.opacity = "0";
        setTimeout(() => {
          curSlide.style.display = "none";
          curSlide.classList.remove("et-pb-active-slide");

          nextSlide.style.display = "block";
          setTimeout(() => {
            nextSlide.style.opacity = "1";
            nextSlide.classList.add("et-pb-active-slide");
          }, 30);
        }, 400);
      }, 5000);

      sliderTimers.push(timer);
    });

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
      sliderTimers.forEach(clearInterval);
    };
  }, [cleanHtml, slug]);

  return (
    <>
      {jsonLd.map((schemaStr, idx) => (
        <script
          key={`ld-json-${idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaStr }}
        />
      ))}
      <div className="min-h-screen flex flex-col overflow-x-clip w-full">
        <Navbar
          onOpenEnquiry={(category, product) => {
            setModalCategory(category);
            setModalProduct(product);
            setModalOpen(true);
          }}
        />
        <main
          className="flex-1 w-full"
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
          suppressHydrationWarning
        />
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
