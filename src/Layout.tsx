import Sidebar from './components/layout/Sidebar.tsx';
import { Titlebar } from '@/components/layout/titlebar.tsx';
import { ShoppingCart, ShoppingBag, House} from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const navItems = [
    {
      icon: House,
      name: 'Dashboard',
      path: '/'
    },
    {
      icon: ShoppingCart,
      name: 'Ventas',
      path: '/ventas/comprobantes',
      subitems: [
        { name: 'Comprobantes', path: '/ventas/comprobantes' },
        { name: 'Presupuestos', path: '/ventas/presupuestos' },
        { name: 'Remitos', path: '/ventas/remitos' },
        { name: 'Cobranzas', path: '/ventas/cobranzas' },
        { name: 'Ingresos', path: '/ventas/ingresos-fondos' },
        { name: 'Cuentas a cobrar', path: '/ventas/cuentas-cobrar' },
        { name: 'Saldo de clientes', path: '/ventas/saldo-clientes' },
      ],
    },
    {
      icon: ShoppingBag,
      name: 'Compras',
      path: '/compras',
      subitems: [
        { name: 'Comprobantes', path: '/compras/comprobantes' },
        { name: 'Ordenes de compra', path: '/compras/ordenes' },
        { name: 'Pagos', path: '/compras/pagos' },
        { name: 'Egresos', path: '/compras/salida-fondos' },
      ],
    },
    /* { name: 'clientes', path: '/clientes', subitems: [] },
    { name: 'productos', path: '/productos', subitems: [] },
    { name: 'categorias', path: '/categorias', subitems: [] },
    { name: 'perfiles', path: '/perfiles', subitems: [] }, */
  ];

  return (
    <>
      {/* react root opening tag */}
      <Titlebar />
      <main id="main-content" role="main">
        <Sidebar navItems={navItems} />
        {children}
      </main>
      {/* react root closing tag */}
    </>
  );
}
