# ETHVault — Bug Report Log (John Waldron)

> Severity scale: P0 (funds at risk) | P1 (blocks core action) | P2 (major UX/perf) | P3 (minor)

---

## BUG-001 | Severity: P2 | Dashboard — NaN balances before wallet connect
**Summary:** “Available Balance” and “Staked Balance” render as `NaN` when no wallet is connected.  
**Repro:**
1) Start app (`npm run dev`) and open http://localhost:3000
2) Do not connect a wallet
3) Observe balance cards
**Expected:** Show `—` or `0.00` with helper text “Connect wallet to view balances.”  
**Actual:** Both cards show `NaN`.  
**Notes/Risk:** Indicates unguarded formatting (e.g., `Number(undefined)` or `toFixed` on `null`). Poor first-run UX.

---

## BUG-002 | Severity: P1 | Wallet — Connect Wallet triggers console error
**Summary:** Clicking **Connect Wallet** produces an “Error: Unexpected error” in the Next dev overlay; wallet modal/flow does not progress.  
**Repro:**
1) From any page, click **Connect Wallet**
2) Observe dev overlay: `Error: Unexpected error` with stack in `evmAsk.js` (extension layer)
**Expected:** Wallet selection opens (MetaMask/WalletConnect); user can proceed or cancel gracefully.  
**Actual:** Error overlay; the flow is blocked.  
**Evidence:** (attach your screenshots showing the red overlay)  
**Notes:** Flow should fail soft with a user-facing message; errors must be handled.

---

## BUG-003 | Severity: P1 | Governance — Empty state lacks content
**Summary:** Visiting **Governance** on a fresh deployment renders a large blank area; no message or CTA.  
**Repro:**
1) Open `/governance` on local dev with no proposals
2) Observe main content area
**Expected:** “No proposals yet” message + instructions or CTA (e.g., “Create proposal”).  
**Actual:** Empty/blank area; no guidance.  
**Notes:** Blocks discoverability; users can’t tell if loading failed or if there’s simply no data.

---

## BUG-004 | Severity: P2 | Performance — Slow first paint without loading state
**Summary:** First request took ~20s (`GET / 200 in ~20038ms`); UI shows no skeleton or progress indicator during initial load.  
**Repro:**
1) Cold start app
2) Open dashboard
**Expected:** Perceived performance via skeleton loading and non-blocking SSR; first paint reasonable for dev; console not flooded.  
**Actual:** ~20s before content; no skeletons; potential blocking fetch on initial render.  
**Notes:** Debounce/fallback for RPC calls, add skeletons; consider lazy loading heavy sections.

---

## BUG-005 | Severity: P2 | Dashboard — “Refresh” gives no feedback and doesn’t clear NaN state
**Summary:** Clicking **Refresh** near balances offers no visual feedback; NaN remains; no toast/loader state.  
**Repro:**
1) On dashboard with not-connected wallet, click **Refresh**
2) Observe balances and UI signals
**Expected:** Disabled or shows a tooltip when wallet isn’t connected; if active, show spinner/toast and result state.  
**Actual:** No visible change; user receives no signal.  
**Notes:** Add disabled state + user feedback; avoid meaningless actions.

