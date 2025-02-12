import { cn } from '@/utils/cn';
import Image from 'next/image';

const LOGO_MAP = {
  white: '/logo-white.png',
  blue: '/logo-blue.png',
  icon: '/logo-icon.png',
  black: '/logo-black.png'
};

const Logo = ({
  type = 'black',
  className = '',
  ...props
}: {
  type?: 'black' | 'white' | 'blue' | 'icon';
  className?: string;
}) => {
  return (
    <Image
      src={LOGO_MAP[type] || LOGO_MAP.black}
      width={type === 'icon' ? 32 : 120}
      height={32}
      alt="Logo"
      className={cn('h-8', className)}
      {...props}
    />
  );
};

export default Logo;
