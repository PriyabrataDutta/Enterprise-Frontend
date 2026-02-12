import { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Authorization } from '@/components/auth/Authorization';
import { Loader2 } from 'lucide-react';

// --- Lazy Load Components ---
// Auth
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

// Patient Pages (Public)
const DoctorListing = lazy(() =>
  import('@/features/appointments/components/DoctorListing').then((m) => ({
    default: m.DoctorListing,
  })),
);
// 👇 1. IMPORT THE PROFILE PAGE HERE
const DoctorProfile = lazy(() =>
  import('@/features/appointments/components/DoctorProfile').then((m) => ({
    default: m.DoctorProfile,
  })),
);
const BookingPage = lazy(() =>
  import('@/features/appointments/components/BookingPage').then((m) => ({
    default: m.BookingPage,
  })),
);
const AppointmentSuccess = lazy(() =>
  import('@/features/appointments/components/AppointmentSuccess').then((m) => ({
    default: m.AppointmentSuccess,
  })),
);

// Provider Pages (Protected)
const ProviderDashboard = lazy(() =>
  import('@/features/dashboard/components/ProviderDashboard').then((m) => ({
    default: m.ProviderDashboard,
  })),
);
const AppointmentsView = lazy(() =>
  import('@/features/dashboard/components/AppointmentsView').then((m) => ({
    default: m.AppointmentsView,
  })),
);
const NotFound = lazy(() =>
  import('@/components/errors/NotFound').then((m) => ({ default: m.NotFound })),
);

// Loading Spinner
const Loading = () => (
  <div className='flex h-screen w-full items-center justify-center bg-slate-50'>
    <Loader2 className='h-8 w-8 animate-spin text-blue-600' />
  </div>
);

export const router = createBrowserRouter([
  // 1. PUBLIC ROUTES (Patient Flow)
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <DoctorListing />
      </Suspense>
    ),
  },
  {
    // 👇 2. ADD THIS ROUTE DEFINITION
    path: '/doctor/:id',
    element: (
      <Suspense fallback={<Loading />}>
        <DoctorProfile />
      </Suspense>
    ),
  },
  {
    path: '/book/:id',
    element: (
      <Suspense fallback={<Loading />}>
        <BookingPage />
      </Suspense>
    ),
  },
  {
    path: '/appointment-success',
    element: (
      <Suspense fallback={<Loading />}>
        <AppointmentSuccess />
      </Suspense>
    ),
  },

  // 2. PROVIDER AUTH (Doctor/Clinic Login)
  {
    path: '/provider',
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
      { path: '', element: <Navigate to='/provider/login' replace /> },
    ],
  },

  // 3. PROTECTED DASHBOARD (The "Backend" for Doctors)
  {
    path: '/dashboard',
    element: (
      <Authorization>
        <MainLayout />
      </Authorization>
    ),
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<Loading />}>
            <ProviderDashboard />
          </Suspense>
        ),
      },
      {
        path: 'appointments',
        element: (
          <Suspense fallback={<Loading />}>
            <AppointmentsView />
          </Suspense>
        ),
      },
    ],
  },

  // 4. Catch-All
  {
    path: '*',
    element: (
      <Suspense fallback={<Loading />}>
        <NotFound />
      </Suspense>
    ),
  },
]);
