import { memo } from 'react';
import { Link } from '@tanstack/react-router';
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
import { cn } from '@/lib/utils';

export const SidebarMenuItems = memo(function SidebarMenuItems() {
  const SIDEBAR_ITEMS: SidebarGroup[] = [
    {
      icon: LayoutDashboard,
      name: 'Dashboard',
      path: '/',
    },
    {
      icon: ShoppingCart,
      name: 'Ventas',
      path: '/sales',
      subitems: [
        {
          icon: FileOutput,
          name: 'Comprobantes',
          path: '/sales/documents',
        },
        {
          icon: FileDigit,
          name: 'Presupuestos',
          path: '/sales/quotes',
          disabled: true,
        },
        {
          icon: Truck,
          name: 'Remitos',
          path: '/sales/transport',
          disabled: true,
        },
        {
          icon: CreditCard,
          name: 'Cobranzas',
          path: '/sales/collection',
          disabled: true,
        },
        {
          icon: TrendingUp,
          name: 'Ingresos',
          path: '/sales/revenue',
          disabled: true,
        },
        {
          icon: Scale,
          name: 'Saldo de clientes',
          path: '/sales/clients',
          disabled: true,
        },
      ],
    },
    {
      icon: ShoppingBag,
      name: 'Compras',
      path: '/purchases',
      disabled: true,
      subitems: [
        {
          icon: FileInput,
          name: 'Comprobantes',
          path: '/purchases/invoices',
        },
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
      disabled: true,
    },
  ];

  return (
    <>
      {SIDEBAR_ITEMS.map((item: SidebarGroup) => (
        <SidebarMenuItem key={item.name} className="list-none">
          <SidebarMenuButton
            asChild
            tooltip={item.name}
            disabled={item.disabled}
          >
            <Link
              to={item.path}
              className="flex"
              activeOptions={{ exact: false }}
              activeProps={{
                className: 'bg-white text-black font-medium',
              }}
            >
              <item.icon />
              {item.name}
            </Link>
          </SidebarMenuButton>
          {item.subitems?.map((subitem) =>
            item.subitems != undefined && !item.disabled ? (
              <SidebarMenuSub key={subitem.path}>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton
                    asChild
                    className={cn(
                      'h-fit has-[.active]:bg-[var(--color-primary-container)] has-[.active]:text-[var(--color-on-primary-container)]',
                    )}
                  >
                    <Link
                      to={subitem.path}
                      activeOptions={{ exact: false }}
                      activeProps={{
                        className: 'bg-white text-black font-medium',
                      }}
                    >
                      {subitem.name}
                    </Link>
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
