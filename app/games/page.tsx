import React from "react";
import { Metadata } from "next";
import Game from "@/components/Games";

export const metadata: Metadata = {
  title: "Game Page - Games with magic Worlds  | Play for Free Donation",
  description: "This is built by Magic Worlds",
  // other metadata
};

const GamePage = () => {
  return (
    <div className="pb-20 pt-40">
      <Game />
    </div>
  );
};

export default GamePage;
