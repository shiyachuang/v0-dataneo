'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { AppearanceSettings } from './components/appearance-settings'
import { AboutSettings } from './components/about-settings'

const settingTabs = [
  {
    id: 'appearance',
    title: '外观',
  },
  {
    id: 'about',
    title: '关于',
  },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState('appearance')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'appearance':
        return <AppearanceSettings />
      case 'about':
        return <AboutSettings />
      default:
        return <AppearanceSettings />
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-semibold">设置</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full">
          {/* Sidebar */}
          <aside className="w-[240px] border-r p-4">
            <nav className="flex flex-col space-y-1">
              {settingTabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  className={cn(
                    activeTab === tab.id
                      ? 'bg-muted hover:bg-muted font-semibold'
                      : 'hover:bg-muted font-normal',
                    'justify-start'
                  )}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.title}
                </Button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-[800px]">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
