'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { Chat } from '@/lib/types'
import {
  SidebarGroup,
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
import { cn } from '@/lib/utils'

interface NavChatsProps {
  chats: Chat[]
  onDelete?: (chatId: string) => void
  onRename?: (chatId: string, newName: string) => void
}

export function NavChats({ chats, onDelete, onRename }: NavChatsProps) {
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
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {chats.map((chat) => {
            const isActive = pathname === chat.url || pathname.startsWith(chat.url + '/')

            return (
              <SidebarMenuItem key={chat.id} className="group/chat-item">
                <SidebarMenuButton asChild isActive={isActive}>
                  <Link href={chat.url} className="flex items-center gap-2">
                    <MoreHorizontal className="h-4 w-4 shrink-0" />
                    <span className="truncate">{chat.name}</span>
                  </Link>
                </SidebarMenuButton>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction
                      className="opacity-0 group-hover/chat-item:opacity-100 data-[state=open]:opacity-100"
                      showOnHover
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">更多操作</span>
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start">
                    <DropdownMenuItem
                      onClick={(e) => handleRename(chat.id, chat.name, e)}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      重命名
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => handleDelete(chat.id, e)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
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
