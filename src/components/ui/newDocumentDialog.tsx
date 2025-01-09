import { useDisclosure } from '@mantine/hooks'
import { Modal, Group, Button } from '@mantine/core';

interface DialogProps {
  trigger: string;
  title: string;
}

export default function NewDocumentDialog({ trigger, title }: DialogProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={title}
        centered
        overlayProps={{
          backgroundOpacity: 0.5,
        }}
      >
        <Group>
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
