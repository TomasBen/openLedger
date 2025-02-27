import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
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
import { useState } from 'react';

export const Route = createRootRoute({
  component: Layout,
});

function Layout() {
  const [open, setOpen] = useState(() =>
    Boolean(localStorage.getItem('sidebar_isOpen')),
  );

  const handleChange = (state?: boolean) => {
    if (state) {
      setOpen(state);
      localStorage.setItem('sidebar_isOpen', String(state));
    } else {
      localStorage.setItem('sidebar_isOpen', String(!open));
      setOpen((prev) => !prev);
    }
  };

  return (
    <>
      <SidebarProvider
        defaultOpen={false}
        open={open}
        onOpenChange={handleChange}
        className="pt-2 pr-2 pb-2"
      >
        <Sidebar collapsible="icon">
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
            style={{
              contain: 'layout',
            }}
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
