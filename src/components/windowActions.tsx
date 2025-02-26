import { getCurrentWindow } from '@tauri-apps/api/window';
import { Window } from '@/lib/window';
import { Button } from './ui/button';
import { Minus, Square, X } from 'lucide-react';

export function WindowActions() {
  const window = getCurrentWindow();

  return (
    <div className="ml-auto">
      <Button
        variant="ghost"
        onClick={(e) => {
          e.preventDefault(), window.minimize();
        }}
      >
        <Minus />
      </Button>
      <Button
        variant="ghost"
        onClick={(e) => {
          e.preventDefault(), Window.toggleMaximize();
        }}
      >
        <Square />
      </Button>
      <Button
        variant="ghost"
        onClick={(e) => {
          e.preventDefault(), window.close();
        }}
      >
        <X />
      </Button>
    </div>
  );
}
