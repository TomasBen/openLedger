export type PanelState = 'open' | 'closed';

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
