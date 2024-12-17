// import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

interface Props {
  token: TokenData;
}

export function TokenCard(props: Props) {
  return (
    <Card className="w-[250px]">
      <CardHeader>
        <CardTitle>{props.token.symbol}</CardTitle>
        <CardDescription>$ {props.token.price.toFixed(5)} </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-1.5 mb-5">
          <Label>24h Volume</Label>
          <Label>{props.token.volume24h}</Label>
        </div>
        <div className="flex flex-col space-y-1.5 mb-5">
          <Label>24h Change</Label>
          <Label
            className={`font-semibold ${
              props.token.change24h >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {props.token.change24h.toFixed(2)}
          </Label>
        </div>
        <div className="flex flex-col space-y-1.5 mb-5">
          <Label>Last Trade</Label>
          <div className="justify-between">
            <Label>{props.token.lastTrade.amount.toFixed(2)}</Label>
            <Label
              className={`font-semibold ${
                props.token.lastTrade.type === "buy"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {props.token.lastTrade.type.toUpperCase()}
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
