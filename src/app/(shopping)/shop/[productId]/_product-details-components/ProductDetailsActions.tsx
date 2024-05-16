"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectValue, SelectTrigger, SelectItem, SelectContent } from "@/components/ui/select";
import ButtonAddToCart from "@/components/reusable-components/ButtonAddToCart";
import { ProductType } from "@/lib/types/products-types";
import { CartProductType } from "@/lib/types/carts-types";

type ProductDetailsActionsProps = {
  product: ProductType;
};

export default function ProductDetailsActions({ product }: ProductDetailsActionsProps) {
  const [quantity, setQuantity] = useState(1);

  const productToAdd: CartProductType = {
    id: product.id,
    quantity,
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Label className="text-base text-muted-foreground" htmlFor="quantity">
          Quantity
        </Label>
        <Select defaultValue="1" onValueChange={(value) => setQuantity(Number(value))}>
          <SelectTrigger className="w-24">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: product?.stock ?? 0 }, (_, i) => (
              <SelectItem key={i} value={String(i + 1)}>
                {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ButtonAddToCart variant={"default"} productToAdd={productToAdd} redirectToCheckout={true} className="max-w-fit" />
    </div>
  );
}
