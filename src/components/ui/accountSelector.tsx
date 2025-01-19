import { useAccountantStore } from "@/stores/accountantStore"
import { Group, Text, Select } from "@mantine/core"
import { Building2, UserRound } from "lucide-react"

export function AccountSelector(){
  const { accountant, updateAccountant } = useAccountantStore();

  return (
    <Group align="center" gap='sm'>
      <UserRound />
      <Group mr='2rem' gap='xs'>
        <Text c='dimmed'>{accountant?.email + ','}</Text>
        <Text fw={700}>{accountant?.name}</Text>
      </Group>
      <Building2 />
      <Select
        radius='md'
        maxDropdownHeight={200}
        comboboxProps={{
          shadow: 'md',
          classNames: { dropdown: 'no-drag-region '}
        }}
        data={['React', 'Svelte', 'Solid', 'Vue']}
      />
    </Group>
  )
}
