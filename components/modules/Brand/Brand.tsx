import { cn } from '@/utils/cn';
import Image from 'next/image';

interface ModuleProps {
  tag?: 'h2' | 'h3' | 'h4' | 'h5';
  brand?: string;
  className?: string;
}

export default function Brand({ tag = 'h2', brand, className }: ModuleProps) {
  switch (tag) {
    case 'h3':
      return (
        <div className={cn('flex items-center gap-3.5', className)}>
          <Image
            src="/icons/company.svg"
            width={41}
            height={49}
            alt="Company"
            className="w-8 h-10"
          />

          <h3 className="text-2xl lg:text-3xl font-medium bg-gradient-to-r from-purple to-blue bg-clip-text text-transparent">
            {brand}
          </h3>
        </div>
      );

    case 'h4':
      return (
        <div className={cn('flex items-center gap-3', className)}>
          <Image
            src="/icons/company.svg"
            width={41}
            height={49}
            alt="Company"
            className="w-4 h-6"
          />

          <h4 className="text-lg lg:text-xl font-normal bg-gradient-to-r from-purple to-blue bg-clip-text text-transparent">
            {brand}
          </h4>
        </div>
      );

    case 'h5':
      return (
        <div className={cn('flex items-center gap-2', className)}>
          <Image
            src="/icons/company.svg"
            width={41}
            height={49}
            alt="Company"
            className="w-3 h-4"
          />

          <h5 className="text-sm lg:text-base font-normal bg-gradient-to-r from-purple to-blue bg-clip-text text-transparent">
            {brand}
          </h5>
        </div>
      );

    default:
      return (
        <div className={cn('flex items-center gap-4', className)}>
          <Image
            src="/icons/company.svg"
            width={41}
            height={49}
            alt="Company"
            className="w-10 h-12"
          />

          <h2 className="text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-purple to-blue bg-clip-text text-transparent">
            {brand}
          </h2>
        </div>
      );
  }
}
