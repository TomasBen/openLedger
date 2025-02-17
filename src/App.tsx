import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout.tsx';
import Dashboard from './routes/Dashboard.tsx';
import { Skeleton } from './components/ui/skeleton.tsx';
import './styles/App.css';

const ComprobantesDeVentas = lazy(() => import('./routes/sales/documents.tsx'));
const Presupuestos = lazy(() => import('./routes/sales/orders.tsx'));
const Remitos = lazy(() => import('./routes/sales/deliveryNote.tsx'));
const ComprobantesDeCompras = lazy(
  () => import('./routes/purchases/documents.tsx'),
);
const Inventory = lazy(() => import('./routes/products/inventory.tsx'));
const InventoryTable = lazy(() => import('./components/inventoryTable.tsx'));

export default function App() {
  /* useEffect(() => {
    const setMaximizeAttribute = async () => {
      if (await getCurrentWindow().isMaximized()) {
        document.documentElement.setAttribute('data-maximize', 'true');
      } else {
        document.documentElement.setAttribute('data-maximize', 'false');
      }
    };

    setMaximizeAttribute();
    }, []); */

  return (
    <>
      <Layout>
        <Suspense fallback={<Skeleton className="w-full h-full" />}>
          <Routes>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/sales">
              <Route path="invoices" element={<ComprobantesDeVentas />} />
              <Route path="quotes" element={<Presupuestos />} />
              <Route path="transport" element={<Remitos />} />
            </Route>
            <Route path="/purchases">
              <Route path="invoices" element={<ComprobantesDeCompras />} />
            </Route>
            <Route path="/products">
              <Route index element={<h1>products page</h1>} />
              <Route
                path="inventory"
                element={
                  <Inventory>
                    <InventoryTable />
                  </Inventory>
                }
              />
            </Route>
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}
