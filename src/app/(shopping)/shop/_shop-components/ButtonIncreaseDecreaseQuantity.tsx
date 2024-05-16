"use client";

import { Button } from "@/components/ui/button";
import { CartProductType } from "@/lib/types/carts-types";
import { useShopStore } from "@/providers/store-provider";
import { MinusIcon, PlusIcon } from "lucide-react";

type Props = {
  product: CartProductType;
};

export default function ButtonIncreaseDecreaseQuantity({ product }: Props) {
  const { increaseQuantity, decreaseQuantity, getProductQuantity } = useShopStore((state) => state);

  return (
    <div className="flex items-center gap-2">
      <Button size="icon" variant="outline" onClick={() => decreaseQuantity(product.id)}>
        <MinusIcon className="size-4" />
        <span className="sr-only">Decrease quantity</span>
      </Button>
      <span className="text-sm font-bold">{getProductQuantity(product.id)}</span>
      <Button size="icon" variant="outline" onClick={() => increaseQuantity(product.id)}>
        <PlusIcon className="size-4" />
        <span className="sr-only">Increase quantity</span>
      </Button>
    </div>
  );
}
