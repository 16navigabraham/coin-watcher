import { WalletWatcher } from '@/components/dashboard/wallet-watcher';
import { TransactionDisplay } from '@/components/dashboard/transaction-display';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Monitor your wallets and track recent transactions.</p>
      </div>
      <WalletWatcher />
      <TransactionDisplay />
    </div>
  );
}
