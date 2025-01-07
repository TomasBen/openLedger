import { NavLink } from 'react-router-dom';
import { Stack } from '@chakra-ui/react';
import { SidebarSubitems } from '../../types/components';

interface FloatingMenuProps {
  subitems?: SidebarSubitems[];
}

export default function SidebarFloatingMenu({ subitems }: FloatingMenuProps) {
  return (
    <Stack className={'floatingMenu'}>
      {subitems
        ? subitems.map(item => (
            <NavLink className={'sidebarLink'} to={item.path} key={item.name}>
              {item.name}
            </NavLink>
          ))
        : null}
    </Stack>
  );
}
