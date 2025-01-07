import { Tooltip, IconButton } from '@mui/material';
import { PanelLeftOpen, PanelLeftClose } from 'lucide-react';
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
    <Tooltip title="Left Panel">
      <IconButton onClick={() => handleClick()}>
        {preferences.SidebarSetting === Sidebar.Expanded ? (
          <PanelLeftClose style={{ pointerEvents: 'none' }} />
        ) : (
          <PanelLeftOpen style={{ pointerEvents: 'none' }} />
        )}
      </IconButton>
    </Tooltip>
  );
}
