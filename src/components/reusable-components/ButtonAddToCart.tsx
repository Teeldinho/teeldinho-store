"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { useShopStore } from "@/providers/store-provider";
import { CartProductType } from "@/lib/types/carts-types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type Props = {
  productToAdd: CartProductType;
  className?: string;
  redirectToCheckout?: boolean;
};

export default function ButtonAddToCart({ productToAdd, className, redirectToCheckout = false }: Props) {
  const router = useRouter();
  const { addToCart } = useShopStore((state) => state);

  const handleAddToCart = async () => {
    await addToCart(productToAdd);

    toast.info("Item added to cart.", {
      description: "You can now view your cart.",
    });

    if (redirectToCheckout) {
      router.push("/shop/checkout");
    }
  };

  return (
    <Button onClick={handleAddToCart} className={cn(className)}>
      Add to Cart
    </Button>
  );
}
