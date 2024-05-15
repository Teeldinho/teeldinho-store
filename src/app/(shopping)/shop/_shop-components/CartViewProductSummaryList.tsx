"use client";

import { useShopStore } from "@/providers/store-provider";
import React from "react";
import CartViewProductSummaryCard from "./CartViewProductSummaryCard";

export default function CartViewProductSummaryList() {
  const { cart } = useShopStore((state) => state);

  if (!cart) {
    return <p>Cart is empty. Failed to pricing details.</p>;
  }

  const { products } = cart;

  return (
    <div className="grid gap-4">
      {products.map((product) => (
        <CartViewProductSummaryCard product={product} key={product.id} />
      ))}
    </div>
  );
}
