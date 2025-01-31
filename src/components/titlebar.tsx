import { MouseEvent } from 'react';
import { Window } from '@/lib/window';
import { SidebarTrigger } from './ui/sidebar';
import { Minus, Square, X } from 'lucide-react';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { Button } from './ui/button';

export function Titlebar() {
  const window = getCurrentWindow();

  const handleMousedown = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (
      ['button', '.mantine-Group-root', '.mantine-Select-dropdown'].some(
        (selector) => target.closest(selector),
      )
    ) {
      return;
    }

    e.buttons === 1 && e.detail === 2
      ? Window.toggleMaximize()
      : window.startDragging();
  };

  return (
    <header
      className="flex relative h-[5vh] w-full px-2 bg-[var(--color-surface-dim)] justify-between items-center border border-[var(--color-outline-variant)]"
      onMouseDown={(e) => handleMousedown(e)}
    >
      <SidebarTrigger />
      {/* <TitlebarBreadcrumb /> */}
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
    </header>
  );
}
