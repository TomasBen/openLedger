import { useContext, forwardRef, ForwardedRef } from 'react';
import { Webview } from '../lib/webview.ts';
import UserPreferencesContext from '../contexts/UserPreferencesContext';
import { Sun, Moon, Minus, Plus } from 'lucide-react';
import { Paper, MenuList, MenuItem, Divider } from '@mui/material';
import { ToggleButtonGroup, ToggleButton, ButtonGroup, Checkbox, ButtonBase, IconButton } from '@mui/material';

const AccessibilityButtonMenu = forwardRef<HTMLDivElement, {}>((_, ref: ForwardedRef<HTMLDivElement>) => {
  const { preferences, updatePreferences } = useContext(UserPreferencesContext);

  const changeScaleFactor = (operation: string) => {
    if (operation === 'zoomIn' && preferences.ScaleFactor < 2) {
      Webview.zoomIn(preferences, updatePreferences);
    } else if (operation === 'zoomOut' && preferences.ScaleFactor > 0.5) {
      Webview.zoomOut(preferences, updatePreferences);
    } else {
      console.log('number must be between 0.5 and 2');
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
            <ToggleButton value="Light" onClick={() => updatePreferences({ Theme: 'Light' })}>
              <Sun style={{ pointerEvents: 'none' }} />
            </ToggleButton>
            <ToggleButton value="Dark" onClick={() => updatePreferences({ Theme: 'Dark' })}>
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
