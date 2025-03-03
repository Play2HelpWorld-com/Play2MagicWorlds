import React from "react";
import { Metadata } from "next";
import Game from "@/components/Games";
import ExampleGameplayShowcase from "@/components/Worlds";
import DynamicGameplayShowcase from "@/components/Worlds";
import VideoGallery from "@/components/Worlds";
import EpicGamingShowcase from "@/components/Worlds";

export const metadata: Metadata = {
  title: "Worlds Page - Games with Magic Worlds  | Play for Free Donation",
  description: "This is built by Magic Worlds",
  // other metadata
};

const PlayPage = () => {
  return (
    <main>
      <div className="py-20">
        <EpicGamingShowcase />
      </div>
    </main>
  );
};

export default PlayPage;
