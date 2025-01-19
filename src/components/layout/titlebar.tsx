import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Window } from '@/lib/window';
import { AccountSelector } from '../ui/accountSelector';
import { Flex, Group, ActionIcon } from '@mantine/core';
import { Undo, Redo, Minus, Square, X } from 'lucide-react';
import { getCurrentWindow } from '@tauri-apps/api/window';


export function Titlebar() {
  const window = getCurrentWindow();
  const navigate = useNavigate();

  const handleMousedown = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (['button', '.mantine-Group-root', '.mantine-Select-dropdown']
      .some(selector => target.closest(selector))) {
        return
      }

    e.buttons === 1 && e.detail === 2 ? Window.toggleMaximize() : window.startDragging();
  };

  const handlePagination = (page: number) => {
    navigate(page)
  };

  return (
    <Flex
      className="titlebar"
      justify="space-between"
      align="center"
      onMouseDown={(e) => handleMousedown(e)}
    >
      <Group gap="xs">
        <ActionIcon variant="subtle" onClick={() => handlePagination(-1)}>
          <Undo size="18px" />
        </ActionIcon>
        <ActionIcon variant="subtle" onClick={() => handlePagination(1)}>
          <Redo size="18px" />
        </ActionIcon>
      </Group>
      <AccountSelector />
      <Group gap='xs'>
        <ActionIcon variant="subtle" onClick={(e) => { e.preventDefault(), window.minimize() }}>
          <Minus size="18px" />
        </ActionIcon>
        <ActionIcon variant="subtle" onClick={(e) => { e.preventDefault(), Window.toggleMaximize() }}>
          <Square size="18px" />
        </ActionIcon>
        <ActionIcon variant="subtle" onClick={(e) => { e.preventDefault(), window.close() }}>
          <X size="18px" />
        </ActionIcon>
      </Group>
    </Flex>
  )
}
