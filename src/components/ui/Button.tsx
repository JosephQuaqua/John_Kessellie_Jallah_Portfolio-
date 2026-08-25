import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        size === 'sm' && 'px-3.5 py-2 text-sm',
        size === 'md' && 'px-5 py-2.5 text-sm',
        size === 'lg' && 'px-6 py-3 text-base',
        variant === 'primary' && 'bg-accent-500 text-white hover:bg-accent-600 shadow-sm hover:shadow-md active:scale-[0.98]',
        variant === 'secondary' && 'bg-navy-800 text-white hover:bg-navy-700 shadow-sm hover:shadow-md active:scale-[0.98]',
        variant === 'outline' && 'border border-slate-300 text-slate-700 bg-white hover:border-accent-400 hover:text-accent-600 active:scale-[0.98]',
        variant === 'ghost' && 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
        variant === 'danger' && 'bg-red-500 text-white hover:bg-red-600 shadow-sm active:scale-[0.98]',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
