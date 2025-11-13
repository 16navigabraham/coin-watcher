'use client';

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
import { Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useAccount, useBlockNumber, usePublicClient } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from "../ui/skeleton";
import { formatUnits, parseAbiItem } from 'viem';
import * as React from 'react';

// Simplified ERC20 ABI for Transfer events
const erc20Abi = [
  parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
];

export function TransactionDisplay() {
  const { address, isConnected, chain } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const client = usePublicClient({ chainId: chain?.id });

  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions', address, blockNumber?.toString()],
    queryFn: async () => {
      if (!address || !client || !blockNumber) return [];
      
      const toBlock = blockNumber;
      const fromBlock = toBlock - BigInt(1000);

      const filter = await client.createEventFilter({
        abi: erc20Abi,
        eventName: 'Transfer',
        args: {
          to: address,
        },
        fromBlock,
        toBlock,
      });

      const logs = await client.getFilterLogs({ filter });

      const txDetails = await Promise.all(logs.map(async (log) => {
        const tx = await client.getTransaction({ hash: log.transactionHash! });
        const tokenInfo = { name: 'Unknown Token', symbol: '---' }; // You'd typically fetch this
        
        return {
          id: log.transactionHash,
          hash: log.transactionHash,
          type: 'Buy',
          token: tokenInfo.symbol,
          amount: formatUnits(log.args.value!, 18), // Assuming 18 decimals
          value: 'N/A', // Value requires price feed
          wallet: address,
          blockNumber: tx.blockNumber?.toString()
        };
      }));

      return txDetails.reverse();
    },
    enabled: !!address && !!client && !!blockNumber,
    refetchInterval: 15000,
  });

  if (!isConnected) {
    return (
       <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Please connect your wallet to see transactions.</p>
        </CardContent>
      </Card>
    )
  }

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
            {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                        <TableCell><Skeleton className="h-6 w-12" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-5 w-20" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-8 w-20" /></TableCell>
                    </TableRow>
                ))
            ) : transactions && transactions.length > 0 ? (
              transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>
                    <Badge variant={tx.type === 'Buy' ? 'default' : 'secondary'} className={tx.type === 'Buy' ? 'bg-green-500/20 text-green-400 border-green-500/20' : 'bg-red-500/20 text-red-400 border-red-500/20'}>
                      {tx.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{tx.token}</TableCell>
                  <TableCell className="text-right">{parseFloat(tx.amount).toFixed(4)}</TableCell>
                  <TableCell className="text-right">${tx.value}</TableCell>
                  <TableCell className="font-mono text-xs">{tx.wallet ? `${tx.wallet.slice(0, 6)}...${tx.wallet.slice(-4)}` : 'N/A'}</TableCell>
                  <TableCell className="font-mono text-xs">{tx.hash ? `${tx.hash.slice(0, 8)}...` : 'N/A'}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Target className="mr-2 h-4 w-4" />
                      Snipe
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
                <TableRow>
                    <TableCell colSpan={7} className="text-center h-24">No recent transactions found.</TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}