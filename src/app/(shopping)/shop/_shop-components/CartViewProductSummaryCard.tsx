"use client";

import { ProductOfACartType } from "@/lib/types/carts-types";
import { formatToRand } from "@/lib/utils";

import Image from "next/image";
import ButtonIncreaseDecreaseQuantity from "./ButtonIncreaseDecreaseQuantity";

type Props = {
  product: ProductOfACartType;
};

export default function CartViewProductSummaryCard({ product }: Props) {
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

      <ButtonIncreaseDecreaseQuantity
        product={{
          id: product.id,
          quantity: product.quantity,
        }}
      />
    </div>
  );
}
