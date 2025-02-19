import { invoke } from '@tauri-apps/api/core';
import { useAccountantStore } from '@/stores/accountantStore';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronsUpDown, Command, Plus } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Entity } from '@/stores/accountantStore';

export function EntitySelector() {
  const { accountant, updateAccountant } = useAccountantStore();

  const handleChange = async (id: string) => {
    const result: Entity = await invoke('get_entity', {
      entityId: id,
      accountant: accountant?.name,
    });

    updateAccountant({ currently_representing: result });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="flex justify-between data-[state=open]:bg-white data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Command />
              </div>
              {accountant?.currently_representing != undefined ? (
                <div className="ml-2">
                  <span className="truncate">
                    {accountant?.currently_representing?.name}
                  </span>
                  <br />
                  <span className="truncate">
                    {accountant?.currently_representing?.id}
                  </span>
                </div>
              ) : (
                <span className="ml-2">No entity selected</span>
              )}
              <ChevronsUpDown />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            side="right"
            sideOffset={4}
            className="rounded-lg max-w-80"
          >
            <DropdownMenuLabel>Entities</DropdownMenuLabel>
            <ScrollArea className="max-h-96 overflow-scroll">
              {accountant?.entities.map((entity) => (
                <DropdownMenuItem
                  key={entity.id}
                  onClick={() => handleChange(entity.id)}
                  className="flex gap-2 truncate"
                >
                  <span className="truncate">{entity.name}</span>
                  <span className="text-muted-foreground truncate">
                    {entity.id}
                  </span>
                </DropdownMenuItem>
              ))}
            </ScrollArea>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <span className="fonfont-medium text-muted-foreground">
                Add entity
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
