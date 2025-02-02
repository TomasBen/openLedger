import { EntitySelector } from './entitySelector';
import { MemoAccountSelector } from './accountSelector';
import { SidebarMenuItems } from './sidebarMenuItems';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
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
          <SidebarMenuItems />
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <MemoAccountSelector />
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
