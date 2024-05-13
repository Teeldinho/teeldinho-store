// import { create } from "zustand";
import { LikesAndViewedSlice, createLikesAndViewedSlice, initialLikesAndViewedSliceState } from "@/stores/slices/LikesAndViewedSlice";
import { CartSlice, createCartSlice, initialCartSliceState } from "@/stores/slices/CartSlice";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type CombinedSlices = LikesAndViewedSlice & CartSlice;
export const CombinedInitialState = {
  ...initialCartSliceState,
  ...initialLikesAndViewedSliceState,
};

export const createShopStore = (initState: CombinedSlices = CombinedInitialState) =>
  createStore<CombinedSlices>()(
    persist(
      devtools(
        immer((...a) => ({
          ...initState,
          ...createLikesAndViewedSlice(...a),
          ...createCartSlice(...a),
        }))
      ),
      {
        name: "shop-store-session",
      }
    )
  );
