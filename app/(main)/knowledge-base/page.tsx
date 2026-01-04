'use client'

import React from 'react'
import { BookOpen, FolderOpen } from 'lucide-react'

const mockKnowledgeBases = [
  { id: 1, name: '产品知识库', documents: 45, updated: '2024-01-04' },
  { id: 2, name: '技术文档', documents: 128, updated: '2024-01-03' },
  { id: 3, name: '常见问题', documents: 67, updated: '2024-01-02' },
  { id: 4, name: '操作手册', documents: 32, updated: '2024-01-01' },
]

export default function KnowledgeBasePage() {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-semibold">知识库</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockKnowledgeBases.map((kb) => (
            <div
              key={kb.id}
              className="rounded-lg border p-6 hover:bg-accent cursor-pointer transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                  <FolderOpen className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{kb.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {kb.documents} 个文档
                  </p>
                  <p className="text-xs text-muted-foreground">
                    更新于 {kb.updated}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
