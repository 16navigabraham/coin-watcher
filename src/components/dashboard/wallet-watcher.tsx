'use client';

import { Wallet } from 'lucide-react';
import { useAccount } from 'wagmi';
import { WalletCard } from './wallet-card';
import { Skeleton } from '../ui/skeleton';

// Example addresses to watch, you can make this dynamic
const watchedAddresses: `0x${string}`[] = [
  '0x73BCEb1Cd57C711feC4224D062b0F67565cD5acT', // Example: Vitalik Buterin
  '0x9C5083dd4838E120D1A5F42748254769160e02uE', // Example: Uniswap V3 Router
  '0x1c3125B3d1685b3777473715875974665E0F2369', // Example: APE Foundation
];


export function WalletWatcher() {
  const { address, isConnected } = useAccount();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Watched Wallets</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isConnected && address && <WalletCard address={address} name="My Wallet" isConnectedWallet={true}/>}

        {watchedAddresses.map((addr) => (
          <WalletCard key={addr} address={addr} name={`Watched Wallet`} />
        ))}
         {!isConnected && Array.from({ length: 4 }).map((_, i) => 
            <div key={i} className="p-6 border rounded-lg">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Skeleton className="h-4 w-24"/>
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                    <Skeleton className="h-7 w-40 mb-2"/>
                    <Skeleton className="h-3 w-32"/>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
