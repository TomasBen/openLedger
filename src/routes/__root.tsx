import { useState } from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner.tsx';
import { Titlebar } from '@/components/titlebar.tsx';
import { EntitySelector } from '@/components/entitySelector.tsx';
import { MemoAccountSelector } from '@/components/accountSelector.tsx';
import { SidebarMenuItems } from '@/components/sidebarMenuItems';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarProvider,
} from '@/components/ui/sidebar';

import { SidebarCollapsibleMode } from '@/types/components';

export const Route = createRootRoute({
  component: Layout,
});

function Layout() {
  // needs setter in app settings
  const [collapsibleMode] = useState<SidebarCollapsibleMode>(
    () =>
      (localStorage.getItem(
        'sidebar.collapsibleMode',
      ) as SidebarCollapsibleMode) ?? 'icon',
  );
  const [open, setOpen] = useState(
    () => Boolean(localStorage.getItem('sidebar.isOpen')) ?? true,
  );

  const handleChange = (state?: boolean) => {
    if (state) {
      setOpen(state);
      localStorage.setItem('sidebar.isOpen', String(state));
    } else {
      localStorage.setItem('sidebar.isOpen', String(!open));
      setOpen((prev) => !prev);
    }
  };

  return (
    <>
      <SidebarProvider
        defaultOpen={false}
        open={open}
        onOpenChange={handleChange}
      >
        <Sidebar collapsible={collapsibleMode}>
          <SidebarHeader>
            <EntitySelector />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItems />
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <MemoAccountSelector />
          </SidebarFooter>
        </Sidebar>
        <div className="w-full">
          <Titlebar />
          <main
            id="main-content"
            role="main"
            className="flex justify-center w-full h-[calc(100vh-30px-16px)] bg-white rounded-sm drop-shadow-lg"
          >
            <Outlet />
          </main>
        </div>
        <Toaster richColors />
      </SidebarProvider>
      {/* <TanStackRouterDevtools position="bottom-right" /> */}
    </>
  );
}
