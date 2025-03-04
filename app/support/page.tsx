import React from "react";
import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support Page - Solid SaaS Boilerplate",
  description: "This is Support page for magic Worlds",
  // other metadata
};

const SupportPage = () => {
  return (
    <main>
      <Contact />
    </main>
  );
};

export default SupportPage;
