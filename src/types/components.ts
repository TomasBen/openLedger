export type PanelState = 'open' | 'closed';

export interface SidebarGroup {
  icon?: JSX.Element;
  name: string;
  path: string;
  subitems?: SidebarGroup[];
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
