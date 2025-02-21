import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

interface ModuleProps {
  children: ReactNode;
  vertical?: boolean;
  className?: string;
}

export default function Card({
  children,
  vertical = false,
  className
}: ModuleProps) {
  return (
    <div className={cn('bg-navy-800 rounded-xl overflow-hidden', className)}>
      <div
        className={cn(
          'relative flex flex-col gap-2 h-full',
          !vertical && 'lg:flex-row lg:items-center'
        )}
      >
        {children}
      </div>
    </div>
  );
}
