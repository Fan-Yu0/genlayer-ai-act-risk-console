# Portal submission draft

## Category

Developer -> Projects

## Contribution date

2026-11-02

## Title

AI Act Risk Console - Evidence-Backed EU AI Act Screening

## Description

AI Act Risk Console is a complete GenLayer application for public, reproducible
EU AI Act risk screening. Publishers connect a wallet, register a system ID,
two official documentation URLs, and a provider or deployer role, then run a
real `assess` transaction. The contract fetches both sources, uses validator
consensus on a constrained evidence record, and records a deterministic
`CLEAR`, `DISCLOSURE_REQUIRED`, `CONDITIONAL`, `BLOCKED`, or
`REVIEW_REQUIRED` decision. The web console handles the full transaction
lifecycle: wallet signing, submitted hash, finalization, execution result
checks, and a fresh on-chain read. It displays the risk tier, Annex III domain,
transparency flag, source consistency, and the fixed obligation list for the
selected tier and role. The interface also provides public read-only
inspection, Explorer links, responsive layouts, and a live sample record. The
repository includes the deployed contract source, tests, documentation, and
GitHub Pages deployment.

Writes are signed with standard `eth_sendTransaction` after the console adds
and switches the visitor's wallet to StudioNet. No MetaMask Snaps plugin is
required, and StudioNet is gasless.

## Evidence

- Website: https://Fan-Yu0.github.io/genlayer-ai-act-risk-console/
- Repository: https://github.com/Fan-Yu0/genlayer-ai-act-risk-console
- Contract source: https://github.com/Fan-Yu0/genlayer-ai-act-risk-gate
- Contract:
  https://explorer-studio.genlayer.com/address/0x3f8B4C5cBEA84Ebb90687F497bb1130D1815EeEf
- Deployment transaction:
  https://explorer-studio.genlayer.com/tx/0x8f3cfc91f5bc88670d16cbb2f9bdfcf4958e147d9e1af3e12e16d2aa077ce233
- System registration transaction:
  https://explorer-studio.genlayer.com/tx/0xe5097eb14d8519a41199d62495c05da1499c907476ca8c39189d90d0b602c6c4
- Live assessment transaction:
  https://explorer-studio.genlayer.com/tx/0xac18a4c61b430d5b58a814d4584ccc26acadc34bcebb087a6f588761ea0b3be7
- Recorded decision: `DISCLOSURE_REQUIRED`, risk tier `limited`,
  `transparency_required = true`, `source_consistency = consistent`, round `1`.
