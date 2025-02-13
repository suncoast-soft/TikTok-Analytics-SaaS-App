import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

export default function DarkShadow({
  className,
  children
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'bg-navy-950 p-1 rounded-2xl w-fit flex flex-row items-center gap-1',
        className
      )}
    >
      {children}
    </div>
  );
}
