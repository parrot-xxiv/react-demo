import { Atom, Home, Layers } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLocation, useNavigate } from 'react-router-dom';
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
} from '@/components/ui/sidebar'



export default function Component() {


    const navigate = useNavigate();
    const { pathname } = useLocation();

    return <Sidebar className="w-64 border-r">
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
                        <Home className='mr-2' /> Home
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    onClick={() => navigate('/')}
                                    isActive={pathname === '/'}
                                >
                                    Introduction
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
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
}