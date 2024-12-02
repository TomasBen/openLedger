import { useContext, forwardRef, ForwardedRef } from 'react';
import { Webview } from '../lib/webview.ts';
import UserPreferencesContext from '../contexts/UserPreferencesContext';
import { Sun, Moon, Minus, Plus } from 'lucide-react';
import { Paper, MenuList, MenuItem, Divider } from '@mui/material';
import { ToggleButtonGroup, ToggleButton, ButtonGroup, Checkbox, ButtonBase, IconButton } from '@mui/material';

import { Theme } from '../user-preferences.d';

const AccessibilityButtonMenu = forwardRef<HTMLDivElement, {}>((_, ref: ForwardedRef<HTMLDivElement>) => {
  const { preferences, updatePreferences } = useContext(UserPreferencesContext);

  const changeScaleFactor = (operation: string) => {
    if (operation === 'zoomIn') {
      Webview.zoomIn(preferences, updatePreferences);
    } else {
      Webview.zoomOut(preferences, updatePreferences);
    }
  };

  return (
    <Paper ref={ref} className={'accessibilityButtonMenu'} aria-hidden="true">
      <MenuList>
        <MenuItem disableRipple>
          <Checkbox />
          High Contrast
        </MenuItem>
        <Divider />
        <MenuItem disableRipple>Select theme</MenuItem>
        <MenuItem disableRipple>
          <ToggleButtonGroup exclusive value={preferences.Theme}>
            <ToggleButton value={Theme.Light} onClick={() => updatePreferences({ Theme: Theme.Light })}>
              <Sun style={{ pointerEvents: 'none' }} />
            </ToggleButton>
            <ToggleButton value={Theme.Dark} onClick={() => updatePreferences({ Theme: Theme.Dark })}>
              <Moon style={{ pointerEvents: 'none' }} />
            </ToggleButton>
          </ToggleButtonGroup>
        </MenuItem>
        <Divider />
        <MenuItem disableRipple>Set Zoom Level</MenuItem>
        <MenuItem disableRipple>
          <ButtonGroup>
            <IconButton onClick={() => changeScaleFactor('zoomOut')}>
              <Minus />
            </IconButton>
            <ButtonBase
              className="scaleFactor"
              style={{ padding: '10px' }}
              value={preferences.ScaleFactor}
              disableRipple
            >
              {preferences.ScaleFactor.toFixed(1)}
            </ButtonBase>
            <IconButton onClick={() => changeScaleFactor('zoomIn')}>
              <Plus />
            </IconButton>
          </ButtonGroup>
        </MenuItem>
      </MenuList>
    </Paper>
  );
});

AccessibilityButtonMenu.displayName = 'AccessibilityButtonMenu';

export default AccessibilityButtonMenu;
