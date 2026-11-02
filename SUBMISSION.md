# Portal submission — AI Act Risk Console

## Category

Developer -> Projects (weekly slot 1/2)

## Contribution date

2026-11-02

## Title

AI Act Risk Console

## Classification

- Main tag: AI & Agents
- Specific topics: Model Evaluation, Source Verification

## One-line summary (115/180)

Evidence-backed EU AI Act screening console for AI systems, with wallet registration and live GenLayer assessments.

## Description (993/1000)

AI Act Risk Console is a complete GenLayer application for public EU AI Act screening. Publishers connect a wallet, register a system ID, two official documentation URLs, and a provider or deployer role, then run a real assess transaction. The contract fetches both sources, uses validator consensus on a constrained evidence record, and records a deterministic CLEAR, DISCLOSURE_REQUIRED, CONDITIONAL, BLOCKED, or REVIEW_REQUIRED decision. The console handles wallet signing, submitted hash, finalization, execution result checks, and a fresh on-chain read. It shows the risk tier, Annex III domain, transparency flag, source consistency, and fixed obligations. The interface also provides public read-only inspection, Explorer links, responsive layouts, and a live sample. The repository includes contract source, tests, documentation, and GitHub Pages deployment. Writes use standard eth_sendTransaction after switching the wallet to gasless StudioNet; no MetaMask Snaps plugin is required.

## Usage step 1

Title: Open the live console and connect a wallet

Instructions: Open the website, connect an EIP-1193 wallet, and switch to GenLayer StudioNet when prompted.

## Expected verification result (285/500)

The live sample gemma-2-9b-it loads with DISCLOSURE_REQUIRED, risk tier limited, transparency required, source consistency consistent, round 1, and four transparency obligations. Registering a new system should create a new record; assessing it should finalize a new on-chain decision.

## Project links

- Website: https://Fan-Yu0.github.io/genlayer-ai-act-risk-console/
- GitHub: https://github.com/Fan-Yu0/genlayer-ai-act-risk-console
- Required evidence (GitHub Repository): https://github.com/Fan-Yu0/genlayer-ai-act-risk-console

## Contract

- Studio address URL: https://explorer-studio.genlayer.com/address/0x3f8B4C5cBEA84Ebb90687F497bb1130D1815EeEf
- Address: 0x3f8B4C5cBEA84Ebb90687F497bb1130D1815EeEf
- Deployment tx: 0x8f3cfc91f5bc88670d16cbb2f9bdfcf4958e147d9e1af3e12e16d2aa077ce233
- System registration tx: 0xe5097eb14d8519a41199d62495c05da1499c907476ca8c39189d90d0b602c6c4
- Live assessment tx: 0xac18a4c61b430d5b58a814d4584ccc26acadc34bcebb087a6f588761ea0b3be7

## Recorded sample

- System: gemma-2-9b-it
- Decision: DISCLOSURE_REQUIRED
- Risk tier: limited
- Transparency required: true
- Source consistency: consistent
- Round: 1
- Obligations: AI interaction disclosure, synthetic content marking, deepfake disclosure, emotion recognition disclosure

## Submission status

- Form fully filled and required evidence validated as "GitHub Repository" in the portal.
- Remaining: reCAPTCHA + final "提交贡献" click are handled by the user.
