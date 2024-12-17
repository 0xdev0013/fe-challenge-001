// src/server/index.ts
import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { TokenData, MempoolTransaction } from './types';
import { DEFAULT_PORT, UPDATE_INTERVAL, MEMPOOL_SIZE } from './config';
import { initialTokenData } from './data';

// Helpers
const generatePriceMovement = (currentPrice: number): number => {
    const movement = (Math.random() - 0.5) * 0.02; // ±1% movement
    return currentPrice * (1 + movement);
};

const generateTransaction = (symbol: string): MempoolTransaction => {
    const hash = Math.random().toString(36).substring(2, 15);
    const type = Math.random() > 0.5 ? 'buy' : 'sell';
    const amount = Math.random() * (symbol === 'PEPE' ? 1000000 : 10);
    
    return {
        hash,
        token: symbol,
        amount,
        type,
        timestamp: Date.now()
    };
};

export const startServer = (port: number = DEFAULT_PORT) => {
    const app = express();
    const httpServer = createServer(app);
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    let tokens: { [key: string]: TokenData } = { ...initialTokenData };
    const mempool: MempoolTransaction[] = [];

    // Enable CORS so you don't need to :3
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    // endpoints
    app.get('/tokens', (req, res) => {
        res.json(tokens);
    });

    app.get('/token/:symbol', (req, res) => {
        const token = tokens[req.params.symbol.toUpperCase()];
        if (!token) {
            res.status(404).json({ error: 'Token not found' });
            return;
        }
        res.json(token);
    });

    app.get('/mempool', (req, res) => {
        res.json(mempool);
    });

    // Ws updates
    io.on('connection', (socket) => {
        console.log('Client connected');
        
        // initial state
        Object.values(tokens).forEach(token => {
            socket.emit('tokenUpdate', token);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    // loop
    const updateInterval = setInterval(() => {
        Object.keys(tokens).forEach(symbol => {
            const token = tokens[symbol];
            const newTransaction = generateTransaction(symbol);
            
            // Update token data
            token.price = generatePriceMovement(token.price);
            token.volume24h += newTransaction.amount * token.price;
            token.change24h += (Math.random() - 0.5) * 0.1;
            token.lastTrade = {
                amount: newTransaction.amount,
                type: newTransaction.type,
                timestamp: newTransaction.timestamp
            };

            // Update mempool
            mempool.unshift(newTransaction);
            if (mempool.length > MEMPOOL_SIZE) mempool.pop();

            // Broadcast updates
            io.emit('tokenUpdate', token);
            io.emit('newTransaction', newTransaction);
        });
    }, UPDATE_INTERVAL);

    // run server
    httpServer.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });

    return {
        app,
        httpServer,
        io,
        cleanup: () => {
            clearInterval(updateInterval);
            httpServer.close();
        }
    };
};

export default startServer;