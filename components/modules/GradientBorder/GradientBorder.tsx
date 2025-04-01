import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

export default function GradientBorder({
  className,
  children
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'p-[1px] rounded-xl bg-gradient-to-r from-purple to-blue',
        className
      )}
    >
      <div className="rounded-xl bg-navy-800">{children}</div>
    </div>
  );
}
