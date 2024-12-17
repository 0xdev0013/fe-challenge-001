export interface TokenData {
    symbol: string;
    price: number;
    volume24h: number;
    change24h: number;

    lastTrade: {
        amount:number;
        type: 'buy' | 'sell';
        timestamp: number;
    };
}

export interface MempoolTransaction {
    hash: string;
    token: string;
    amount: number;
    type: 'buy' | 'sell';
    timestamp: number; 
}