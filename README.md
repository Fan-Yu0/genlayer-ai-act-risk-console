# AI Act Risk Console

A complete GenLayer application for public, evidence-backed EU AI Act risk
screening. Publishers register an AI system with two official documentation
URLs. Anyone can run a live assessment, then inspect the deterministic risk tier,
decision, and obligation list on-chain.

- Web application:
  <https://Fan-Yu0.github.io/genlayer-ai-act-risk-console/>
- Source repository:
  <https://github.com/Fan-Yu0/genlayer-ai-act-risk-console>
- Contract source:
  <https://github.com/Fan-Yu0/genlayer-ai-act-risk-gate>
- Deployed contract:
  <https://explorer-studio.genlayer.com/address/0x3f8B4C5cBEA84Ebb90687F497bb1130D1815EeEf>

## Product flow

1. Connect an EIP-1193 wallet on GenLayer StudioNet.
2. Register a system ID, an official system documentation URL, a deployment or
   intended-purpose URL, and the publisher role (provider or deployer).
3. Submit `assess(system_id)` as a real GenLayer transaction.
4. Follow the transaction from wallet signature through finalization.
5. Read the accepted contract state and display the risk tier, decision,
   transparency flag, Annex III domain, source consistency, and obligations.

Reads work without a wallet. Writes require a wallet because the application
submits real GenLayer transactions.

## Contract methods

| Method | Type | Purpose |
| --- | --- | --- |
| `register_system` | write | Create a system assessment record |
| `assess` | write | Fetch both documentation sources through GenLayer consensus |
| `withdraw` | write | Publisher-only withdrawal |
| `get_assessment` | view | Return the latest assessment record |
| `is_clear` | view | Minimal-risk admission signal |
| `is_admissible` | view | Clear or disclosure-only admission signal |
| `required_obligations` | view | Fixed obligation list for the tier and role |
| `policy_catalog` | view | Expose the fixed policy codes and obligation catalog |

The contract fetches the two documentation sources in a nondeterministic block.
Validators independently re-fetch both sources and compare the decision-bearing
fields. Deterministic code then returns `CLEAR`, `DISCLOSURE_REQUIRED`,
`CONDITIONAL`, `BLOCKED`, or `REVIEW_REQUIRED`.

## Application behavior

- The live `gemma-2-9b-it` sample loads automatically from the deployed contract.
- Registration and assessment display the transaction hash while waiting for
  finalization.
- Contract execution errors, timeouts, and validator disagreement are surfaced
  explicitly.
- Successful writes trigger a fresh `get_assessment` read.
- The interface includes responsive desktop and mobile layouts, Explorer links,
  obligation chips, and a public read-only flow.

## Local development

```shell
npm install
copy .env.example .env
npm run dev
```

Environment variables:

```text
VITE_CONTRACT_ADDRESS=0x3f8B4C5cBEA84Ebb90687F497bb1130D1815EeEf
VITE_GENLAYER_RPC_URL=https://studio.genlayer.com/api
```

## Verification

```shell
npm run lint
npm test
npm run build
```

The test suite covers system form validation, URL rules, role selection,
contract response normalization, and StudioNet wallet readiness.

## Deployment

`npm run deploy` builds the Vite app and publishes `dist/` to the `gh-pages`
branch. No server-side secret is required because contract reads use the public
Studio RPC endpoint and writes are signed by the visitor's wallet.

## Limitations

This console is a compliance screening aid, not legal advice or a conformity
assessment. It depends on the availability and accuracy of the two official
documentation sources and on the fixed policy catalog in the deployed contract.

## Wallet support

- Connecting a wallet only requests account access, so every read-only flow
  works without a wallet.
- Submitting a write (`register_system` / `assess`) is signed by the visitor's
  wallet after the app adds and switches it to GenLayer StudioNet. StudioNet is
  gasless (`eth_gasPrice` is 0), so no test tokens are required.
- No MetaMask Snaps plugin is required. The console submits standard
  `eth_sendTransaction` calls, so MetaMask, Rabby, and other EIP-1193 wallets
  work as long as they can add the StudioNet chain.
