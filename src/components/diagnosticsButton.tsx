import { useState, useRef } from 'react';
import { Popper, ClickAwayListener, Tooltip, IconButton } from '@mui/material';
import { ShieldAlert } from 'lucide-react';
import { PanelState } from '../types/components';

export default function Diagnostics() {
  const [panelState, setPanelState] = useState<PanelState>('closed');
  const anchorElement = useRef<HTMLDivElement>(null);

  return (
    <div className="diagnosticsButtonContainer" ref={anchorElement}>
      <Popper placement="top" open={panelState === 'open'} anchorEl={anchorElement.current}>
        <ClickAwayListener onClickAway={() => setPanelState(panelState === 'closed' ? 'open' : 'closed')}>
          <span role={'placeholder for diagnostics'} />
          {/* App wide diagnostics to be implemented */}
        </ClickAwayListener>
      </Popper>

      <Tooltip title="Diagnostics">
        <IconButton onClick={() => setPanelState(panelState === 'closed' ? 'open' : 'closed')}>
          <ShieldAlert style={{ pointerEvents: 'none' }} />
        </IconButton>
      </Tooltip>
    </div>
  );
}
