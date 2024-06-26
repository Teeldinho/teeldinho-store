"use client";

import { Button } from "@/components/ui/button";
import { DrawerTrigger, DrawerTitle, DrawerDescription, DrawerHeader, DrawerContent, Drawer } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import EmptyCart from "./EmptyCart";
import { useShopStore } from "@/providers/store-provider";
import CartViewProductSummaryList from "./CartViewProductSummaryList";
import CartViewProductPricing from "./CartViewProductPricing";

export default function CartViewDrawer() {
  const { cart } = useShopStore((state) => state);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="rounded-full" size="icon" variant="ghost">
          <div className="relative">
            <p className="absolute size-4 flex items-center justify-center ring-1 ring-primary bg-primary text-sm rounded-full -right-1 -top-1 text-foreground font-bold">
              {cart?.totalQuantity ?? 0}
            </p>
            <ShoppingBag className="size-6 text-foreground" />
          </div>
          <span className="sr-only">Cart</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full">
        {cart && cart.totalProducts > 0 ? (
          <DrawerHeader className={cn("max-w-1/2 mx-auto", !cart ? "hidden" : null)}>
            <DrawerTitle className="text-center">Your Cart</DrawerTitle>
            <DrawerDescription>Review and update your cart items.</DrawerDescription>
          </DrawerHeader>
        ) : undefined}

        <div className="max-w-2xl w-full mx-auto grid gap-6 p-4">
          {cart ? (
            <>
              <CartViewProductSummaryList />

              <Separator />

              <CartViewProductPricing />
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
