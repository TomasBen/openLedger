import { useState, useRef } from 'react';
import { PersonStanding } from 'lucide-react';
import { Popper, ClickAwayListener, Tooltip, IconButton } from '@mui/material';
import AccessibilityButtonMenu from './accessibilityButtonMenu';

import { PanelState } from '../types/components';

export default function AccessibilityButton() {
  const [panelState, setPanelState] = useState<PanelState>('closed');
  const anchorElement = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setPanelState(panelState === 'closed' ? 'open' : 'closed');
  };

  return (
    <div className={'accessibilityButtonContainer'} ref={anchorElement}>
      <Popper placement="top" open={panelState === 'open'} anchorEl={anchorElement.current}>
        <ClickAwayListener onClickAway={() => setPanelState('closed')}>
          <AccessibilityButtonMenu />
        </ClickAwayListener>
      </Popper>

      <Tooltip title="Accessibility" className={'accessibilityButton'}>
        <IconButton onClick={() => handleClick()}>
          <PersonStanding />
        </IconButton>
      </Tooltip>
    </div>
  );
}
