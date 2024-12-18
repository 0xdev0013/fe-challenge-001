import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTokenData } from "@/store/store";
import { TokenData } from "@/types/types";
import React from "react";

interface SelectTokenProps {
  tokens: Record<string, TokenData>;
}

export const SelectToken: React.FC<SelectTokenProps> = ({ tokens }) => {
  const { actions } = useTokenData();

  return (
    <Select onValueChange={(value) => actions.setSelectedToken(tokens[value])}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Token" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(tokens).map((t) => (
          <SelectGroup>
            <SelectItem value={t.symbol}>{t.symbol}</SelectItem>
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
};
