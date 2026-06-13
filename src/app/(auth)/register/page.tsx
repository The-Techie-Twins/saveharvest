import React from "react";
import RegisterForm from "@/components/features/auth/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account - SaveHarvest",
  description: "Create your logistics account for SaveHarvest Zero-Waste Logistics.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
