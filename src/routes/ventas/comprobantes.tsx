import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useReactTable, ColumnDef } from '@tanstack/react-table';
import Breadcrumb from '../../components/breadcrumb.tsx';
import ActionBar from '../../components/actionBar.tsx';

import { BreadcrumbItem } from '../../types/components';

interface ComprobanteDeVenta {
  fecha: string;
  tipo: 'A' | 'B' | 'C';
  comprobante: 'factura' | 'remito';
  CAE: number;
  cliente: string;
  moneda: 'ARS' | 'USD';
  importeBruto: number;
  impuestos: number;
  total: number;
  Observaciones?: string;
}

export default function ComprobantesDeVentas() {
  const [Data, setData] = useState<ComprobanteDeVenta[] | null>(null);

  useEffect(() => {
    setData([
      {
        fecha: '2022-01-01',
        tipo: 'C',
        comprobante: 'factura',
        CAE: 1110210207731831,
        cliente: 'Marcelo Rojas',
        moneda: 'ARS',
        importeBruto: 10000,
        impuestos: 2100,
        total: 12100,
      },
    ]);
  }, []);

  const columns = [
    {
      header: 'Fecha',
      accessorKey: 'fecha',
    },
    {
      header: 'Tipo',
      accessorKey: 'tipo',
    },
    {
      header: 'Comprobante',
      accessorKey: 'comprobante',
    },
    {
      header: 'CAE',
      accessorKey: 'CAE',
    },
    {
      header: 'Cliente',
      accessorKey: 'cliente',
    },
    {
      header: 'Moneda',
      accessorKey: 'moneda',
    },
    {
      header: 'Importe bruto',
      accessorKey: 'importeBruto',
    },
    {
      header: 'Impuestos',
      accessorKey: 'impuestos',
    },
    {
      header: 'Total',
      accessorKey: 'total',
    },
  ];

  const items: BreadcrumbItem[] = [
    { name: 'ventas', path: '/ventas' },
    { name: 'comprobantes', path: '/ventas/comprobantes' },
  ];

  return (
    <Box style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Breadcrumb items={items} />
      <ActionBar placeholder="Buscar por fecha, comprobante, tipo, importe, moneda, CAE, cliente..." />
    </Box>
  );
}
