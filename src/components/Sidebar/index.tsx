import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { NavLink, useNavigate } from 'react-router-dom';
import { getAuth } from '@/utils';
import { MENU } from '@/constants';
import { useMemo } from 'react';
import type { UserRole } from '@/types';

const Sidebar = () => {
  const navigate = useNavigate();
  const user = getAuth();

  const onClickSignOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart-storage');
    navigate('/auth/sign-in', { replace: true });
  };

  const filteredMenu = useMemo(() => {
    const data = MENU.filter((item) =>
      item.roles.includes(user?.role as UserRole)
    );

    return data;
  }, [user]);

  return (
    <nav className='w-[300px] h-screen p-4 border-r bg-sidebar text-sidebar-foreground flex flex-col gap-2'>
      <span className='font-bold text-4xl tracking-tighter'>inventory</span>
      <Separator />

      {filteredMenu.map((item) => (
        <NavLink
          key={item.route}
          to={item.route}
          className={({ isActive }) =>
            `nav-link ${isActive ? 'nav-link-active' : ''}`
          }
        >
          {item.label}
        </NavLink>
      ))}

      <Button
        className='text-left flex justify-start items-start mt-auto'
        variant={'destructive'}
        onClick={onClickSignOut}
      >
        <LogOut />
        Sign out
      </Button>
    </nav>
  );
};

export default Sidebar;
