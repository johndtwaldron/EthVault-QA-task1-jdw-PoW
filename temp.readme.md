# ETHVault - Ethereum Staking & Governance Platform

ETHVault is a decentralized platform for Ethereum staking, governance, and participation in the Ethereum ecosystem. It allows users to stake ETH, earn rewards, and vote on proposals that shape the future of the protocol.


## Technology Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Blockchain Interaction**: ethers.js
- **Smart Contracts**: Solidity (ERC20-based tokens)
- **UI Components**: shadcn/ui
- **State Management**: React Hooks

## Smart Contracts

The platform is built on four main smart contracts:

1. **DepositETH (dETH)**: ERC20 token that users receive when depositing ETH
2. **StakedETH (sETH)**: ERC20 token that users receive when staking dETH
3. **Governance**: Handles proposal creation, voting, and execution
4. **StakingDashboard**: Provides statistics and leaderboard functionality

### Prerequisites

- Node.js 20.19.2 or 20.12.2 higher
- Metamask or another Ethereum wallet
- Access to Ethereum Holesky testnet

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000] in your browser.

## Project Structure

```
ethvault/
├── app/                  # Next.js app router pages
├── components/           # React components
│   ├── layout/           # Layout components
│   └── ui/               # UI components
├── contracts/            # Smart contract source code
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and ABIs
│   └── abis/             # Contract ABIs
├── public/               # Static assets
│── styles/               # Global styles
└── backend/              # Backend
```