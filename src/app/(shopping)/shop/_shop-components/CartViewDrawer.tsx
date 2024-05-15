"use client";

import { Button } from "@/components/ui/button";
import { DrawerTrigger, DrawerTitle, DrawerDescription, DrawerHeader, DrawerContent, Drawer } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { CartType } from "@/lib/types/carts-types";
import { ShoppingBag } from "lucide-react";
import CartViewProductSummary from "./CartViewProductSummary";
import { cn, formatToRand } from "@/lib/utils";
import { useRouter } from "next/navigation";
import EmptyCart from "./EmptyCart";

type Props = {
  cart: CartType | null;
};

export default function CartViewDrawer(cart: Props) {
  const router = useRouter();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="rounded-full" size="icon" variant="ghost">
          <ShoppingBag className="size-6 text-foreground " />
          <span className="sr-only">Cart</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        {cart && cart.cart ? (
          <>
            <DrawerHeader className={cn("max-w-1/2 mx-auto", cart && cart.cart ? "hidden" : null)}>
              <DrawerTitle>Your Cart</DrawerTitle>
              <DrawerDescription>Review and update your cart items.</DrawerDescription>
            </DrawerHeader>
          </>
        ) : undefined}

        <div className="max-w-1/2 mx-auto grid gap-6 p-4">
          {cart && cart.cart ? (
            <>
              <CartViewProductSummary cart={cart.cart} />
              <Separator />
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-medium">{formatToRand(cart.cart.total)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Items</span>
                  <span className="font-medium">{cart.cart.totalQuantity}</span>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button className="flex-1" size="lg" onClick={() => router.push("store/checkout")}>
                    Proceed to Checkout
                  </Button>
                  <Button className="flex-1" size="lg" variant="outline" onClick={() => router.push("store")}>
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <EmptyCart />
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
