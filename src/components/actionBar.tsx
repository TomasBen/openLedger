import { Flex, Input } from '@chakra-ui/react';
import NewDocumentDialog from './newDocumentDialog';
import { InputGroup } from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';
import { MenuRoot, MenuContent, MenuItem, MenuTrigger } from '@/components/ui/menu';
import { Search, ChevronDown } from 'lucide-react';

interface ActionBarProps {
  placeholder: string;
}

export default function ActionBar({ placeholder }: ActionBarProps) {
  return (
    <Flex direction="row" align="center" p="1em" gap="0.5em">
      <InputGroup flex="1" endElement={<Search />}>
        <Input placeholder={placeholder} />
      </InputGroup>
      <NewDocumentDialog trigger="Nuevo Comprobante" title="Nuevo Comprobante" />
      <MenuRoot>
        <MenuTrigger>
          <Button variant="outline">
            Acciones <ChevronDown />
          </Button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem value="import MC ARCA">Importar desde mis comprobantes (ARCA)</MenuItem>
          <MenuItem value="import CEL ARCA">Importar desde comprobantes en línea (ARCA)</MenuItem>
          <MenuItem value="import CSV">Importar .CSV</MenuItem>
          <MenuItem value="import EXCEL">Importar EXCEL</MenuItem>
        </MenuContent>
      </MenuRoot>
    </Flex>
  );
}
