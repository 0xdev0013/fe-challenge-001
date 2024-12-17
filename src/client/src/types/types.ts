export interface TokenData {
  symbol: string;
  price: number;
  volume24h: number;
  change24h: number;

  lastTrade: {
    amount: number;
    type: "buy" | "sell";
    timestamp: number;
  };
}

export interface MempoolTransaction {
  hash: string;
  token: string;
  amount: number;
  type: "buy" | "sell";
  timestamp: number;
}

export interface Data {
  tokens: TokenData[];
  transactions: MempoolTransaction[];
}

export interface TokenAction {
  getTokens: () => Promise<TokenData[]>;
  getTransactions: () => Promise<MempoolTransaction[]>;
  setTokens: (tokens: TokenData[]) => void;
  setTransactions: (transactions: MempoolTransaction[]) => void;
}

export interface TokenStore extends Data {
  actions: TokenAction;
}
