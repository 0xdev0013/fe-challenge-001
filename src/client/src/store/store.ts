import { services } from "@/services/services";
import { State, TokenData } from "@/types/types";
import createSelectors from "@/utils/selector";
import { create } from "zustand";

const initialState = {
  token: undefined,
  tokens: [],
  transactions: [],
};

export const store = create<State>((set) => ({
  ...initialState,
  actions: {
    fetchTokenBySymbol: async (symbol: string) => {
      const token = await services.fetchTokenBySymbol(symbol);
      return token;
    },
    fetchTokens: async () => {
      const tokens = await services.fetchTokens();
      return tokens;
    },
    fetchTransactions: async () => {
      const txs = await services.fetchTransactions();
      return txs;
    },
    setToken: (token: TokenData) => {
      set({ token: token });
    },
    setTokens: (tokens: TokenData[]) => {
      set({ tokens: tokens });
    },
    setTransactions: (transactions: any) => {
      set({ transactions: transactions });
    },
  },
}));

export const stateSelector = createSelectors(store);

export function useStore() {
  return {
    token: stateSelector.use.token(),
    tokens: stateSelector.use.tokens(),
    transactions: stateSelector.use.transactions(),
    actions: stateSelector.use.actions(),
  };
}
