import { invoke } from '@tauri-apps/api/core';
import { useEffect, useState } from 'react';
import { useAccountantStore } from '@/stores/accountantStore';
import { useDebouncedCallback } from '@mantine/hooks';
import { InventoryTable } from '@/components/ui/inventoryTable.tsx';
import { NewProductModal } from '@/components/ui/newProductModal';
import { Container, Flex, Group, Title, Divider, TextInput, Text, SegmentedControl } from '@mantine/core';
import { LayoutGrid, Package, Search, List } from 'lucide-react';
import { notifications } from '@mantine/notifications';
import { Product } from '@/components/ui/inventoryTable.tsx';
import { ColumnDef, useReactTable, getCoreRowModel } from '@tanstack/react-table';

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'code',
    header: 'Code',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
  {
    accessorKey: 'measure_unit',
    header: 'Unit',
  },
  {
    accessorKey: 'currency',
    header: 'Currency',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'storage_unit',
    header: 'Storage',
  },
];

export default function Inventory() {
  const [data, setData] = useState<Product[]>([]);
  const { accountant } = useAccountantStore();

  const table = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel() });

  useEffect(() => {
    const getProducts = async () => {
      try {
        let result: Product[] = await invoke('get_products');
        setData(result);
        console.log(data);
      } catch (error) {
        console.log(error);
        notifications.show({
          color: 'red',
          title: 'error when getting the products',
          message: `error: ${error}`,
        });
      }
    };

    getProducts();
  }, [accountant?.currently_representing]);

  const handleSearch = useDebouncedCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      let results: Product[] = await invoke('search_products', { searchTerm: event.target.value, entity: 'Ramphastos tucanus' });
      setData(results);
      console.log(data);
    } catch (error) {
      console.log(error);
      notifications.show({
        color: 'red',
        title: 'error when searching',
        message: `${error}`,
      });
    }
  }, 500);

  return (
    <Container fluid w="100%" pt="md" className="inventory">
      <Group justify="space-between">
        <Flex align="end" gap="md">
          <Package size="50px" />
          <Title order={1}>Inventario</Title>
        </Flex>
        <Group>
          <TextInput w="15rem" placeholder="search by code, name, currency or storage unit" leftSection={<Search size="20px" />} onChange={handleSearch} />
          <Divider orientation="vertical" />
          <NewProductModal />
          <SegmentedControl
            /* value={mode}
            onChange={(e) => handleChange(e.target.value)} */
            defaultValue="list"
            data={[
              {
                value: 'grid',
                label: (
                  <Flex gap="xs" align="end">
                    <LayoutGrid />
                    <Text>Grilla</Text>
                  </Flex>
                ),
              },
              {
                value: 'list',
                label: (
                  <Flex gap="xs" align="end">
                    <List />
                    <Text>Lista</Text>
                  </Flex>
                ),
              },
            ]}
          />
        </Group>
      </Group>
      <Divider my="md" />
      <InventoryTable table={table} />
    </Container>
  );
}
