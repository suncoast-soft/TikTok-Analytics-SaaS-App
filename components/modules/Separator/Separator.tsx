import { cn } from '@/utils/cn';

interface SeparatorProps {
  text?: string;
  className?: string;
}

export default function Separator({ text, className }: SeparatorProps) {
  return (
    <div className={cn('relative', className)}>
      <div className="relative flex items-center py-1">
        <div className="grow border-t border-navy-200/60"></div>

        {text && (
          <span className="mx-3 shrink text-xs font-semibold leading-8 text-navy-200/80">
            {text}
          </span>
        )}

        <div className="grow border-t border-navy-200/60"></div>
      </div>
    </div>
  );
}
