import { invoke } from '@tauri-apps/api/core';
import { useAccountantStore } from "@/stores/accountantStore";
import { Button, Center } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Product } from '@/lib/database';

export default function Dashboard(){
  const { accountant } = useAccountantStore();

  const handleClick = async () => {
    try {
      let result: Product[] = await invoke('get_products', { entity: "Ramphastos tucanus" })

      console.log(result)
    } catch (error) {
      notifications.show({
        color: 'red',
        title: "Error",
        message: `There was an error creating the account: ${error}`,
      })
      console.error(error)
    }
  }

  return (
    <Center w='100%' h='100%'>
      <Button variant="outline" onClick={() => handleClick()}>generate client</Button>
    </Center>
  )
}
