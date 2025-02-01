import { SidebarInset, SidebarProvider } from './components/ui/sidebar.tsx';
import { Titlebar } from '@/components/titlebar.tsx';
import AppSidebar from './components/appSidebar.tsx';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <Titlebar />
        <main
          id="main-content" // <- used for "skipping to main content button for accessibility"
          role="main"
          className="flex w-full h-[95vh]"
        >
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
