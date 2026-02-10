# 🚀 Enterprise Scalable Frontend (React + Vite)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/State-Zustand-orange?style=for-the-badge)

A production-ready, high-performance frontend architecture designed to scale to **1 million users**. This repository implements a **"Screaming Architecture"** (Feature-Based), robust security patterns, and a modern split-screen authentication UI.

---

## 🏗 Architecture Overview

We follow a **Domain-Driven Directory Structure**. Code is grouped by _feature_, not by file type.

```text
src/
├── app/                  # App entry, providers, and global routing
├── config/               # Environment variables (strict Zod validation)
├── components/           # Shared UI Library (Buttons, Inputs, Layouts)
├── features/             # DOMAIN LOGIC (The core)
│   ├── auth/             # Login, Register, Split-Layout
│   ├── dashboard/        # Charts, Stats, Overview
│   └── users/            # User management
├── lib/                  # Third-party wrappers (Axios, React Query)
├── stores/               # Global State (Zustand)
└── utils/                # Error handling & helpers
```
