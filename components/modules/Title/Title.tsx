import { cn } from '@/utils/cn';

interface ModuleProps {
  tag?: 'h1' | 'h2' | 'h3';
  title: string;
  className?: string;
}

export default function Title({ tag = 'h1', title, className }: ModuleProps) {
  switch (tag) {
    case 'h2':
      return (
        <h2
          className={cn(
            'text-white text-xl lg:text-3xl font-semibold',
            className
          )}
        >
          {title}
        </h2>
      );

    case 'h3':
      return (
        <h3
          className={cn(
            'text-white text-lg lg:text-2xl font-medium',
            className
          )}
        >
          {title}
        </h3>
      );

    default:
      return (
        <h1
          className={cn(
            'text-white text-2xl lg:text-4xl font-semibold',
            className
          )}
        >
          {title}
        </h1>
      );
  }
}
