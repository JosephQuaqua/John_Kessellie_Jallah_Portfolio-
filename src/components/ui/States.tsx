import { AlertCircle } from 'lucide-react';

export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dim = size === 'sm' ? 'h-5 w-5' : size === 'lg' ? 'h-10 w-10' : 'h-7 w-7';
  return (
    <div className="flex items-center justify-center py-12">
      <div
        className={`${dim} animate-spin rounded-full border-2 border-slate-200 border-t-accent-500`}
      />
    </div>
  );
}

export function EmptyState({ message, hint }: { message: string; hint?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center mb-4">
        <AlertCircle className="h-7 w-7 text-slate-400" />
      </div>
      <p className="text-slate-600 font-medium">{message}</p>
      {hint && <p className="text-slate-400 text-sm mt-1">{hint}</p>}
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="h-14 w-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
        <AlertCircle className="h-7 w-7 text-red-400" />
      </div>
      <p className="text-slate-700 font-medium">{message}</p>
    </div>
  );
}

export function SectionLoader() {
  return (
    <div className="space-y-4 py-8">
      <div className="h-8 w-64 rounded-lg bg-slate-200 animate-pulse" />
      <div className="h-4 w-full max-w-lg rounded-lg bg-slate-100 animate-pulse" />
      <div className="h-4 w-3/4 max-w-lg rounded-lg bg-slate-100 animate-pulse" />
    </div>
  );
}
