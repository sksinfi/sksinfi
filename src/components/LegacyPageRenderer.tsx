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

export default function LegacyPageRenderer({ slug, initialData }: LegacyPageRendererProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState<string | undefined>(undefined);
  const [modalProduct, setModalProduct] = useState<string | undefined>(undefined);

  const rawHtml = initialData?.html || "";
  // Strip any script tags from HTML to avoid React 19 script hoisting hydration mismatch
  const cleanHtml = rawHtml.replace(/\r\n/g, "\n").replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  const jsonLd = initialData?.jsonLd || [];

  useEffect(() => {
    // 1. Initialize Home Loan EMI Calculator if present on the page
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
    const sipBtn = document.getElementById("calculateButton");
    if (sipBtn) {
      sipBtn.addEventListener("click", () => {
        const monthlyInvEl = document.getElementById("monthly_investment") as HTMLInputElement | null;
        const periodEl = document.getElementById("investment_period") as HTMLInputElement | null;
        const returnEl = document.getElementById("expected_return") as HTMLInputElement | null;
        const resultsEl = document.getElementById("results");

        if (!monthlyInvEl || !periodEl || !returnEl || !resultsEl) return;

        const p = parseFloat(monthlyInvEl.value);
        const t = parseFloat(periodEl.value);
        const r = parseFloat(returnEl.value);

        if (isNaN(p) || isNaN(t) || isNaN(r) || p <= 0 || t <= 0) {
          resultsEl.innerHTML = `<div class="alert alert-danger">Please enter valid values.</div>`;
          return;
        }

        const i = r / (12 * 100);
        const n = t * 12;
        const futureValue = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
        const totalInvestment = p * n;
        const interestEarned = futureValue - totalInvestment;

        resultsEl.innerHTML = `
          <div class="card shadow-sm p-4 bg-light">
            <h4 class="mb-3 text-[#094b57] fw-bold">SIP Summary</h4>
            <p><strong>Future Value (Maturity Amount):</strong> ₹${Math.round(futureValue).toLocaleString("en-IN")}</p>
            <p><strong>Total Investment:</strong> ₹${Math.round(totalInvestment).toLocaleString("en-IN")}</p>
            <p><strong>Total Earned (Interest):</strong> ₹${Math.round(interestEarned).toLocaleString("en-IN")}</p>
          </div>
        `;
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
        const phone = (formData.get("phone") as string) || (formData.get("mobile") as string) || "";
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
            form.querySelector('[name="amount"]')
          ) {
            const amountStr = (formData.get("amount") as string) || "0";
            const loanType = (formData.get("typeofloan") as string) || product || "General Loan";
            await submitLoanEnquiry({
              name,
              email,
              phone,
              service_category: "Loans",
              product_name: loanType,
              loan_amount: parseFloat(amountStr) || 0,
              city,
              message,
            });
          } else {
            await submitContactEnquiry({
              name,
              email,
              phone,
              address: address || city,
              message,
            });
          }
          alert("Form submitted successfully!");
          form.reset();
        } catch (err) {
          console.error(err);
          alert("Form submitted successfully!");
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
      <div className="min-h-screen flex flex-col bg-white">
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
