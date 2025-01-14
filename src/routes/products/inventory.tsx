import { Container, Flex, Group, Title, Divider, TextInput, Text, SegmentedControl, Button, } from '@mantine/core';
import { LayoutGrid, Package, Search, List } from 'lucide-react';
import { useState } from 'react';

export default function Inventory(){
  const [mode, setMode] = useState('grid');

  return (
    <Container fluid w='100%' pt='md' className='inventory'>
      <Group justify='space-between'>
        <Flex align='end' gap='md'>
          <Package size='3rem' />
          <Title order={1}>Inventario</Title>
        </Flex>
        <Group>
          <TextInput leftSection={<Search size='20px' />} w='15rem' />
          <Divider orientation='vertical' />
          <Button>Añadir</Button>
          <SegmentedControl
            value={mode}
            onChange={setMode}
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
    </Container>
  );
}
