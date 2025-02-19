import { Toaster } from './components/ui/sonner.tsx';
import { Titlebar } from '@/components/titlebar.tsx';
import { EntitySelector } from './components/entitySelector.tsx';
import { MemoAccountSelector } from './components/accountSelector';
import { SidebarMenuItems } from './components/sidebarMenuItems';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarProvider,
} from './components/ui/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false} className="p-2">
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
          id="main-content" // <- used for "skipping to main content button for accessibility"
          role="main"
          className="flex w-full h-[calc(100vh-30px-16px)] bg-white rounded-sm drop-shadow-lg"
          style={{
            contain: 'layout',
          }}
        >
          {children}
        </main>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
