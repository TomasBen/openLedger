import { useState, useRef } from 'react';
import { PanelState } from '@/types/components';
import { Languages } from 'lucide-react';
import { Popper, ClickAwayListener, Paper, Tooltip, ToggleButtonGroup, ToggleButton, IconButton } from '@mui/material';

import { Language } from '../types/user-preferences';
import { usePreferencesStore } from '@/stores/UserPreferencesStore';

export default function LanguageButton() {
  const { preferences, updatePreferences } = usePreferencesStore();

  const [panelState, setPanelState] = useState<PanelState>('closed');
  const anchorElement = useRef<HTMLDivElement>(null);

  return (
    <div className="languageButtonContainer" ref={anchorElement}>
      <Popper placement="top" open={panelState === 'open'} anchorEl={anchorElement.current}>
        <ClickAwayListener onClickAway={() => setPanelState(panelState === 'open' ? 'closed' : 'open')}>
          <Paper>
            <ToggleButtonGroup orientation="vertical" exclusive value={preferences.Language}>
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
