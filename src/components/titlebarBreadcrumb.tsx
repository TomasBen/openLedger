import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { House } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export function TitlebarBreadcrumb() {
  const [path, _setPath] = useState<string[]>(
    useLocation().pathname.split('/'),
  );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <House />
        </BreadcrumbItem>
        {path.map((item, index) =>
          index != path.length - 1 ? (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink>{item}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          ) : (
            <BreadcrumbItem>
              <BreadcrumbPage>{item}</BreadcrumbPage>
            </BreadcrumbItem>
          ),
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
