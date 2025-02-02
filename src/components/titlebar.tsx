import { MouseEvent } from 'react';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { Window } from '@/lib/window';
import { WindowActions } from './windowActions';
import { SidebarTrigger } from './ui/sidebar';

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
      className="flex relative h-[5vh] w-full px-2 bg-[var(--color-surface)] justify-between items-center border-b border-[var(--color-outline-variant)]"
      onMouseDown={(e) => handleMousedown(e)}
    >
      <SidebarTrigger />
      {/* <TitlebarBreadcrumb /> */}
      <WindowActions />
    </header>
  );
}
