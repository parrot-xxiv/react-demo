import * as React from 'react';

import {
  SidebarTrigger,
  SidebarProvider
} from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import { ModeToggle } from '@/components/component/mode-toggle';
import Sidebar from '@/components/component/sidebar'

export default function Component() {


  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar/>
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
