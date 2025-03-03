import { useState } from 'react';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import { Titlebar } from '@/components/titlebar.tsx';
import { EntitySelector } from '@/components/entitySelector.tsx';
import { AccountSelector } from '@/components/accountSelector.tsx';
import { SidebarMenuItems } from '@/components/sidebarMenuItems';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar';

import { SidebarCollapsibleMode } from '@/types/components';
import { Database, Settings } from 'lucide-react';

export const Route = createFileRoute('/_layout')({
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
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Database />
                    Database
                  </SidebarMenuButton>
                  <SidebarMenuButton asChild>
                    <Link to="/settings">
                      <Settings />
                      Settings
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <AccountSelector />
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
    </SidebarProvider>
  );
}
