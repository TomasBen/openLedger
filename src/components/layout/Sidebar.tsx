import { NavLink } from 'react-router-dom';
import { Stack, Separator, Highlight, Text, createListCollection } from '@chakra-ui/react';
import { AvatarGroup, Avatar } from '@/components/ui/avatar.tsx';
import { SelectRoot, SelectContent, SelectItem, SelectTrigger, SelectValueText } from '@/components/ui/select.tsx';
import FloatingMenu from './SidebarFloatingMenu';
import { SidebarGroup } from '@/types/components';

interface SidebarProps {
  navItems: SidebarGroup[];
}

export default function Sidebar({ navItems }: SidebarProps) {
  {
    /*

  const handleClick = (index: number) => {
    setOpenPanels((prev) => {
      if (prev.includes(index)) {
        return prev.filter((item) => item !== index);
      } else {
        return [...prev, index];
      }
    });
  }; */
  }

  return (
    <Stack className={'sidebar'} aria-label="main navigation" id="sidebar">
      <AvatarGroup>
        <Avatar
          name="Matt Murdock"
          shape="full"
          borderless
          size="2xl"
          variant="solid"
          colorPalette="teal"
          src="https://i.pinimg.com/736x/15/80/f4/1580f40a879c31cd967ae6de8cba9845.jpg"
        />
      </AvatarGroup>
      <Text fontSize="lg">
        <Highlight query="Matt Murdock" styles={{ fontWeight: 'bold' }}>
          Matt Murdock
        </Highlight>
      </Text>
      <Text fontSize="sm" color="gray">
        murdock&co@gmail.com
      </Text>
      <Separator />
      <Text fontSize="sm" alignSelf="start" pl={2}>
        Representing:
      </Text>
      <SelectRoot collection={clients}>
        <SelectTrigger>
          <SelectValueText placeholder="select" />
        </SelectTrigger>
        <SelectContent>
          {clients.items.map((client) => (
            <SelectItem key={client.value} item={client}>
              {client.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
      <Separator />
      {navItems.map((item, index) => (
        <div className="sidebarEntry" key={index}>
          {/* add option to pass down icons for each item */}
          <NavLink to={item.path} className={'sidebarLink'}>
            {item.name}
          </NavLink>
          {item.subitems ? <FloatingMenu subitems={item.subitems} /> : null}
        </div>
      ))}
    </Stack>
  );
}

const clients = createListCollection({
  items: [
    { label: 'Frank Castle', value: 'frank-castle' },
    { label: 'Dinah Madani', value: 'dinah-madani' },
    { label: 'John Pilgrim', value: 'john-pilgrim' },
  ],
});
