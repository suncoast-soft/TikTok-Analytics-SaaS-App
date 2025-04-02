import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

export default function Badge({
  button,
  icon,
  value,
  label,
  direction = 'horizontal',
  size = 'sm',
  className
}: {
  button?: ReactNode;
  icon?: ReactNode;
  value?: string;
  label?: string;
  direction?: 'horizontal' | 'vertical';
  size?: 'sm' | 'lg';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'bg-navy-800/70 border border-navy-600 px-1 py-1 rounded-lg w-fit flex flex-row items-center',
        direction === 'vertical' && 'flex-col-reverse',
        className
      )}
    >
      {button && button}

      {value && (
        <div className="px-4 flex flex-row items-center gap-1.5">
          {icon && <span className="text-blue">{icon}</span>}

          {value && (
            <p
              className={cn(
                'text-white text-xs',
                size === 'lg' && 'text-2xl font-medium flex-grow'
              )}
            >
              {value}

              {label && (
                <span className="text-navy-100 text-xs font-normal ml-1.5">
                  {label}
                </span>
              )}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
