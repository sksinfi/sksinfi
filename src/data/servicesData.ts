export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: "loans" | "investments" | "insurance" | "real-estate" | "taxation" | "nri";
  categoryLabel: string;
  shortDesc: string;
  fullDesc: string;
  interestRate?: string;
  tenure?: string;
  maxAmount?: string;
  features: string[];
  eligibility: string[];
  documents: string[];
  icon: string;
  image: string;
}

export const servicesData: ServiceItem[] = [
  // ================= LOANS =================
  {
    id: "home-loan",
    slug: "home-loan",
    category: "loans",
    categoryLabel: "Loans & Financing",
    title: "Home Loan",
    shortDesc: "Turn your dream home into reality with competitive interest rates and flexible tenures up to 30 years.",
    fullDesc: "SKS INFI partners with top national and private banks across India to provide fast, hassle-free home loan sanctions with minimal paperwork, transparent terms, and customized repayment schedules.",
    interestRate: "Starting @ 8.40% p.a.",
    tenure: "Up to 30 Years",
    maxAmount: "Up to ₹10 Crore",
    features: [
      "Zero hidden prepayment charges",
      "Quick sanction within 48 to 72 hours",
      "Doorstep document pickup in Jaipur & major cities",
      "Balance transfer with top-up facility available"
    ],
    eligibility: [
      "Salaried individuals (min 2 years total experience)",
      "Self-employed professionals and business owners (min 3 years ITR)",
      "Age: 21 to 65 years",
      "Good CIBIL score (680+ preferred)"
    ],
    documents: [
      "PAN Card and Aadhaar Card",
      "Last 6 months bank statement",
      "Last 3 months salary slips or 3 years ITR with computation",
      "Property purchase agreement / Title deeds"
    ],
    icon: "Home",
    image: "/images/loans/home_loan.png"
  },
  {
    id: "business-loan",
    slug: "business-loan",
    category: "loans",
    categoryLabel: "Loans & Financing",
    title: "Business Loan",
    shortDesc: "Collateral-free and secured business financing to expand operations, purchase inventory, or scale infrastructure.",
    fullDesc: "Whether you need working capital for rapid seasonal scaling or capital expenditure for purchasing advanced plant equipment, SKS INFI tailors high-ticket business credit through our elite network of 50+ lenders.",
    interestRate: "Starting @ 11.25% p.a.",
    tenure: "1 to 7 Years",
    maxAmount: "Up to ₹50 Crore",
    features: [
      "Both unsecured and asset-backed credit options",
      "Structured disbursements for MSMEs and enterprises",
      "Overdraft (OD) and Cash Credit (CC) limit setups",
      "Government subsidy advisory integration"
    ],
    eligibility: [
      "Business vintage of at least 2 years",
      "Minimum annual turnover of ₹40 Lakhs",
      "Audited financial statements and active GST filing"
    ],
    documents: [
      "Business registration certificate (GST/MSME/Incorporation)",
      "Last 12 months current bank account statements",
      "Past 2 years audited Balance Sheet & P&L",
      "KYC of all directors/partners"
    ],
    icon: "Briefcase",
    image: "/images/loans/business_loan.jpg"
  },
  {
    id: "loan-against-property",
    slug: "lap",
    category: "loans",
    categoryLabel: "Loans & Financing",
    title: "Loan Against Property (LAP)",
    shortDesc: "Unlock the highest financial value hidden in your residential or commercial property with low-interest mortgage loans.",
    fullDesc: "Leverage your self-occupied or rented residential or commercial real estate to access substantial liquidity for business expansion, debt consolidation, or high-value personal commitments.",
    interestRate: "Starting @ 8.95% p.a.",
    tenure: "Up to 15 Years",
    maxAmount: "Up to 70% of Property Market Value",
    features: [
      "Substantially lower EMI compared to personal or unsecured loans",
      "High sanction limits up to ₹25+ Crores",
      "Flexible repayment and overdraft options",
      "Residential, commercial, and industrial properties accepted"
    ],
    eligibility: [
      "Clear, marketable freehold property title",
      "Salaried or self-employed with steady verifiable income",
      "Applicant age between 25 and 70 years"
    ],
    documents: [
      "Complete chain of property documents and approved plan",
      "Income proof (ITR / Form 16 / Audited P&L)",
      "Bank statements of last 6 to 12 months"
    ],
    icon: "Building",
    image: "/images/loans/loan_against_property.jpg"
  },
  {
    id: "personal-loan",
    slug: "personal-loan",
    category: "loans",
    categoryLabel: "Loans & Financing",
    title: "Personal Loan",
    shortDesc: "Fast-track unsecured personal loans with zero collateral required for urgent life milestones and emergencies.",
    fullDesc: "Instant emergency funding for medical care, destination weddings, international education, or home renovation with paperless instant approvals.",
    interestRate: "Starting @ 10.50% p.a.",
    tenure: "1 to 5 Years",
    maxAmount: "Up to ₹40 Lakhs",
    features: [
      "100% collateral-free borrowing",
      "Disbursal within 24 hours of document verification",
      "Fixed monthly installments with transparent amortization"
    ],
    eligibility: [
      "Minimum net monthly salary of ₹25,000",
      "Age: 21 to 58 years",
      "CIBIL Score of 700+"
    ],
    documents: [
      "Aadhaar, PAN Card, and Current Address Proof",
      "3 months salary slips with official work email",
      "6 months salary credit bank statement"
    ],
    icon: "UserCheck",
    image: "/images/loans/personal_loan.png"
  },

  {
    id: "car-loan",
    slug: "car-loan",
    category: "loans",
    categoryLabel: "Loans & Financing",
    title: "New Car Loan",
    shortDesc: "Drive home your dream car with competitive interest rates and up to 100% on-road funding from top banks.",
    fullDesc: "SKS INFI partners with nationalized and private banks across India to provide instant car loan approvals with minimal documentation and flexible repayment tenures up to 7 years.",
    interestRate: "Starting @ 8.65% p.a.",
    tenure: "Up to 7 Years",
    maxAmount: "Up to 100% On-Road",
    features: [
      "Zero foreclosure & prepayment charges on select banks",
      "Doorstep documentation & fast turnaround",
      "Special discounts on corporate & salaried profiles",
      "Tie-ups with leading automobile dealerships"
    ],
    eligibility: [
      "Salaried individuals (min 1 year work experience)",
      "Self-employed individuals and business owners (min 2 years ITR)",
      "Age: 21 to 65 years",
      "Minimum monthly income: ₹25,000"
    ],
    documents: [
      "PAN Card & Aadhaar Card",
      "Latest 3 months salary slips or 2 years ITR",
      "6 months bank statements",
      "Car proforma invoice from authorized dealer"
    ],
    icon: "Car",
    image: "/images/loans/car_loan.jpg"
  },
  {
    id: "used-car-loan",
    slug: "used-car-loan",
    category: "loans",
    categoryLabel: "Loans & Financing",
    title: "Used Car Loan & Refinance",
    shortDesc: "Finance certified pre-owned cars, refinance your existing vehicle, or transfer high-interest auto loans.",
    fullDesc: "Complete financing solutions for second-hand vehicles including used car purchases, car re-finance for quick equity liquidity, loan takeover, and loan top-up with fast approvals.",
    interestRate: "Starting @ 10.50% p.a.",
    tenure: "Up to 5 Years",
    maxAmount: "Up to 90% Valuation",
    features: [
      "Used car purchase funding for certified & multi-brand cars",
      "Car re-finance to unlock funds against owned vehicles",
      "Loan takeover with top-up facility",
      "Financing available for interstate re-registered vehicles"
    ],
    eligibility: [
      "Salaried or self-employed individuals",
      "Vehicle age should not exceed 10 years at loan maturity",
      "Clear vehicle registration and ownership history",
      "Age: 21 to 65 years"
    ],
    documents: [
      "PAN Card & Aadhaar Card",
      "RC copy of vehicle & insurance policy",
      "Income proof (salary slip / ITR)",
      "6 months banking history"
    ],
    icon: "Car",
    image: "/images/loans/used_car_loan.jpg"
  },
  // ================= INVESTMENTS =================
  {
    id: "mutual-funds",
    slug: "mutual-funds",
    category: "investments",
    categoryLabel: "Wealth & Investment",
    title: "Mutual Funds & SIPs",
    shortDesc: "Scientifically curated mutual fund portfolios designed for compounding wealth, tax saving (ELSS), and beating inflation.",
    fullDesc: "Our AMFI-certified wealth managers design diversified portfolios across Large Cap, Flexi Cap, Hybrid, Mid & Small Cap funds backed by deep quantitative risk analysis and regular rebalancing.",
    interestRate: "Targeted 12% - 16% CAGR (Historical)",
    tenure: "Flexible (SIP or Lumpsum)",
    features: [
      "Systematic Investment Plan (SIP) starting at just ₹500/month",
      "Zero advisory bias; automated portfolio tracking",
      "Tax saving up to ₹1.5 Lakh under Section 80C through ELSS",
      "Periodic reviews with dedicated wealth relationship manager"
    ],
    eligibility: [
      "Any individual resident or NRI holding KYC compliance",
      "Minors through natural guardians",
      "Corporates, LLPs, and HUF entities"
    ],
    documents: [
      "PAN Card & Aadhaar Card",
      "Cancelled cheque / Bank account details",
      "Passport size photo & basic KYC verification"
    ],
    icon: "TrendingUp",
    image: "/images/Mutual-Fund-Portfolio.avif"
  },
  {
    id: "bonds-ncd",
    slug: "bonds",
    category: "investments",
    categoryLabel: "Wealth & Investment",
    title: "Government & Corporate Bonds",
    shortDesc: "Secure fixed recurring income through AAA-rated sovereign and corporate debt instruments.",
    fullDesc: "Earn higher guaranteed yields than traditional bank savings without stock market volatility. SKS INFI brings institutional-grade bonds, 54EC capital gains bonds, and listed NCDs to retail and HNI investors.",
    interestRate: "Fixed Yields 8.5% - 11.5% p.a.",
    tenure: "1 to 10 Years",
    features: [
      "Predictable, regular coupon payments credited directly to bank",
      "Capital gains tax exemption bonds under Section 54EC",
      "Dematerialized custody with high liquidity",
      "Crisil / ICRA AAA & AA+ rated issues"
    ],
    eligibility: [
      "Resident Indians, HUFs, Corporates, and NRIs",
      "Valid Demat account (we can also set up your free Demat)"
    ],
    documents: [
      "PAN Card, Client Master List (CML) of Demat Account",
      "Bank Verification details"
    ],
    icon: "ShieldAlert",
    image: "/img/bondss.png"
  },
  {
    id: "unlisted-shares",
    slug: "unlisted-shares",
    category: "investments",
    categoryLabel: "Wealth & Investment",
    title: "Unlisted & Pre-IPO Shares",
    shortDesc: "Gain early access to India's fastest-growing private unicorns and market leaders before they list on NSE/BSE.",
    fullDesc: "Invest in high-growth companies at pre-IPO valuations. Our research desk conducts thorough balance-sheet verification and direct depository transfers for seamless security.",
    interestRate: "High Alpha Growth Potential",
    tenure: "Medium to Long Term (2 to 5 Years)",
    features: [
      "Direct Demat credit (CDSL/NSDL) within T+1 / T+2 days",
      "Curated research on upcoming unicorn IPOs",
      "Transparent secondary market pricing"
    ],
    eligibility: [
      "Accredited investors, HNIs, and growth-focused individuals",
      "Active Demat account"
    ],
    documents: [
      "PAN Card, Aadhaar, Demat Client Master Report (CMR)"
    ],
    icon: "PieChart",
    image: "/images/investment.png"
  },

  // ================= INSURANCE =================
  {
    id: "life-term-insurance",
    slug: "life-insurance",
    category: "insurance",
    categoryLabel: "Insurance & Risk",
    title: "Term & Life Insurance",
    shortDesc: "Protect your family's financial freedom with comprehensive life cover up to ₹5 Crore at affordable premiums.",
    fullDesc: "Ensure zero compromise on your loved ones' future with critical illness cover, accidental death riders, and return of premium (TROP) options from India's top IRDAI insurers.",
    interestRate: "Starting @ ₹490/month",
    tenure: "Up to Age 85",
    features: [
      "99.2%+ claim settlement ratio partner insurers",
      "Tax exemptions under Section 80C and 10(10D)",
      "Immediate payout on 36+ critical illnesses"
    ],
    eligibility: [
      "Age: 18 to 65 years",
      "Salaried or self-employed with minimum annual income ₹3 Lakhs"
    ],
    documents: [
      "Age & identity proof, 3 months salary slips or 2 years ITR",
      "Medical history questionnaire"
    ],
    icon: "ShieldCheck",
    image: "/images/policy.png"
  },
  {
    id: "health-insurance",
    slug: "health-insurance",
    category: "insurance",
    categoryLabel: "Insurance & Risk",
    title: "Health & Medical Insurance",
    shortDesc: "Comprehensive medical coverage with cashless treatments at 10,000+ top hospitals across India.",
    fullDesc: "Protect your accumulated wealth from spiraling healthcare expenses with individual and family floater health plans featuring zero room-rent capping and OPD benefits.",
    interestRate: "Cashless in 30 mins",
    tenure: "Annual / Multi-Year",
    features: [
      "Restore benefit: 100% reload of sum insured",
      "Covers pre & post-hospitalization up to 180 days",
      "Tax rebate up to ₹75,000 under Section 80D"
    ],
    eligibility: [
      "Any individual from 91 days old to 65+ years"
    ],
    documents: [
      "Basic KYC and previous health declaration"
    ],
    icon: "HeartPulse",
    image: "/images/family.jpeg"
  },

  // ================= REAL ESTATE =================
  {
    id: "jaipur-real-estate",
    slug: "real-estate",
    category: "real-estate",
    categoryLabel: "Real Estate & Land",
    title: "Jaipur Real Estate & Land Advisory",
    shortDesc: "Verified residential villas, prime commercial high-streets, and industrial plots in Rajasthan's fastest growing hub.",
    fullDesc: "SKS INFI delivers end-to-end real estate consulting in Jaipur (JDA approved properties, Ring Road plots, Ajmer Road & Jagatpura growth corridors) with 100% legal title verification.",
    interestRate: "High Capital Appreciation",
    tenure: "Immediate Registry / Booking",
    features: [
      "100% JDA / RERA approved properties only",
      "Complete title search and legal vetting by experienced advocates",
      "Assistance in bank home loan sanctions on chosen property",
      "Rental yield and NRI property management"
    ],
    eligibility: [
      "Individual buyers, corporate investors, and NRIs"
    ],
    documents: [
      "KYC documents, registry & mutation paperwork assistance provided"
    ],
    icon: "MapPin",
    image: "/images/realestate.avif"
  },

  // ================= TAXATION & NRI =================
  {
    id: "taxation-gst",
    slug: "taxation",
    category: "taxation",
    categoryLabel: "Taxation & Legal",
    title: "GST, ITR & Corporate Taxation",
    shortDesc: "Flawless compliance, tax filing, accounting audits, and notice resolution by senior Chartered Accountants.",
    fullDesc: "Optimize your business and personal tax liability legally with expert ITR filing, GST reconciliation, trademark registration, and representation before tax tribunals.",
    features: [
      "Timely filing to eliminate penalties and interest",
      "Advance tax planning and corporate restructuring",
      "Scrutiny assessment and dispute resolution"
    ],
    eligibility: [
      "Salaried individuals, professionals, firms, and companies"
    ],
    documents: [
      "Form 16 / 26AS / AIS / Financials / Sales & Purchase ledgers"
    ],
    icon: "FileText",
    image: "/img/accounts.png"
  },
  {
    id: "nri-services",
    slug: "nri-services",
    category: "nri",
    categoryLabel: "NRI Special Services",
    title: "NRI Financial & Wealth Consulting",
    shortDesc: "Dedicated financial concierge for Non-Resident Indians managing assets, loans, investments, and repatriation in India.",
    fullDesc: "Manage your Indian investments, ancestral properties, NRE/NRO accounts, and tax clearances from anywhere in the world with our bespoke NRI concierge.",
    features: [
      "NRO to NRE fund repatriation under FEMA guidelines (Form 15CA/CB)",
      "NRI Home loans and commercial real estate portfolio acquisition",
      "Portfolio investment management (PIS) and Demat assistance"
    ],
    eligibility: [
      "Non-Resident Indians (NRIs) and Persons of Indian Origin (PIO/OCI)"
    ],
    documents: [
      "Valid Indian/Foreign Passport, Visa, Overseas address proof"
    ],
    icon: "Globe",
    image: "/images/NRI-Investment-Services.png"
  }
];

export const bankingPartners = [
  { name: "HDFC Bank", logo: "hdfc" },
  { name: "State Bank of India", logo: "sbi" },
  { name: "ICICI Bank", logo: "icici" },
  { name: "Axis Bank", logo: "axis" },
  { name: "Kotak Mahindra Bank", logo: "kotak" },
  { name: "Bank of Baroda", logo: "bob" },
  { name: "Bajaj Finserv", logo: "bajaj" },
  { name: "Tata Capital", logo: "tata" },
  { name: "Piramal Capital", logo: "piramal" },
  { name: "Shriram Finance", logo: "shriram" }
];
