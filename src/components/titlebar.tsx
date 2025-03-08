import { Fragment, MouseEvent } from 'react';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { Window } from '@/lib/window';
import { useLocation } from '@tanstack/react-router';
import { SidebarTrigger } from './ui/sidebar';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { House, Minus, Square, X } from 'lucide-react';

export function Titlebar() {
  const window = getCurrentWindow();

  const handleMousedown = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (['button', 'li', 'svg'].some((selector) => target.closest(selector))) {
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
      <Separator orientation="vertical" className="bg-gray-400 mx-2" />
      <TitlebarBreadcrumb />
      <Button
        size="icon"
        variant="ghost"
        className="size-6 rounded-full ml-auto transition-colors duration-100 hover:bg-destructive hover:text-destructive-foreground"
        onClick={(e) => {
          e.preventDefault(), window.close();
        }}
      >
        <X />
      </Button>
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
        {location.length > 2 &&
          location.map((item, index) => {
            if (item.length != 0 && index != location.length - 1) {
              return (
                <Fragment key={index}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink>{item}</BreadcrumbLink>
                  </BreadcrumbItem>
                </Fragment>
              );
            } else if (item.length != 0) {
              return (
                <Fragment key={index}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{item}</BreadcrumbPage>
                  </BreadcrumbItem>
                </Fragment>
              );
            }
          })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function WindowActions() {
  const window = getCurrentWindow();

  return (
    <div className="flex items-center gap-2 ml-auto">
      <Button
        size="sm"
        variant="ghost"
        onClick={(e) => {
          e.preventDefault(), window.minimize();
        }}
      >
        <Minus />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={(e) => {
          e.preventDefault(), Window.toggleMaximize();
        }}
      >
        <Square />
      </Button>
      <Button
        size="sm"
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
