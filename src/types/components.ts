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

export type InventoryView = 'cards' | 'table';

export interface Client {
  id: string | number;
  name: string;
  email: string | undefined;
  address: string | undefined;
  tax_category: string | undefined;
  condition: string | undefined;
  created_at: Date;
}

export interface Sale {
  date: Date;
  doc_id: string;
  doc_type: number;
  sale_point: number;
  auth_code: number;
  recipient_id_type: number;
  recipient_id_number: number;
  recipient_name: string;
  exchange_rate: number;
  currency: string;
  net_levied_amount: number;
  net_exempt_amount: number;
  other_taxes: number;
  vat: number;
  total_taxes: number;
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
