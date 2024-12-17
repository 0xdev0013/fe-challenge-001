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
  token: TokenData | undefined;
  tokens: TokenData[];
  transactions: MempoolTransaction[];
}

export interface DataAction {
  fetchTokenBySymbol: (symbol: string) => Promise<TokenData>;
  fetchTokens: () => Promise<TokenData[]>;
  fetchTransactions: () => Promise<MempoolTransaction[]>;
}

export interface DataStateAction {
  setToken: (token: TokenData) => void;
  setTokens: (tokens: TokenData[]) => void;
  setTransactions: (transactions: MempoolTransaction[]) => void;
}

export interface State extends Data {
  actions: DataAction & DataStateAction;
}
