import LowerPanel from './components/layout/LowerPanel.tsx';
import Sidebar from './components/layout/Sidebar.tsx';

export default function Layout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { name: 'Dashboard', path: '/' },
    {
      name: 'Ventas',
      path: '/ventas',
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
      <main id="main-content" role="main">
        <Sidebar navItems={navItems} />
        {/* suspense should be added here */}
        {children}
      </main>
      <LowerPanel />
      {/* react root closing tag */}
    </>
  );
}
