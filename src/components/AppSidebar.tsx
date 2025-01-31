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
    path: '/ventas/comprobantes',
    subitems: [
      {
        icon: FileOutput,
        name: 'Comprobantes',
        path: '/ventas/comprobantes',
      },
      { icon: FileDigit, name: 'Presupuestos', path: '/ventas/presupuestos' },
      { icon: Truck, name: 'Remitos', path: '/ventas/remitos' },
      { icon: CreditCard, name: 'Cobranzas', path: '/ventas/cobranzas' },
      { icon: TrendingUp, name: 'Ingresos', path: '/ventas/ingresos-fondos' },
      {
        icon: Scale,
        name: 'Saldo de clientes',
        path: '/ventas/saldo-clientes',
      },
    ],
  },
  {
    icon: ShoppingBag,
    name: 'Compras',
    path: '/purchases',
    subitems: [
      { icon: FileInput, name: 'Comprobantes', path: '/purchases/documents' },
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
                      <SidebarMenuSubButton className="h-fit">
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
