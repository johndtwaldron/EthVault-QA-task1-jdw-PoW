EthVault QA PoW – Setup Notes (7 Sept 2025)
Node & NVM Setup

Installed Node v20.19.5 with nvm.

Confirmed working versions:

node -v → v20.19.5

npm -v → 10.8.2

Using nvm inside VS Code terminal now works properly.

Repo Setup

Repo cloned from Bitbucket → opened in VS Code.

Key project files:

package.json (lists dependencies & scripts)

tailwind.config.ts (UI styling)

README.md (basic setup instructions)

Commands identified:

npm install → installs dependencies

npm run dev → starts the app in development mode (usually defaults to http://localhost:3000)

Running the App

Run:

npm install
npm run dev


Stop the app with:

CTRL + C


(This kills the running process in the terminal.)

Restart anytime by re-running npm run dev.


________
2#
________
## Setup Notes (Sept 7, 2025)

- Installed Node.js v20.19.5 using nvm-windows (`nvm install 20`, `nvm use 20`)
- Verified versions: node v20.19.5, npm 10.8.2
- Cloned repo: `git clone https://bitbucket.org/web3_technical_team/ethvault.git`
- Installed dependencies: `npm install` → completed successfully
- Ran app: `npm run dev`
  - Backend: “Server running”
  - Frontend (Next.js 15.2.4): available at http://localhost:3000
  - First compile took ~20s (noted as performance issue)
- How to stop app: **CTRL+C** in terminal (confirm with `y` in PowerShell if prompted)

### Initial Observations
- Navigation links visible: Dashboard, Deposit, Stake, Leaderboard, Governance
- Balance cards show `NaN` before wallet connect (critical UI/UX bug candidate)
- “Connect Wallet” button visible but currently not functional without configuring a wallet provider
- Governance page loads; when no proposals exist, it shows a blank area (potential empty state issue)
- Initial page load time ~20s (performance issue candidate)
- No critical security issues spotted yet, but possible concerns: “Approve unlimited” UX, missing input validation, missing error handling.

______________
3#
______________

## 2) `RUN_NOTES.md`
```md
# RUN NOTES – EthVault (Local)

## Environment
- Windows 11
- Node v20.19.5, npm 10.8.2 (via nvm-windows)

## App setup (Bitbucket repo, local only)
- Clone: `git clone https://bitbucket.org/web3_technical_team/ethvault.git`
- Install: `npm install`
- Run: `npm run dev` → Next.js at http://localhost:3000, backend "Server running"
- Stop: CTRL+C in terminal (confirm Y if prompted)

## Observations during run
- First cold load measured ~20s (`GET / 200 in ~20038ms`)
- Dashboard/Deposit/Stake/Leaderboard/Governance routes render
- “NaN” in balance cards before wallet connect
- “Connect Wallet” produced dev overlay **Unexpected error** (extension layer)
- Governance appears empty without an explicit empty state

## Known prerequisites not configured
- Wallet provider / RPC (Holesky) not configured for this PoW run
- No funding on testnets during this pass


