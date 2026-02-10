import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className='flex min-h-screen w-full'>
      {/* Left Side: Visual */}
      <div className='hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden'>
        <div className='relative z-10 p-12 text-white'>
          <h2 className='text-4xl font-bold tracking-tight mb-4'>
            Scale with confidence.
          </h2>
          <p className='text-lg text-slate-300 max-w-md'>
            Join over 1 million users managing their enterprise workflows.
          </p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className='flex w-full lg:w-1/2 items-center justify-center bg-white p-8'>
        <div className='w-full max-w-md space-y-8'>
          <div className='text-center lg:text-left'>
            <h1 className='text-3xl font-bold tracking-tight text-slate-900'>
              {title}
            </h1>
            <p className='mt-2 text-sm text-slate-600'>{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
