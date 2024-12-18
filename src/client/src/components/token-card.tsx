// import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { TokenData } from "@/types/types";
// import TokenChart from "./token-chart";
import LineTokenChart from "./line-chart";
import { useTokenData } from "@/store/store";

interface Props {
  token: any;
  selectedToken: TokenData;
}

export function TokenCard(props: Props) {
  const { tokens } = useTokenData();

  const token = tokens[props.selectedToken.symbol];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{token.symbol}</CardTitle>
        <CardDescription>$ {token.price.toFixed(5)} </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-1.5 mb-5">
          <Label>24h Volume</Label>
          <Label>{token.volume24h}</Label>
        </div>
        <div className="flex flex-col space-y-1.5 mb-5">
          <Label>24h Change</Label>
          <Label
            className={`font-semibold ${
              token.change24h >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {token.change24h.toFixed(2)}
          </Label>
        </div>
        <div className="flex flex-col space-y-1.5 mb-5">
          <Label>Last Trade</Label>
          <div className="justify-between">
            <Label>{token.lastTrade.amount.toFixed(2)}</Label>
            <Label
              className={`font-semibold ${
                token.lastTrade.type === "buy"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {token.lastTrade.type.toUpperCase()}
            </Label>
          </div>
        </div>
        <LineTokenChart data={token} />
      </CardContent>
    </Card>
  );
}
