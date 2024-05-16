import { Button } from "@/components/ui/button";
import { formatToRand } from "@/lib/utils";
import { useShopStore } from "@/providers/store-provider";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartViewProductPricing() {
  const router = useRouter();
  const { cart } = useShopStore((state) => state);

  if (!cart) {
    return <p>Cart is empty. Failed to pricing details.</p>;
  }

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <span className="text-normal">Subtotal</span>
        <span className="font-bold">{formatToRand(cart?.total ?? 0)}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-normal">Items</span>
        <span className="font-bold">{cart.totalQuantity}</span>
      </div>
      <Button className="flex-1" size="lg" onClick={() => router.push("/shop/checkout")}>
        Proceed to Checkout
        <ArrowRight className="ml-2 size-4" />
      </Button>
    </div>
  );
}
