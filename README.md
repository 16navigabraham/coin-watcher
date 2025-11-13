# CoinWatch Sniper

A wallet monitoring and snipping tool for tokens and memecoins built with Next.js, Reown AppKit, and AI-powered analysis.

## Features

- 🔐 **Wallet Connection** - Secure multi-wallet support via Reown AppKit (WalletConnect)
- 📊 **Dashboard** - Real-time wallet monitoring and transaction tracking
- 🤖 **AI Analyzer** - Intelligent memecoin trend analysis and contract assessment
- ⚙️ **Settings** - Customizable alerts and preferences
- 🌐 **Multi-chain Support** - Ethereum, Sepolia, and Base networks

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Get your Reown Project ID from [cloud.reown.com](https://cloud.reown.com) and add it to `.env.local`:

```env
NEXT_PUBLIC_REOWN_PROJECT_ID=your_project_id_here
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Wallet Integration**: Reown AppKit (WalletConnect) + Wagmi
- **UI Components**: Radix UI + Tailwind CSS
- **AI**: Genkit with Google AI
- **State Management**: TanStack Query
- **Blockchain**: viem + wagmi

## Documentation

- [Reown AppKit Setup](./docs/REOWN_APPKIT.md) - Wallet connection guide
- [Blueprint](./docs/blueprint.md) - Project architecture

## Development

```bash
# Run Next.js dev server
npm run dev

# Run Genkit AI dev server
npm run genkit:dev

# Run Genkit with watch mode
npm run genkit:watch

# Type checking
npm run typecheck

# Linting
npm run lint
```

## Building for Production

```bash
# Build Next.js app
npm run build

# Build for Base Mainnet
npm run build:base-mainnet

# Build for Solana Mainnet
npm run build:solana-mainnet
```

## License

MIT

