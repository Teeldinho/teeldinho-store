"use client";

import NavigationButton from "@/components/reusable-components/NavigationButton";

export default function CancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-full gap-2">
      <h1 className="text-4xl font-bold mb-4">Payment Cancelled</h1>
      <p className="text-lg">Your payment was cancelled. Please try again.</p>
      <NavigationButton route="/shop" caption="Return to Shop" />
    </div>
  );
}
