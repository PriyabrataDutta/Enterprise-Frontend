# 🚀 Enterprise Scalable Frontend (React + Vite)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/State-Zustand-orange?style=for-the-badge)

A production-ready, high-performance frontend architecture designed to scale to **1 million users**. This repository implements a **"Screaming Architecture"** (Feature-Based), robust security patterns, and a modern split-screen authentication UI.

---

## ✨ Key Features

### 🎨 Modern UI/UX
- **Dark Mode Support:** Built-in theme toggler using Tailwind CSS and local storage persistence.
- **Rich Dashboard:** Interactive charts (CSS-only), stat cards, and activity feeds.
- **Split-Screen Auth:** Sleek, responsive login/register pages inspired by top SaaS tools.
- **Toast Notifications:** Integrated `sonner` for beautiful, stacked success/error popups.

### 🛡 Security First
- **HttpOnly Cookies:** We strictly avoid storing JWTs in `localStorage` to mitigate XSS.
- **RBAC System:** Granular `<Authorization />` component protects routes based on roles (`ADMIN`, `USER`).
- **CSP & Sanitization:** Content Security Policy and `DOMPurify` patterns.

### ⚡ High Performance & Reliability
- **Error Boundaries:** Custom 404 and 500 error pages to prevent white-screen crashes.
- **Lazy Loading:** Route-based code splitting ensures users only download what they need.
- **Smart Caching:** `TanStack Query` handles API caching, deduplication, and background updates.
- **Type Safety:** Full TypeScript implementation with strict mode enabled.

---

## 🏗 Architecture Overview

We follow a **Domain-Driven Directory Structure**. Code is grouped by *feature*, not by file type.

```text
src/
├── app/                  # App entry, providers, and global routing
├── config/               # Environment variables
├── components/           # Shared UI Library
│   ├── ui/               # Reusable primitives (Buttons, Inputs, Toggle)
│   ├── layout/           # Sidebar, Main Layout
│   └── errors/           # 404 and 500 Error Pages
├── features/             # DOMAIN LOGIC (The core)
│   ├── auth/             # Login, Register, Forgot Password
│   ├── dashboard/        # Charts, Stats, Transactions
│   └── users/            # User management
├── lib/                  # Third-party wrappers (Axios, React Query)
├── stores/               # Global State (Auth, Theme)
└── utils/                # Error handling & helpers

🚀 Getting Started
1. Prerequisites
Node.js v18+

npm or yarn

2. Installation
Bash
# Clone the repository
git clone [https://github.com/your-username/enterprise-frontend.git](https://github.com/your-username/enterprise-frontend.git)

# Navigate into the folder
cd enterprise-frontend

# Install dependencies
npm install
3. Environment Setup
Create a .env file in the root directory:

Properties
VITE_API_URL=http://localhost:8000/api/v1
4. Run Development Server
Bash
npm run dev
Visit http://localhost:3000 to view the app.

📂 Critical File BreakdownFilePurposesrc/lib/axios.tsThe Interceptor Engine. Handles Silent Refresh (auto-renews tokens on 401 errors).src/stores/useAuthStore.tsSession Manager. Handles user state in memory.src/stores/useThemeStore.tsTheme Manager. Persists Dark/Light mode preference.src/routes/index.tsxThe Router. Manages lazy loading and protected routes.src/components/auth/Authorization.tsxThe Gatekeeper. Hides UI elements if the user lacks permission.
🛠 Tech Stack
Framework: React + Vite

Language: TypeScript (Strict Mode)

Styling: Tailwind CSS + clsx + tailwind-merge

State Management: Zustand (Global) + TanStack Query (Server)

Forms: React Hook Form + Zod

UI Components: Lucide React (Icons) + Sonner (Toasts)

🤝 Contributing
Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
Distributed under the MIT License. See LICENSE for more information.

<p align="center"> Built with ❤️ for scalability. </p>



