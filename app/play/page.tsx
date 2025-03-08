import React from "react";
import { Metadata } from "next";
import Game from "@/components/Games";
import GameDownloads from "@/components/Play";

export const metadata: Metadata = {
  title: "Play Page - Download our Games",
  description: "Built by MagicWorlds",
  // other metadata
};

const PlayPage = () => {
  return (
    <main>
      <GameDownloads />
    </main>
  );
};

export default PlayPage;
