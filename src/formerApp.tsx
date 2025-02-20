/* const ComprobantesDeVentas = lazy(
  () => import('./formerRoutes/sales/documents.tsx'),
);
const Presupuestos = lazy(() => import('./formerRoutes/sales/orders.tsx'));
const Remitos = lazy(() => import('./formerRoutes/sales/deliveryNote.tsx'));
const ComprobantesDeCompras = lazy(
  () => import('./formerRoutes/purchases/documents.tsx'),
);
const Inventory = lazy(() => import('./formerRoutes/products/inventory.tsx'));
const InventoryTable = lazy(() => import('./components/inventoryTable.tsx'));

export default function App() {
  useEffect(() => {
    const setMaximizeAttribute = async () => {
      if (await getCurrentWindow().isMaximized()) {
        document.documentElement.setAttribute('data-maximize', 'true');
      } else {
        document.documentElement.setAttribute('data-maximize', 'false');
      }
    };

    setMaximizeAttribute();
    }, []);

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
}*/
