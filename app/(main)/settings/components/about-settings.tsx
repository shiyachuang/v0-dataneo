'use client'

import * as React from 'react'
import { Label } from '@/components/ui/label'

export function AboutSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">关于</h2>
        <p className="text-sm text-muted-foreground">应用信息和版本详情</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>应用名称</Label>
          <p className="text-sm">DataNeo AI</p>
        </div>

        <div className="space-y-2">
          <Label>版本</Label>
          <p className="text-sm">1.0.0</p>
        </div>

        <div className="space-y-2">
          <Label>描述</Label>
          <p className="text-sm text-muted-foreground">
            DataNeo AI 是一个智能数据分析和对话平台
          </p>
        </div>
      </div>
    </div>
  )
}
