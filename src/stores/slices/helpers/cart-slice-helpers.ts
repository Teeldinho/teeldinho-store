import { CartProductType, CartType, ProductOfACartType } from "@/lib/types/carts-types";
import { CartSliceState } from "../CartSlice";

export const initializeCart = (): CartType => ({
  id: Date.now(),
  products: [],
  total: 0,
  discountedTotal: 0,
  userId: 0,
  totalProducts: 0,
  totalQuantity: 0,
});

export const createNewProduct = (productId: number, quantity: number = 1): ProductOfACartType => ({
  id: productId,
  title: "",
  price: 0,
  quantity,
  total: 0,
  discountPercentage: 0,
  discountedTotal: 0,
  thumbnail: "",
});

export const findProduct = (state: CartSliceState, productId: number) => {
  return state.cart?.products.find((p) => p.id === productId);
};

export const addOrUpdateProduct = (state: CartSliceState, product: CartProductType) => {
  if (!state.cart) {
    state.cart = initializeCart();
  }

  const existingProduct = findProduct(state, product.id);
  if (existingProduct) {
    existingProduct.quantity += product.quantity || 0;
  } else {
    state.cart.products.push(createNewProduct(product.id, product.quantity));
  }
};
