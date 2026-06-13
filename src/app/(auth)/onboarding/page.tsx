"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import RoleSelector from "@/components/features/auth/RoleSelector";
import CoopDetailsForm from "@/components/features/auth/CoopDetailsForm";
import FleetDetailsForm from "@/components/features/auth/FleetDetailsForm";
import BuyerDetailsForm from "@/components/features/auth/BuyerDetailsForm";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState("");

  const handleFinish = (data: any) => {
    alert(`Onboarding completed for role: ${selectedRole}!`);
    console.log("Onboarding data submitted:", data);
    
    // Redirect to the appropriate dashboard matching user role
    if (selectedRole === "manager") {
      router.push("/coop/dashboard");
    } else if (selectedRole === "fleet") {
      router.push("/fleet/dashboard");
    } else if (selectedRole === "buyer") {
      router.push("/buyer/marketplace");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-surface md:p-8 antialiased">
      {step === 1 ? (
        <RoleSelector
          selectedRole={selectedRole}
          onSelectRole={setSelectedRole}
          onNext={() => setStep(2)}
        />
      ) : (
        <>
          {selectedRole === "manager" && (
            <CoopDetailsForm
              onBack={() => setStep(1)}
              onSubmit={handleFinish}
            />
          )}
          {selectedRole === "fleet" && (
            <FleetDetailsForm
              onBack={() => setStep(1)}
              onSubmit={handleFinish}
            />
          )}
          {selectedRole === "buyer" && (
            <BuyerDetailsForm
              onBack={() => setStep(1)}
              onSubmit={handleFinish}
            />
          )}
        </>
      )}
    </div>
  );
}
