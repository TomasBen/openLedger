import { useAccountantStore } from "@/stores/accountantStore";
import { Center, Select } from "@mantine/core";

export default function Dashboard(){
  const { accountant } = useAccountantStore();

  const handleClick = async () => {
    console.log(accountant);
  }

  return (
    <Center w='100%' h='100%'>
      <Select
        radius='md'
        w='200px'
        maxDropdownHeight={200}
        comboboxProps={{ shadow: 'md' }}
        data={['React', 'Svelte', 'Solid', 'Vue']}
      />
    </Center>
  )
}
