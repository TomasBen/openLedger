import { useState, useRef, useContext } from 'react';
import UserPreferencesContext from '../contexts/UserPreferencesContext';
import { PanelState } from './ui-components';
import { Languages } from 'lucide-react';
import { Popper, ClickAwayListener, Paper, Tooltip, ToggleButtonGroup, ToggleButton, IconButton } from '@mui/material';

import { Language } from '../user-preferences.d';

export default function LanguageButton() {
  const { preferences, updatePreferences } = useContext(UserPreferencesContext);

  const [panelState, setPanelState] = useState<PanelState>('closed');
  const anchorElement = useRef<HTMLDivElement>(null);

  return (
    <div className="languageButtonContainer" ref={anchorElement}>
      <Popper placement="top" open={panelState === 'open'} anchorEl={anchorElement.current}>
        <ClickAwayListener onClickAway={() => setPanelState(panelState === 'open' ? 'closed' : 'open')}>
          <Paper>
            <ToggleButtonGroup orientation="vertical" exclusive value={preferences ? preferences.Language : 'English'}>
              <ToggleButton value={Language.English} onClick={() => updatePreferences({ Language: Language.English })}>
                English
              </ToggleButton>
              <ToggleButton value={Language.Spanish} onClick={() => updatePreferences({ Language: Language.Spanish })}>
                Spanish
              </ToggleButton>
            </ToggleButtonGroup>
          </Paper>
        </ClickAwayListener>
      </Popper>

      <Tooltip title="Language">
        <IconButton onClick={() => setPanelState(panelState === 'closed' ? 'open' : 'closed')}>
          <Languages style={{ pointerEvents: 'none' }} />
        </IconButton>
      </Tooltip>
    </div>
  );
}
