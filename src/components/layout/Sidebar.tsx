import { NavLink } from 'react-router-dom';
import FloatingMenu from './SidebarFloatingMenu';
import { Stack, ActionIcon, Tooltip } from '@mantine/core';
import { Sidebar as SidebarType } from '@/types/user-preferences';
import { usePreferencesStore } from '@/stores/UserPreferencesStore';
import { SidebarGroup } from '@/types/components';
import { PanelLeft } from 'lucide-react';

interface SidebarProps {
  navItems: SidebarGroup[];
}

export default function Sidebar({ navItems }: SidebarProps) {
  const { preferences } = usePreferencesStore();

  return (
    <Stack gap='xs' className={'sidebar'} aria-label="main navigation">
      {navItems.map((item, index) => (
        <div className="sidebarEntry" key={index}>
          <NavLink to={item.path} className={'sidebarLink'}>
            <item.icon />
            {preferences.SidebarSetting === SidebarType.Expanded && item.name}
          </NavLink>
          {/* item.subitems && <FloatingMenu subitems={item.subitems} /> */}
        </div>
      ))}
      <SidebarButton />
    </Stack>
  );
}

const SidebarButton = () => {
  const { preferences, updatePreferences } = usePreferencesStore();

  const handleClick = () => {
    preferences.SidebarSetting === SidebarType.Expanded
      ? updatePreferences({ SidebarSetting: SidebarType.Minimzed })
      : updatePreferences({ SidebarSetting: SidebarType.Expanded });
  };

  return (
      <Tooltip label="Left Panel" position="right" withinPortal={true}>
        <ActionIcon variant="subtle" color="black" onClick={() => handleClick()} className='sidebarButton'>
          <PanelLeft />
        </ActionIcon>
      </Tooltip>
  );
}
