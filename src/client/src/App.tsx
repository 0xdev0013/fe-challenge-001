import { services } from "./services/services";
import { useTokenData } from "./store/store";
import { TokenCard } from "./components/token-card";
import { ThemeProvider } from "./components/theme-provider";
import { SelectToken } from "./components/select-token";
import { TransactionTable } from "./components/transaction-table";

function App() {
  const { tokens, transactions, actions, selectedToken } = useTokenData();

  services.subscribetoTransactions((transaction) => {
    if (!transactions.find((t) => t.hash === transaction.hash)) {
      transactions.push(transaction);
    }
    actions.setTransactions(transactions);
  });

  const pagedTx = transactions.slice(-50);

  services.subscribeToTokenUpdate((token) => {
    tokens[token.symbol] = token;
    actions.setToken(token);
  });
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="grid w-screen h-screen items-center justify-center align-middle bg-red">
        <div className="justify-center gap-2">
          <SelectToken tokens={tokens} />
          {selectedToken ? (
            <div>
              <TokenCard token={tokens} selectedToken={selectedToken} />
              <TransactionTable transactions={pagedTx} token={selectedToken} />
            </div>
          ) : (
            <div>no token selected</div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
