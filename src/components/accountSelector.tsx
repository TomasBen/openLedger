import { memo } from 'react';
import { useAccountantStore } from '@/stores/accountantStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { ChevronRight, LogOut, Plus, Settings } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export const AccountSelector = memo(function AccountSelector() {
  const accountant = useAccountantStore((state) => state.accountant);

  // avatar image not implemented, has to either specify a space for uploading their own, selecting a default one, or getting the one from email

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8 rounded-lg">
                <AvatarImage
                  src="https://cloud.appwrite.io/v1/storage/buckets/679c32710028a20a97e8/files/679c3294001b2d470bb0/view?project=679c31b50030bed08d23&"
                  alt={accountant?.name}
                />
                <AvatarFallback className="rounded-lg">LS</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {accountant?.name ?? 'No account selected'}
                </span>
                <span className="truncate text-xs">{accountant?.email}</span>
              </div>
              <ChevronRight className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 rounded-lg"
            side="top"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src="https://cloud.appwrite.io/v1/storage/buckets/679c32710028a20a97e8/files/679c3294001b2d470bb0/view?project=679c31b50030bed08d23&"
                    alt={accountant?.name}
                  />
                  <AvatarFallback className="rounded-lg">ACC</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {accountant?.name ?? 'No account selected'}
                  </span>
                  <span className="truncate text-xs">{accountant?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem disabled>
                <Plus />
                Add account
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link to="/settings">
                  <Settings />
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <LogOut />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
});
