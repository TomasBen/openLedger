import { MouseEvent } from 'react';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { useLocation } from '@tanstack/react-router';
import { Window } from '@/lib/window';
import { WindowActions } from './windowActions';
import { SidebarTrigger } from './ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { House } from 'lucide-react';
import { Separator } from './ui/separator';

export function Titlebar() {
  const window = getCurrentWindow();

  const handleMousedown = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (['button'].some((selector) => target.closest(selector))) {
      return;
    }

    e.buttons === 1 && e.detail === 2
      ? Window.toggleMaximize()
      : window.startDragging();
  };

  return (
    <header
      className="flex h-[30px] w-full items-center px-2 pb-2"
      onMouseDown={(e) => handleMousedown(e)}
    >
      <SidebarTrigger />
      <Separator
        orientation="vertical"
        className="bg-[var(--color-outline)] mx-2"
      />
      <TitlebarBreadcrumb />
      <WindowActions />
    </header>
  );
}

function TitlebarBreadcrumb() {
  const { pathname } = useLocation();
  let location = pathname.split('/');

  return (
    <Breadcrumb className="flex ml-2">
      <BreadcrumbList>
        <BreadcrumbItem>
          <House size={18} />
        </BreadcrumbItem>
        {location.map((path, index) => {
          if (index <= location.length - 2) {
            return (
              <>
                <BreadcrumbItem key={index}>
                  <BreadcrumbLink>{path}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator key={index} />
              </>
            );
          }
        })}
        <BreadcrumbItem>
          <BreadcrumbPage>{location.pop()}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
