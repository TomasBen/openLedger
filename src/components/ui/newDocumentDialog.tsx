import { lazy, Suspense } from 'react';
import { useDisclosure } from '@mantine/hooks'
import { Modal, Group, Button } from '@mantine/core';

interface DialogProps {
  trigger: string;
  title: string;
}

export default function NewDocumentDialog({ trigger, title }: DialogProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const BodyForm = lazy(() => import('./bodyForm'));

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={title}
        size='auto'
        centered
        overlayProps={{
          backgroundOpacity: 0.5,
        }}
      >
        <Suspense fallback={<div>loading...</div>}>
          <BodyForm />
        </Suspense>
        <Group wrap='nowrap' mt='md'>
          <Button variant="solid">Crear Documento</Button>
          <Button variant="outline" disabled>Crear y enviar a ARCA</Button>
          <Button variant="outline" disabled>Vista Previa</Button>
          <Button variant="outline">Cancelar</Button>
        </Group>
      </Modal>
      <Button variant='filled' onClick={open}>{trigger}</Button>
    </>
  );
}
