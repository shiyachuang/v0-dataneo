import {
  Chat,
  Workspace,
  User,
  Message,
  DataSource,
  KnowledgeBase,
  Report
} from '../types'
import {
  mockUser,
  mockChats,
  mockWorkspaces,
  mockMessages,
  mockDataSources,
  mockKnowledgeBases,
  mockReports
} from './data'
import { nanoid } from 'nanoid'

// 模拟网络延迟
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms))

// 聊天服务
export class MockChatService {
  // 获取对话列表
  async getConversationList(params?: { groupId?: string }) {
    await delay()

    if (params?.groupId) {
      // 返回工作区内的对话
      const workspace = mockWorkspaces.find(w => w.id === params.groupId)
      return {
        list: workspace?.items || [],
        total: workspace?.items.length || 0
      }
    }

    // 返回所有聊天
    return {
      list: mockChats,
      total: mockChats.length
    }
  }

  // 获取工作区列表
  async conversationGroupList() {
    await delay()
    return {
      list: mockWorkspaces,
      total: mockWorkspaces.length
    }
  }

  // 获取对话消息
  async getMessages(conversationId: string) {
    await delay()
    return {
      messages: mockMessages[conversationId] || [],
      conversationId
    }
  }

  // 发送消息
  async sendMessage(conversationId: string, content: string) {
    await delay(500)

    const userMessage: Message = {
      id: nanoid(),
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    }

    const assistantMessage: Message = {
      id: nanoid(),
      role: 'assistant',
      content: this.generateMockReply(content),
      timestamp: new Date().toISOString()
    }

    // 更新 mock 数据
    if (!mockMessages[conversationId]) {
      mockMessages[conversationId] = []
    }
    mockMessages[conversationId].push(userMessage, assistantMessage)

    return {
      userMessage,
      assistantMessage
    }
  }

  // 创建新对话
  async createConversation(name?: string) {
    await delay()

    const newChat: Chat = {
      id: `chat-${nanoid()}`,
      name: name || '新对话',
      url: `/chat/chat-${nanoid()}`,
      isActive: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    mockChats.unshift(newChat)
    return newChat
  }

  // 创建工作区
  async createWorkspace(name: string) {
    await delay()

    const newWorkspace: Workspace = {
      id: `workspace-${nanoid()}`,
      name,
      url: `/workspace/workspace-${nanoid()}`,
      creatorId: mockUser.id,
      isActive: false,
      items: [],
      createdAt: new Date().toISOString()
    }

    mockWorkspaces.unshift(newWorkspace)
    return newWorkspace
  }

  // 删除对话
  async deleteConversation(conversationId: string) {
    await delay()
    const index = mockChats.findIndex(c => c.id === conversationId)
    if (index > -1) {
      mockChats.splice(index, 1)
    }
    return { success: true }
  }

  // 重命名对话
  async renameConversation(conversationId: string, newName: string) {
    await delay()
    const chat = mockChats.find(c => c.id === conversationId)
    if (chat) {
      chat.name = newName
    }
    return { success: true }
  }

  // 生成模拟回复
  private generateMockReply(userMessage: string): string {
    const replies = [
      '这是一个很好的问题！让我来帮你分析一下...',
      '根据你的描述，我建议...',
      '我理解你的需求。这里有几个方案供你参考...',
      '让我为你详细解释一下这个问题...',
      '基于当前的信息，我认为...'
    ]

    const randomReply = replies[Math.floor(Math.random() * replies.length)]
    return `${randomReply}\n\n关于"${userMessage.slice(0, 20)}..."，我的理解是这是一个关于数据分析的问题。我建议你可以从以下几个方面入手：\n\n1. 首先明确分析目标\n2. 收集相关数据\n3. 进行数据清洗\n4. 选择合适的分析方法\n5. 可视化展示结果\n\n你还有其他问题吗？`
  }
}

// 用户服务
export class MockUserService {
  async getUserInfo() {
    await delay()
    return mockUser
  }

  async updateUserInfo(updates: Partial<User>) {
    await delay()
    Object.assign(mockUser, updates)
    return mockUser
  }
}

// 数据管理服务
export class MockDataService {
  async getDataSources() {
    await delay()
    return {
      list: mockDataSources,
      total: mockDataSources.length
    }
  }

  async getDataSourceDetail(id: string) {
    await delay()
    return mockDataSources.find(d => d.id === id)
  }
}

// 知识库服务
export class MockKnowledgeService {
  async getKnowledgeBases() {
    await delay()
    return {
      list: mockKnowledgeBases,
      total: mockKnowledgeBases.length
    }
  }

  async getKnowledgeBaseDetail(id: string) {
    await delay()
    return mockKnowledgeBases.find(k => k.id === id)
  }
}

// 报告服务
export class MockReportService {
  async getReports() {
    await delay()
    return {
      list: mockReports,
      total: mockReports.length
    }
  }

  async getReportDetail(id: string) {
    await delay()
    return mockReports.find(r => r.id === id)
  }
}

// 导出服务实例
export const chatService = new MockChatService()
export const userService = new MockUserService()
export const dataService = new MockDataService()
export const knowledgeService = new MockKnowledgeService()
export const reportService = new MockReportService()
