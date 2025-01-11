import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loader, MantineColorScheme, useMantineColorScheme } from '@mantine/core';
import { usePreferencesStore } from './stores/UserPreferencesStore.ts';
import Layout from './Layout.tsx';
import Dashboard from './routes/Dashboard.tsx';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import './styles/App.css';

const ComprobantesDeVentas = lazy(() => import('./routes/ventas/comprobantes.tsx'));
const ComprobantesDeCompras = lazy(() => import('./routes/compras/comprobantes.tsx'));
const Presupuestos = lazy(() => import('./routes/ventas/presupuestos.tsx'));
const Remitos = lazy(() => import('./routes/ventas/remitos.tsx'));

export default function App() {
  const { preferences } = usePreferencesStore();
  const { setColorScheme } = useMantineColorScheme();

  setColorScheme(preferences.Theme.toString() as MantineColorScheme);

  return (
    <>
      <Layout>
        <Suspense fallback={<Loader m='auto' type='dots' />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ventas">
              <Route path="comprobantes" element={<ComprobantesDeVentas />} />
              <Route path="presupuestos" element={<Presupuestos />} />
              <Route path="remitos" element={<Remitos />} />
            </Route>
            <Route path='/compras'>
              <Route path='comprobantes' element={<ComprobantesDeCompras />} />
            </Route>
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}
