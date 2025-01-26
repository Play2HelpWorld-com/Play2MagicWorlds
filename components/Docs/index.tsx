"use client";

import SidebarLink from "@/components/Docs/SidebarLink";
import { useState } from "react";
import { docsData } from "./docsData"; // Import the updated docsData

export default function Docs() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [error, setError] = useState<string | null>(null); // Error state

  return (
    <section className="pb-16 pt-24 md:pb-20 md:pt-28 lg:pb-24 lg:pt-32">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          {/* Sidebar */}
          <div className="w-full px-4 lg:w-1/4">
            <div className="sticky top-[74px] rounded-lg border border-white p-4 shadow-solid-4 transition-all dark:border-strokedark dark:bg-blacksection">
              <ul className="space-y-2">
                <SidebarLink
                  activeSection={activeSection}
                  setActiveSection={(section) => {
                    try {
                      if (!docsData[section]) {
                        throw new Error("Invalid section selected.");
                      }
                      setError(null); // Clear previous errors
                      setActiveSection(section);
                    } catch (err: any) {
                      setError(
                        err.message ||
                          "An error occurred while selecting the section.",
                      );
                    }
                  }}
                />
              </ul>
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full px-4 lg:w-3/4">
            {/* Display Title */}
            <h1 className="mb-4 text-3xl font-semibold">
              {docsData[activeSection]?.title}
            </h1>

            {/* Display Content */}
            <div className="blog-details blog-details-docs shadow-three dark:bg-gray-dark rounded-sm bg-white px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
              {docsData[activeSection]?.content}
            </div>

            {/* Error handling */}
            {error && <p className="mt-4 text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
