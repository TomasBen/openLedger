import { Toaster } from './components/ui/sonner.tsx';
import { SidebarProvider } from './components/ui/sidebar.tsx';
import { Titlebar } from '@/components/titlebar.tsx';
import { AppSidebar } from './components/appSidebar.tsx';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false} className="p-2">
      <AppSidebar />
      <div className="w-full">
        <Titlebar />
        <main
          id="main-content" // <- used for "skipping to main content button for accessibility"
          role="main"
          className="flex w-full h-[calc(100vh-30px-16px)] bg-white rounded-sm shadow-xl"
        >
          {children}
        </main>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
