"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartType } from "@/lib/types/carts-types";
import { formatToRand } from "@/lib/utils";
import { toast } from "sonner";

const SHIPPING_FEE = 0;

type Prop = {
  cart: CartType;
};

export default function PaymentForm(cart: Prop) {
  const { cart: cartInQuestion } = cart;

  const discountedTotal = cartInQuestion.discountedTotal ?? 0;
  const total = cartInQuestion.total ?? 0;

  const orderTotal = total - discountedTotal + SHIPPING_FEE;

  const handlePlaceOrder = () => {
    toast.info("Placing Order...", {
      description: `Your order total is $${formatToRand(orderTotal)}.`,
    });
  };

  return (
    <div className="flex items-center w-full justify-between">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="font-bold">Subtotal</span>
          <span>{formatToRand(cartInQuestion.total ?? 0)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold">Shipping</span>
          <span>{formatToRand(SHIPPING_FEE)}</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between font-medium">
          <span className="font-bold">Total</span>
          <span>{formatToRand(orderTotal)}</span>
        </div>
      </div>

      <Button size="lg" onClick={handlePlaceOrder}>
        Place Order
      </Button>
    </div>
  );
}
