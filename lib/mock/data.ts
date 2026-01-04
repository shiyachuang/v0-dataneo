import { Chat, Workspace, User, Conversation, Message, DataSource, KnowledgeBase, Report } from '../types'
import { nanoid } from 'nanoid'

// Mock 用户数据
export const mockUser: User = {
  id: 'user-1',
  name: '张三',
  email: 'zhangsan@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  role: 'admin'
}

// Mock 聊天列表数据
export const mockChats: Chat[] = [
  {
    id: 'chat-1',
    name: '数据分析咨询',
    url: '/chat/chat-1',
    isActive: false,
    createdAt: '2024-01-04 10:30',
    updatedAt: '2024-01-04 14:20'
  },
  {
    id: 'chat-2',
    name: '产品功能讨论',
    url: '/chat/chat-2',
    isActive: false,
    createdAt: '2024-01-03 15:20',
    updatedAt: '2024-01-03 16:45'
  },
  {
    id: 'chat-3',
    name: '技术问题解答',
    url: '/chat/chat-3',
    isActive: false,
    createdAt: '2024-01-02 09:15',
    updatedAt: '2024-01-02 11:30'
  },
  {
    id: 'chat-4',
    name: '市场调研分析',
    url: '/chat/chat-4',
    isActive: false,
    createdAt: '2024-01-01 13:45',
    updatedAt: '2024-01-01 15:20'
  },
  {
    id: 'chat-5',
    name: '用户反馈整理',
    url: '/chat/chat-5',
    isActive: false,
    createdAt: '2023-12-30 16:30',
    updatedAt: '2023-12-30 17:15'
  }
]

// Mock 工作区数据
export const mockWorkspaces: Workspace[] = [
  {
    id: 'workspace-1',
    name: '产品开发',
    url: '/workspace/workspace-1',
    creatorId: 'user-1',
    isActive: false,
    createdAt: '2024-01-01',
    items: [
      {
        id: 'conv-1-1',
        name: '需求分析讨论',
        url: '/chat/workspace-1/conv-1-1',
        isActive: false,
        createdAt: '2024-01-04'
      },
      {
        id: 'conv-1-2',
        name: '技术方案评审',
        url: '/chat/workspace-1/conv-1-2',
        isActive: false,
        createdAt: '2024-01-03'
      }
    ]
  },
  {
    id: 'workspace-2',
    name: '数据分析',
    url: '/workspace/workspace-2',
    creatorId: 'user-1',
    isActive: false,
    createdAt: '2023-12-28',
    items: [
      {
        id: 'conv-2-1',
        name: '销售数据分析',
        url: '/chat/workspace-2/conv-2-1',
        isActive: false,
        createdAt: '2024-01-02'
      }
    ]
  },
  {
    id: 'workspace-3',
    name: '客户服务',
    url: '/workspace/workspace-3',
    creatorId: 'user-1',
    isActive: false,
    createdAt: '2023-12-25',
    items: []
  }
]

// Mock 消息数据
export const mockMessages: Record<string, Message[]> = {
  'chat-1': [
    {
      id: nanoid(),
      role: 'user',
      content: '你好，我想了解一下如何进行数据分析',
      timestamp: '2024-01-04 10:30:00'
    },
    {
      id: nanoid(),
      role: 'assistant',
      content: '你好！我很高兴帮助你了解数据分析。数据分析通常包括以下几个步骤：\n\n1. **数据收集**：从各种来源收集相关数据\n2. **数据清洗**：处理缺失值、异常值和重复数据\n3. **数据探索**：使用统计方法和可视化来理解数据\n4. **数据建模**：应用适当的分析方法或机器学习模型\n5. **结果解释**：将分析结果转化为有价值的洞察\n\n你想深入了解哪个方面呢？',
      timestamp: '2024-01-04 10:30:15'
    },
    {
      id: nanoid(),
      role: 'user',
      content: '我想了解数据可视化的最佳实践',
      timestamp: '2024-01-04 10:32:00'
    },
    {
      id: nanoid(),
      role: 'assistant',
      content: '数据可视化是数据分析中非常重要的一环。以下是一些最佳实践：\n\n**选择合适的图表类型**：\n- 趋势分析：折线图\n- 比较数据：柱状图\n- 占比关系：饼图或环形图\n- 分布情况：直方图或箱线图\n- 相关性：散点图\n\n**设计原则**：\n- 保持简洁，避免过度装饰\n- 使用一致的颜色方案\n- 确保标签清晰可读\n- 提供必要的上下文信息\n- 考虑色盲友好的配色\n\n**工具推荐**：\n- ECharts（我们正在使用）\n- D3.js\n- Chart.js\n- Tableau\n\n你有具体想要可视化的数据类型吗？',
      timestamp: '2024-01-04 10:32:30'
    }
  ],
  'chat-2': [
    {
      id: nanoid(),
      role: 'user',
      content: '我们的产品需要添加什么新功能？',
      timestamp: '2024-01-03 15:20:00'
    },
    {
      id: nanoid(),
      role: 'assistant',
      content: '基于用户反馈和市场趋势，我建议考虑以下功能：\n\n1. 实时协作功能\n2. 高级数据导出选项\n3. 自定义仪表板\n4. API 集成能力\n5. 移动端应用\n\n你想详细讨论哪个功能？',
      timestamp: '2024-01-03 15:21:00'
    }
  ]
}

// Mock 数据源
export const mockDataSources: DataSource[] = [
  { id: '1', name: '销售数据', type: 'CSV', size: '2.3 MB', updatedAt: '2024-01-04', status: 'active' },
  { id: '2', name: '客户信息', type: 'Excel', size: '5.1 MB', updatedAt: '2024-01-03', status: 'active' },
  { id: '3', name: '产品目录', type: 'JSON', size: '1.2 MB', updatedAt: '2024-01-02', status: 'active' },
  { id: '4', name: '订单记录', type: 'CSV', size: '8.5 MB', updatedAt: '2024-01-01', status: 'inactive' },
]

// Mock 知识库
export const mockKnowledgeBases: KnowledgeBase[] = [
  { id: '1', name: '产品知识库', documents: 45, updatedAt: '2024-01-04', description: '产品相关文档和资料' },
  { id: '2', name: '技术文档', documents: 128, updatedAt: '2024-01-03', description: '技术规范和API文档' },
  { id: '3', name: '常见问题', documents: 67, updatedAt: '2024-01-02', description: 'FAQ和问题解答' },
  { id: '4', name: '操作手册', documents: 32, updatedAt: '2024-01-01', description: '用户操作指南' },
]

// Mock 报告
export const mockReports: Report[] = [
  { id: '1', title: '月度销售报告', date: '2024-01-04', status: '已完成' },
  { id: '2', title: '季度业绩分析', date: '2024-01-03', status: '进行中' },
  { id: '3', title: '年度总结报告', date: '2024-01-02', status: '已完成' },
  { id: '4', title: '市场调研报告', date: '2024-01-01', status: '草稿' },
]
