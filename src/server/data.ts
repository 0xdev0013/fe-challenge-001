import { TokenData } from './types';

export const initialTokenData: { [key: string]: TokenData } = {
    ETH: {
        symbol: 'ETH',
        price: 3980,
        volume24h: 15000000,
        change24h: 2.5,
        lastTrade: { amount: 1.2, type: 'buy', timestamp: Date.now() }
    },
    BTC: {
        symbol: 'BTC',
        price: 107012.34,
        volume24h: 30000000,
        change24h: 1.8,
        lastTrade: { amount: 0.5, type: 'sell', timestamp: Date.now() }
    },
    SOL: {
        symbol: 'SOL',
        price: 120,
        volume24h: 8000000,
        change24h: 4.2,
        lastTrade: { amount: 100, type: 'buy', timestamp: Date.now() }
    },
    SUI: {
        symbol: 'SUI',
        price: 1.05,
        volume24h: 5000000,
        change24h: -1.2,
        lastTrade: { amount: 10, type: 'sell', timestamp: Date.now() }
    },
    PEPE: {
        symbol: 'PEPE',
        price: 0.000002,
        volume24h: 1000000,
        change24h: 15.5,
        lastTrade: { amount: 1000000, type: 'buy', timestamp: Date.now() }
    }
} as const;