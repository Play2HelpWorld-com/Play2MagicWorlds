import Docs from "@/components/Docs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Page - Find out more about Magic Worlds",
  description: "Built by MagicWorlds",
  // other metadata
};

export default function DocsPage() {
  return <Docs />;
}
