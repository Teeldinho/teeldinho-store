"use client";

import NavigationButton from "@/components/reusable-components/NavigationButton";
import { useShopStore } from "@/providers/store-provider";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { clearCart } = useShopStore((state) => state);

  useEffect(() => {
    if (sessionId) {
      clearCart();
      toast.success("Thank you for your purchase!");
    }
  }, [sessionId, clearCart]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-full gap-2">
      <h1 className="text-4xl font-bold">Payment Successful!</h1>
      <p className="text-lg mb-4">Your payment was successful.</p>
      <NavigationButton route="/shop" caption="Return to Shop" />
    </div>
  );
}
