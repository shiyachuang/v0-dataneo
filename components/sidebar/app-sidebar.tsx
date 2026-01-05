'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { IconMessageCirclePlus, IconDots } from '@tabler/icons-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { NavChats } from './nav-chats'
import { NavWorkspaces } from './nav-workspaces'
import { NavUser } from './nav-user'
import { NavMenus } from './nav-menus'
import { chatService, userService } from '@/lib/mock/services'
import { Chat, Workspace, User } from '@/lib/types'
import { toast } from 'sonner'

export function AppSidebar() {
  const router = useRouter()
  const [user, setUser] = React.useState<User | null>(null)
  const [chats, setChats] = React.useState<Chat[]>([])
  const [displayedChats, setDisplayedChats] = React.useState<Chat[]>([])
  const [workspaces, setWorkspaces] = React.useState<Workspace[]>([])
  const [hasMoreChats, setHasMoreChats] = React.useState(false)

  // 初始化数据
  React.useEffect(() => {
    initUser()
    initChats()
    initWorkspaces()
  }, [])

  const initUser = async () => {
    try {
      const userData = await userService.getUserInfo()
      setUser(userData)
    } catch (error: any) {
      toast.error('获取用户信息失败')
    }
  }

  const initChats = async () => {
    try {
      const { list } = await chatService.getConversationList()
      setChats(list)
      setDisplayedChats(list.slice(0, 5))
      setHasMoreChats(list.length > 5)
    } catch (error: any) {
      toast.error('获取对话列表失败')
    }
  }

  const initWorkspaces = async () => {
    try {
      const { list } = await chatService.conversationGroupList()
      setWorkspaces(list)
    } catch (error: any) {
      toast.error('获取工作区列表失败')
    }
  }

  const loadMoreChats = () => {
    const currentCount = displayedChats.length
    const newCount = Math.min(currentCount + 10, chats.length)
    setDisplayedChats(chats.slice(0, newCount))
    setHasMoreChats(newCount < chats.length)
  }

  const handleNewChat = () => {
    router.push('/chat')
  }

  const handleDeleteChat = async (chatId: string) => {
    try {
      await chatService.deleteConversation(chatId)
      toast.success('删除成功')
      initChats()
    } catch (error: any) {
      toast.error('删除失败')
    }
  }

  const handleRenameChat = async (chatId: string, newName: string) => {
    try {
      await chatService.renameConversation(chatId, newName)
      toast.success('重命名成功')
      initChats()
    } catch (error: any) {
      toast.error('重命名失败')
    }
  }

  const handleCreateWorkspace = async () => {
    const name = prompt('请输入工作区名称')
    if (name) {
      try {
        await chatService.createWorkspace(name)
        toast.success('创建成功')
        initWorkspaces()
      } catch (error: any) {
        toast.error('创建失败')
      }
    }
  }

  const handleDeleteWorkspace = async (workspaceId: string) => {
    try {
      // TODO: 实现删除工作区的服务
      toast.success('删除成功')
      initWorkspaces()
    } catch (error: any) {
      toast.error('删除失败')
    }
  }

  const handleLoadConversations = async (workspaceId: string) => {
    try {
      const { list } = await chatService.getConversationList({ groupId: workspaceId })
      setWorkspaces((prev) =>
        prev.map((ws) =>
          ws.id === workspaceId ? { ...ws, items: list } : ws
        )
      )
    } catch (error: any) {
      toast.error('加载对话失败')
    }
  }

  const handleLogout = () => {
    // TODO: 实现退出登录逻辑
    toast.success('已退出登录')
    router.push('/login')
  }

  return (
    <Sidebar collapsible="icon">
      {/* Header */}
      <SidebarHeader className="pl-6 group-data-[collapsible=icon]:pl-1">
        <div className="py-1.5 pr-2 flex items-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            DN
          </div>
          <span className="text-xl group-data-[collapsible=icon]:hidden font-bold pl-2.5">
            DataNeo
          </span>
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="gap-1">
        {/* New Chat Button */}
        <div className="px-2 group-data-[collapsible=icon]:hidden">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 border-0 shadow-none bg-transparent font-semibold"
            onClick={handleNewChat}
          >
            <IconMessageCirclePlus className="h-4 w-4 text-primary" />
            开始新对话
          </Button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          <NavChats
            chats={displayedChats}
            onDelete={handleDeleteChat}
            onRename={handleRenameChat}
          />

          {hasMoreChats && (
            <div className="px-2 pl-4 group-data-[collapsible=icon]:hidden mb-6">
              <Button
                variant="ghost"
                className="w-full justify-start text-sm text-sidebar-foreground/70 hover:text-foreground h-8"
                onClick={loadMoreChats}
              >
                <IconDots className="h-3 w-3 mr-2" />
                更多
              </Button>
            </div>
          )}

          {/* Workspace List */}
          <NavWorkspaces
            workspaces={workspaces}
            onCreateWorkspace={handleCreateWorkspace}
            onDeleteWorkspace={handleDeleteWorkspace}
            onLoadConversations={handleLoadConversations}
          />
        </div>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="mt-7">
        <NavMenus />
        {user && <NavUser user={user} onLogout={handleLogout} />}
      </SidebarFooter>
    </Sidebar>
  )
}
