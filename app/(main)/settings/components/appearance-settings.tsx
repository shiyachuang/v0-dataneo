'use client'

import * as React from 'react'
import { IconSun, IconMoon } from '@tabler/icons-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

const themeColors = [
  {
    name: 'green',
    label: '绿色',
    color: 'hsl(142.1 76.2% 36.3%)',
    primaryLight: '142.1 76.2% 36.3%',
    primaryDark: '142.1 70.6% 45.3%'
  },
  {
    name: 'blue',
    label: '蓝色',
    color: 'hsl(221.2 83.2% 53.3%)',
    primaryLight: '221.2 83.2% 53.3%',
    primaryDark: '217.2 91.2% 59.8%'
  },
  {
    name: 'violet',
    label: '紫色',
    color: 'hsl(262.1 83.3% 57.8%)',
    primaryLight: '262.1 83.3% 57.8%',
    primaryDark: '263.4 70% 50.4%'
  },
  {
    name: 'orange',
    label: '橙色',
    color: 'hsl(24.6 95% 53.1%)',
    primaryLight: '24.6 95% 53.1%',
    primaryDark: '20.5 90.2% 48.2%'
  },
  {
    name: 'red',
    label: '红色',
    color: 'hsl(0 72.2% 50.6%)',
    primaryLight: '0 72.2% 50.6%',
    primaryDark: '0 72.2% 50.6%'
  },
  {
    name: 'rose',
    label: '玫红',
    color: 'hsl(346.8 77.2% 49.8%)',
    primaryLight: '346.8 77.2% 49.8%',
    primaryDark: '346.8 77.2% 49.8%'
  },
]

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [selectedColor, setSelectedColor] = React.useState('green')

  React.useEffect(() => {
    setMounted(true)
    const savedColor = localStorage.getItem('theme-color') || 'green'
    setSelectedColor(savedColor)

    // 应用保存的颜色
    const selectedTheme = themeColors.find(c => c.name === savedColor)
    if (selectedTheme) {
      const isDark = document.documentElement.classList.contains('dark')
      const primaryColor = isDark ? selectedTheme.primaryDark : selectedTheme.primaryLight
      document.documentElement.style.setProperty('--primary', primaryColor)
      if (isDark) {
        document.documentElement.style.setProperty('--sidebar-primary', primaryColor)
      }
    }
  }, [])

  // 监听主题模式变化，同步更新颜色
  React.useEffect(() => {
    if (!mounted) return

    const observer = new MutationObserver(() => {
      const selectedTheme = themeColors.find(c => c.name === selectedColor)
      if (selectedTheme) {
        const isDark = document.documentElement.classList.contains('dark')
        const primaryColor = isDark ? selectedTheme.primaryDark : selectedTheme.primaryLight
        document.documentElement.style.setProperty('--primary', primaryColor)
        if (isDark) {
          document.documentElement.style.setProperty('--sidebar-primary', primaryColor)
        }
      }
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [mounted, selectedColor])

  const handleColorChange = (colorName: string) => {
    setSelectedColor(colorName)
    localStorage.setItem('theme-color', colorName)

    // 找到选中的颜色配置
    const selectedTheme = themeColors.find(c => c.name === colorName)
    if (!selectedTheme) return

    // 获取当前主题模式（light或dark）
    const isDark = document.documentElement.classList.contains('dark')
    const primaryColor = isDark ? selectedTheme.primaryDark : selectedTheme.primaryLight

    // 动态更新CSS变量
    document.documentElement.style.setProperty('--primary', primaryColor)

    // 同时更新sidebar的primary颜色
    if (isDark) {
      document.documentElement.style.setProperty('--sidebar-primary', primaryColor)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">外观</h2>
        <p className="text-sm text-muted-foreground">自定义界面主题和显示选项</p>
      </div>

      <div className="space-y-6">
        {/* 主题颜色选择 */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">主题颜色</Label>
          <div className="grid grid-cols-3 gap-2">
            {themeColors.map((color) => (
              <Button
                key={color.name}
                variant="outline"
                size="sm"
                onClick={() => handleColorChange(color.name)}
                className={cn(
                  'justify-start',
                  selectedColor === color.name && 'border-2 border-primary'
                )}
              >
                <span
                  className="mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: color.color }}
                >
                  {selectedColor === color.name && (
                    <Check className="h-4 w-4 text-white" />
                  )}
                </span>
                {color.label}
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            选择适合您的主题颜色
          </p>
        </div>

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
