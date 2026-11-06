import React from "react";

export interface MsmeOffering {
  title: string;
  description: string;
  highlight?: string;
}

export interface MsmeProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface MsmeFaq {
  q: string;
  a: string;
}

export interface MsmePageData {
  slug: string;
  aliases?: string[];
  navLabel: string;
  title: string;
  heroHeadline: string;
  subtitle: string;
  badge: string;
  heroStats: { value: string; label: string }[];
  overview: string[];
  offerings: MsmeOffering[];
  benefits: { title: string; desc: string }[];
  eligibility: string[];
  documentsRequired: string[];
  processSteps: MsmeProcessStep[];
  faqs: MsmeFaq[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export const MSME_PAGES_DATA: Record<string, MsmePageData> = {
  "financial-solutions": {
    slug: "financial-solutions",
    navLabel: "MSME Financial Solutions",
    title: "MSME Financial Solutions & Capital Advisory",
    heroHeadline: "Empower Your Business with Structured Working Capital & Balance Sheet Optimization",
    subtitle: "End-to-end debt syndication, multi-banking consortium structuring, and tailored liquidity management across 40+ leading PSU & Private Banks.",
    badge: "Capital Advisory & Working Capital",
    heroStats: [
      { value: "40+", label: "Lending Bank Partners" },
      { value: "₹250+ Cr", label: "Debt Syndicated" },
      { value: "8.25%*", label: "Lowest Borrowing Rates" },
      { value: "10-14 Days", label: "Average Sanction Time" }
    ],
    overview: [
      "Indian Micro, Small, and Medium Enterprises often face acute liquidity crunches not due to lack of demand, but because of rigid banking structures, unoptimized cash conversion cycles, and punitive interest spreads. SKS INFI's MSME Financial Solutions offer structured capital advisory tailored to your operating reality.",
      "Our team of senior ex-bankers, chartered accountants, and debt syndication experts conduct an exhaustive diagnostic of your balance sheet, audit CMA data, and restructure credit lines. We represent your enterprise directly before bank credit committees to secure the highest Maximum Permissible Bank Finance (MPBF) at prime commercial lending rates.",
      "Whether you need fund-based facilities like Cash Credit (CC) and Overdraft (OD) or non-fund based support like Bank Guarantees (BG) and Letters of Credit (LC), we negotiate the best terms and lowest collateral security margins."
    ],
    offerings: [
      {
        title: "Working Capital Assessment & CMA Structuring",
        description: "Scientific computation of operating cycles, inventory holding days, and receivable turnovers to structure optimized Cash Credit (CC) and Working Capital Demand Loans (WCDL).",
        highlight: "Highest MPBF Sanctioned"
      },
      {
        title: "Multi-Banking Consortium & Syndicated Debt",
        description: "Structuring multiple lending banks into an aligned consortium or multiple banking arrangement for large ticket corporate exposures above ₹10 Crore.",
        highlight: "Consortium Alignment"
      },
      {
        title: "Balance Sheet Health & Credit Rating Advisory",
        description: "Advising on financial ratio improvement (TOL/TNW, DSCR, Current Ratio) to achieve superior ratings from CRISIL, ICRA, CARE, or India Ratings, directly reducing borrowing spreads.",
        highlight: "Spread Reduction up to 1.5%"
      },
      {
        title: "Capex & Term Debt Financing",
        description: "Long-tenure project term debt for manufacturing plant modernization, commercial civil construction, and warehouse infrastructure with comfortable moratoriums.",
        highlight: "Up to 10 Years Tenure"
      },
      {
        title: "Non-Fund Based Limit Facilities",
        description: "Arranging competitive Bank Guarantees (Financial & Performance BGs) and Letters of Credit (Inland & Foreign LCs) with minimal cash margins for government and corporate tenders.",
        highlight: "Low Margin BGs & LCs"
      },
      {
        title: "Debt Restructuring & High-Cost Debt Takeover",
        description: "Consolidating scattered high-cost NBFC and private loans into a single low-interest institutional bank credit line, dramatically easing monthly cash outflows.",
        highlight: "Immediate Interest Savings"
      }
    ],
    benefits: [
      { title: "Reduced Cost of Borrowing", desc: "Negotiated prime lending rates saving 100 to 250 basis points per annum on running credit lines." },
      { title: "Expanded Liquidity", desc: "Unlock higher fund limits without requiring disproportionate collateral security." },
      { title: "Institutional Credibility", desc: "Enhanced credit profile making future expansion rounds seamless and rapid." },
      { title: "Dedicated Relationship Manager", desc: "Single point of contact managing all banking communications and compliance." }
    ],
    eligibility: [
      "Registered MSMEs (Proprietorship, Partnership, LLP, or Private Limited Company)",
      "Minimum 12 to 24 months of active business operations",
      "Audited financial track record with minimum annual turnover of ₹50 Lakhs up to ₹250+ Crore",
      "Satisfactory CIBIL score of promoters (680+) and clean banking repayment track record",
      "Valid GST registration and updated income tax returns for the last 2-3 assessment years"
    ],
    documentsRequired: [
      "KYC documents of Promoters/Directors (PAN, Aadhaar, Passport/Voter ID)",
      "Company Registration: Certificate of Incorporation, MOA & AOA / Partnership Deed",
      "Udyam Registration Certificate and GST Registration Certificate",
      "Last 3 years Audited Financials with Balance Sheet, P&L, Tax Audit Report, and Schedules",
      "Last 12 months updated Bank Statements of all operative bank accounts",
      "Provisional Financials / CMA Data for the current and projected financial years",
      "Sanction letters of all existing running credit facilities with repayment track records",
      "Property documents and sanction plans for proposed collateral (where applicable)"
    ],
    processSteps: [
      {
        step: "01",
        title: "Financial Diagnostic & CMA Modeling",
        description: "Exhaustive audit of balance sheets, turnover, debtor days, and fund requirements to build a bulletproof CMA Data proposal."
      },
      {
        step: "02",
        title: "Lender Matchmaking & Structuring",
        description: "Selecting the optimal 3-4 PSU & private commercial banks best suited for your industry vertical and risk profile."
      },
      {
        step: "03",
        title: "Credit Committee Presentation",
        description: "Defending loan proposals before Zonal Credit Committees and resolving all technical, legal, and valuation queries."
      },
      {
        step: "04",
        title: "Sanction Letter & Documentation",
        description: "Reviewing sanction covenants, negotiating lower processing charges, and ensuring clean hypothecation documentation."
      },
      {
        step: "05",
        title: "Disbursement & Ongoing Support",
        description: "Smooth account opening, limit setup in net banking, and ongoing quarterly compliance assistance."
      }
    ],
    faqs: [
      {
        q: "What is the typical interest rate for MSME Financial Solutions through SKS INFI?",
        a: "Interest rates depend on your business turnover, credit score, industry risk, and collateral. PSU and prime private commercial banks offer rates starting from 8.25% to 10.50% p.a. on secured credit facilities, and 9.50% to 12.50% on CGTMSE collateral-free lines."
      },
      {
        q: "Can you help replace expensive NBFC loans with cheaper bank credit?",
        a: "Yes. Balance transfer and debt consolidation is our core expertise. We regularly migrate MSMEs paying 14%-18% with NBFCs to top PSU banks at 8.75%-10%, saving significant annual interest and improving debt-service coverage."
      },
      {
        q: "How does CMA Data affect my loan sanction?",
        a: "Credit Monitoring Arrangement (CMA) data provides banks with past financial analysis and future cash flow projections. Our chartered accountants prepare bank-compliant CMA data that accurately highlights your enterprise's true operating strength and repayment capacity."
      },
      {
        q: "Do you assist businesses located outside Jaipur?",
        a: "Yes. SKS INFI serves clients across Rajasthan, the NCR region, Mumbai, Gujarat, and pan-India through our digital liaison channels and extensive banking network."
      }
    ],
    metaTitle: "MSME Financial Solutions & Working Capital Advisory | SKS INFI",
    metaDescription: "Boost your enterprise with structured MSME Financial Solutions: Working Capital, Cash Credit, Term Debt, and Balance Sheet Advisory across 40+ banks.",
    keywords: ["MSME Financial Solutions", "Working Capital Loan", "CMA Data Preparation", "Debt Syndication Jaipur", "Cash Credit Overdraft", "MSME Loan Advisory"]
  },

  "why-sks-infi": {
    slug: "why-sks-infi",
    aliases: ["sksinfin"],
    navLabel: "Why SKS INFI",
    title: "Why SKS INFI for MSME Growth & Advisory",
    heroHeadline: "India's Premier Financial Architecture & Strategic Advisory Partner for MSMEs",
    subtitle: "Over a decade of institutional excellence, 95+ banking partnerships, ₹1,200+ Crore mobilized, and an unwavering commitment to enterprise success.",
    badge: "Institutional Heritage & Advisory Prowess",
    heroStats: [
      { value: "12+ Yrs", label: "Market Leadership" },
      { value: "95+", label: "Banks & NBFC Partners" },
      { value: "₹1,200+ Cr", label: "Capital Mobilized" },
      { value: "4,500+", label: "Enterprises Advised" }
    ],
    overview: [
      "SKS INFI was founded with a singular conviction: Indian Micro, Small, and Medium Enterprises are the powerhouse of the nation's economic engine, yet they are systematically underserved by rigid financial gatekeepers. We bridge this critical gap through institutional financial engineering.",
      "Unlike traditional loan brokers who push generic products, SKS INFI operates as a holistic financial advisory and merchant banking practice. We evaluate your business model, understand your industry dynamics, and structure long-term capital architectures spanning collateral-free debt, state fiscal incentives, private equity, and stock exchange listings.",
      "Our leadership team combines seasoned ex-bankers, Chartered Accountants, SEBI-empanelled advisors, and legal specialists who have collectively steered thousands of MSMEs through every phase of the corporate growth cycle."
    ],
    offerings: [
      {
        title: "360° Financial Ecosystem",
        description: "From day-one Udyam registration and collateral-free debt to pre-IPO structuring and BSE SME listing, we handle every financial milestone under one roof.",
        highlight: "All Under One Roof"
      },
      {
        title: "Unrivaled Banking & NBFC Network",
        description: "Direct empanelment with 95+ nationalized banks, top private lenders, specialized MSME NBFCs, and alternative investment funds across India.",
        highlight: "95+ Direct Institutional Ties"
      },
      {
        title: "Ex-Banker & Chartered Accountant Team",
        description: "Proposals drafted and defended by professionals who know credit committee appraisal norms, internal risk ratings, and regulatory loopholes.",
        highlight: "Inside Credit Knowledge"
      },
      {
        title: "State & Sovereign Subsidy Mastery",
        description: "Deep procedural liaising with Udyog Bhawan, MSME Development Institutes, and Rajasthan BIP for maximum RIPS 2024 and central grants.",
        highlight: "Zero Subsidy Rejections"
      },
      {
        title: "Dedicated Relationship Management",
        description: "A single senior relationship manager dedicated to your enterprise, ensuring transparency, confidentiality, and doorstep execution.",
        highlight: "White-Glove Service"
      },
      {
        title: "Zero Hidden Charges & 100% Ethical Advisory",
        description: "Complete transparency in banking terms, sanction covenants, and advisory fees with no unpleasant surprises.",
        highlight: "Transparent & Ethical"
      }
    ],
    benefits: [
      { title: "Rapid Turnaround Times", desc: "Streamlined credit file preparation cuts standard sanction timelines by more than 50%." },
      { title: "Optimized Sanction Terms", desc: "Lower processing charges, reduced security collateral, and lower interest margins." },
      { title: "Future-Ready Enterprise", desc: "Governance and financial structuring that prepares your firm for PE investment and public listing." },
      { title: "Pan-India Presence", desc: "Headquartered in Jaipur with digital execution and client footprints across major Indian commercial hubs." }
    ],
    eligibility: [
      "Micro, Small, and Medium Enterprises across Manufacturing, Trading, and Services",
      "High-growth startups seeking venture debt, angel syndicates, or strategic capital",
      "Established family businesses planning modernization, capex expansion, or SME IPO",
      "Enterprises requiring sovereign subsidy unlock under RIPS 2024 or PMEGP"
    ],
    documentsRequired: [
      "Company Profile and Business Overview",
      "Udyam Registration Certificate",
      "Past 3 years Financial Statements & Income Tax Returns",
      "Existing Debt Sanction Letters and Account Statements",
      "Project Plan or Capex Expansion Outline (for new initiatives)"
    ],
    processSteps: [
      {
        step: "01",
        title: "Discovery & Financial Health Check",
        description: "We review your existing debt structure, cash flow constraints, and strategic growth roadmap during a deep-dive consultation."
      },
      {
        step: "02",
        title: "Strategic Blueprint & Capital Structuring",
        description: "We design a customized capital plan combining low-cost bank loans, sovereign subsidies, TReDS factoring, or equity."
      },
      {
        step: "03",
        title: "Institutional Execution & Approvals",
        description: "We coordinate with banking committees, subsidy nodal agencies, or investment funds to secure sanctions at optimal terms."
      },
      {
        step: "04",
        title: "Disbursement & Continuous Partnership",
        description: "We monitor disbursement, audit covenants, and remain your trusted strategic advisor for ongoing expansion."
      }
    ],
    faqs: [
      {
        q: "What makes SKS INFI different from ordinary financial brokers?",
        a: "Ordinary brokers merely forward documents to a few bank branches. SKS INFI provides comprehensive financial advisory: our Chartered Accountants audit your balance sheet, optimize CMA data, identify missed government subsidies, structure risk mitigation, and negotiate directly with senior credit heads for the best interest rates."
      },
      {
        q: "How long has SKS INFI been operating in the financial sector?",
        a: "SKS INFI has over 12 years of hands-on experience in loan syndication, investment advisory, insurance, taxation, and MSME growth solutions, having advised over 4,500 clients across India."
      },
      {
        q: "Can SKS INFI help if my loan was previously rejected by another bank?",
        a: "Yes. Loan rejections frequently happen due to poorly structured CMA data, incorrect classification, or presenting to the wrong bank branch. We identify the exact reason for rejection, restructure your application, and place it with lenders whose credit appetite matches your profile."
      }
    ],
    metaTitle: "Why SKS INFI | Trusted MSME Financial & Growth Advisory Partner",
    metaDescription: "Discover why 4,500+ enterprises trust SKS INFI for MSME loans, sovereign subsidies, TReDS invoice discounting, VC funding, and SME IPO listings.",
    keywords: ["Why SKS INFI", "MSME Consultant Jaipur", "Financial Advisory Rajasthan", "Best Loan Consultant Jaipur", "MSME Growth Advisory"]
  },

  "registration": {
    slug: "registration",
    navLabel: "MSME Registration",
    title: "MSME & Udyam Registration, ZED & Certification Advisory",
    heroHeadline: "Fast-Track Government Empanelment, Udyam Registration & ZED Quality Certification",
    subtitle: "Unlock sovereign priority lending, government tender preferences, subsidy eligibility, and international recognition with flawless statutory registrations.",
    badge: "Statutory Empanelment & Certifications",
    heroStats: [
      { value: "100%", label: "Digital Execution" },
      { value: "24-48 Hrs", label: "Udyam Sanction Time" },
      { value: "Bronze/Silver/Gold", label: "ZED Certification" },
      { value: "2,000+", label: "Registrations Handled" }
    ],
    overview: [
      "The Government of India has instituted extensive privileges for Micro, Small, and Medium Enterprises, including 25% mandatory procurement by Central Public Sector Undertakings (CPSUs), waiver of tender fees & earnest money deposits (EMD), and collateral-free loan eligibility under CGTMSE. However, without accurate statutory registration, these benefits remain inaccessible.",
      "SKS INFI provides end-to-end statutory registration and certification advisory. We manage your Udyam Registration on the Ministry of MSME portal, ensuring correct National Industry Classification (NIC) codes and investment brackets to guarantee full eligibility for fiscal incentives.",
      "Beyond basic registration, we steer manufacturing MSMEs through Zero Defect Zero Effect (ZED) certification, National Small Industries Corporation (NSIC) single point empanelment, and the Government e-Marketplace (GeM) portal to secure high-value government contracts."
    ],
    offerings: [
      {
        title: "Udyam Registration on National MSME Portal",
        description: "Official registration with automated Aadhaar and PAN-based linkage, exact NIC code mapping, and generation of the digital Udyam Registration Certificate.",
        highlight: "Immediate Certification"
      },
      {
        title: "ZED Certification Advisory (Zero Defect, Zero Effect)",
        description: "End-to-end consulting for Bronze, Silver, and Gold level ZED certification with up to 80% government subsidy on certification fees and concessional bank interest rates.",
        highlight: "Up to 80% Govt Fee Subsidy"
      },
      {
        title: "Government e-Marketplace (GeM) Seller Onboarding",
        description: "Setting up verified primary and secondary seller profiles, OEM panel registration, brand authorization, and product catalog uploading to bid for government tenders.",
        highlight: "Direct PSU Tender Access"
      },
      {
        title: "NSIC Single Point Registration Scheme (SPRS)",
        description: "Empanelment with NSIC to receive complete waiver of Earnest Money Deposit (EMD), free tender documents, and purchase preference in central government procurement.",
        highlight: "Zero EMD in Tenders"
      },
      {
        title: "MSME Samadhaan (Delayed Payment Redressal)",
        description: "Filing and legal representation before the MSME Facilitation Council (MSEFC) to recover outstanding dues from defaulting corporate and government buyers with compound interest.",
        highlight: "Compound Interest Recovery"
      },
      {
        title: "ISO & Quality Standards Certification",
        description: "Facilitating ISO 9001, 14001, 45001, and 27001 certifications with central government reimbursements under competitive scheme provisions.",
        highlight: "Global Quality Benchmarking"
      }
    ],
    benefits: [
      { title: "Priority Sector Lending", desc: "Mandatory priority bank credit lines at 1% to 1.5% lower interest rates." },
      { title: "Tender Fee & EMD Waiver", desc: "Significant capital savings when bidding on railway, defense, and PSU contracts." },
      { title: "Protection Against Delayed Payments", desc: "Legal right under the MSMED Act to demand 3x RBI bank rate compound interest on dues exceeding 45 days." },
      { title: "50% Patent & Trademark Subsidy", desc: "Substantial fiscal relief on intellectual property registrations." }
    ],
    eligibility: [
      "Micro Enterprise: Investment in Plant & Machinery < ₹1 Crore & Turnover < ₹5 Crore",
      "Small Enterprise: Investment in Plant & Machinery < ₹10 Crore & Turnover < ₹50 Crore",
      "Medium Enterprise: Investment in Plant & Machinery < ₹50 Crore & Turnover < ₹250 Crore",
      "Applicable for Manufacturing, Services, and Wholesale/Retail Trade units"
    ],
    documentsRequired: [
      "Aadhaar Card of the Proprietor / Managing Partner / Authorized Director",
      "PAN Card of the Business Entity (and of the applicant)",
      "Bank Account details with IFSC code of the business entity",
      "GST Registration Certificate (GSTIN) or declaration if exempt",
      "Business address proof (Electricity bill, Lease deed, or Rent Agreement)",
      "Basic plant and machinery investment figures and previous year turnover records",
      "Major business activity description and products/services offered"
    ],
    processSteps: [
      {
        step: "01",
        title: "Profile Assessment & NIC Code Mapping",
        description: "We review your operational activities and map the exact 5-digit National Industry Classification codes to maximize eligible benefits."
      },
      {
        step: "02",
        title: "Digital Portal Filing & Verification",
        description: "We file the digital petition on the Udyam / GeM / ZED portal with OTP verification linked to promoter Aadhaar and PAN."
      },
      {
        step: "03",
        title: "Department Audit & Resolution",
        description: "We resolve any discrepancy queries raised by the District Industries Centre (DIC) or MSME Development Institute."
      },
      {
        step: "04",
        title: "Certificate Issuance & Strategy Briefing",
        description: "Issuance of the official QR-coded Udyam Certificate alongside an actionable guide on how to leverage it for loans and subsidies."
      }
    ],
    faqs: [
      {
        q: "Is Udyam Registration mandatory for obtaining MSME government subsidies and bank loans?",
        a: "Yes. The Ministry of MSME has mandated Udyam Registration as the sole legal identifier for MSMEs in India. Without an active Udyam Certificate, banks cannot classify your loan under Priority Sector Lending (PSL), and government agencies cannot process subsidy claims."
      },
      {
        q: "What is the cost of Udyam Registration?",
        a: "The Government of India does not charge any official portal fee for Udyam Registration. SKS INFI charges a modest professional consultation fee to ensure accurate NIC classification, documentation compilation, and seamless integration with your bank and GST profiles."
      },
      {
        q: "Can retail and wholesale traders register on Udyam?",
        a: "Yes. Under revised government guidelines, retail and wholesale trade enterprises are eligible for Udyam Registration under specified NIC codes, making them eligible for Priority Sector Lending (PSL) benefits."
      },
      {
        q: "What benefits does ZED certification provide to manufacturers?",
        a: "ZED (Zero Defect, Zero Effect) certified manufacturers receive direct interest concessions of 0.5% on bank loans, up to 80% subsidy on certification costs, preferential allotment of industrial plots, and bonus points in central public tenders."
      }
    ],
    metaTitle: "MSME & Udyam Registration Consultant Jaipur | SKS INFI",
    metaDescription: "Instant Udyam Registration, ZED Certification, GeM Onboarding & NSIC Empanelment. Unlock priority bank loans, tender fee waivers, and government subsidies.",
    keywords: ["MSME Registration", "Udyam Registration Jaipur", "ZED Certification", "GeM Portal Registration", "NSIC Registration", "MSMED Act Benefits"]
  },

  "subsidy-schemes": {
    slug: "subsidy-schemes",
    aliases: ["subsidy-solutions"],
    navLabel: "MSME Subsidy and Intertive Schemes",
    title: "MSME Subsidy & Government Incentive Schemes",
    heroHeadline: "Maximize Sovereign Capital Grants, Interest Subventions & RIPS 2024 Fiscal Rebates",
    subtitle: "Turnkey Detailed Project Reports (DPR), nodal department liaising, and disbursement tracking for Central & Rajasthan State Government incentive schemes.",
    badge: "Sovereign Subsidies & Grants",
    heroStats: [
      { value: "Up to 40%", label: "Capital Grant on Capex" },
      { value: "5% - 8%", label: "Interest Subvention" },
      { value: "100%", label: "Duty Exemptions" },
      { value: "₹85+ Cr", label: "Subsidies Disbursed" }
    ],
    overview: [
      "Both the Government of India and the Government of Rajasthan offer thousands of crores annually in non-dilutive capital subsidies, interest subvention, and statutory exemptions to stimulate industrialization. Regrettably, over 70% of eligible MSMEs miss out due to lack of awareness, complex regulatory paperwork, and missed filing deadlines.",
      "SKS INFI is Rajasthan's leading sovereign subsidy and fiscal incentive advisory practice. We identify every eligible central and state scheme applicable to your manufacturing, processing, or service enterprise, prepare bankable Detailed Project Reports (DPR), and manage complete nodal agency liaising from initial registration to final treasury disbursement.",
      "Our core focus includes the Rajasthan Investment Promotion Scheme (RIPS 2024 / RIPS 2022), Prime Minister's Employment Generation Programme (PMEGP), Credit Linked Capital Subsidy Scheme (CLCSS), Mukhyamantri Laghu Udyog Protsahan Yojana (MLUPY), and specialized sector grants."
    ],
    offerings: [
      {
        title: "Rajasthan Investment Promotion Scheme (RIPS 2024 / 2022)",
        description: "Turnkey assistance for Capital Subsidy (up to 40% on eligible fixed capital investment), Turnover-Linked Incentives, and 100% exemption on Electricity Duty, Mandi Fee, and Land Conversion Charges for 7 years.",
        highlight: "Up to 40% Capital Subsidy"
      },
      {
        title: "Interest Subvention Schemes (MLUPY & Central)",
        description: "Facilitating 5% to 8% annual interest subsidy on institutional bank loans, reducing the effective interest burden on term debt down to nominal levels.",
        highlight: "5% to 8% Interest Rebate"
      },
      {
        title: "PMEGP (Prime Minister's Employment Generation Programme)",
        description: "Setting up new manufacturing and service projects with margin money subsidy up to 25% (urban) and 35% (rural) for loans up to ₹50 Lakhs (manufacturing) and ₹20 Lakhs (services).",
        highlight: "Up to 35% Govt Margin Money"
      },
      {
        title: "Turnkey Detailed Project Report (DPR) Preparation",
        description: "Formulating technically vetted, bank-compliant DPRs covering plant layouts, machinery specifications, market feasibility, break-even analysis, and financial projections.",
        highlight: "Bankable DPRs"
      },
      {
        title: "Technology Upgradation & Green Energy Grants",
        description: "Claiming capital grants on rooftop solar installations, effluent treatment plants (ETP), energy-efficient industrial machinery, and water conservation systems.",
        highlight: "Clean Energy Grants"
      },
      {
        title: "Disbursement Follow-Up & Audit Defense",
        description: "Representing claims before State Level Screening Committees (SLSC) and District Level Screening Committees (DLSC) through to bank credit.",
        highlight: "100% Milestone Tracking"
      }
    ],
    benefits: [
      { title: "Direct Non-Dilutive Capital", desc: "Government grants that do not require equity dilution or loan repayment." },
      { title: "Substantially Lower Operational Costs", desc: "Years of 100% exemptions from electricity duty, land conversion tax, and stamp duty." },
      { title: "Accelerated Capex ROI", desc: "Subsidy inflows shorten break-even periods on multi-crore factory installations." },
      { title: "Seamless Compliance", desc: "Our team handles complex bureaucratic forms, inspections, and audit compliance." }
    ],
    eligibility: [
      "New manufacturing or service enterprises setting up operations in Rajasthan or pan-India",
      "Existing manufacturing units undergoing substantial expansion (minimum 25% to 50% capacity enhancement)",
      "Greenfield projects in Thrust Sectors: Textiles, Solar/Renewable, Agro-Processing, Pharmaceuticals, Defense, IT/ITeS",
      "Valid Udyam Registration and statutory environmental consents (CTE/CTO) where applicable"
    ],
    documentsRequired: [
      "Detailed Project Report (DPR) and Quotations for Plant & Machinery",
      "Industrial Land Title Deeds, RIICO Allotment Letter, or Registered Lease Agreement",
      "Audited Balance Sheets and Income Tax Returns of Promoters/Entity for past 3 years",
      "Bank Loan Sanction Letter and Appraisal Note from the lending financial institution",
      "State Pollution Control Board Consent to Establish (CTE) / Consent to Operate (CTO)",
      "Factory Sanction Map and Chartered Engineer's Certificate on civil construction",
      "Invoices, E-way bills, and Chartered Accountant's Certificate for machinery expenditure"
    ],
    processSteps: [
      {
        step: "01",
        title: "Scheme Eligibility & Subsidy Audit",
        description: "Comprehensive audit of your proposed capex or existing enterprise against all active Central and Rajasthan Government subsidy guidelines."
      },
      {
        step: "02",
        title: "Bankable DPR Formulation",
        description: "Preparation of an institutional Detailed Project Report aligned with DIC and Bureau of Investment Promotion (BIP) standards."
      },
      {
        step: "03",
        title: "Portal Submission & Screening Defense",
        description: "Filing digital claims on the RajNivesh / MSME portal and presenting the project before the District / State Level Screening Committee."
      },
      {
        step: "04",
        title: "Sanction Order & Entitlement Certificate",
        description: "Securing the official Entitlement Certificate specifying the exact subsidy amounts, exemptions, and disbursement schedule."
      },
      {
        step: "05",
        title: "Physical Inspection & Treasury Credit",
        description: "Facilitating nodal department site inspections and coordinating with the state treasury until funds hit your escrow account."
      }
    ],
    faqs: [
      {
        q: "What is RIPS 2024 and how much subsidy can my manufacturing unit receive?",
        a: "The Rajasthan Investment Promotion Scheme (RIPS 2024) is Rajasthan's flagship industrial policy. Depending on investment size and sector (standard vs. thrust sector), eligible enterprises can receive up to 40% capital subsidy on plant and machinery, 5% to 8% interest subvention for 7 years, and 100% exemption from electricity duty, mandi fee, and stamp duty."
      },
      {
        q: "Can I apply for government subsidies after purchasing machinery?",
        a: "Most schemes mandate that the subsidy registration or initial application be filed BEFORE commercial production commences or within a strict time limit (usually 60 to 90 days from the date of commercial production). SKS INFI ensures all registrations are completed within the statutory windows."
      },
      {
        q: "Does SKS INFI prepare the Detailed Project Report (DPR)?",
        a: "Yes. Our in-house financial analysts and engineers prepare comprehensive, bank-grade DPRs that satisfy both lending commercial banks and government screening committees."
      },
      {
        q: "What is the Mukhyamantri Laghu Udyog Protsahan Yojana (MLUPY)?",
        a: "MLUPY is a premier Rajasthan government scheme providing subsidized loans up to ₹10 Crore with interest subvention of 8% on loans up to ₹25 Lakhs, 6% on loans up to ₹5 Crore, and 5% on loans up to ₹10 Crore, making debt exceptionally affordable."
      }
    ],
    metaTitle: "MSME Subsidy Consultant Jaipur | RIPS 2024 & PMEGP Grants | SKS INFI",
    metaDescription: "Unlock up to 40% Capital Subsidy, 8% Interest Subvention, and 100% Tax Exemptions under RIPS 2024, PMEGP, and Central Govt Schemes with SKS INFI.",
    keywords: ["MSME Subsidy", "RIPS 2024 Subsidy Consultant", "PMEGP Scheme Jaipur", "MLUPY Rajasthan", "Industrial Subsidy Consultant", "Capital Investment Subsidy"]
  },

  "ipo-listing": {
    slug: "ipo-listing",
    aliases: ["msme-ipo"],
    navLabel: "MSME IPO & Listing",
    title: "MSME IPO Listing & Capital Markets Advisory",
    heroHeadline: "Scale from a Private Enterprise to a Publicly Traded Market Leader on BSE SME & NSE Emerge",
    subtitle: "Turnkey merchant banking coordination, corporate restructuring, DRHP preparation, underwriting, and anchor investor syndication for SME public listings.",
    badge: "Capital Markets & SME IPO",
    heroStats: [
      { value: "BSE & NSE", label: "Dedicated SME Platforms" },
      { value: "₹10 - 100 Cr", label: "Typical IPO Issue Size" },
      { value: "4-6 Months", label: "Listing Roadmap" },
      { value: "High Multiples", label: "Equity Value Unlocked" }
    ],
    overview: [
      "The Bombay Stock Exchange (BSE SME) and National Stock Exchange (NSE Emerge) have revolutionized equity capital access for Indian enterprises. Instead of relying solely on high-interest debt or dilutive venture rounds, profitable MSMEs can raise public equity, establish institutional valuations, and achieve phenomenal market recognition.",
      "An SME IPO provides founders with a powerful currency: publicly quoted stock that can be used for strategic acquisitions, attracting top-tier executive talent through ESOPs, and creating generational wealth while retaining operating control.",
      "SKS INFI provides comprehensive, end-to-end SME IPO advisory. We evaluate your listing readiness, restructure your balance sheet and share capital, appoint and coordinate with SEBI-registered Merchant Bankers and Underwriters, draft the Draft Red Herring Prospectus (DRHP), and coordinate institutional roadshows to ensure oversubscription."
    ],
    offerings: [
      {
        title: "Pre-IPO Diagnostic & Valuation Modeling",
        description: "Assessing historical profitability, financial ratios, and corporate governance against BSE SME & NSE Emerge listing norms to compute realistic market valuations.",
        highlight: "Valuation Diagnostic"
      },
      {
        title: "Merchant Banker & Underwriter Syndicate Appointment",
        description: "Leveraging our network to appoint tier-one SEBI-registered Lead Managers, Underwriters, Market Makers, and Legal Counsels at competitive syndication fees.",
        highlight: "100% Underwritten Issues"
      },
      {
        title: "Capital Restructuring & Bonus Share Issue",
        description: "Aligning authorized, issued, and paid-up share capital, issuing bonus shares to existing promoters, and formalizing ESOP pools ahead of public filing.",
        highlight: "Capital Structuring"
      },
      {
        title: "DRHP Drafting & Exchange Approvals",
        description: "Coordinating statutory audits, drafting the Draft Red Herring Prospectus (DRHP), handling due diligence queries, and securing in-principle exchange approval.",
        highlight: "Flawless Prospectus"
      },
      {
        title: "Anchor Investor & HNI Roadshows",
        description: "Curated investor roadshows across Mumbai, Delhi, Gujarat, and Rajasthan to secure Anchor Investor commitments and High Net-Worth Individual (HNI) bids.",
        highlight: "Guaranteed Anchor Placement"
      },
      {
        title: "Public Issue Management & Listing Bell-Ringing",
        description: "Managing the public bidding window, basis of allotment finalization, demat crediting, and celebration of the iconic listing ceremony on the trading floor.",
        highlight: "Iconic Bell Ringing"
      }
    ],
    benefits: [
      { title: "Access to Perpetual Growth Capital", desc: "Raise equity capital without interest burdens or monthly repayment liabilities." },
      { title: "Exponential Valuation & Liquidity", desc: "Transform an illiquid private business into publicly traded wealth with verifiable market cap." },
      { title: "Enhanced Corporate Governance & Prestige", desc: "Publicly listed status establishes unmatched credibility with domestic and international buyers." },
      { title: "Tax Advantages on Capital Gains", desc: "Enjoy concessional Long-Term Capital Gains (LTCG) tax rates on listed equity under STT." }
    ],
    eligibility: [
      "Post-issue paid-up capital must not exceed ₹25 Crore (as per SEBI SME guidelines)",
      "Minimum 2 to 3 consecutive years of operational track record with positive operating profit (EBITDA)",
      "Positive net worth with no accumulated balance sheet losses",
      "Clean promoter regulatory background with no SEBI, RBI, or economic offense debars",
      "Well-structured corporate entity (Private Limited or Public Limited Company)"
    ],
    documentsRequired: [
      "Audited Financial Statements (Balance Sheet, P&L, Cash Flow) for the last 3-5 years",
      "Memorandum and Articles of Association (MOA & AOA) of the company",
      "Promoter KYC, CIBIL reports, and shareholding pattern details",
      "Material operational contracts, vendor agreements, and key client purchase orders",
      "Statutory licenses, factory permits, and environmental clearances",
      "Title deeds and lease agreements of all operational company properties",
      "Litigation overview and legal disclosure statements"
    ],
    processSteps: [
      {
        step: "01",
        title: "Pre-IPO Feasibility & Governance Audit",
        description: "We evaluate your audited books, financial margins, and corporate governance to determine optimal valuation and IPO issue timing."
      },
      {
        step: "02",
        title: "Merchant Banker & Syndicate Empanelment",
        description: "We onboard SEBI-registered Lead Managers, Underwriters, Legal Advisors, and Market Makers to form the IPO execution syndicate."
      },
      {
        step: "03",
        title: "DRHP Drafting & Due Diligence",
        description: "Rigorous legal and financial due diligence culminating in the filing of the Draft Red Herring Prospectus with BSE or NSE."
      },
      {
        step: "04",
        title: "Exchange In-Principle Approval",
        description: "Defending the DRHP before the stock exchange listing committee to secure in-principle approval and observation clearance."
      },
      {
        step: "05",
        title: "Marketing, Bidding & Bell-Ringing",
        description: "Conducting marketing roadshows, opening the public issue, closing oversubscribed bids, and ringing the opening bell."
      }
    ],
    faqs: [
      {
        q: "What is the typical timeline to complete an MSME IPO on BSE SME or NSE Emerge?",
        a: "A well-prepared SME IPO generally takes 4 to 6 months from initial diagnostic to listing. This encompasses balance sheet restructuring, merchant banker onboarding, DRHP drafting, regulatory review, and roadshows."
      },
      {
        q: "What is the minimum turnover and profitability required for an SME IPO?",
        a: "While criteria vary slightly between BSE SME and NSE Emerge, generally an enterprise should demonstrate at least 2-3 years of operational track record, a positive operating profit (EBITDA) in the past two fiscal years, and positive net tangible assets. A minimum post-tax profit (PAT) of ₹1.5 Cr to ₹3 Cr makes the IPO highly attractive to institutional investors."
      },
      {
        q: "Is underwriting mandatory for an SME IPO?",
        a: "Yes. SEBI mandates that 100% of an SME IPO issue must be underwritten, with the lead merchant banker underwriting at least 15% on their own book. SKS INFI works with reputed merchant bankers who guarantee full underwriting support."
      },
      {
        q: "Can an SME listed on BSE SME or NSE Emerge migrate to the Main Board later?",
        a: "Yes! Once an enterprise reaches a paid-up capital of ₹10 Crore and a market capitalization of ₹25 Crore with satisfied listing tenure (usually 2 years), it can seamlessly migrate to the BSE or NSE Main Board alongside India's blue-chip companies."
      }
    ],
    metaTitle: "MSME IPO Consultant Jaipur | BSE SME & NSE Emerge Listing | SKS INFI",
    metaDescription: "Take your enterprise public on BSE SME & NSE Emerge. End-to-end SME IPO listing advisory: DRHP preparation, Merchant Banking, and Anchor Investor syndication.",
    keywords: ["MSME IPO", "SME IPO Consultant Jaipur", "BSE SME Listing", "NSE Emerge Listing", "SME Merchant Banking", "Take Company Public India"]
  },

  "invoice-discounting": {
    slug: "invoice-discounting",
    aliases: ["treds-setup"],
    navLabel: "Invoice Discounting",
    title: "Invoice Discounting & TReDS Setup Advisory",
    heroHeadline: "Unlock Trapped Working Capital within 24–48 Hours Without Collateral via RBI-Authorized TReDS",
    subtitle: "Turnkey onboarding on RXIL, M1xchange, and Invoicemart to convert unpaid corporate & PSU receivables into immediate liquid cash at the lowest auction rates.",
    badge: "Receivables Financing & TReDS",
    heroStats: [
      { value: "24-48 Hrs", label: "Liquidity Turnaround" },
      { value: "Zero", label: "Collateral Required" },
      { value: "Without Recourse", label: "True Off-Balance Sheet" },
      { value: "3 Platforms", label: "RXIL, M1xchange, Invoicemart" }
    ],
    overview: [
      "One of the biggest killers of viable Indian MSMEs is late payments on trade receivables. When supplying goods or services to large corporate conglomerates, PSUs, and government departments, payment terms frequently stretch from 60 to 120 days, choking liquidity and forcing business owners into high-interest debt.",
      "The Reserve Bank of India (RBI) created the Trade Receivables Electronic Discounting System (TReDS) specifically to eliminate this crisis. Through authorized digital exchanges (RXIL, M1xchange, and Invoicemart), your unpaid trade invoices are uploaded and auctioned among dozens of nationalized and private banks competing to fund you at the lowest interest discount rate.",
      "SKS INFI provides comprehensive TReDS Setup & Invoice Discounting advisory. We handle digital platform registration, buyer-supplier agreement drafting, enterprise portal integration, and daily auction monitoring to ensure continuous cash flow at institutional interest rates as low as 7.5% to 9.5% p.a."
    ],
    offerings: [
      {
        title: "Turnkey Onboarding on All 3 TReDS Platforms",
        description: "Simultaneous registration and KYC approval on RXIL (NSE/SIDBI), M1xchange, and Invoicemart (Axis Bank/Junction) for maximum auction liquidity.",
        highlight: "All 3 RBI Exchanges"
      },
      {
        title: "Off-Balance Sheet 'Without Recourse' Discounting",
        description: "Discounted invoices are financed 'Without Recourse'—if the corporate buyer defaults, your enterprise carries zero repayment liability, preserving credit lines.",
        highlight: "Zero Balance-Sheet Debt"
      },
      {
        title: "Competitive Multi-Bank Reverse Auction",
        description: "Over 35+ participating commercial banks bid against each other on the platform to purchase your invoices, driving factoring rates down to prime commercial levels.",
        highlight: "Lowest Discounting ROI"
      },
      {
        title: "Direct Escrow Settlement in 24–48 Hours",
        description: "Upon bid acceptance, 80% to 95% of the invoice value is credited directly into your operative bank account within 24 to 48 hours.",
        highlight: "Same-Day Cash Flow"
      },
      {
        title: "Vendor Invoice Management Desk",
        description: "Dedicated operational support from SKS INFI to upload tax invoices, e-way bills, and delivery challans, ensuring seamless buyer acceptance.",
        highlight: "Desk Operational Support"
      },
      {
        title: "Corporate & PSU Buyer Mapping",
        description: "Assisting your corporate and PSU clients with portal registration and automated buyer-approval workflows to eliminate approval friction.",
        highlight: "Buyer Relationship Harmony"
      }
    ],
    benefits: [
      { title: "No Property Collateral Needed", desc: "Funding is granted purely based on the creditworthiness of your corporate or PSU buyer." },
      { title: "Preserves Existing Bank Credit", desc: "TReDS does not utilize your existing Cash Credit (CC) or bank overdraft limits." },
      { title: "Eliminates Customer Chasing", desc: "The bank assumes collection responsibility on the maturity date from the corporate buyer." },
      { title: "Immediate Working Capital Cycles", desc: "Reinvest sales proceeds instantly into raw materials and new order execution." }
    ],
    eligibility: [
      "Any operational business registered as a Micro, Small, or Medium Enterprise with a valid Udyam Registration",
      "Supplying goods, industrial supplies, or services to Corporate entities (turnover > ₹500 Cr), PSUs, or Government Departments",
      "Invoices backed by accepted Purchase Orders (PO), delivery challans, and GST E-way bills",
      "Clean GST filing record and active business bank account"
    ],
    documentsRequired: [
      "Udyam Registration Certificate and GSTIN Certificate",
      "Certificate of Incorporation, MOA & AOA / Partnership Deed",
      "PAN Card and KYC documents of Promoters/Authorized Signatories",
      "Cancelled cheque of the operative bank account for NEFT/RTGS mandate",
      "Board Resolution / Authority Letter for TReDS portal operations",
      "Sample copies of accepted invoices, purchase orders, and client work orders",
      "Audited financial statements for the last 2 financial years"
    ],
    processSteps: [
      {
        step: "01",
        title: "Buyer Verification & Platform Selection",
        description: "We review your buyer roster to confirm their active presence on RXIL, M1xchange, or Invoicemart."
      },
      {
        step: "02",
        title: "Digital Registration & KYC Approval",
        description: "We compile all legal documentation, complete the digital onboarding, and secure exchange platform approval within 3-5 days."
      },
      {
        step: "03",
        title: "Invoice Upload & Buyer Acceptance",
        description: "We upload valid invoices and delivery documents; the corporate buyer digitally validates and accepts the factoring request."
      },
      {
        step: "04",
        title: "Reverse Auction & Bid Acceptance",
        description: "Multiple banks bid interest rates in a live auction; you select the lowest bid with a single digital click."
      },
      {
        step: "05",
        title: "Direct Escrow Bank Credit",
        description: "Funds are disbursed directly to your account within 24 hours, completely collateral-free."
      }
    ],
    faqs: [
      {
        q: "How does TReDS Invoice Discounting differ from conventional bank bill discounting?",
        a: "Conventional bill discounting requires bank sanction limits, extensive personal collateral, and is almost always 'with recourse' (meaning you must repay if the buyer defaults). TReDS operates via RBI-authorized platforms where multiple banks bid for invoices without requiring collateral from you, and transactions are off-balance-sheet 'without recourse'."
      },
      {
        q: "What discount rates can I expect on TReDS?",
        a: "Because discounting rates are based on the credit rating of the corporate or PSU buyer, rates are remarkably low—typically ranging from 7.5% to 9.5% annualized, which is often far lower than standard business loan interest rates."
      },
      {
        q: "What happens if the buyer delays payment on the invoice due date?",
        a: "Under 'Without Recourse' factoring on TReDS, the lending bank collects directly from the corporate buyer on the due date. The MSME supplier carries no repayment liability or collection burden."
      },
      {
        q: "How many days does it take to get onboarding completed on TReDS?",
        a: "With SKS INFI managing the documentation and buyer mapping, onboarding and portal activation are typically completed in just 3 to 5 working days."
      }
    ],
    metaTitle: "TReDS Invoice Discounting Consultant | RXIL, M1xchange | SKS INFI",
    metaDescription: "Unlock 24-48 hr collateral-free working capital via RBI-authorized TReDS platforms (RXIL, M1xchange, Invoicemart). SKS INFI provides turnkey onboarding.",
    keywords: ["Invoice Discounting", "TReDS Setup Consultant", "RXIL Onboarding", "M1xchange", "Invoicemart", "Receivables Financing India"]
  },

  "growth-solutions": {
    slug: "growth-solutions",
    navLabel: "MSME Growth & Bussiness Solutions",
    title: "MSME Growth & Business Turnaround Solutions",
    heroHeadline: "Accelerate Enterprise Scale, Operational Profitability & Market Competitiveness",
    subtitle: "Strategic corporate turnaround, financial modeling, supply chain optimization, and credit rating enhancement for scaling Indian enterprises.",
    badge: "Strategic Scaling & Advisory",
    heroStats: [
      { value: "3.5x", label: "Average Growth Multiplier" },
      { value: "35%+", label: "EBITDA Margin Improvement" },
      { value: "100+", label: "Turnaround Mandates" },
      { value: "2 Notch", label: "Average Rating Upgrade" }
    ],
    overview: [
      "Scaling an MSME from a localized business into an institutional mid-market enterprise requires fundamentally different strategies. Business owners frequently hit plateau points: cash flows get bottlenecked, working capital gets stretched, margins erode, and bank limits reach saturation.",
      "SKS INFI's MSME Growth & Business Solutions practice delivers high-impact management consulting and financial restructuring designed specifically for Indian enterprises. We work alongside promoters to identify margin leakages, optimize capital allocation, and implement institutional financial controls.",
      "From digital transformation and supply chain refinancing to formalizing corporate governance and enhancing CRISIL/ICRA credit ratings, our actionable interventions empower your enterprise to outpace competitors and achieve sustainable profitability."
    ],
    offerings: [
      {
        title: "Enterprise Growth Blueprint & Financial Modeling",
        description: "Multi-year financial forecasting, sensitivity analysis, and capital allocation roadmaps to fund organic growth and new product lines safely.",
        highlight: "Strategic Roadmap"
      },
      {
        title: "Credit Rating Enhancement (CRISIL, ICRA, CARE)",
        description: "Advising on financial ratio restructuring, debt-to-equity balancing, and liquidity coverage to achieve multi-notch credit rating upgrades, slashing borrowing costs.",
        highlight: "Multi-Notch Upgrades"
      },
      {
        title: "Corporate Turnaround & Stressed Asset Resolution",
        description: "Re-engineering distressed operations, renegotiating one-time settlements (OTS) or consortium debt restructuring under RBI prudential frameworks.",
        highlight: "Stressed Debt Resolution"
      },
      {
        title: "Working Capital & Cash Flow Re-Engineering",
        description: "Streamlining inventory cycles, accounts receivable management, and supplier payment terms to unlock hidden cash from balance sheets.",
        highlight: "Unlock Trapped Liquidity"
      },
      {
        title: "Governance & Succession Planning",
        description: "Transitioning family-owned businesses into professionally managed corporations with clear succession roadmaps, advisory boards, and internal controls.",
        highlight: "Generational Wealth Continuity"
      },
      {
        title: "Mergers, Acquisitions & Joint Ventures (M&A)",
        description: "Identifying synergistic domestic acquisition targets, conducting commercial due diligence, and structuring buyout funding.",
        highlight: "Strategic Buyouts & JVs"
      }
    ],
    benefits: [
      { title: "Expanded Profit Margins", desc: "Rigorous cost restructuring and pricing optimization that enhances bottom-line EBITDA." },
      { title: "Institutional Valuation", desc: "Position your company for lucrative private equity investment or SME IPO multiples." },
      { title: "Robust Risk Management", desc: "Safeguard against raw material volatility, customer default risks, and regulatory shifts." },
      { title: "Freedom for Promoters", desc: "Institutionalized operations enable owners to transition from daily fires to strategic growth." }
    ],
    eligibility: [
      "Operating MSMEs with annual revenues between ₹2 Crore and ₹250+ Crore",
      "Enterprises operating in Manufacturing, Engineering, Textiles, FMCG, Agro-Tech, Logistics, and Services",
      "Promoters committed to professionalizing their management systems and balance sheets"
    ],
    documentsRequired: [
      "Audited Financial Statements for the last 3 fiscal years",
      "Current organizational chart and operational department breakdown",
      "Existing debt profile and banking covenant reports",
      "Customer and supplier concentration matrices",
      "Management briefing on strategic growth roadblocks"
    ],
    processSteps: [
      {
        step: "01",
        title: "Operational & Financial Diagnostic",
        description: "We conduct a comprehensive 360-degree audit of your profit margins, cash conversion cycles, debt load, and management bottlenecks."
      },
      {
        step: "02",
        title: "Value Creation Blueprint",
        description: "We formulate an actionable 90-day and 1-year transformation roadmap with quantifiable milestones and KPI dashboards."
      },
      {
        step: "03",
        title: "Execution Handholding",
        description: "Our senior advisors work directly with your leadership team to implement financial controls, renegotiate terms, and restructure debt."
      },
      {
        step: "04",
        title: "Governance & Sustained Scale",
        description: "We institutionalize management reporting, quarterly reviews, and strategic capital management for compounding growth."
      }
    ],
    faqs: [
      {
        q: "How does credit rating advisory help my business?",
        a: "External credit ratings from agencies like CRISIL, ICRA, and CARE dictate the interest margin banks charge on your loans. An upgrade of just one or two notches (e.g., from BBB- to A-) can reduce borrowing costs by 75 to 150 basis points across your entire credit portfolio, saving tens of lakhs annually."
      },
      {
        q: "What types of businesses benefit most from SKS INFI Growth Solutions?",
        a: "Manufacturing, industrial trading, and export enterprises scaling between ₹5 Crore and ₹100 Crore turnover benefit immensely. These firms have established product-market fit but face operational bottlenecks, cash flow strain, or high interest rates."
      },
      {
        q: "Can SKS INFI assist with family business succession and professionalization?",
        a: "Yes. We help family enterprises transition into institutional corporate entities by setting up family charters, advisory boards, professional CXO hiring frameworks, and equitable equity splits."
      }
    ],
    metaTitle: "MSME Growth & Business Solutions Consultant | SKS INFI",
    metaDescription: "Accelerate your enterprise scale with MSME Growth & Business Solutions: Financial Modeling, Credit Rating Enhancement, and Corporate Turnaround advisory.",
    keywords: ["MSME Growth Solutions", "Business Turnaround Consultant Jaipur", "Credit Rating Advisory CRISIL", "SME Management Advisory", "Cash Flow Optimization"]
  },

  "venture-capital": {
    slug: "venture-capital",
    navLabel: "MSME Venture Capital & Private Equity",
    title: "MSME Venture Capital & Private Equity Advisory",
    heroHeadline: "Connect Scaling Enterprises with Institutional Equity, Angel Syndicates & Growth Capital",
    subtitle: "End-to-end fundraising advisory: financial valuation modeling, pitch deck formulation, investor roadshows, and term sheet negotiations.",
    badge: "Equity & Institutional Fundraising",
    heroStats: [
      { value: "₹5 - 50 Cr", label: "Target Round Sizes" },
      { value: "150+", label: "Active VC/PE Networks" },
      { value: "Seed to Series B", label: "Funding Stages" },
      { value: "8-16 Weeks", label: "Execution Timeline" }
    ],
    overview: [
      "While debt is an essential tool for steady-state working capital, high-growth enterprises and disruptive manufacturers require non-dilutive, patient equity capital to capture market share, invest in R&D, and expand internationally. Navigating the institutional venture capital (VC) and private equity (PE) landscape can be daunting for traditional MSME promoters.",
      "SKS INFI's Venture Capital & Private Equity advisory practice bridges the gap between ambitious Indian entrepreneurs and institutional capital providers. We curate deals for early-stage VC funds, family office syndicates, high-net-worth angel networks, and specialized growth equity funds.",
      "We prepare your enterprise for rigorous institutional scrutiny. Our team constructs institutional financial models, creates compelling investor pitch decks, structures fair valuations, and negotiates protective term sheet clauses (SHA/SSA) to safeguard promoter control."
    ],
    offerings: [
      {
        title: "Investment Readiness Diagnostic & Valuation Modeling",
        description: "DCF, comparable company analysis (CCA), and precedent transaction modeling to establish an attractive yet defensible enterprise valuation.",
        highlight: "Defensible Valuation"
      },
      {
        title: "Institutional Pitch Deck & Executive Teasers",
        description: "Formulating compelling investor presentations, financial teasers, and detailed Information Memorandums (IM) tailored to VC/PE investment committees.",
        highlight: "High-Impact Pitch Decks"
      },
      {
        title: "Direct Curated Investor Roadshows",
        description: "Facilitating targeted introductions and pitch meetings with active venture capital funds, family offices, and mid-market growth equity investors.",
        highlight: "150+ Institutional Ties"
      },
      {
        title: "Venture Debt & Hybrid Mezzanine Financing",
        description: "Arranging venture debt credit lines that provide growth runway with minimal equity dilution (1%-3% equity warrant coverage).",
        highlight: "Low-Dilution Venture Debt"
      },
      {
        title: "Term Sheet Structuring & SHA/SSA Negotiation",
        description: "Negotiating crucial investment covenants: liquidation preferences, anti-dilution rights, board composition, and founder vesting schedules.",
        highlight: "Protects Founder Equity"
      },
      {
        title: "Due Diligence & Closing Management",
        description: "Managing financial, legal, and statutory due diligence workflows with third-party audit firms for smooth capital escrow closing.",
        highlight: "Smooth Escrow Closing"
      }
    ],
    benefits: [
      { title: "Accelerated Market Expansion", desc: "Inject institutional capital to scale production capacity, enter new markets, and expand sales teams." },
      { title: "Strategic Network Access", desc: "Gain investor partners with deep industry relationships, operational expertise, and global distribution." },
      { title: "Preserved Founder Autonomy", desc: "Our experienced negotiators ensure protective clauses do not compromise promoter operational freedom." },
      { title: "Validation & Industry Prestige", desc: "Institutional backing immediately elevates company valuation and consumer brand trust." }
    ],
    eligibility: [
      "Demonstrated product-market fit with clear scalable unit economics",
      "Minimum annual revenues of ₹3 Crore to ₹50+ Crore (or high MRR for SaaS/tech ventures)",
      "High-growth sectors: Tech-enabled Manufacturing, D2C Brands, FinTech, CleanTech, Logistics, HealthTech",
      "Ambitious promoter team with a clear 3-to-5-year vision and large addressable market"
    ],
    documentsRequired: [
      "Past 3 years audited financials and current year provisional statements",
      "Detailed cap table showing existing shareholding patterns",
      "Product deck, customer testimonials, and operational metrics",
      "IP patents, trademark filings, and proprietary technology documentation",
      "Commercial contract details and forward pipeline projections"
    ],
    processSteps: [
      {
        step: "01",
        title: "Readiness Diagnostic & Valuation",
        description: "We audit your business model, customer acquisition costs (CAC), lifetime value (LTV), and establish valuation targets."
      },
      {
        step: "02",
        title: "Collateral Creation & Pitch Deck",
        description: "We craft an institutional-grade pitch deck, three-statement financial model, and confidential information memorandum."
      },
      {
        step: "03",
        title: "Curated Investor Outreach",
        description: "We orchestrate warm introductions to aligned venture capital partners and family offices seeking deals in your vertical."
      },
      {
        step: "04",
        title: "Term Sheet Negotiation",
        description: "We compare multiple offers, negotiate optimal valuations, and lock in founder-friendly terms."
      },
      {
        step: "05",
        title: "Due Diligence & Fund Transfer",
        description: "We coordinate with legal and financial auditors to clear due diligence queries and disburse funds to company accounts."
      }
    ],
    faqs: [
      {
        q: "What is the typical fundraise size SKS INFI facilitates for MSMEs?",
        a: "We primarily structure institutional rounds between ₹5 Crore and ₹50 Crore (Seed, Pre-Series A, Series A, and Growth Equity rounds), as well as venture debt tranches between ₹2 Crore and ₹15 Crore."
      },
      {
        q: "How does Venture Debt differ from traditional bank loans?",
        a: "Venture debt is tailored for high-growth enterprises that may not yet meet standard bank profitability or collateral norms. It provides fast capital with minimal equity dilution (often with nominal warrants) and repayment terms aligned with company cash cycles."
      },
      {
        q: "How long does a private equity or venture capital fundraise typically take?",
        a: "A typical equity fundraising cycle spans 8 to 16 weeks—from initial collateral preparation and investor outreach to term sheet signing, legal due diligence, and capital escrow disbursement."
      }
    ],
    metaTitle: "MSME Venture Capital & Private Equity Advisory | SKS INFI",
    metaDescription: "Raise institutional growth capital. SKS INFI connects scaling MSMEs with Venture Capital, Private Equity, Family Offices, and Venture Debt across India.",
    keywords: ["MSME Venture Capital", "Private Equity Consultant Jaipur", "Growth Capital India", "Startup Fundraising", "Pitch Deck Advisory", "Venture Debt"]
  },

  "cgtmse": {
    slug: "cgtmse",
    aliases: ["cgtsme", "loan-services"],
    navLabel: "CGTSME & MSME",
    title: "CGTMSE Collateral-Free Loans & MSME Debt Financing",
    heroHeadline: "Secure Collateral-Free Business Loans up to ₹5–10 Crore under Government CGTMSE Guarantee",
    subtitle: "Fast-track loan sanctions powered by direct empanelment across 40+ PSU, private commercial banks, and specialized financial institutions.",
    badge: "Credit Guarantee Scheme (CGTMSE)",
    heroStats: [
      { value: "Up to ₹10 Cr", label: "Collateral-Free Limit" },
      { value: "85%", label: "Govt Guarantee Coverage" },
      { value: "40+ Banks", label: "Lending Partners" },
      { value: "7-10 Days", label: "Sanction Fast-Track" }
    ],
    overview: [
      "For decades, promising Indian entrepreneurs were held back by a single insurmountable barrier: lack of immovable property collateral (land, residential, or commercial buildings) required by conservative banks. The Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)—jointly set up by the Ministry of MSME and SIDBI—permanently dismantled this roadblock.",
      "Under CGTMSE, eligible micro and small enterprises can secure term loans, working capital facilities, and composite credit lines up to ₹5 Crore (and up to ₹10 Crore in select expanded categories) without pledging a single square foot of personal real estate collateral. The trust provides government guarantee coverage up to 85% to the lending institution.",
      "SKS INFI is India's leading CGTMSE advisory specialist. We understand which PSU and private banks have active guarantee allocation limits, prepare robust project reports demonstrating viable cash flow repayment capacity, and secure fast-track sanctions with the lowest possible guarantee fees."
    ],
    offerings: [
      {
        title: "Collateral-Free CGTMSE Loans up to ₹5 - 10 Crore",
        description: "Securing term debt and working capital credit lines without mortgaging real estate property or requiring third-party personal guarantors.",
        highlight: "Zero Immovable Collateral"
      },
      {
        title: "Hybrid Collateral Structure Advisory",
        description: "Combining partial collateral (e.g., 20%-30% security) with CGTMSE guarantee cover to unlock substantially larger credit limits at lower risk margins.",
        highlight: "Hybrid Security Models"
      },
      {
        title: "Machinery & Equipment Term Loans",
        description: "Financing advanced CNC machines, automated manufacturing lines, and specialized tools with hypothecation of the asset itself as primary security.",
        highlight: "Hypothecation Only"
      },
      {
        title: "Cash Credit (CC) / Overdraft (OD) Limits",
        description: "Rolling working capital limits to finance raw material purchase, employee payroll, and debtor cycles with hypothecation of stock and receivables.",
        highlight: "Flexible Cash Credit"
      },
      {
        title: "CGTMSE Guarantee Fee Optimization",
        description: "Advising on woman-owned enterprises, SC/ST promoters, and North-Eastern/special category concessions to slash statutory annual guarantee fees.",
        highlight: "Concessional Guarantee Fees"
      },
      {
        title: "Fast-Track Credit Appraisal & Representation",
        description: "Defending loan proposals directly before bank credit committees, eliminating branch-level hesitation and bureaucratic delays.",
        highlight: "Direct Committee Defense"
      }
    ],
    benefits: [
      { title: "Preserves Personal Assets", desc: "No need to mortgage family residential homes, ancestral farmland, or commercial premises." },
      { title: "Accelerated Business Launch", desc: "First-generation entrepreneurs can launch capital-intensive manufacturing units on merit." },
      { title: "Competitive Interest Rates", desc: "PSU bank lending rates under CGTMSE typically range between 8.5% and 11% p.a." },
      { title: "Long Repayment Horizons", desc: "Tenures extending up to 7 to 10 years with initial moratorium periods up to 12-24 months." }
    ],
    eligibility: [
      "New and existing Micro and Small Enterprises engaged in Manufacturing or Service activities",
      "Valid Udyam Registration Certificate",
      "Satisfactory CIBIL score of individual promoters (680+ recommended)",
      "Commercially viable business plan with verified repayment cash flows and adequate DSCR (> 1.25)",
      "Retail trade, educational institutions, and self-help groups are subject to special scheme provisions"
    ],
    documentsRequired: [
      "Promoter KYC documents (PAN, Aadhaar, Passport, Proof of Residence)",
      "Entity Registration: Certificate of Incorporation, MOA & AOA / Partnership Deed",
      "Udyam Registration Certificate and GSTIN Registration",
      "Detailed Project Report (DPR) with financial viability and projected cash flows",
      "Quotation / Proforma Invoices of Plant, Machinery, or Equipment to be purchased",
      "Last 12 months bank statements of all promoter and entity accounts",
      "Audited financial statements and ITR for past 2-3 years (for existing enterprises)",
      "Factory or commercial premises lease agreement or proof of ownership"
    ],
    processSteps: [
      {
        step: "01",
        title: "Project Viability & Debt Service Assessment",
        description: "We audit your business model, projected revenues, and debt-service coverage ratio (DSCR) to ensure credit committee compliance."
      },
      {
        step: "02",
        title: "Bankable Project Report Preparation",
        description: "Our chartered accountants prepare a comprehensive, bank-compliant Detailed Project Report with CMA schedules."
      },
      {
        step: "03",
        title: "Lender Selection & Proposal Submission",
        description: "We place the application with top PSU or private banks that have active CGTMSE lending targets in your region."
      },
      {
        step: "04",
        title: "Credit Committee Sanction",
        description: "We represent your file before regional credit heads, resolve technical queries, and secure the formal sanction letter."
      },
      {
        step: "05",
        title: "CGTMSE Guarantee Fee & Disbursement",
        description: "Payment of the nominal annual guarantee fee to the trust, documentation execution, and immediate disbursement to suppliers/accounts."
      }
    ],
    faqs: [
      {
        q: "What is the maximum loan amount available under the CGTMSE scheme?",
        a: "Under current expanded CGTMSE guidelines, eligible micro and small enterprises can secure up to ₹5 Crore (and up to ₹10 Crore in select specialized categories and enhanced PSU programs) without pledging immovable property collateral."
      },
      {
        q: "What is the guarantee fee charged under CGTMSE?",
        a: "The annual guarantee fee ranges between 0.37% and 1.35% of the sanctioned loan limit, depending on the loan size, gender of the promoter (women entrepreneurs receive special discounts), and regional location (concessions for aspirational districts)."
      },
      {
        q: "Can existing businesses with running loans apply for CGTMSE loans?",
        a: "Yes. Both new greenfield startups and established brownfield enterprises undergoing modernization or capacity expansion are eligible for CGTMSE loans."
      },
      {
        q: "Why do some bank branches refuse CGTMSE loans?",
        a: "Branch managers are often hesitant due to risk aversion or lack of clarity regarding guarantee claim settlement. SKS INFI resolves this by routing applications through Zonal and SME Banking Hubs where senior credit officers have specialized mandates and dedicated targets for CGTMSE disbursements."
      }
    ],
    metaTitle: "CGTMSE Collateral-Free MSME Loan Consultant Jaipur | SKS INFI",
    metaDescription: "Get collateral-free business loans up to ₹5–10 Crore under the CGTMSE government guarantee scheme. SKS INFI guarantees fast sanctions across 40+ banks.",
    keywords: ["CGTMSE Loan", "Collateral Free Loan Jaipur", "CGTSME MSME Loan", "Machinery Loan Without Collateral", "MSME Loan Consultant Jaipur", "Government Guaranteed Loan"]
  }
};

export function getMsmePageBySlug(slug: string): MsmePageData | null {
  const normalized = slug.toLowerCase().trim();
  if (MSME_PAGES_DATA[normalized]) {
    return MSME_PAGES_DATA[normalized];
  }
  for (const page of Object.values(MSME_PAGES_DATA)) {
    if (page.aliases && page.aliases.includes(normalized)) {
      return page;
    }
  }
  return null;
}

