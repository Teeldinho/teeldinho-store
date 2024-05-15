"use client";

import ButtonAddToCart from "@/components/reusable-components/ButtonAddToCart";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="flex flex-col hover:shadow-lg transition-all group">
      <CardHeader className="p-3 h-full">
        <ProductCardHeaderImage product={product} />
        <CardTitle className="pt-4 line-clamp-1 text-lg flex items-center justify-between">
          <Link href={`/shop/${product.id}`} className="hover:text-foreground line-clamp-1">
            {product.title}
          </Link>

          <span className="font-semibold text-primary">{formatToRand(product.price)}</span>
        </CardTitle>
        <CardDescription className="line-clamp-2">{product.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center justify-between p-3">
        <ButtonAddToCart
          productToAdd={{
            id: product.id,
            quantity: 1,
          }}
          className="w-full"
        />
      </CardFooter>
    </Card>
  );
}
