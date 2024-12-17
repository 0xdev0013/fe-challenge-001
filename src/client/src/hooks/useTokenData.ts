import { services } from "@/services/services";
import { useStore } from "@/store/store";
import { MempoolTransaction, TokenData } from "@/types/types";
import { useEffect } from "react";

export const useTokenData = () => {
  const { tokens, actions, token, transactions } = useStore();

  useEffect(() => {
    const loadTokens = async () => {
      const data = await actions.fetchTokens();
      actions.setTokens(data);
    };

    const loadToken = async () => {
      const data = await actions.fetchTokenBySymbol("NEO");
      actions.setToken(data);
    };

    const subscribeTokenUpdate = async () => {
      const callback = (token: TokenData) => {
        actions.setToken(token);
      };
      services.subscribeToTokenUpdate(callback);
    };

    const subscribeTransactions = async () => {
      const callback = (transaction: MempoolTransaction) => {
        const txsArr = [...transactions];
        txsArr.push(transaction);
        actions.setTransactions(txsArr);
      };
      services.subscribetoTransactions(callback);
    };

    loadToken();
    loadTokens;
    subscribeTokenUpdate();
    subscribeTransactions;
  }, [tokens, token, transactions]);

  return {
    token,
    tokens,
    transactions,
  };
};
