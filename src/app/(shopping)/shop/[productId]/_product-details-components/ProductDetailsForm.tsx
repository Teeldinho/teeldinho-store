"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectValue, SelectTrigger, SelectItem, SelectContent } from "@/components/ui/select";
import ButtonAddToCart from "@/components/reusable-components/ButtonAddToCart";
import { ProductType } from "@/lib/types/products-types";

type ProductFormProps = {
  product: ProductType;
};

export default function ProductDetailsForm({ product }: ProductFormProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <form className="grid gap-4 md:gap-6">
      <div className="grid gap-2">
        <Label className="text-base" htmlFor="quantity">
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

      <ButtonAddToCart variant={"default"} productToAdd={{ id: product.id, quantity }} redirectToCheckout className="max-w-fit" />
    </form>
  );
}
