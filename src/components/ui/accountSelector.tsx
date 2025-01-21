import { useAccountantStore } from "@/stores/accountantStore"
import { Group, Text, Select } from "@mantine/core"
import { Building2, UserRound } from "lucide-react"

export function AccountSelector(){
  const { accountant, updateAccountant } = useAccountantStore();

  const data = accountant?.entities.map(entity => ({
    value: entity.id,
    label: `${entity.name}, ${entity.id}`,
  }))

  return (
    <Group align="center" gap='sm'>
      <UserRound />
      <Group mr='2rem' gap='xs'>
        <Text c='dimmed'>{accountant?.email + ','}</Text>
        <Text fw={700}>{accountant?.name}</Text>
      </Group>
      <Building2 />
      <Select
        w='18rem'
        radius='md'
        limit={50}
        searchable
        checkIconPosition='right'
        maxDropdownHeight={200}
        comboboxProps={{ shadow: 'md', position: 'bottom' }}
        data={data}
        onChange={(value) => updateAccountant({ currently_representing: accountant?.entities.find(item => item.id === value) })}
      />
    </Group>
  )
}
