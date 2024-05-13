import { ProductType } from "@/lib/types/products-types";
import { SliceCreator } from "@/stores/store-types";

type LikesAndViewedSliceState = {
  likes: ProductType[];
  viewed: ProductType[];
};

type LikesAndViewedSliceActions = {
  addLike: (product: ProductType) => void;
  removeLike: (productId: number) => void;
  addViewed: (product: ProductType) => void;
};

export type LikesAndViewedSlice = LikesAndViewedSliceState & LikesAndViewedSliceActions;

export const initialLikesAndViewedSliceState: LikesAndViewedSlice = {
  likes: [],
  viewed: [],
  addLike: () => {},
  removeLike: () => {},
  addViewed: () => {},
};

export const createLikesAndViewedSlice: SliceCreator<keyof LikesAndViewedSlice> = (set) => ({
  ...initialLikesAndViewedSliceState,
  addLike: (product) =>
    set((state) => {
      // Prevent adding duplicate likes
      if (!state.likes.some((p) => p.id === product.id)) {
        state.likes.push(product);
      }
    }),
  removeLike: (productId) =>
    set((state) => {
      state.likes = state.likes.filter((p) => p.id !== productId);
    }),
  addViewed: (product) =>
    set((state) => {
      // Add the product to the beginning of the list and remove duplicates
      const existingIndex = state.viewed.findIndex((p) => p.id === product.id);
      if (existingIndex !== -1) {
        state.viewed.splice(existingIndex, 1);
      }
      state.viewed.unshift(product);
      // Limit the viewed list to the last 10 unique views
      state.viewed = state.viewed.slice(0, 10);
    }),
});
