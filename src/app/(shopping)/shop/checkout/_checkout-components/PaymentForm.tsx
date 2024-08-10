"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn, formatToRand } from "@/lib/utils";
import { useShopStore } from "@/providers/store-provider";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession } from "@/lib/actions/carts-actions";

export const SHIPPING_FEE = 150;

const buttonTextMapping: { [key: string]: string } = {
  idle: "Place Order",
  updating: "Updating Cart...",
  loadingStripe: "Loading Payment...",
  creatingSession: "Creating Session...",
  redirecting: "Redirecting...",
  error: "Try Again",
};

export default function PaymentForm() {
  const { cart, updateCart } = useShopStore((state) => state);
  const [loadingState, setLoadingState] = useState("idle");

  if (!cart) {
    return <p>Cart is empty. Failed to pricing details.</p>;
  }

  const total = cart.total ?? 0;
  const orderTotal = total + SHIPPING_FEE;

  const handlePlaceOrder = async () => {
    setLoadingState("updating");
    try {
      await updateCart();

      setLoadingState("loadingStripe");
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

      setLoadingState("creatingSession");
      console.log("Creating checkout session...");
      const { sessionId } = await createCheckoutSession(cart);

      console.log("SESSION ID = ", sessionId);

      if (stripe && sessionId) {
        setLoadingState("redirecting");
        await stripe.redirectToCheckout({ sessionId });
        toast.info("Redirecting to payment", {
          description: `Your order total is ${formatToRand(orderTotal)}.`,
        });
      } else {
        throw new Error("Failed to redirect to payment");
      }
    } catch (error) {
      toast.error("Failed to process payment", {
        description: (error as Error).message,
      });
      setLoadingState("error");
    } finally {
      setLoadingState("idle");
    }
  };

  const buttonText = buttonTextMapping[loadingState];

  return (
    <div className="flex flex-col items-center w-full justify-between gap-4">
      <div className="space-y-2 w-full">
        <div className="flex items-center justify-between">
          <span className="font-normal">Subtotal</span>
          <span className="font-semibold">{formatToRand(total ?? 0)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-normal">Shipping</span>
          <span className="font-semibold">{formatToRand(SHIPPING_FEE)}</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between font-medium">
          <span className="font-bold">Total</span>
          <span className="font-extrabold">{formatToRand(orderTotal)}</span>
        </div>
      </div>

      <Button disabled={loadingState !== "idle"} className="w-full" size="lg" onClick={handlePlaceOrder}>
        {buttonText}
        <ArrowRight
          className={cn(
            "ml-2 size-4",
            loadingState === "loadingStripe" || loadingState === "creatingSession" || loadingState === "redirecting" ? "animate-spin" : null
          )}
        />
      </Button>
    </div>
  );
}
