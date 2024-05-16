import { CartProductType, CartType, ProductOfACartType } from "@/lib/types/carts-types";
import { SliceCreator } from "@/stores/store-types";
import { createOrUpdateCart } from "@/app/_actions/carts-actions";
import { getIronSessionData } from "@/lib/sessions/iron-session";
import { addOrUpdateProduct, createNewProduct, findProduct, initializeCart } from "./helpers/cart-slice-helpers";

export type CartSliceState = {
  cart: CartType | null;
};

type CartSliceActions = {
  addToCart: (product: CartProductType) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  setQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  updateCart: () => Promise<void>;
  getProductQuantity: (productId: number) => number;
};

export type CartSlice = CartSliceState & CartSliceActions;

export const initialCartSliceState: CartSlice = {
  cart: null,
  addToCart: () => {},
  removeFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  setQuantity: () => {},
  clearCart: () => {},
  updateCart: async () => {},
  getProductQuantity: () => 0,
};

export const createCartSlice: SliceCreator<keyof CartSlice> = (set, get) => ({
  ...initialCartSliceState,
  addToCart: (product) =>
    set((state) => {
      addOrUpdateProduct(state, product);
      get().updateCart();
    }),
  removeFromCart: (productId) =>
    set((state) => {
      if (state.cart) {
        state.cart.products = state.cart.products.filter((p) => p.id !== productId);
        get().updateCart();
      }
    }),
  increaseQuantity: (productId) =>
    set((state) => {
      if (!state.cart) {
        state.cart = initializeCart();
      }
      const product = findProduct(state, productId);
      if (product) {
        product.quantity += 1;
      } else {
        state.cart.products.push(createNewProduct(productId, 1));
      }
      get().updateCart();
    }),
  decreaseQuantity: (productId) =>
    set((state) => {
      const product = findProduct(state, productId);
      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          state.cart!.products = state.cart!.products.filter((p) => p.id !== productId);
        }
      }
      get().updateCart();
    }),
  setQuantity: (productId, quantity) =>
    set((state) => {
      const product = findProduct(state, productId);
      if (product) {
        product.quantity = quantity;
      } else if (quantity > 0) {
        if (!state.cart) {
          state.cart = initializeCart();
        }
        state.cart.products.push(createNewProduct(productId, quantity));
      }
      get().updateCart();
    }),
  clearCart: () =>
    set((state) => {
      if (state.cart) {
        state.cart.products = [];
        get().updateCart();
      }
    }),
  updateCart: async () => {
    const { id: userId } = await getIronSessionData();
    if (!userId) {
      throw new Error("User is not logged in.");
    }

    const products = get().cart?.products || [];
    const updatedCart = await createOrUpdateCart(userId, products);
    set({ cart: updatedCart });
  },
  getProductQuantity: (productId) => {
    const product = findProduct(get(), productId);
    return product?.quantity || 0;
  },
});
