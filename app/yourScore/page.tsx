import React from "react";
import { Metadata } from "next";
import YourScore from "@/components/Scores";

export const metadata: Metadata = {
  title: "Rewards Page - Games with magic Worlds  | Play for Free Donation",
  description: "This is built by Magic",
};

const RewardsPage = () => {
  return (
    <div className="flex justify-center pb-20 pt-40">
      <YourScore />
    </div>
  );
};

export default RewardsPage;
