import { useAccountantStore } from "@/stores/accountantStore"
import { Group, Text, NativeSelect } from "@mantine/core"
import { Building2, UserRound } from "lucide-react"

export function AccountSelector(){
  return (
    <Group align="center" gap='sm'>
      <UserRound />
      <Text fw={700} mr='2rem'>Roberto Díaz</Text>
      <Building2 />
      <NativeSelect data={[
        { label: 'Gonzalo Acevedo, 30459452576', value: 'Gonzalo Acevedo'},
        { label: 'Maggie Acevedo, 30459452576', value: 'Maggie Acevedo'},
        { label: 'Silvia Lobos, 30459452576', value: 'Silvia Lobos'}
      ]}>
      </NativeSelect>
    </Group>
  )
}
