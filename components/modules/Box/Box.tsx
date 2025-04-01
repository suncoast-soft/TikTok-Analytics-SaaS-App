import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function Box({
  icon,
  value,
  label,
  buttonName,
  buttonLink,
  className,
  children
}: {
  icon?: ReactNode;
  value?: string | number;
  label?: string;
  buttonName?: string;
  buttonLink?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        'bg-navy-800/20 border border-navy-600 p-3 rounded-lg w-fit',
        className
      )}
    >
      <div className="flex flex-row items-center gap-1.5">
        {icon && <span className="text-blue">{icon}</span>}

        {value && (
          <span className="text-white text-3xl font-medium">{value}</span>
        )}

        {label && (
          <span className={cn('text-navy-100 text-sm', value && 'mt-2')}>
            {label}
          </span>
        )}
      </div>

      {children && <div className="mt-3">{children}</div>}

      {buttonName && buttonLink && (
        <div className="bg-navy-950 p-1 rounded-lg w-fit mt-4">
          <Button size="sm" className="w-full" asChild>
            <Link href={buttonLink}>{buttonName}</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
