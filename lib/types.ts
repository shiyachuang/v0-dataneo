// 聊天相关类型
export interface Chat {
  id: string
  name: string
  url: string
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
}

// 工作区相关类型
export interface Workspace {
  id: string
  name: string
  url: string
  creatorId: string
  isActive?: boolean
  items: Chat[]
  createdAt?: string
}

// 用户类型
export interface User {
  id: string
  name: string
  email?: string
  avatar?: string
  mobile?: string
  role?: 'admin' | 'user'
}

// 菜单类型
export interface MenuItem {
  name: string
  url: string
  icon: any
  isActive?: boolean
}

// 消息类型
export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

// 对话类型
export interface Conversation {
  id: string
  name: string
  groupId?: string
  messages: Message[]
  createdAt: string
  updatedAt: string
}

// 数据源类型
export interface DataSource {
  id: string
  name: string
  type: 'CSV' | 'Excel' | 'JSON' | 'Database'
  size: string
  updatedAt: string
  status?: 'active' | 'inactive'
}

// 知识库类型
export interface KnowledgeBase {
  id: string
  name: string
  documents: number
  updatedAt: string
  description?: string
}

// 报告类型
export interface Report {
  id: string
  title: string
  date: string
  status: '已完成' | '进行中' | '草稿'
  content?: string
}

// 工作类型
export interface Job {
  id: string
  name: string
  description?: string
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'in-progress' | 'completed'
  dueDate?: string
  createdAt: string
  updatedAt: string
}
