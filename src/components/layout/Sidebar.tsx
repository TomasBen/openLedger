import { NavLink } from 'react-router-dom';
import { Stack } from '@chakra-ui/react';
import FloatingMenu from './SidebarFloatingMenu';
import { SidebarGroup } from '@/types/components';

interface SidebarProps {
  navItems: SidebarGroup[];
}

export default function Sidebar({ navItems }: SidebarProps) {
  return (
    <Stack className={'sidebar'} aria-label="main navigation" id="sidebar">
      {navItems.map((item, index) => (
        <div className="sidebarEntry" key={index}>
          <NavLink to={item.path} className={'sidebarLink'}>
            <item.icon size="1.3em" />
            {item.name}
          </NavLink>
          {item.subitems ? <FloatingMenu subitems={item.subitems} /> : null}
        </div>
      ))}
    </Stack>
  );
}
