import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: Layout,
});

function Layout() {
  return (
    <>
      <Outlet />
      <Toaster richColors />
      {/* <TanStackRouterDevtools position="bottom-right" /> */}
    </>
  );
}
