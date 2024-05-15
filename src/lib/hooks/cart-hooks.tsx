import { createOrUpdateCart } from "@/app/_actions/carts-actions";
import { getIronSessionData } from "@/lib/sessions/iron-session";
import { useShopStore } from "@/providers/store-provider";

export const useSyncCart = () => {
  const { products, setCart } = useShopStore((state) => state);

  const syncCartToServer = async () => {
    try {
      const { id: userId } = await getIronSessionData();
      if (!userId) {
        throw new Error("User is not logged in.");
      }

      const cart = await createOrUpdateCart(userId, products);
      setCart(cart);
    } catch (error) {
      console.error("Failed to sync cart to server:", error);
    }
  };

  return {
    syncCartToServer,
  };
};
