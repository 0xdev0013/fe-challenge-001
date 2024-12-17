import { State, TokenData } from "@/types/types";
import createSelectors from "@/utils/selector";
import { create } from "zustand";

const initialState = {
  token: undefined,
  tokens: {},
  transactions: [],
};

export const store = create<State>((set) => ({
  ...initialState,
  actions: {
    setToken: (token: TokenData) => {
      set({ token: token });
    },
    setTokens: (tokens: Record<string, TokenData>) => {
      set({ tokens: tokens });
    },
    setTransactions: (transactions: any) => {
      set({ transactions: transactions });
    },
  },
}));

export const stateSelector = createSelectors(store);

export function useTokenData() {
  return {
    token: stateSelector.use.token(),
    tokens: stateSelector.use.tokens(),
    transactions: stateSelector.use.transactions(),
    actions: stateSelector.use.actions(),
  };
}
