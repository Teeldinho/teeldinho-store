import { CartProductType, CartType, ProductOfACartType } from "@/lib/types/carts-types";
import { SliceCreator } from "@/stores/store-types";
import { createOrUpdateCart } from "@/app/_actions/carts-actions";
import { getIronSessionData } from "@/lib/sessions/iron-session";

type CartSliceState = {
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
};

const initializeCart = (): CartType => ({
  id: Date.now(),
  products: [],
  total: 0,
  discountedTotal: 0,
  userId: 0,
  totalProducts: 0,
  totalQuantity: 0,
});

export const createCartSlice: SliceCreator<keyof CartSlice> = (set, get) => ({
  ...initialCartSliceState,
  addToCart: (product) =>
    set((state) => {
      if (!state.cart) {
        state.cart = initializeCart();
      }
      const existingProduct = state.cart.products.find((p) => p.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        const newProduct: ProductOfACartType = {
          id: product.id,
          title: "",
          price: 0,
          quantity: product.quantity,
          total: 0,
          discountPercentage: 0,
          discountedPrice: 0,
          thumbnail: "",
        };
        state.cart.products.push(newProduct);
      }
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
      const product = state.cart?.products.find((p) => p.id === productId);
      if (product) {
        product.quantity += 1;
      }
      get().updateCart();
    }),
  decreaseQuantity: (productId) =>
    set((state) => {
      const product = state.cart?.products.find((p) => p.id === productId);
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
      const product = state.cart?.products.find((p) => p.id === productId);
      if (product) {
        product.quantity = quantity;
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
});
