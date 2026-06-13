import React from "react";
import LoginForm from "@/components/features/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - SaveHarvest Operations",
  description: "Enter your credentials to access the SaveHarvest operational dashboard.",
};

export default function LoginPage() {
  return <LoginForm />;
}
