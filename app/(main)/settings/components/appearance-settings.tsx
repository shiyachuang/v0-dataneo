'use client'

import * as React from 'react'
import { IconSun, IconMoon } from '@tabler/icons-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">外观</h2>
        <p className="text-sm text-muted-foreground">自定义界面主题和显示选项</p>
      </div>

      <div className="space-y-4">
        {/* 主题模式切换 */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">主题模式</Label>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme('light')}
              className={cn(
                'flex items-center gap-2',
                theme === 'light' && 'border-2 border-primary'
              )}
            >
              <IconSun className="h-4 w-4" />
              浅色
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme('dark')}
              className={cn(
                'flex items-center gap-2',
                theme === 'dark' && 'border-2 border-primary'
              )}
            >
              <IconMoon className="h-4 w-4" />
              深色
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme('system')}
              className={cn(
                'flex items-center gap-2',
                theme === 'system' && 'border-2 border-primary'
              )}
            >
              跟随系统
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            选择浅色或深色主题，或跟随系统设置
          </p>
        </div>
      </div>
    </div>
  )
}
