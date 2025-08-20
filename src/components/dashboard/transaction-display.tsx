import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const transactions = [
  { id: '1', hash: '0xabc...def', type: 'Sell', token: 'PEPE', amount: '1,000,000', value: 650.75, wallet: 'Degen Wallet' },
  { id: '2', hash: '0xdef...ghi', type: 'Sell', token: 'SHIB', amount: '5,000,000', value: 480.20, wallet: 'Trading Wallet' },
  { id: '3', hash: '0xghi...jkl', type: 'Buy', token: 'WIF', amount: '500', value: 1270.00, wallet: 'Main Wallet' },
  { id: '4', hash: '0xjkl...mno', type: 'Buy', token: 'BONK', amount: '2,500,000', value: 130.55, wallet: 'Degen Wallet' },
  { id: '5', hash: '0xmno...pqr', type: 'Buy', token: 'DOGE', amount: '2,000', value: 330.80, wallet: 'Trading Wallet' },
];

export function TransactionDisplay() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Token</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Value (USD)</TableHead>
              <TableHead>Wallet</TableHead>
              <TableHead>Tx Hash</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>
                  <Badge variant={tx.type === 'Buy' ? 'default' : 'secondary'} className={tx.type === 'Buy' ? 'bg-green-500/20 text-green-400 border-green-500/20' : 'bg-red-500/20 text-red-400 border-red-500/20'}>
                    {tx.type}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{tx.token}</TableCell>
                <TableCell className="text-right">{tx.amount}</TableCell>
                <TableCell className="text-right">${tx.value.toFixed(2)}</TableCell>
                <TableCell>{tx.wallet}</TableCell>
                <TableCell className="font-mono text-xs">{tx.hash}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <Target className="mr-2 h-4 w-4" />
                    Snipe
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
