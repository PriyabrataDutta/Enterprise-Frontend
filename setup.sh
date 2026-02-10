#!/bin/bash

# 1. Create Directory Structure
echo "Creating project structure..."
mkdir -p src/{app,components/{ui,layout,auth},config,features/{auth/{api,components,routes},dashboard/{api,components,routes}},hooks,lib,routes,stores,types,utils}

# 2. Create Configuration Files
echo "Creating config files..."

# package.json
cat << 'EOF' > package.json
{
  "name": "enterprise-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.3.4",
    "@tanstack/react-query": "^5.17.19",
    "axios": "^1.6.7",
    "clsx": "^2.1.0",
    "lucide-react": "^0.330.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-error-boundary": "^4.0.12",
    "react-hook-form": "^7.50.1",
    "react-router-dom": "^6.22.0",
    "tailwind-merge": "^2.2.1",
    "zod": "^3.22.4",
    "zustand": "^4.5.0"
  },
  "devDependencies": {
    "@types/node": "^20.11.17",
    "@types/react": "^18.2.55",
    "@types/react-dom": "^18.2.19",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.2.2",
    "vite": "^5.1.0"
  }
}
EOF

# tsconfig.json
cat << 'EOF' > tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF

# tsconfig.node.json
cat << 'EOF' > tsconfig.node.json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
EOF

# vite.config.ts
cat << 'EOF' > vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  }
});
EOF

# tailwind.config.js
cat << 'EOF' > tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF

# postcss.config.js
cat << 'EOF' > postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# index.html
cat << 'EOF' > index.html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Enterprise App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

# .env
cat << 'EOF' > .env
VITE_API_URL=http://localhost:8000/api/v1
EOF

# 3. Create Source Files
echo "Creating source code..."

# src/types/index.ts
cat << 'EOF' > src/types/index.ts
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'MANAGER' | 'USER';
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}
EOF

# src/utils/cn.ts
cat << 'EOF' > src/utils/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
EOF

# src/utils/storage.ts
cat << 'EOF' > src/utils/storage.ts
const PREFIX = 'app_';

export const storage = {
  getToken: () => JSON.parse(window.localStorage.getItem(`${PREFIX}token`) as string),
  setToken: (token: string) => window.localStorage.setItem(`${PREFIX}token`, JSON.stringify(token)),
  clearToken: () => window.localStorage.removeItem(`${PREFIX}token`),
};
EOF

# src/stores/useAuthStore.ts
cat << 'EOF' > src/stores/useAuthStore.ts
import { create } from 'zustand';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (accessToken: string, user: User) => void;
  setToken: (accessToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  setAuth: (accessToken, user) => set({ accessToken, user, isAuthenticated: true }),
  setToken: (accessToken) => set({ accessToken }),
  logout: () => set({ user: null, accessToken: null, isAuthenticated: false }),
}));
EOF

# src/lib/axios.ts
cat << 'EOF' > src/lib/axios.ts
import axios from 'axios';
import { useAuthStore } from '@/stores/useAuthStore';

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await api.post('/auth/refresh');
        useAuthStore.getState().setToken(data.accessToken);
        originalRequest.headers.Authorization = \`Bearer \${data.accessToken}\`;
        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);
EOF

# src/lib/queryClient.ts
cat << 'EOF' > src/lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});
EOF

# src/components/ui/Button.tsx
cat << 'EOF' > src/components/ui/Button.tsx
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'outline' | 'ghost';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, isLoading, variant = 'primary', ...props }, ref) => {
    const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm',
      outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700',
      ghost: 'hover:bg-gray-100 text-gray-700',
    };
    return (
      <button
        ref={ref}
        disabled={isLoading || props.disabled}
        className={cn(
          'flex items-center justify-center px-4 py-2 rounded-md font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          variants[variant],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
EOF

# src/components/ui/Input.tsx
cat << 'EOF' > src/components/ui/Input.tsx
import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <input
          ref={ref}
          className={cn(
            'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';
EOF

# src/components/auth/Authorization.tsx
cat << 'EOF' > src/components/auth/Authorization.tsx
import { useAuthStore } from '@/stores/useAuthStore';
import { Navigate } from 'react-router-dom';

interface Props {
  roles?: string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const Authorization = ({ roles, children, fallback = null }: Props) => {
  const user = useAuthStore((state) => state.user);
  if (!user) return <Navigate to="/auth/login" replace />;
  if (roles && !roles.includes(user.role)) return <>{fallback}</>;
  return <>{children}</>;
};
EOF

# src/features/auth/components/LoginForm.tsx
cat << 'EOF' > src/features/auth/components/LoginForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import { api } from '@/lib/axios';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useState } from 'react';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password too short'),
});

type LoginData = z.infer<typeof schema>;

export const LoginForm = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [serverError, setServerError] = useState('');
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginData) => {
    try {
      // Mock API call since backend isn't real yet
      // const res = await api.post('/auth/login', data);
      
      // MOCK RESPONSE FOR DEMO
      await new Promise(r => setTimeout(r, 1000));
      const mockRes = { accessToken: 'fake-jwt', user: { id: '1', email: data.email, firstName: 'Admin', lastName: 'User', role: 'ADMIN' } };
      
      setAuth(mockRes.accessToken, mockRes.user as any);
      navigate('/dashboard');
    } catch (err: any) {
      setServerError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <h2 className="text-center text-2xl font-bold mb-6">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {serverError && <div className="p-2 bg-red-50 text-red-600 text-sm rounded">{serverError}</div>}
          <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
          <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />
          <Button type="submit" isLoading={isSubmitting} className="w-full">Sign In</Button>
        </form>
      </div>
    </div>
  );
};
EOF

# src/features/dashboard/components/DashboardView.tsx
cat << 'EOF' > src/features/dashboard/components/DashboardView.tsx
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Loader2 } from 'lucide-react';

export const DashboardView = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // Mock API call
      await new Promise(r => setTimeout(r, 1000));
      return { usersCount: 10420, revenue: 54000 };
    },
  });

  if (isLoading) return <div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="overflow-hidden rounded-lg bg-white shadow p-5">
          <div className="text-sm font-medium text-gray-500">Total Users</div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">{data?.usersCount.toLocaleString()}</div>
        </div>
        <div className="overflow-hidden rounded-lg bg-white shadow p-5">
          <div className="text-sm font-medium text-gray-500">Revenue</div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">${data?.revenue.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};
EOF

# src/components/layout/MainLayout.tsx
cat << 'EOF' > src/components/layout/MainLayout.tsx
import { Outlet, Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import { LogOut, LayoutDashboard, Settings } from 'lucide-react';

export const MainLayout = () => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 hidden md:flex flex-col bg-white border-r">
        <div className="h-16 flex items-center justify-center border-b font-bold text-xl text-blue-600">Enterprise</div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/dashboard" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
            <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
          </Link>
          <Link to="/dashboard/settings" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
            <Settings className="w-5 h-5 mr-3" /> Settings
          </Link>
        </nav>
        <div className="p-4 border-t">
          <div className="mb-4 text-sm text-gray-500">Logged in as {user?.firstName}</div>
          <button onClick={logout} className="flex w-full items-center p-2 text-red-600 hover:bg-red-50 rounded">
            <LogOut className="w-5 h-5 mr-3" /> Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};
EOF

# src/routes/index.tsx
cat << 'EOF' > src/routes/index.tsx
import { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Authorization } from '@/components/auth/Authorization';
import { Loader2 } from 'lucide-react';

const LoginForm = lazy(() => import('@/features/auth/components/LoginForm').then(m => ({ default: m.LoginForm })));
const DashboardView = lazy(() => import('@/features/dashboard/components/DashboardView').then(m => ({ default: m.DashboardView })));

const Loading = () => <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;

export const router = createBrowserRouter([
  {
    path: '/auth',
    children: [
      { path: 'login', element: <Suspense fallback={<Loading />}><LoginForm /></Suspense> },
    ],
  },
  {
    path: '/',
    element: <Authorization><MainLayout /></Authorization>,
    children: [
      { path: 'dashboard', element: <Suspense fallback={<Loading />}><DashboardView /></Suspense> },
      { path: '', element: <Navigate to="/dashboard" replace /> },
    ],
  },
]);
EOF

# src/App.tsx
cat << 'EOF' > src/App.tsx
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { queryClient } from '@/lib/queryClient';
import { router } from '@/routes';

const ErrorFallback = () => (
  <div className="h-screen flex items-center justify-center text-red-600 font-bold">
    Something went wrong. Please refresh.
  </div>
);

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
EOF

# src/main.tsx
cat << 'EOF' > src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
EOF

# src/index.css
cat << 'EOF' > src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply antialiased text-gray-900;
  }
}
EOF

echo "Setup complete! Run 'npm install' then 'npm run dev' to start."