import { Link } from 'react-router-dom';
import { Stack, IconButton } from '@mui/material';
import { House } from 'lucide-react';

import { BreadcrumbItem } from '../types/components';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <Stack direction="row" className={'breadcrumb-container'}>
      <Link to="/" className={'breadcrumb-home'}>
        <House />
      </Link>
      {items.map((item, index) => (
        <>
          <span>&gt;</span>
          <Link to={item.path} key={index}>
            {item.name}
          </Link>
        </>
      ))}
    </Stack>
  );
}
