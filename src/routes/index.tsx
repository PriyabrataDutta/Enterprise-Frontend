import { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Authorization } from '@/components/auth/Authorization';
import { Loader2 } from 'lucide-react';

// --- Lazy Load Features ---
// We use lazy loading to keep the initial bundle size small.
const LoginForm = lazy(() =>
  import('@/features/auth/components/LoginForm').then((m) => ({
    default: m.LoginForm,
  })),
);
const RegisterForm = lazy(() =>
  import('@/features/auth/components/RegisterForm').then((m) => ({
    default: m.RegisterForm,
  })),
);
const ForgotPasswordForm = lazy(() =>
  import('@/features/auth/components/ForgotPasswordForm').then((m) => ({
    default: m.ForgotPasswordForm,
  })),
);
const DashboardView = lazy(() =>
  import('@/features/dashboard/components/DashboardView').then((m) => ({
    default: m.DashboardView,
  })),
);

// Lazy load the 404 page too
const NotFound = lazy(() =>
  import('@/components/errors/NotFound').then((m) => ({ default: m.NotFound })),
);

// --- Loading Component ---
const Loading = () => (
  <div className='flex h-screen w-full items-center justify-center bg-slate-50'>
    <Loader2 className='h-8 w-8 animate-spin text-blue-600' />
  </div>
);

// --- Router Configuration ---
export const router = createBrowserRouter([
  // 1. Authentication Routes (Public)
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        element: (
          <Suspense fallback={<Loading />}>
            <LoginForm />
          </Suspense>
        ),
      },
      {
        path: 'register',
        element: (
          <Suspense fallback={<Loading />}>
            <RegisterForm />
          </Suspense>
        ),
      },
      {
        path: 'forgot-password',
        element: (
          <Suspense fallback={<Loading />}>
            <ForgotPasswordForm />
          </Suspense>
        ),
      },
      {
        path: '',
        element: <Navigate to='/auth/login' replace />,
      },
    ],
  },

  // 2. Protected Application Routes (Private)
  {
    path: '/',
    element: (
      <Authorization>
        <MainLayout />
      </Authorization>
    ),
    children: [
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<Loading />}>
            <DashboardView />
          </Suspense>
        ),
      },
      // Redirect root to dashboard
      {
        path: '',
        element: <Navigate to='/dashboard' replace />,
      },
    ],
  },

  // 3. Catch-All 404 Route (Must be last)
  {
    path: '*',
    element: (
      <Suspense fallback={<Loading />}>
        <NotFound />
      </Suspense>
    ),
  },
]);
