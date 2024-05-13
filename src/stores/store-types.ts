import { StateCreator, StoreMutatorIdentifier } from "zustand/vanilla";
import { CombinedSlices } from "@/stores/ShopStore";

export type ImmerStateCreator<
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
> = StateCreator<T, [...Mps, ["zustand/immer", never], ["zustand/immer", never], ["zustand/devtools", never]], Mcs>;

export type MyAppStateCreator = ImmerStateCreator<CombinedSlices>;

// Defines the type of a function used to create a slice of the store. The
// slice has access to all the store's actions and state, but only returns
// the actions and state necessary for the slice.
export type SliceCreator<TSlice extends keyof CombinedSlices> = (
  ...params: Parameters<MyAppStateCreator>
) => Pick<ReturnType<MyAppStateCreator>, TSlice>;
