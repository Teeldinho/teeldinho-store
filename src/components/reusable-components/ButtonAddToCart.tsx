"use client";

import { toast } from "sonner";
import { Button, ButtonProps } from "../ui/button";
import { useShopStore } from "@/providers/store-provider";
import { CartProductType } from "@/lib/types/carts-types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";

type ButtonAddToCartProps = ButtonProps & {
  productToAdd: CartProductType;
  redirectToCheckout?: boolean;
};

export default function ButtonAddToCart({
  productToAdd,
  className,
  redirectToCheckout = false,
  variant = "secondary",
  size = "default",
  ...props
}: ButtonAddToCartProps) {
  const router = useRouter();
  const { addToCart } = useShopStore((state) => state);

  const handleAddToCart = async () => {
    addToCart(productToAdd);

    toast.success("Item added to cart.", {
      description: "You can now view your cart.",
    });

    if (redirectToCheckout) {
      router.push("/shop/checkout");
    }
  };

  return (
    <Button variant={variant} size={size} onClick={handleAddToCart} className={cn("flex items-center gap-2", className)} {...props}>
      <ShoppingBag className="size-4" />
      Add to Cart
    </Button>
  );
}
