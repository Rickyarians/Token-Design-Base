# 🎨 Design Tokens System

A centralized and scalable design token system that bridges **design (Figma)** and **code (multi-platform)**.

This repository acts as the **single source of truth** for all design decisions such as color, spacing, typography, and more — ensuring consistency across all applications.

---

## 🚀 Overview

This project integrates:

- Figma Tokens (via Tokens Studio)
- Automated transformation using Style Dictionary
- CI/CD pipeline via GitHub Actions

---

## 🧠 Architecture


Figma (Tokens Studio)
↓
GitHub (tokens source)
↓
Style Dictionary (build pipeline)
↓
Generated outputs (JS, CSS, etc.)
↓
UI Component Library (Soon)
↓
Applications (React Native / Web) (Soon / Optional)


---

## 📁 Project Structure
.
├── tokens.json # Source of truth (from Figma)
├── build/ # Generated tokens (DO NOT EDIT)
│ └── js/
│ └── tokens.js
├── style-dictionary.config.js # Build configuration
├── .github/
│ └── workflows/
│ └── build.yml # CI pipeline
└── package.json


---

## ⚙️ Getting Started

### 1. Install dependencies

```bash
npm install
```


### 2. Build
```bash
npm run build
```

🔄 Token Flow
Update tokens in Figma
Sync via Tokens Studio → GitHub
GitHub Actions triggers build
Style Dictionary transforms tokens
Output consumed by UI components


🏗️ Build System

The build pipeline:

Resolves token references (aliases)
Normalizes token format
Generates platform-ready outputs


Example Output
```
export const ColorPrimary = "#1A73E8";
```


🔁 CI/CD Automation

On every push:

Install dependencies
Run token build
Commit updated build artifacts

```
.github/workflows/build.yml
```