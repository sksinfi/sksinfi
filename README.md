# SKS INFI — Financial Consultant in Jaipur

> Premium Financial Consultancy web platform offering Loans (Home, Business, LAP, Commercial Vehicle), Wealth Management, Mutual Fund SIP Advisory, Insurance, NRI Financial Services, and Real Estate Advisory.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Supabase**.

---

## 🚀 Features

- **Full Legacy PHP Conversion**: High-performance modern web architecture converted from legacy PHP templates with 100% brand fidelity.
- **Interactive Financial Calculators**:
  - **SIP Wealth Accumulator**: Real-time compound interest projection with maturity values and profit graphs.
  - **Loan EMI Calculator**: Interactive principal/interest breakdown with dynamic schedule calculations.
- **Financial Knowledge Hub (`/blogs`)**:
  - Full blogging platform with category filtering (Home Loans, Mutual Funds, MSME Subsidies, NRI Real Estate, Tax Advisory).
  - Search functionality, reading time estimates, author profiles, and table of contents.
- **Lead Generation & Advisory Enquiries**:
  - Integrated modal enquiry form for fast client bookings.
  - Partner portal (`/partner`) for Channel Partners / DSAs.
  - Careers portal (`/careers`) with active recruitment listings.
- **Admin Dashboard (`/admin`)**:
  - Contact leads, loan inquiries, and partner applications management with Supabase database integration.
- **Vercel & SEO Optimized**:
  - Schema.org JSON-LD structured data for Financial Services and Loan Brokerage.
  - Dynamic OpenGraph and Twitter card metadata for high search rankings.
  - Zero hydration errors and optimized static generation (`next build`).

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (Turbopack, App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Bootstrap 5
- **Icons**: [Lucide React](https://lucide.dev/) & FontAwesome 6
- **Database**: [Supabase](https://supabase.com/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local` and add your Supabase credentials (optional for local testing; simulated mocks exist):
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploy to Vercel

The platform is 100% Vercel-ready:

1. Import this repository into [Vercel](https://vercel.com/new).
2. Framework Preset will be automatically detected as **Next.js**.
3. (Optional) Add your Environment Variables in the Vercel Project Settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy**.

---

## 📄 License

Proprietary © 2025 SKS INFI. All Rights Reserved.
