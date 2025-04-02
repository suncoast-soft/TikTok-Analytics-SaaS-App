import { cn } from '@/utils/cn';

interface ModuleProps {
  text: string;
  className?: string;
}

export default function Description({ text, className }: ModuleProps) {
  return (
    <p className={cn('text-navy-100/80 tracking-wide', className)}>{text}</p>
  );
}
