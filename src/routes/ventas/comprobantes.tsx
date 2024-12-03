import { Stack, Box } from '@mui/material';
import Breadcrumb from '../../ui-components/breadcrumb';

import { BreadcrumbItem } from '../../types/components';

export default function ComprobantesDeVentas() {
  const props: BreadcrumbItem[] = [
    { name: 'ventas', path: '/ventas' },
    { name: 'comprobantes', path: '/ventas/comprobantes' },
  ];

  return (
    <Box style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Breadcrumb items={props} />
      <Stack>
        <h1>Comprobantes de Ventas</h1>
      </Stack>
    </Box>
  );
}
