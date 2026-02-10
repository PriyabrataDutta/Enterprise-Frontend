import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'sonner';
import { router } from '@/routes';
import { GeneralError } from '@/components/errors/GeneralError'; // Import new component

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 5 * 60 * 1000 } },
});

export default function App() {
  return (
    // Pass the component to FallbackComponent
    <ErrorBoundary FallbackComponent={GeneralError}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position='top-right' richColors closeButton />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
