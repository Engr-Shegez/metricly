"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

const CTAContent = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const onGetStarted = () => {
    if (!email.trim()) {
      toast.error("Please enter your email to continue.");
      return;
    }

    const url = `/register?email=${encodeURIComponent(email.trim())}`;
    router.push(url);
  };

  return (
    <div>
      <h2 className="text-4xl font-bold leading-tight">
        Transform Your Work with Metricly
      </h2>

      <p className="text-muted-foreground mt-4 max-w-md">
        Emback on a transformative journey of coding excellence with Metricly
      </p>

      {/* email form */}
      <div className="md:flex mt-8 gap-3 justify-center sm:justify-start">
        <input
          placeholder="Enter email here"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=" border border-black/10 px-4 py-3 rounded-md flex-1"
        />

        <button
          type="button"
          onClick={onGetStarted}
          className="bg-orange-500 hover:bg-orange-600 md:px-6 py-3 rounded-md md:mt-0 mt-5 p-4 font-medium whitespace-nowrap"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default CTAContent;
