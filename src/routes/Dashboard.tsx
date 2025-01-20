import { useAccountantStore } from "@/stores/accountantStore";
import { Button, Center } from "@mantine/core";

export default function Dashboard(){
  const { accountant } = useAccountantStore();

  const handleClick = async () => {
    console.log(accountant?.currently_representing);
  }

  return (
    <Center w='100%' h='100%'>
      <Button variant="outline" onClick={() => handleClick()}>get curr client</Button>
    </Center>
  )
}
