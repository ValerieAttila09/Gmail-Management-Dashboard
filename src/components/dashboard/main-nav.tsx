"use client";

import {
  Inbox,
  Users,
  Tag,
  Bell,
  MessageSquare,
  Archive,
  Trash2,
  PenSquare,
  Gift,
} from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { MailCompose } from './mail-compose';
import { useState } from 'react';

export function MainNav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col gap-2">
        <MailCompose open={open} onOpenChange={setOpen} />
        <Button onClick={() => setOpen(true)} className="w-full">
          <PenSquare className="mr-2 h-4 w-4" />
          Compose
        </Button>
      </div>

      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton href="#" isActive>
            <Inbox />
            Inbox
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton href="#">
            <Users />
            Social
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton href="#">
            <Tag />
            Promotions
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton href="#">
            <Bell />
            Updates
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton href="#">
            <MessageSquare />
            Forums
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton href="#">
            <Gift />
            Deals
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton href="#">
            <Archive />
            Archived
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton href="#">
            <Trash2 />
            Trash
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}
