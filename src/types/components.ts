import { LucideIcon } from 'lucide-react'

export type PanelState = 'open' | 'closed';

export interface SidebarGroup {
  icon: LucideIcon;
  name: string;
  path: string;
  subitems?: SidebarGroup[]
}

export type Location = {
  pathname: string;
  search: string;
  hash: string;
  state: any;
  key: string;
};
