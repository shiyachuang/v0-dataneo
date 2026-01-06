'use client'

import * as React from 'react'
import { IconSun, IconMoon } from '@tabler/icons-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

const themeColors = [
  { name: 'green', label: '绿色', color: 'hsl(142.1 76.2% 36.3%)' },
  { name: 'blue', label: '蓝色', color: 'hsl(221.2 83.2% 53.3%)' },
  { name: 'violet', label: '紫色', color: 'hsl(262.1 83.3% 57.8%)' },
  { name: 'orange', label: '橙色', color: 'hsl(24.6 95% 53.1%)' },
  { name: 'red', label: '红色', color: 'hsl(0 72.2% 50.6%)' },
  { name: 'rose', label: '玫红', color: 'hsl(346.8 77.2% 49.8%)' },
]

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [selectedColor, setSelectedColor] = React.useState('green')

  React.useEffect(() => {
    setMounted(true)
    const savedColor = localStorage.getItem('theme-color') || 'green'
    setSelectedColor(savedColor)
  }, [])

  const handleColorChange = (colorName: string) => {
    setSelectedColor(colorName)
    localStorage.setItem('theme-color', colorName)
    // 实际应用主题颜色需要更新 CSS 变量
    document.documentElement.classList.forEach((cls) => {
      if (cls.startsWith('theme-')) {
        document.documentElement.classList.remove(cls)
      }
    })
    document.documentElement.classList.add(`theme-${colorName}`)
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
