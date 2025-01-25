import { invoke } from '@tauri-apps/api/core';
import { useEffect, useState } from 'react';
import { useAccountantStore } from '@/stores/accountantStore';
import { useDebouncedCallback } from '@mantine/hooks';
import { NewProductModal } from '@/components/ui/newProductModal';
import { Container, Table, Flex, Group, Title, Divider, TextInput, Text, SegmentedControl, Grid, ScrollArea, Checkbox, LoadingOverlay } from '@mantine/core';
import { LayoutGrid, Package, Search, List } from 'lucide-react';
import { notifications } from '@mantine/notifications';
import { Product } from '@/lib/database';

export default function Inventory() {
  const [mode, setMode] = useState<string | undefined>(localStorage.getItem('InventoryDisplaySetting') || undefined);
  const [products, setProducts] = useState<Product[]>([]);
  const { accountant } = useAccountantStore();

  const handleModeChange = (value: string) => {
    setMode(value);
    localStorage.setItem('InventoryDisplaySetting', value);
  }

  useEffect(() => {
    const getProducts = async () => {
      try {
        let result: Product[] = await invoke('get_products', { entity: "Ramphastos tucanus" });
        setProducts(result)
      } catch (error) {
        notifications.show({
          color: "red",
          title: "error when getting the products",
          message: `error: ${error}`
        })
      }
    }

    getProducts();
  }, [])

  const handleSearch = useDebouncedCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      let results: Product[] = await invoke('search_products', { searchTerm: event.target.value, entity: "Ramphastos tucanus" })
      setProducts(results)
    } catch (error) {
      notifications.show({
        color: 'red',
        title: 'error when searching',
        message: `${error}`
      })
    }
  }, 500);

  return (
    <Container fluid w='100%' pt='md' className='inventory'>
      <Group justify='space-between'>
        <Flex align='end' gap='md'>
          <Package size='50px' />
          <Title order={1}>Inventario</Title>
        </Flex>
        <Group>
          <TextInput leftSection={<Search size='20px' />} w='15rem' onChange={handleSearch} />
          <Divider orientation='vertical' />
          <NewProductModal />
          <SegmentedControl
            value={mode}
            onChange={(e) => handleModeChange(e)}
            data={[{
              value: 'grid',
              label: (
                <Flex gap='xs' align='end'>
                  <LayoutGrid />
                  <Text>Grilla</Text>
                </Flex>
              )
            }, {
              value: 'list',
              label: (
                <Flex gap='xs' align='end'>
                  <List />
                  <Text>Lista</Text>
                </Flex>
              )
            }]}
          />
        </Group>
      </Group>
      <Divider my='md' />
      {mode === 'list' ? (
        <ListView products={products} />
      ) : ( null
        /* <GridView items={products} /> */
      )}
    </Container>
  );
}

function ListView({ products }: { products: Product[] }) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  return (
    <Table highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Code</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>description</Table.Th>
          <Table.Th>Price</Table.Th>
          <Table.Th></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {products.map((item, index) => (
          <Table.Tr key={index}>
            <Table.Td>{item.code}</Table.Td>
            <Table.Td>{item.name}</Table.Td>
            <Table.Td>{item.description}</Table.Td>
            <Table.Td>{item.price}</Table.Td>
            <Table.Td><Checkbox size='md' /></Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}

function GridView(){
  return (
    <ScrollArea>
      <Grid gutter='md'>
        <Grid.Col span={3}></Grid.Col>
      </Grid>
    </ScrollArea>
  )
}
