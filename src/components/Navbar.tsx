"use client";

import React from "react";
import ModernNavbar from "@/components/ModernNavbar";

interface NavbarProps {
  onOpenEnquiry?: (category?: string, product?: string) => void;
}

export default function Navbar({ onOpenEnquiry }: NavbarProps = {}) {
  return <ModernNavbar onOpenEnquiry={onOpenEnquiry} />;
}
