'use client';

import { useBalance } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet } from "lucide-react";
import { formatEther } from 'viem';
import { Skeleton } from '../ui/skeleton';

interface WalletCardProps {
    address: `0x${string}`;
    name: string;
    isConnectedWallet?: boolean;
}

export function WalletCard({ address, name, isConnectedWallet = false }: WalletCardProps) {
    const { data: balance, isLoading } = useBalance({
        address: address,
        watch: true,
    });

    if (isLoading) {
        return (
            <div className="p-6 border rounded-lg">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Skeleton className="h-4 w-24"/>
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                    <Skeleton className="h-7 w-40 mb-2"/>
                    <Skeleton className="h-3 w-32"/>
                </div>
            </div>
        )
    }

    return (
        <Card className={isConnectedWallet ? 'border-primary' : ''}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{name}</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                  {balance ? parseFloat(formatEther(balance.value)).toFixed(4) : '0.0000'} {balance?.symbol}
              </div>
              <p className="text-xs text-muted-foreground truncate">{address}</p>
            </CardContent>
        </Card>
    );
}
