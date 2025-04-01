import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

interface ModuleProps {
  children: ReactNode;
  vertical?: boolean;
  className?: string;
}

export default function Card({ children, className }: ModuleProps) {
  return (
    <div
      className={cn(
        'bg-navy-700/70 rounded-2xl border border-navy-600 overflow-hidden p-5',
        className
      )}
    >
      {children}
    </div>
  );
}
