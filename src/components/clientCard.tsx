import { Avatar } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Building2,
  EllipsisVertical,
  Pen,
  Trash,
  User,
  Users,
} from 'lucide-react';

import { Client } from '@/types/components';

export function ClientCard({ client }: { client: Client }) {
  return (
    <div className="flex flex-col border border-border rounded-md shadow-md aspect-[4/3]">
      <div className="flex justify-between p-3 bg-primary rounded-t-md">
        <div className="flex items-center gap-4 truncate">
          <Avatar className="bg-primary-inverse/30 text-white p-2 rounded-full">
            {client.category === 'corporate' ? (
              <Building2 />
            ) : client.category === 'unipersonal' ? (
              <User />
            ) : (
              <Users />
            )}
          </Avatar>
          <h2 className="text-xl font-medium leading-tight text-primary-foreground truncate">
            {client.name}
          </h2>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="rounded-full text-primary-foreground hover:bg-primary-inverse/30 hover:text-white transition-colors"
            >
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Pen /> Edit client
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash />
              Delete client
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-1 px-6 py-4">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-primary">ID: {client.id}</h3>
          <p className="text-sm text-muted-foreground">
            {client.industry ?? ''}
          </p>
        </div>

        <div className="space-y-2 text-navy-800">
          <div className="flex items-start gap-2">
            <span className="min-w-24 text-sm font-medium text-gray-500">
              Email:
            </span>
            <span className="text-sm">{client.email ?? 'not provided'}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="min-w-24 text-sm font-medium text-gray-500">
              Phone:
            </span>
            <span className="text-sm">{client.phone ?? 'not provided'}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="min-w-24 text-sm font-medium text-gray-500">
              Address:
            </span>
            <span className="text-sm">{client.address ?? 'not provided'}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center p-2 bg-[var(--color-surface)] border-t border-border rounded-b-md">
        <span className="text-muted-foreground font-extralight text-sm">
          since:{' '}
          {new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }).format(client.created_at)}
        </span>
      </div>
    </div>
  );
}
