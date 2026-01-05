'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  IconFolder,
  IconFolderOpen,
  IconDots,
  IconPlus,
  IconTrash,
  IconChevronRight,
} from '@tabler/icons-react'
import { Workspace } from '@/lib/types'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'

interface NavWorkspacesProps {
  workspaces: Workspace[]
  onCreateWorkspace?: () => void
  onDeleteWorkspace?: (workspaceId: string) => void
  onLoadConversations?: (workspaceId: string) => void
}

export function NavWorkspaces({
  workspaces,
  onCreateWorkspace,
  onDeleteWorkspace,
  onLoadConversations,
}: NavWorkspacesProps) {
  const pathname = usePathname()
  const [openWorkspaces, setOpenWorkspaces] = React.useState<string[]>([])

  const toggleWorkspace = (workspaceId: string) => {
    setOpenWorkspaces((prev) => {
      if (prev.includes(workspaceId)) {
        return prev.filter((id) => id !== workspaceId)
      } else {
        // 加载对话列表
        onLoadConversations?.(workspaceId)
        return [...prev, workspaceId]
      }
    })
  }

  const handleDelete = (workspaceId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (confirm('确定要删除这个工作区吗？')) {
      onDeleteWorkspace?.(workspaceId)
    }
  }

  if (!workspaces || workspaces.length === 0) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>工作区</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={onCreateWorkspace}>
                <IconPlus className="h-4 w-4" />
                <span>创建工作区</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    )
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        <span>工作区</span>
        <SidebarMenuAction onClick={onCreateWorkspace} className="ml-auto">
          <IconPlus className="h-4 w-4" />
          <span className="sr-only">创建工作区</span>
        </SidebarMenuAction>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {workspaces.map((workspace) => {
            const isOpen = openWorkspaces.includes(workspace.id)
            const isActive = pathname === workspace.url || pathname.startsWith(workspace.url + '/')

            return (
              <Collapsible
                key={workspace.id}
                open={isOpen}
                onOpenChange={() => toggleWorkspace(workspace.id)}
              >
                <SidebarMenuItem className="group/workspace-item">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <div className="flex items-center gap-2 cursor-pointer">
                        <IconChevronRight
                          className={cn(
                            'h-4 w-4 shrink-0 transition-transform',
                            isOpen && 'rotate-90'
                          )}
                        />
                        {isOpen ? (
                          <IconFolderOpen className="h-4 w-4 shrink-0" color="#DFAA57" />
                        ) : (
                          <IconFolder className="h-4 w-4 shrink-0"  color="#DFAA57"/>
                        )}
                        <span className="truncate">{workspace.name}</span>
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction
                        className="opacity-0 group-hover/workspace-item:opacity-100 data-[state=open]:opacity-100"
                        showOnHover
                      >
                        <IconDots className="h-4 w-4" />
                        <span className="sr-only">更多操作</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="start">
                      <DropdownMenuItem
                        onClick={(e) => handleDelete(workspace.id, e)}
                        className="text-destructive focus:text-destructive"
                      >
                        <IconTrash className="mr-2 h-4 w-4" />
                        删除工作区
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {workspace.items && workspace.items.length > 0 ? (
                        workspace.items.map((item) => {
                          const isSubActive = pathname === item.url

                          return (
                            <SidebarMenuSubItem key={item.id}>
                              <SidebarMenuSubButton asChild isActive={isSubActive}>
                                <Link href={item.url}>
                                  <IconDots className="h-4 w-4" />
                                  <span className="truncate">{item.name}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )
                        })
                      ) : (
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton disabled>
                            <span className="text-muted-foreground text-xs">暂无对话</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
