import startServer  from '../server';
import { TokenData, MempoolTransaction } from '../server/types';


const server = startServer(3000);

console.log('\x1b[32m%s\x1b[0m', '🚀 Server running on http://localhost:3000');
console.log('\x1b[36m%s\x1b[0m', '📊 Available endpoints:');
console.log('   GET /tokens - Get all tokens data');
console.log('   GET /token/:symbol - Get specific token data');
console.log('   GET /mempool - Get mempool transactions');
console.log('\x1b[33m%s\x1b[0m', '🔄 WebSocket events:');
console.log('   - tokenUpdate: Real-time token updates');
console.log('   - newTransaction: New mempool transactions');

const printTokensTable = (tokens: Record<string, TokenData>) => {
    console.clear();
    console.log('\x1b[36m%s\x1b[0m', '📈 Live Token Data:');
    console.table(
        Object.values(tokens).map(token => ({
            Symbol: token.symbol,
            Price: `$${token.price.toFixed(2)}`,
            'Change 24h': `${token.change24h.toFixed(2)}%`,
            'Volume 24h': `$${(token.volume24h/1000000).toFixed(2)}M`,
            'Last Trade': `${token.lastTrade.type.toUpperCase()} ${token.lastTrade.amount.toFixed(4)}`
        }))
    );
};

// Print latest mempool transactions
const printMempoolTransactions = (transaction: MempoolTransaction) => {
    console.log('\x1b[33m%s\x1b[0m', '🔄 New Transaction:');
    console.log({
        Token: transaction.token,
        Type: transaction.type.toUpperCase(),
        Amount: transaction.amount.toFixed(4),
        Hash: transaction.hash,
        Time: new Date(transaction.timestamp).toLocaleTimeString()
    });
    console.log('-'.repeat(50));
};

// Subscribe
server.io.on('connection', (socket) => {
    console.log('\x1b[32m%s\x1b[0m', '🔌 WebSocket client connected');
    
    let tokensCache: Record<string, TokenData> = {};
    
    socket.on('tokenUpdate', (token: TokenData) => {
        tokensCache[token.symbol] = token;
        printTokensTable(tokensCache);
    });
    
    socket.on('newTransaction', (transaction: MempoolTransaction) => {
        printMempoolTransactions(transaction);
    });
    
    socket.on('disconnect', () => {
        console.log('\x1b[31m%s\x1b[0m', '🔌 WebSocket client disconnected');
    });
});

//nuke server
process.on('SIGINT', () => {
    console.log('\x1b[31m%s\x1b[0m', '\n🛑 You just nuked the server...');
    server.httpServer.close();
    process.exit();
});