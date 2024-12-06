import { Link } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import { House, ChevronRight } from 'lucide-react';

import { BreadcrumbItem } from '../types/components';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <Flex direction="row" align="center" className={'breadcrumb-container'}>
      <Link to="/">
        <House color="var(--color-outline)" />
      </Link>
      {items.map((item, index) => (
        <>
          <ChevronRight size="1em" />
          <Link to={item.path} key={index}>
            {item.name}
          </Link>
        </>
      ))}
    </Flex>
  );
}
