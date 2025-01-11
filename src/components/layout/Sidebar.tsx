import { NavLink } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { Collapse, Stack, Group, ActionIcon, Tooltip } from '@mantine/core';
import { usePreferencesStore } from '@/stores/UserPreferencesStore';
import { Sidebar as SidebarType } from '@/types/user-preferences';
import { SidebarGroup } from '@/types/components';
import { PanelLeft } from 'lucide-react';

interface SidebarProps {
  navItems: SidebarGroup[];
}

export default function Sidebar({ navItems }: SidebarProps) {
  const { preferences } = usePreferencesStore();

  return (
    <Stack gap='xs' className={'sidebar'} aria-label="main navigation">
      {navItems.map((item, index) => {
        const [opened, { toggle }] = useDisclosure(false);

        return (
          <Stack className="sidebarEntry" key={index} onMouseEnter={toggle} onMouseLeave={toggle}>
            <NavLink to={item.path} className={'sidebarLink'}>
              <item.icon />
              {preferences.SidebarSetting === SidebarType.Expanded && item.name}
            </NavLink>

            {item.subitems &&
              <Collapse in={opened} className='subitemCollapsible'>
                <Stack>
                  {item.subitems.map(subitem => (
                    <NavLink to={subitem.path} className='subitemLink'>
                      <subitem.icon size='20px' />
                      {preferences.SidebarSetting === SidebarType.Expanded && subitem.name}
                    </NavLink>
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
      ? updatePreferences({ SidebarSetting: SidebarType.Minimzed })
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
