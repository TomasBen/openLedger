import { invoke } from '@tauri-apps/api/core';
import { useAccountantStore } from "@/stores/accountantStore";
import { Button, Center } from "@mantine/core";
import { notifications } from "@mantine/notifications";

export default function Dashboard(){
  const { accountant } = useAccountantStore();

  const handleClick = async () => {
    try {
      let result = await invoke('create_account', { account: { account_id: '3045945257', name: 'Gonzalo', email: 'emailfalso123@tutamail.com', account_type: "accounting study", country: 'Canada', industry: 'Business' }})

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
