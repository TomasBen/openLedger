import { getCurrentWindow } from '@tauri-apps/api/window';
import { Window } from '@/lib/window';
import { Button } from './ui/button';
import { Minus, Square, X } from 'lucide-react';

export function WindowActions() {
  const window = getCurrentWindow();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        onClick={(e) => {
          e.preventDefault(), window.minimize();
        }}
      >
        <Minus size="18px" />
      </Button>
      <Button
        variant="ghost"
        onClick={(e) => {
          e.preventDefault(), Window.toggleMaximize();
        }}
      >
        <Square size="18px" />
      </Button>
      <Button
        variant="ghost"
        onClick={(e) => {
          e.preventDefault(), window.close();
        }}
      >
        <X size="18px" />
      </Button>
    </div>
  );
}
