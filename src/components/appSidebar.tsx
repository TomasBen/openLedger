import { EntitySelector } from './entitySelector';
import { MemoAccountSelector } from './accountSelector';
import { SidebarMenuItems } from './sidebarMenuItems';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
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
  );
}
