'use client'

import React from 'react'
import { Database, Search } from 'lucide-react'

const mockData = [
  { id: 1, name: '销售数据', type: 'CSV', size: '2.3 MB', updated: '2024-01-04' },
  { id: 2, name: '客户信息', type: 'Excel', size: '5.1 MB', updated: '2024-01-03' },
  { id: 3, name: '产品目录', type: 'JSON', size: '1.2 MB', updated: '2024-01-02' },
  { id: 4, name: '订单记录', type: 'CSV', size: '8.5 MB', updated: '2024-01-01' },
]

export default function DataManagePage() {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-6">
        <h1 className="text-xl font-semibold">数据管理</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索数据..."
              className="pl-8 pr-3 py-1.5 rounded-md border border-input bg-background text-sm w-64"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid gap-4">
          {mockData.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                  <Database className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.type} · {item.size}
                  </p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                更新于 {item.updated}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
