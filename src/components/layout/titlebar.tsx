import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { Flex, Group, Title, ActionIcon } from '@mantine/core';
import { Undo, Redo, Minimize, Maximize, SquareX } from 'lucide-react';

export function Titlebar() {
  const appWindow = getCurrentWindow();
  const navigate = useNavigate();

  const handleMousedown = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.closest('button')) {
      return
    };

    e.buttons === 1 && e.detail === 2 ? appWindow.toggleMaximize() : appWindow.startDragging();
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
        <ActionIcon variant="subtle" color="black" onClick={() => handlePagination(-1)}>
          <Undo size="18px" />
        </ActionIcon>
        <ActionIcon variant="subtle" color="black" onClick={() => handlePagination(1)}>
          <Redo size="18px" />
        </ActionIcon>
      </Group>
      <Title order={5} className='titlebar-title'>OpenLedger</Title>
      <Group gap='xs'>
        <ActionIcon variant="subtle" color="black" onClick={(e) => { e.preventDefault(), appWindow.minimize() }}>
          <Minimize size="18px" />
        </ActionIcon>
        <ActionIcon variant="subtle" color="black" onClick={(e) => { e.preventDefault(), appWindow.toggleMaximize() }}>
          <Maximize size="18px" />
        </ActionIcon>
        <ActionIcon variant="subtle" color="black" onClick={(e) => { e.preventDefault(), appWindow.close() }}>
          <SquareX size="18px" />
        </ActionIcon>
      </Group>
    </Flex>
  )
}
