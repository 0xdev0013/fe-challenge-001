import { useState } from "react";
import { Button } from "./components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex w-screen h-screen items-center justify-center align-middle bg-red">
      <div className="flex">Hello Mom</div>
      <div>{count}</div>
      <Button onClick={() => setCount(count + 1)} variant={"default"}>
        Click me
      </Button>
    </div>
  );
}

export default App;
