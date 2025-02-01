import { useAccountantStore } from '@/stores/accountantStore';
import { SidebarMenu, SidebarMenuItem } from './ui/sidebar';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export function EntitySelector() {
  const { accountant, updateAccountant } = useAccountantStore();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="select a client" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {accountant?.entities.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
