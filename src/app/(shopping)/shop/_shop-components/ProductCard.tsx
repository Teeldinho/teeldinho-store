"use client";

import ButtonAddToCart from "@/components/reusable-components/ButtonAddToCart";
import { ProductType } from "@/lib/types/products-types";
import { formatToRand } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  product: ProductType;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className="bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <Link className="block" href={`/shop/${product.id}`}>
        <Image
          alt="Product 1"
          className="w-full h-60 object-cover"
          height={400}
          src={product.images?.at(0) ?? ""}
          style={{
            aspectRatio: "400/400",
            objectFit: "fill",
          }}
          width={400}
        />
      </Link>
      <div className="p-4 flex flex-col justify-between h-full">
        <h3 className="font-semibold text-lg text-foreground mb-2">
          <Link href={`/shop/${product.id}`} className="hover:text-foreground line-clamp-1">
            {product.title}
          </Link>
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-foreground">{formatToRand(product.price)}</span>
          <ButtonAddToCart
            productToAdd={{
              id: product.id,
              quantity: 1,
            }}
          />
        </div>
      </div>
    </div>
  );
}
