import * as React from 'react';
import { Atom, Layers } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ModeToggle } from './components/component/mode-toggle';

export default function Component() {

  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar className="w-64 border-r">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <Atom className="h-6 w-6" />
              <span className="text-lg font-semibold">React demo</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <SidebarGroup>
                <SidebarGroupLabel>
                  <Atom className='mr-2' /> React hooks
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => navigate('/react-hooks/use-state')}
                        isActive={pathname === '/react-hooks/use-state'}
                      >
                        useState
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => navigate('/react-hooks/use-effect')}
                        isActive={pathname === '/react-hooks/use-effect'}
                      >
                        useEffect
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupLabel>
                  <Layers className='mr-2' /> Apps
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => navigate('/apps/currency-converter')}
                        isActive={pathname === '/apps/currency-converter'}
                      >
                        Currency Converter
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => navigate('/apps/app-2')}
                        isActive={pathname === '/apps/app-2'}
                      >
                        ???
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </ScrollArea>
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6">
            <SidebarTrigger />
            <div className="ml-auto">
              <ModeToggle />
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
