import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Loader,
  MantineColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { usePreferencesStore } from './stores/UserPreferencesStore.ts';
import Layout from './Layout.tsx';
import Dashboard from './routes/Dashboard.tsx';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import './styles/App.css';
import { getCurrentWindow } from '@tauri-apps/api/window';

const ComprobantesDeVentas = lazy(() => import('./routes/sales/documents.tsx'));
const Presupuestos = lazy(() => import('./routes/sales/orders.tsx'));
const Remitos = lazy(() => import('./routes/sales/deliveryNote.tsx'));
const ComprobantesDeCompras = lazy(
  () => import('./routes/purchases/documents.tsx'),
);
const Inventory = lazy(() => import('./routes/products/inventory.tsx'));

export default function App() {
  const { preferences } = usePreferencesStore();

  const { setColorScheme } = useMantineColorScheme();
  setColorScheme(preferences.Theme.toString() as MantineColorScheme);

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
        <Suspense fallback={<Loader m="auto" type="dots" />}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/home">
              <Route path="comprobantes" element={<ComprobantesDeVentas />} />
              <Route path="presupuestos" element={<Presupuestos />} />
              <Route path="remitos" element={<Remitos />} />
            </Route>
            <Route path="/compras">
              <Route path="comprobantes" element={<ComprobantesDeCompras />} />
            </Route>
            <Route path="/products">
              <Route index element={<h1>products page</h1>} />
              <Route path="inventory" element={<Inventory />} />
            </Route>
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}
