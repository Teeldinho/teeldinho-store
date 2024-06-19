"use client";

import ButtonAddToCart from "@/components/reusable-components/ButtonAddToCart";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductType } from "@/lib/types/products-types";
import { formatToRand } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import ProductCardHeaderImage from "./ProductCardHeaderImage";

type Props = {
  product: ProductType;
};

export default function ProductCard({ product }: Props) {
  return (
    <Card className="flex flex-col hover:shadow-md transition-all group shadow-none border-none bg-transparent">
      <CardHeader className="p-3 h-full flex flex-col gap-1">
        <ProductCardHeaderImage product={product} />
        <CardTitle className="line-clamp-1 text-lg flex items-center justify-between">
          <Link href={`/shop/${product.id}`} className="hover:text-foreground line-clamp-1">
            {product.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2">{product.description}</CardDescription>
      </CardHeader>

      <CardFooter className="flex gap-4 p-3 pt-0 text-left items-start">
        <p className="font-semibold text-left w-full">{formatToRand(product.price)}</p>

        <ButtonAddToCart
          variant={"outline"}
          productToAdd={{
            id: product.id,
            quantity: 1,
          }}
          className="w-full text-primary font-normal invisible group-hover:visible"
        />
      </CardFooter>
    </Card>
  );
}
