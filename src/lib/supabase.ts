import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const isConfigured =
  Boolean(supabaseUrl) &&
  Boolean(supabaseAnonKey) &&
  !supabaseUrl.includes("placeholder");

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseConfigured = () => isConfigured;

// Helper to submit lead with fallback simulation
export async function submitContactEnquiry(data: {
  name: string;
  email: string;
  phone: string;
  address?: string;
  message: string;
}) {
  if (isConfigured && supabase) {
    const { error, data: inserted } = await supabase
      .from("contact_enquiries")
      .insert([data])
      .select();

    if (error) throw error;
    return { success: true, data: inserted };
  }

  // Graceful fallback for local development / demo mode
  console.info("Supabase not fully configured yet; logged submission locally:", data);
  // Store in localStorage if in browser
  if (typeof window !== "undefined") {
    const existing = JSON.parse(localStorage.getItem("sks_local_contacts") || "[]");
    existing.unshift({ ...data, id: "local-" + Date.now(), created_at: new Date().toISOString() });
    localStorage.setItem("sks_local_contacts", JSON.stringify(existing));
  }
  return { success: true, isLocalMock: true };
}

export async function submitLoanEnquiry(data: {
  name: string;
  email?: string;
  phone: string;
  service_category: string;
  product_name: string;
  loan_amount?: number;
  city?: string;
  message?: string;
}) {
  if (isConfigured && supabase) {
    const { error, data: inserted } = await supabase
      .from("loan_enquiries")
      .insert([data])
      .select();

    if (error) throw error;
    return { success: true, data: inserted };
  }

  console.info("Supabase loan submission logged locally:", data);
  if (typeof window !== "undefined") {
    const existing = JSON.parse(localStorage.getItem("sks_local_loans") || "[]");
    existing.unshift({ ...data, id: "local-" + Date.now(), created_at: new Date().toISOString() });
    localStorage.setItem("sks_local_loans", JSON.stringify(existing));
  }
  return { success: true, isLocalMock: true };
}

export async function submitPartnerEnquiry(data: {
  name: string;
  email: string;
  mobile: string;
  country?: string;
  city: string;
  product_interest: string;
  message?: string;
}) {
  if (isConfigured && supabase) {
    const { error, data: inserted } = await supabase
      .from("partner_enquiries")
      .insert([data])
      .select();

    if (error) throw error;
    return { success: true, data: inserted };
  }

  console.info("Supabase partner submission logged locally:", data);
  if (typeof window !== "undefined") {
    const existing = JSON.parse(localStorage.getItem("sks_local_partners") || "[]");
    existing.unshift({ ...data, id: "local-" + Date.now(), created_at: new Date().toISOString() });
    localStorage.setItem("sks_local_partners", JSON.stringify(existing));
  }
  return { success: true, isLocalMock: true };
}
