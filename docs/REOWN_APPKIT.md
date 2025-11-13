# Reown AppKit Integration

This project uses Reown AppKit (formerly WalletConnect) for wallet connectivity.

## Setup

1. **Get your Project ID**
   - Go to [Reown Cloud](https://cloud.reown.com)
   - Create a new project or use an existing one
   - Copy your Project ID

2. **Configure Environment Variables**
   - Copy `.env.local.example` to `.env.local`
   - Add your Project ID:
     ```
     NEXT_PUBLIC_REOWN_PROJECT_ID=your_project_id_here
     ```

3. **Supported Networks**
   - Ethereum Mainnet
   - Sepolia (Testnet)
   - Base

## Usage

### Connect Wallet Button
The `WalletConnectButton` component is integrated into the main navigation. Users can:
- Click "Connect Wallet" to open the AppKit modal
- Choose from multiple wallet options (MetaMask, WalletConnect, Coinbase Wallet, etc.)
- View their connected address
- Disconnect their wallet

### Using Wagmi Hooks
You can use standard Wagmi hooks throughout your application:

```tsx
import { useAccount, useBalance, useSignMessage } from 'wagmi';

function MyComponent() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  
  // ... your component logic
}
```

### Using AppKit Modal Programmatically
```tsx
import { useAppKit } from '@reown/appkit/react';

function MyComponent() {
  const { open } = useAppKit();
  
  // Open the modal
  const handleConnect = () => {
    open();
  };
  
  // Open specific views
  const openNetworks = () => {
    open({ view: 'Networks' });
  };
}
```

## Features

- 🔐 Secure wallet connections
- 🌐 Multi-chain support
- 📱 Mobile wallet support via WalletConnect
- 🎨 Customizable modal UI
- 📊 Built-in analytics
- 🔄 Automatic reconnection
- 🍪 SSR support with cookies

## Components

- `src/app/providers.tsx` - AppKit and Wagmi provider setup
- `src/components/wallet-connect-button.tsx` - Reusable connect button component
- `src/components/main-nav.tsx` - Navigation with integrated wallet connection

## Learn More

- [Reown AppKit Documentation](https://docs.reown.com/appkit/overview)
- [Wagmi Documentation](https://wagmi.sh)
- [Supported Wallets](https://docs.reown.com/appkit/features/wallets)
