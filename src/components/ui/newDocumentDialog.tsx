import { lazy, Suspense } from 'react';
import { useDisclosure } from '@mantine/hooks'
import { Modal, Loader, Group, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
const BodyForm = lazy(() => import('./bodyForm'));

interface DialogProps {
  trigger: string;
  title: string;
}

export default function NewDocumentDialog({ trigger, title }: DialogProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const handleClose = () => {
    close();
    notifications.show({
      title: 'new notification',
      message: 'the modal was succesfully closed!!',
      withCloseButton: false,
    });
  }

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
        <Suspense fallback={<Loader m='auto' type='dots' />}>
          <BodyForm />
        </Suspense>
        <Group wrap='nowrap' mt='md'>
          <Button variant="solid">Crear Documento</Button>
          <Button variant="outline" disabled>Crear y enviar a ARCA</Button>
          <Button variant="outline" disabled>Vista Previa</Button>
          <Button variant="outline" onClick={() => handleClose()}>Cancelar</Button>
        </Group>
      </Modal>
      <Button variant='filled' onClick={open}>{trigger}</Button>
    </>
  );
}
