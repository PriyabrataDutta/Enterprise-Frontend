import { RotateCw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface GeneralErrorProps {
  error?: Error;
  resetErrorBoundary?: () => void;
}

export const GeneralError = ({
  error,
  resetErrorBoundary,
}: GeneralErrorProps) => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-slate-50 text-center p-4'>
      <div className='flex h-20 w-20 items-center justify-center rounded-full bg-red-50 mb-6 animate-pulse'>
        <AlertTriangle className='h-10 w-10 text-red-500' />
      </div>

      <h1 className='text-3xl font-bold tracking-tight text-slate-900'>
        Something went wrong
      </h1>

      <p className='mt-4 text-base text-slate-500 max-w-md'>
        We apologize for the inconvenience. An unexpected error has occurred.
        Our team has been notified.
      </p>

      {/* Only show technical details in development */}
      {import.meta.env.DEV && error && (
        <div className='mt-6 w-full max-w-lg overflow-hidden rounded-lg bg-slate-900 p-4 text-left'>
          <p className='font-mono text-xs text-red-400'>{error.message}</p>
        </div>
      )}

      <div className='mt-8'>
        <Button
          onClick={() =>
            resetErrorBoundary ? resetErrorBoundary() : window.location.reload()
          }
          className='min-w-[150px]'>
          <RotateCw className='mr-2 h-4 w-4' />
          Refresh Page
        </Button>
      </div>

      <p className='mt-8 text-xs text-slate-400'>
        If this persists, please contact{' '}
        <a href='#' className='underline hover:text-slate-600'>
          support@enterprise.app
        </a>
      </p>
    </div>
  );
};
