import { EntitySelector } from './entitySelector';
import { MemoAccountSelector } from './accountSelector';
import { MemoSidebarMenuItems } from './sidebarMenuItems';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
} from './ui/sidebar';

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <EntitySelector />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <MemoSidebarMenuItems />
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <MemoAccountSelector />
      </SidebarFooter>
    </Sidebar>
  );
}
