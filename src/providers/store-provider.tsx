"use client";

import { CombinedSlices, createShopStore } from "@/stores/ShopStore";
import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

export const ShopStoreContext = createContext<StoreApi<CombinedSlices> | null>(null);

export interface ShopStoreProviderProps {
  children: ReactNode;
}

/**
 * We ensure that this component is re-render-safe by checking the value of the reference, so that the store is only created once.
 * This component will only be rendered once per request on the server,
 * but might be re-rendered multiple times on the client if there are stateful client components located above this component in the tree,
 * or if this component also contains other mutable state that causes a re-render.
 */
export const ShopStoreProvider = ({ children }: ShopStoreProviderProps) => {
  const storeRef = useRef<StoreApi<CombinedSlices>>();
  if (!storeRef.current) {
    storeRef.current = createShopStore();
  }

  return <ShopStoreContext.Provider value={storeRef.current}>{children}</ShopStoreContext.Provider>;
};

export const useShopStore = <T,>(selector: (store: CombinedSlices) => T): T => {
  const counterStoreContext = useContext(ShopStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useShopStore must be use within ShopStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
