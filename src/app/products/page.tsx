"use client";

import { Button } from "@/components/ui/button";
import { useShopStore } from "@/providers/store-provider";

export default function Products() {
  const { carts, addToCart } = useShopStore((state) => state);

  const handleAddToCart = () => {
    addToCart({ id: 123, quantity: 2 });
  };

  return (
    <>
      {carts.map((cart) => (
        <div key={cart.id}>
          {cart.products.map((product) => (
            <div key={product.id}>
              {product.id} - {product.quantity}
            </div>
          ))}
        </div>
      ))}

      <Button onClick={handleAddToCart}>Add To Cart!</Button>
    </>
  );
}
