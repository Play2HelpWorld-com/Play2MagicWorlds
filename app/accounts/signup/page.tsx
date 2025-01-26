import Signup from "@/components/accounts/signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up Page - Solid SaaS Boilerplate",
  description: "This is Sign Up page for Startup Pro",
};

export default function Register() {
  return (
    <>
      <Signup />
    </>
  );
}
