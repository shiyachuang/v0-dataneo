'use client'

import React from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ChatPage() {
  const [messages, setMessages] = React.useState([
    { role: 'assistant', content: '你好！我是 DataNeo AI 助手，有什么可以帮助你的吗？' }
  ])
  const [input, setInput] = React.useState('')

  const handleSend = () => {
    if (!input.trim()) return

    setMessages([...messages, { role: 'user', content: input }])
    setInput('')

    // 模拟 AI 回复
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '这是一个模拟回复。实际应用中，这里会连接到真实的 AI 接口。'
      }])
    }, 1000)
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-semibold">AI 聊天</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="输入消息..."
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <Button onClick={handleSend} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
