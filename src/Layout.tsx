import Sidebar from './components/layout/Sidebar.tsx';
import { Titlebar } from '@/components/layout/titlebar.tsx';
import { ShoppingCart, ShoppingBag, LayoutDashboard, FileInput, FileOutput, FileDigit, Truck, CreditCard, BookUser, TrendingDown, TrendingUp,
Blocks, ChartSpline, Package, FileSearch, HandCoins, Scale } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const navItems = [
    {
      icon: LayoutDashboard,
      name: 'Dashboard',
      path: '/'
    },
    {
      icon: ShoppingCart,
      name: 'Ventas',
      path: '/ventas/comprobantes',
      subitems: [
        { icon: FileOutput, name: 'Comprobantes', path: '/ventas/comprobantes' },
        { icon: FileDigit, name: 'Presupuestos', path: '/ventas/presupuestos' },
        { icon: Truck, name: 'Remitos', path: '/ventas/remitos' },
        { icon: CreditCard, name: 'Cobranzas', path: '/ventas/cobranzas' },
        { icon: TrendingUp, name: 'Ingresos', path: '/ventas/ingresos-fondos' },
        { icon: Scale, name: 'Saldo de clientes', path: '/ventas/saldo-clientes' },
      ]
    },
    {
      icon: ShoppingBag,
      name: 'Compras',
      path: '/purchases',
      subitems: [
        { icon: FileInput, name: 'Comprobantes', path: '/purchases/documents' },
        { icon: FileSearch, name: 'Ordenes de compra', path: '/purchases/orders' },
        { icon: HandCoins, name: 'Pagos', path: '/purchases/payments' },
        { icon: TrendingDown, name: 'Egresos', path: '/purchases/egreses' },
      ],
    },
    {
      icon: Package,
      name: 'Productos',
      path: '/products',
      subitems: [
        { icon: Blocks, name: 'Inventario', path: '/products/inventory' }
      ]},
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

  return (
    <>
      <Titlebar />
      <main id="main-content" role="main">
        <Sidebar navItems={navItems} />
        {children}
      </main>
    </>
  );
}
