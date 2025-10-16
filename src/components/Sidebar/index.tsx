import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className='w-[300px] h-screen p-4 border-r bg-sidebar text-sidebar-foreground flex flex-col gap-2'>
      <span className='font-bold text-4xl tracking-tighter'>inventory</span>
      <Separator />
      <NavLink
        to='/'
        className={({ isActive }) =>
          `nav-link ${isActive ? 'nav-link-active' : ''}`
        }
      >
        Home
      </NavLink>
      <NavLink
        to='/about'
        className={({ isActive }) =>
          `nav-link ${isActive ? 'nav-link-active' : ''}`
        }
      >
        About
      </NavLink>
      <NavLink
        to='/messages'
        className={({ isActive }) =>
          `nav-link ${isActive ? 'nav-link-active' : ''}`
        }
      >
        Setting
      </NavLink>

      <Button
        className='text-left flex justify-start items-start mt-auto'
        variant={'destructive'}
      >
        <LogOut />
        Sign out
      </Button>
    </nav>
  );
};

export default Sidebar;
