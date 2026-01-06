'use client'

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { IconDots } from '@tabler/icons-react'
import { Chat } from '@/lib/types'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface NavChatsProps {
  chats: Chat[]
  onDelete?: (chatId: string) => void
  onRename?: (chatId: string, newName: string) => void
}

export function NavChats({ chats, onDelete, onRename }: NavChatsProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleDelete = (chatId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (confirm('确定要删除这个对话吗？')) {
      onDelete?.(chatId)
    }
  }

  const handleRename = (chatId: string, currentName: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const newName = prompt('重命名对话', currentName)
    if (newName && newName !== currentName) {
      onRename?.(chatId, newName)
    }
  }

  if (!chats || chats.length === 0) {
    return null
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden min-h-[100px] pl-4 py-0">
      <SidebarGroupLabel>对话</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {chats.map((chat) => {
            const isActive = pathname === chat.url || pathname.startsWith(chat.url + '/')

            return (
              <SidebarMenuItem key={chat.id}>
                <SidebarMenuButton
                  onClick={() => router.push(chat.url)}
                  asChild
                  isActive={isActive}
                >
                  <span className="flex items-center gap-2 cursor-pointer" title={chat.name}>
                    <span className="truncate">{chat.name}</span>
                  </span>
                </SidebarMenuButton>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction showOnHover>
                      <IconDots className="h-4 w-4" />
                      <span className="sr-only">更多操作</span>
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start">
                    <DropdownMenuItem onClick={(e) => handleRename(chat.id, chat.name, e)}>
                      重命名
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => handleDelete(chat.id, e)}
                      className="text-foreground"
                    >
                      删除
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
