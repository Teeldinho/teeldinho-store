"use client";

import { Button } from "@/components/ui/button";
import { ProductOfACartType } from "@/lib/types/carts-types";
import { formatToRand } from "@/lib/utils";
import { useShopStore } from "@/providers/store-provider";
import { MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";

type Props = {
  product: ProductOfACartType;
};

export default function CartViewProductSummaryCard({ product }: Props) {
  const { increaseQuantity, decreaseQuantity } = useShopStore((state) => state);

  return (
    <div className="grid grid-cols-[80px_1fr_auto] items-center gap-4">
      <div className="relative size-14 ring-2 ring-card rounded-md overflow-hidden flex items-center justify-center">
        <Image
          alt={`Product ${product.title}`}
          className="rounded-md w-full h-full hover:scale-105 transition-all"
          height={400}
          src={product.thumbnail ?? ""}
          style={{
            aspectRatio: "400/400",
            objectFit: "fill",
          }}
          width={400}
        />
      </div>

      <div className="grid gap-1">
        <h3 className="font-medium line-clamp-1">{product.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-1">{formatToRand(product.price ?? 0)}</p>
      </div>

      <div className="flex items-center gap-2">
        <Button size="icon" variant="outline" onClick={() => decreaseQuantity(product.id)}>
          <MinusIcon className="size-4" />
          <span className="sr-only">Decrease quantity</span>
        </Button>
        <span className="text-sm font-bold">{product.quantity}</span>
        <Button size="icon" variant="outline" onClick={() => increaseQuantity(product.id)}>
          <PlusIcon className="size-4" />
          <span className="sr-only">Increase quantity</span>
        </Button>
      </div>
    </div>
  );
}
