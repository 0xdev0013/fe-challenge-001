import { services } from "./services/services";
import { useTokenData } from "./store/store";
import { TokenCard } from "./components/token-card";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  const { tokens, transactions, actions } = useTokenData();

  services.subscribetoTransactions((transaction) => {
    // get the new tx array then push the old one
    // need to prevent duplcated transaction.hash
    if (!transactions.find((t) => t.hash === transaction.hash)) {
      transactions.push(transaction);
    }
    actions.setTransactions(transactions);
  });

  services.subscribeToTokenUpdate((token) => {
    // push the updated value of token to the tokens object
    tokens[token.symbol] = token;
    actions.setToken(token);
  });

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="grid w-screen h-screen items-center justify-center align-middle bg-red">
        <div className="flex flex-wrap justify-center gap-2">
          {Object.values(tokens).map((t) => (
            <TokenCard key={t.symbol} token={t} />
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
