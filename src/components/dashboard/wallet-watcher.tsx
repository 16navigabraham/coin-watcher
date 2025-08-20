import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wallet, DollarSign } from 'lucide-react';

const wallets = [
  { address: '0x123...aBcDe', name: 'Main Wallet', balance: 12.3456, currency: 'ETH' },
  { address: '0x456...fGhIj', name: 'Trading Wallet', balance: 5.6789, currency: 'ETH' },
  { address: '0x789...kLmNo', name: 'Degen Wallet', balance: 88.1234, currency: 'ETH' },
  { address: '0xABC...pQrSt', name: 'Hodl Vault', balance: 1.2345, currency: 'ETH' },
];

export function WalletWatcher() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Watched Wallets</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {wallets.map((wallet) => (
          <Card key={wallet.address}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{wallet.name}</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{wallet.balance.toFixed(4)} {wallet.currency}</div>
              <p className="text-xs text-muted-foreground truncate">{wallet.address}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
