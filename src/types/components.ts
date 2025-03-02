import { LucideIcon } from 'lucide-react';

export type PanelState = 'open' | 'closed';

export interface SidebarGroup {
  icon: LucideIcon;
  name: string;
  path: string;
  disabled?: boolean;
  subitems?: SidebarGroup[];
}

export type SidebarCollapsibleMode = 'offcanvas' | 'icon';

export type Location = {
  pathname: string;
  search: string;
  hash: string;
  state: any;
  key: string;
};

export interface ActionButton {
  name: string;
  icon?: LucideIcon;
  variant?:
    | 'default'
    | 'link'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | null
    | undefined;
  action: () => void;
}

export interface Product {
  code: string;
  name?: string;
  description?: string;
  amount?: number;
  measure_unit?: string;
  price?: number;
  currency?: string;
  storage_unit?: string;
}
