import { Tooltip, ActionIcon } from '@mantine/core';
import { PanelLeft } from 'lucide-react';
import { usePreferencesStore } from '@/stores/UserPreferencesStore';
import { Sidebar } from '@/types/user-preferences';


export default function NavbarButton() {
  const { preferences, updatePreferences } = usePreferencesStore();

  const handleClick = () => {
    preferences.SidebarSetting === Sidebar.Expanded
      ? updatePreferences({ SidebarSetting: Sidebar.Minimzed })
      : updatePreferences({ SidebarSetting: Sidebar.Expanded });
  };

  return (
    <Tooltip label="Left Panel" position="right">
      <ActionIcon onClick={() => handleClick()}>
        <PanelLeft />
      </ActionIcon>
    </Tooltip>
  );
}
