"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatToRand } from "@/lib/utils";
import { useShopStore } from "@/providers/store-provider";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession } from "@/app/_actions/carts-actions";

const SHIPPING_FEE = 150;

export default function PaymentForm() {
  const { cart, updateCart } = useShopStore((state) => state);

  if (!cart) {
    return <p>Cart is empty. Failed to pricing details.</p>;
  }

  const total = cart.total ?? 0;
  const orderTotal = total + SHIPPING_FEE;

  const handlePlaceOrder = async () => {
    try {
      await updateCart();

      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

      const { data: sessionId } = await createCheckoutSession(cart);

      if (stripe && sessionId) {
        await stripe.redirectToCheckout({ sessionId });

        toast.info("Redirecting to payment", {
          description: `Your order total is ${formatToRand(orderTotal)}.`,
        });
      } else {
        throw new Error("Failed to redirect to payment");
      }
    } catch (error) {
      toast.error("Failed to redirect to payment", {
        description: (error as Error).message,
      });
    }
  };

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

      <Button className="w-full" size="lg" onClick={handlePlaceOrder}>
        Place Order
        <ArrowRight className="ml-2 size-4" />
      </Button>
    </div>
  );
}
