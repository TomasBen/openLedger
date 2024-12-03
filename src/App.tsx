import { lazy, Suspense } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout.tsx';
import Dashboard from './routes/Dashboard.tsx';

const ComprobantesDeVentas = lazy(() => import('./routes/ventas/comprobantes.tsx'));
const Presupuestos = lazy(() => import('./routes/ventas/presupuestos.tsx'));
const Remitos = lazy(() => import('./routes/ventas/remitos.tsx'));

export default function App() {
  return (
    <>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ventas">
              <Route index element={<ComprobantesDeVentas />} />
              <Route path="presupuestos" element={<Presupuestos />} />
              <Route path="remitos" element={<Remitos />} />
            </Route>
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}
