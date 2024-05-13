import { usingCreateCartMutation, usingUpdateCartMutation } from "@/app/_actions/carts-actions";
import { getIronSessionData } from "@/lib/sessions/iron-session";
import { CartProductType, CartType } from "@/lib/types/carts-types";
import { SliceCreator } from "@/stores/store-types";

type CartSliceState = {
  carts: CartType[];
};

type CartSliceActions = {
  addToCart: (product: CartProductType) => Promise<void>;
  removeFromCart: (product: CartProductType) => Promise<void>;
};

export type CartSlice = CartSliceState & CartSliceActions;

export const initialCartSliceState: CartSlice = {
  carts: [] as CartType[],
  addToCart: async () => {},
  removeFromCart: async () => {},
};

export const createCartSlice: SliceCreator<keyof CartSlice> = (set, get) => ({
  ...initialCartSliceState,
  addToCart: async (product) => {
    console.log("Adding to cart:", product);
    try {
      const { id: userId } = await getIronSessionData();
      if (!userId) {
        throw new Error("User is not logged in.");
      }

      console.log("Adding to cart:", product);
      console.log("User ID:", userId);

      const existingCart = get().carts.find((c) => c.userId === userId);
      if (existingCart) {
        // Update existing cart
        const updatedProducts = [...existingCart.products, product];
        const { data: updatedCart } = await usingUpdateCartMutation({
          merge: true,
          products: updatedProducts,
        });

        if (updatedCart) {
          set((state) => {
            const cartIndex = state.carts.findIndex((c) => c.id === existingCart.id);
            state.carts[cartIndex] = updatedCart;
          });
        } else {
          throw new Error("Failed to update cart.");
        }
      } else {
        // Create new cart
        const { data: newCart } = await usingCreateCartMutation({
          userId: userId,
          products: [product],
        });

        if (!newCart) {
          throw new Error("Failed to create cart.");
        }

        set((state) => {
          state.carts.push(newCart);
        });
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  },
  removeFromCart: async (product) => {
    try {
      const { id: userId } = await getIronSessionData();
      if (!userId) {
        throw new Error("User is not logged in.");
      }

      const existingCart = get().carts.find((c) => c.userId === userId);
      if (existingCart) {
        const remainingProducts = existingCart.products.filter((p) => p.id !== product.id);
        const { data: updatedCart } = await usingUpdateCartMutation({
          merge: true,
          products: remainingProducts,
        });

        if (updatedCart) {
          set((state) => {
            const cartIndex = state.carts.findIndex((c) => c.id === existingCart.id);
            state.carts[cartIndex] = updatedCart;
          });
        } else {
          throw new Error("Failed to update cart.");
        }
      } else {
        throw new Error("No cart found for this user.");
      }
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  },
});

// export const createCartSlice: StateCreator<CartSlice, [["zustand/devtools", unknown], ["zustand/persist", never]], [], CartSlice> = (set, get) => ({
