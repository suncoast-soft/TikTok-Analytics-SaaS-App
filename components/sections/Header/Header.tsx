import Logo from '@/components/icons/Logo';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { getInitials } from '@/utils/helpers';
import { SettingsIcon } from 'lucide-react';
import SignoutForm from '../Forms/SignoutForm';
import Badge from '@/components/modules/Badge';

type UserType = User & {
  type: string;
};

export default function Header({ user }: { user: UserType }) {
  const { email, name, avatar_url } = user?.user_metadata ?? {};

  return (
    <header className="container max-w-7xl">
      <div className="flex justify-between items-center py-5">
        <Link href={user?.type === 'seller' ? '/seller' : '/'}>
          <Logo type={user?.type === 'seller' ? 'blue' : 'white'} />
        </Link>

        <div>
          {user ? (
            <Badge
              button={
                <Popover>
                  <PopoverTrigger asChild>
                    <Button size="icon" className="rounded-full">
                      <Avatar className="w-7 h-7">
                        <AvatarImage src={avatar_url} />
                        <AvatarFallback>
                          {getInitials(name || email)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="border-none w-64 px-8 py-0 shadow-none">
                    <div className="bg-navy-700 p-4 rounded-xl text-white shadow-lg">
                      <p className="text-sm mb-3 font-bold px-2">
                        {name || email}
                      </p>

                      <div>
                        <Button type="submit" className="shadow-none" asChild>
                          <Link
                            href={
                              user?.type === 'seller'
                                ? '/seller/account'
                                : '/creator/account'
                            }
                            className="text-sm no-underline flex items-center gap-1"
                          >
                            <SettingsIcon width={20} height={20} />
                            <span>Settings</span>
                          </Link>
                        </Button>

                        <SignoutForm />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              }
              className="rounded-full"
            />
          ) : (
            <div className="flex gap-2">
              <Badge
                button={
                  <Button asChild>
                    <Link href="/auth/login">Login</Link>
                  </Button>
                }
                className="rounded-2xl"
              />

              <Badge
                button={
                  <Button variant="secondary" asChild>
                    <Link href="/auth/register">Register</Link>
                  </Button>
                }
                className="rounded-2xl"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
