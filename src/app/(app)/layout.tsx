import { MainNav } from "@/components/main-nav";
import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Target } from 'lucide-react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex h-14 items-center gap-2 p-4">
              <Target className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-bold text-primary-foreground group-data-[collapsible=icon]:hidden">CoinWatch Sniper</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <MainNav />
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:hidden">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
               <Target className="h-6 w-6 text-primary" />
               <span className="font-semibold">CoinWatch Sniper</span>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
