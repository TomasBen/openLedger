import Database, { Product} from '@/lib/database';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Stack, Group, Button, TextInput, Textarea, NumberInput, FileInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver'
import { productSchema } from '@/schemas/ARCA';
import { z } from 'zod';
import { Upload } from 'lucide-react'

export function NewProductModal() {
  const [opened, { open, close }] = useDisclosure();

  type ProductForm = z.infer<typeof productSchema>

  const form = useForm<ProductForm>({
    mode: 'uncontrolled',
    validate: zodResolver(productSchema),
    initialValues: {
      code: '',
      name: '',
      description: '',
      price: 0.0,
      currency: '',
      entity_assoc: '',
    },
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title='New Product'
        size='sm'
        centered
      >
        <form onSubmit={form.onSubmit((data: Product) => Database.createProduct(data))}>
          <Stack>
            <TextInput
              label='Code'
              description='Identifier for the product'
              required
              key={form.key('code')}
              {...form.getInputProps('code')}
              error={form.errors.code}
            />
            <TextInput
              label='Name'
              description='Display name for the product'
              required
              key={form.key('name')}
              {...form.getInputProps('name')}
              error={form.errors.name}
            />
            <Textarea
              label='Description'
              key={form.key('description')}
              {...form.getInputProps('description')}
              error={form.errors.description}
            />
            <NumberInput
              label='Price'
              required
              key={form.key('price')}
              {...form.getInputProps('price')}
              error={form.errors.price}
            />
            <TextInput
              label='Currency'
              key={form.key('currency')}
              {...form.getInputProps('currency')}
              error={form.errors.name}
            />
            <FileInput
              label='Display image'
              placeholder='select an image'
              accept='image/jpg,image/png,image/jpeg'
              clearable
              leftSection={<Upload size='16px' />}
            />
            <Group justify='end'>
              <Button variant='filled' type='submit'>Guardar</Button>
              <Button variant='outline' onClick={close}>Cancelar</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
      <Button onClick={open}>Añadir</Button>
    </>
  )
}
