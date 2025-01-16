import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Collapse, Stack, Group, ActionIcon, Tooltip } from '@mantine/core';
import { usePreferencesStore } from '@/stores/UserPreferencesStore';
import { Sidebar as SidebarType } from '@/types/user-preferences';
import { SidebarGroup } from '@/types/components';
import { PanelLeft } from 'lucide-react';

interface SidebarProps {
  navItems: SidebarGroup[];
}

export default function Sidebar({ navItems }: SidebarProps) {
  const [hoveredIndex, setHoveredIndex] = useState <Number | null> (null);
  const { preferences } = usePreferencesStore();

  return (
    <Stack gap='xs' className={'sidebar'} aria-label="main navigation">
      {navItems.map((item, index) => {
        return (
          <Stack
            className="sidebarEntry"
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Tooltip label={item.name} position='right' disabled={preferences.SidebarSetting === SidebarType.Expanded}>
              <NavLink to={item.path} className={'sidebarLink'}>
                <item.icon size='26px' />
                {preferences.SidebarSetting === SidebarType.Expanded && item.name}
              </NavLink>
            </Tooltip>

            {item.subitems != undefined &&
              <Collapse in={hoveredIndex === index} className='subitemCollapsible'>
                <Stack>
                  {item.subitems.map((subitem, index) => (
                    <Tooltip label={subitem.name} position='right'>
                      <NavLink to={subitem.path} className='subitemLink' key={index}>
                        <subitem.icon size='20px' />
                        {preferences.SidebarSetting === SidebarType.Expanded && subitem.name}
                      </NavLink>
                    </Tooltip>
                  ))}
                </Stack>
              </Collapse>
            }
          </Stack>
        )
      })}
      <Group className='sidebarLowerBelt'>
        <SidebarButton />
      </Group>
    </Stack>
  );
}

const SidebarButton = () => {
  const { preferences, updatePreferences } = usePreferencesStore();

  const handleClick = () => {
    preferences.SidebarSetting === SidebarType.Expanded
      ? updatePreferences({ SidebarSetting: SidebarType.Minimized })
      : updatePreferences({ SidebarSetting: SidebarType.Expanded });
  };

  return (
      <Tooltip label="Left Panel" position="right" withinPortal={true}>
        <ActionIcon variant="subtle" onClick={() => handleClick()}>
          <PanelLeft />
        </ActionIcon>
      </Tooltip>
  );
}
