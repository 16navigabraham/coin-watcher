'use client';

import { createAppKit } from '@reown/appkit/react';
import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia, base } from '@reown/appkit/networks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { cookieToInitialState } from 'wagmi';

// 1. Get projectId from https://cloud.reown.com
const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || '';

// 2. Set up Wagmi adapter
const wagmiAdapter = new WagmiAdapter({
  networks: [mainnet, sepolia, base],
  projectId,
  ssr: true,
});

// 3. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks: [mainnet, sepolia, base],
  projectId,
  metadata: {
    name: 'CoinWatch Sniper',
    description: 'A wallet monitoring and snipping of tokens and memecoins',
    url: 'https://coinwatch-sniper.com', // Update with your actual URL
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  },
  features: {
    analytics: true,
  },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig);

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
