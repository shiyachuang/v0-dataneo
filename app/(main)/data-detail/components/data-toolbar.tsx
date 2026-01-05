"use client"

import { Button } from "@/components/ui/button"

interface DataToolbarProps {
  updateTime: string | null
  loading: boolean
  onRefresh: () => void
  onOpenFieldChange: () => void
  showRefresh?: boolean
  showFieldChange?: boolean
}

export default function DataToolbar({
  updateTime,
  loading,
  onRefresh,
  onOpenFieldChange,
  showRefresh = true,
  showFieldChange = true,
}: DataToolbarProps) {
  return (
    <div className="flex justify-between items-center my-4">
      <div className="text-sm text-muted-foreground">
        {updateTime && <span>数据更新时间：{new Date(updateTime).toLocaleString("zh-CN")}</span>}
      </div>
      <div className="flex gap-2">
        {showRefresh && (
          <Button variant="outline" onClick={onRefresh} disabled={loading}>
            刷新数据
          </Button>
        )}
        {showFieldChange && (
          <Button variant="outline" onClick={onOpenFieldChange}>
            更改显示字段
          </Button>
        )}
      </div>
    </div>
  )
}
