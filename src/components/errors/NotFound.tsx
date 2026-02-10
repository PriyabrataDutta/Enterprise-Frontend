import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { MoveLeft, FileQuestion } from 'lucide-react';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-slate-50 text-center'>
      <div className='flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 mb-6'>
        <FileQuestion className='h-10 w-10 text-slate-400' />
      </div>

      <h1 className='text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl'>
        Page not found
      </h1>

      <p className='mt-4 text-base text-slate-500 max-w-md'>
        Sorry, we couldn't find the page you're looking for. It might have been
        moved, deleted, or you may have typed the URL incorrectly.
      </p>

      <div className='mt-8 flex items-center justify-center gap-x-4'>
        <Button onClick={() => navigate(-1)} variant='outline'>
          <MoveLeft className='mr-2 h-4 w-4' />
          Go back
        </Button>
        <Button onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};
