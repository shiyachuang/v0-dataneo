'use client'

import React from 'react'
import { User, Bell, Shield, Palette } from 'lucide-react'

const settingSections = [
  {
    title: '账户设置',
    icon: User,
    description: '管理你的账户信息和偏好设置'
  },
  {
    title: '通知设置',
    icon: Bell,
    description: '配置通知和提醒选项'
  },
  {
    title: '安全与隐私',
    icon: Shield,
    description: '管理密码、权限和隐私设置'
  },
  {
    title: '外观设置',
    icon: Palette,
    description: '自定义界面主题和显示选项'
  },
]

export default function SettingsPage() {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-semibold">设置</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-3xl space-y-4">
          {settingSections.map((section, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-lg border p-6 hover:bg-accent cursor-pointer transition-colors"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                <section.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{section.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {section.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
