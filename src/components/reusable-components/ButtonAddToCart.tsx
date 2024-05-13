"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { useShopStore } from "@/providers/store-provider";
import { CartProductType } from "@/lib/types/carts-types";

type Props = {
  productToAdd: CartProductType;
};

export default function ButtonAddToCart({ productToAdd }: Props) {
  const { addToCart } = useShopStore((state) => state);

  const handleAddToCart = async () => {
    await addToCart(productToAdd);

    toast.info("Item added to cart.", {
      description: "You can now view your cart.",
    });
  };

  return (
    <Button variant="outline" onClick={handleAddToCart} className="w-full">
      Add to Cart
    </Button>
  );
}
