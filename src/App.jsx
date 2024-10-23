'use client';

import * as React from 'react';
import { Book, FileText, Layers } from 'lucide-react';

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

const sidebarItems = [
  {
    title: 'React hooks',
    icon: Book,
    items: ['useState', 'useEffect'],
  },
  {
    title: 'Apps',
    icon: Layers,
    items: ['Test App 1', 'Test app 2'],
  },
  {
    title: 'Others',
    icon: Layers,
    items: ['Adding this', 'Modifyingthat'],
  },
];

export default function DocumentationPage() {
  const [activePage, setActivePage] = React.useState('Introduction');

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar className="w-64 border-r">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <Book className="h-6 w-6" />
              <span className="text-lg font-semibold">React demo</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <ScrollArea className="h-[calc(100vh-8rem)]">
              {sidebarItems.map((section) => (
                <SidebarGroup key={section.title}>
                  <SidebarGroupLabel>
                    <section.icon className="mr-2 h-4 w-4" />
                    {section.title}
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {section.items.map((item) => (
                        <SidebarMenuItem key={item}>
                          <SidebarMenuButton
                            onClick={() => setActivePage(item)}
                            isActive={activePage === item}
                          >
                            {item}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </ScrollArea>
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6">
            <SidebarTrigger />
          </header>
          <main className="flex-1 overflow-auto p-6">
            <h1 className="mb-4 text-3xl font-bold">{activePage}</h1>
            <p className="text-muted-foreground">
              This is a placeholder for the {activePage.toLowerCase()} documentation content.
              Replace this with your actual documentation.
            </p>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
