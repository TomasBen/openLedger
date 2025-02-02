import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
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
import { SidebarGroup } from '@/types/components';

const SIDEBAR_ITEMS: SidebarGroup[] = [
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
] as const;

export const SidebarMenuItems = memo(function SidebarMenuItems() {
  return (
    <>
      {SIDEBAR_ITEMS.map((item: SidebarGroup) => (
        <SidebarMenuItem key={item.name} className="list-none">
          <SidebarMenuButton asChild>
            <NavLink to={item.path} className="flex">
              <item.icon />
              {item.name}
            </NavLink>
          </SidebarMenuButton>
          {item.subitems?.map((subitem) =>
            item.subitems != undefined ? (
              <SidebarMenuSub key={subitem.path}>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton
                    asChild
                    className="h-fit has-[.active]:bg-[var(--color-primary-container)] has-[.active]:text-[var(--color-on-primary-container)]"
                  >
                    <NavLink to={subitem.path}>{subitem.name}</NavLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            ) : null,
          )}
        </SidebarMenuItem>
      ))}
    </>
  );
});
