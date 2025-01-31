import { NavLink } from 'react-router-dom';
import { EntitySelector } from './entitySelector';
import { AccountSelector } from './accountSelector';
import {
  ShoppingCart,
  ShoppingBag,
  LayoutDashboard,
  FileInput,
  FileOutput,
  FileDigit,
  Truck,
  CreditCard,
  BookUser,
  TrendingDown,
  TrendingUp,
  Blocks,
  ChartSpline,
  Package,
  FileSearch,
  HandCoins,
  Scale,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

const items = [
  {
    icon: LayoutDashboard,
    name: 'Dashboard',
    path: '/home',
  },
  {
    icon: ShoppingCart,
    name: 'Ventas',
    path: '/sales',
    subitems: [
      {
        icon: FileOutput,
        name: 'Comprobantes',
        path: '/sales/invoices',
      },
      { icon: FileDigit, name: 'Presupuestos', path: '/sales/quotes' },
      { icon: Truck, name: 'Remitos', path: '/sales/transport' },
      { icon: CreditCard, name: 'Cobranzas', path: '/sales/collection' },
      { icon: TrendingUp, name: 'Ingresos', path: '/sales/revenue' },
      {
        icon: Scale,
        name: 'Saldo de clientes',
        path: '/sales/clients',
      },
    ],
  },
  {
    icon: ShoppingBag,
    name: 'Compras',
    path: '/purchases',
    subitems: [
      { icon: FileInput, name: 'Comprobantes', path: '/purchases/invoices' },
      {
        icon: FileSearch,
        name: 'Ordenes de compra',
        path: '/purchases/orders',
      },
      { icon: HandCoins, name: 'Pagos', path: '/purchases/payments' },
      { icon: TrendingDown, name: 'Egresos', path: '/purchases/egreses' },
    ],
  },
  {
    icon: Package,
    name: 'Productos',
    path: '/products',
    subitems: [
      { icon: Blocks, name: 'Inventario', path: '/products/inventory' },
    ],
  },
  {
    icon: BookUser,
    name: 'Clientes',
    path: '/clients',
  },
  {
    icon: ChartSpline,
    name: 'Reportes y Analíticas',
    path: '/reports',
  },
];

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <EntitySelector />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.name} className="list-none">
              <SidebarMenuButton asChild>
                <NavLink to={item.path} className="flex">
                  <item.icon />
                  {item.name}
                </NavLink>
              </SidebarMenuButton>
              {item.subitems?.map((subitem) =>
                item.subitems.length > 0 ? (
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton className="h-fit has-[.active]:bg-[var(--color-primary-container)] has-[.active]:text-[var(--color-on-primary-container)]">
                        <NavLink to={subitem.path} className="flex">
                          {subitem.name}
                        </NavLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                ) : null,
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <AccountSelector />
      </SidebarFooter>
    </Sidebar>
  );
}
