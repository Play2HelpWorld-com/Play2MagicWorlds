import React from "react";
import { Metadata } from "next";
import BoosterCard from "@/components/Boosters";

export const metadata: Metadata = {
  title: "Rewards Page - Games with magic Worlds  | Play for Free Donation",
  description: "This is built by magic Worlds",
  // other metadata
};

const BoostersPage = () => {
  return (
    <div className="pb-20 pt-40">
      <BoosterCard />
    </div>
  );
};

export default BoostersPage;
