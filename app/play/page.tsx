import React from "react";
import { Metadata } from "next";
import Game from "@/components/Games";
import GameDownloads from "@/components/Play";

export const metadata: Metadata = {
  title: "Play Page - Games with Magic Worlds  | Play for Free Donation",
  description: "This is built by Magic Worlds",
  // other metadata
};

const PlayPage = () => {
  return (
    <div className="pb-20 pt-40">
      <GameDownloads />
    </div>
  );
};

export default PlayPage;
