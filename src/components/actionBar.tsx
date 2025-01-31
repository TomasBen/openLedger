import NewDocumentDialog from './newDocumentModal';
import { Search, ChevronDown } from 'lucide-react';
import { Group, Menu, TextInput, Button, Divider } from '@mantine/core';

interface ActionBarProps {
  placeholder: string;
}

export default function ActionBar({ placeholder }: ActionBarProps) {
  return (
    <Group align="center">
      <TextInput placeholder={placeholder} leftSection={<Search size="20px" />} flex={1} />
      <Divider orientation='vertical' />
      <NewDocumentDialog trigger="Nuevo Comprobante" title="Nuevo Comprobante" />
      <Menu>
        <Menu.Target>
          <Button variant="outline" rightSection={<ChevronDown />}>Acciones</Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Importar</Menu.Label>
          <Menu.Item>Importardesde .CSV</Menu.Item>
          <Menu.Item>Importardesde EXCEL</Menu.Item>
          <Menu.Item>Importar desde PDF</Menu.Item>
          <Menu.Label>Servicios</Menu.Label>
          <Menu.Item>Importar desde mis comprobantes (ARCA)</Menu.Item>
          <Menu.Item>Importar desde comprobantes en línea (ARCA)</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
