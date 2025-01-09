import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout.tsx';
import Dashboard from './routes/Dashboard.tsx';
import MainSkeleton from './components/layout/MainSkeleton.tsx';
import '@mantine/core/styles.css'
import './styles/App.css';

const ComprobantesDeVentas = lazy(() => import('./routes/ventas/comprobantes.tsx'));
const Presupuestos = lazy(() => import('./routes/ventas/presupuestos.tsx'));
const Remitos = lazy(() => import('./routes/ventas/remitos.tsx'));

export default function App() {
  return (
    <>
      <Layout>
        <Suspense fallback={<MainSkeleton />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ventas">
              <Route path="comprobantes" element={<ComprobantesDeVentas />} />
              <Route path="presupuestos" element={<Presupuestos />} />
              <Route path="remitos" element={<Remitos />} />
            </Route>
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}
