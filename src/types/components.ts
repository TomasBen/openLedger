import { LucideIcon } from 'lucide-react'

export type PanelState = 'open' | 'closed';

export interface SidebarSubitems {
  name: string,
  path: string
}

export interface SidebarGroup {
  icon: LucideIcon;
  name: string;
  path: string;
  subitems?: SidebarSubitems[]
}

export type Location = {
  pathname: string;
  search: string;
  hash: string;
  state: any;
  key: string;
};

export interface BreadcrumbItem {
  name: string;
  path: string;
}
