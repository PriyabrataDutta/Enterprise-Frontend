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
      primary:
        'bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-500/30',
      outline:
        'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700',
      ghost: 'hover:bg-slate-100 text-slate-700',
    };

    return (
      <button
        ref={ref}
        disabled={isLoading || props.disabled}
        className={cn(
          'flex items-center justify-center px-4 py-2 rounded-lg font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          className,
        )}
        {...props}>
        {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';
