// make a table for list of transactions from fetchMempool

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MempoolTransaction, TokenData } from "@/types/types";

interface Props {
  transactions: any;
  token: TokenData;
}

export function TransactionTable(props: Props) {
  const tx = props.transactions
    .sort(
      (a: MempoolTransaction, b: MempoolTransaction) =>
        b.timestamp - a.timestamp,
    )
    .filter((t: MempoolTransaction) => t.token === props.token.symbol);
  return (
    <Table>
      <TableCaption>Transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Hash</TableHead>
          <TableHead className="w-[100px]">Timestamp</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Token</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tx.map((t: MempoolTransaction) => (
          <TableRow key={t.hash}>
            <TableCell className="font-medium">{t.hash}</TableCell>
            <TableCell>{t.timestamp}</TableCell>
            <TableCell>{t.type}</TableCell>
            <TableCell>{t.token}</TableCell>
            <TableCell className="text-right">{t.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
