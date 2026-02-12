import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'sonner';
import { router } from '@/routes';

// 1. Create the Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// 2. Fallback UI if the app crashes
const ErrorFallback = () => (
  <div className='flex h-screen w-full items-center justify-center text-red-600 font-medium'>
    Something went wrong. Please refresh.
  </div>
);

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {/* 3. THIS PROVIDER MUST WRAP EVERYTHING */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position='top-right' richColors closeButton />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
