import { useState } from "react";
import { Button } from "./components/ui/button";
import { useTokenData } from "./hooks/useTokenData";

function App() {
  const { token, tokens, transactions } = useTokenData();
  console.log(tokens);
  const [count, setCount] = useState(0);

  return (
    <div className="flex w-screen h-screen items-center justify-center align-middle bg-red">
      <div className="flex">Hello Mom</div>
      <div>{count}</div>
      <Button onClick={() => setCount(count + 1)} variant={"default"}>
        Click me
      </Button>
      <div className="flex">
        {token && <div>{token.symbol}</div>}
        {tokens && <div>{tokens.map((t) => t.symbol)}</div>}
        {transactions && <div>{transactions.map((t) => t.hash)}</div>}
      </div>
    </div>
  );
}

export default App;
