"use client";

import React from "react";
import ModernFooter from "@/components/ModernFooter";

interface FooterProps {
  onOpenEnquiry?: (category?: string, product?: string) => void;
}

export default function Footer({ onOpenEnquiry }: FooterProps = {}) {
  return <ModernFooter onOpenEnquiry={onOpenEnquiry} />;
}
