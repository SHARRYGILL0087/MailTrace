# Suraksha Shield 🛡️

**AI-Powered Email Threat Forensics & Intelligence Platform**

Suraksha Shield combines AI threat detection, email header forensics, infrastructure intelligence, IP geolocation, and interactive threat correlation in one unified cyber-defense platform designed for Security Operations Centers (SOC) and cyber-forensic analysts.

## Key Features

- **Automated Email Analysis**: Ingest and unpack `.eml` and raw RFC 5322 email headers with instantaneous SPF/DKIM/DMARC verification.
- **Interactive Threat Graph**: Explore multi-hop infrastructure connections, command-and-control (C2) servers, attacker IPs, and weaponized payload hashes.
- **Explainable AI Detection**: Multi-layer heuristics and LLM-assisted threat evaluation with transparent reasoning and confidence scores.
- **Forensic Case Management**: Track investigations, assemble cryptographic evidence chains (SHA-256), and generate audit-ready forensic reports.
- **Threat Intelligence Feeds**: Integrated with VirusTotal, AbuseIPDB, AlienVault OTX, and Shodan telemetry.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the dashboard.

## Tech Stack

- **Framework**: Next.js 16 (App Router) & React 19
- **Styling**: Tailwind CSS & Lucide Icons
- **Visualization**: Recharts & Interactive Graph Canvases
- **Language**: TypeScript

