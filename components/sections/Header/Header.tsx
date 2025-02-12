import Logo from '@/components/icons/Logo';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header>
      <div className="h-16 container max-w-7xl flex justify-between items-center">
        <Logo type="white" />

        <div>
          <Button>Login</Button>
          <Button variant="secondary">Register</Button>
        </div>
      </div>
    </header>
  );
}
