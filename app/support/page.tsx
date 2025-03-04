import React from "react";
import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page - Magic Worlds",
  description: "Built by MagicWorlds",
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
