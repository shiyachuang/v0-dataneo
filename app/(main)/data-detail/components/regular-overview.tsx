"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"

interface RegularOverviewProps {
  tableData: any
  onTableDataChange: (updates: any) => void
  onSave: () => void
  onOpenUpdateMode: () => void
  getResourceType: (type: string) => string
}

export default function RegularOverview({
  tableData,
  onTableDataChange,
  onSave,
  onOpenUpdateMode,
  getResourceType,
}: RegularOverviewProps) {
  // 获取更新时间
  const getUpdateTime = () => {
    if (tableData.dataMode === "local") {
      return tableData.synBeginTime || "—"
    }
    return tableData.updateTime || "—"
  }

  // 获取执行状态
  const getExecStatus = () => {
    switch (tableData.status) {
      case "finish":
      case "normal":
        return "已完成"
      case "running":
        return "运行中"
      case "failed":
        return "失败"
      default:
        return "初始化"
    }
  }

  return (
    <>
      {/* 表重要信息 */}
      <div className="grid gap-2">
        <label className="text-sm font-medium">表重要信息</label>
        <div className="py-2 px-4 border text-sm flex items-center rounded-md justify-between bg-gradient-to-b from-background to-muted/30">
          <div className="flex gap-4">
            <span>{tableData.dataRow || 0} 行</span>
            <span>{tableData.itemCount || 0} 列</span>
          </div>
          <div className="flex items-center flex-wrap gap-2">
            <span>{getResourceType(tableData.subType || tableData.type)}</span>
            {tableData.dataMode === "local" && tableData.type !== "file" && (
              <>
                <span className="ml-4">执行状态：{getExecStatus()}</span>
              </>
            )}
            <span className="ml-4">最后更新时间：{getUpdateTime()}</span>
            {tableData.dataMode === "local" && tableData.type !== "file" && (
              <div className="flex items-center text-sm ml-4">
                <div className="relative">
                  <Input
                    value={tableData.updateModeText || ""}
                    disabled
                    placeholder="请设置"
                    className="bg-background w-[245px] pr-10"
                  />
                  <Button
                    onClick={onOpenUpdateMode}
                    variant="outline"
                    size="icon"
                    className="absolute top-1/2 right-1 -translate-y-1/2 h-7 w-7 bg-transparent"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 表名和别名 */}
      <div className="flex items-center gap-4">
        <div className="grid gap-2 flex-1">
          <label className="text-sm font-medium">表名</label>
          <Input
            defaultValue={tableData.name || ""}
            onChange={(e) => onTableDataChange({ name: e.target.value })}
            disabled={tableData.type !== "file"}
          />
        </div>

        <div className="grid gap-2 flex-1">
          <label className="text-sm font-medium">表别名</label>
          <Input
            value={tableData.alias || ""}
            onChange={(e) => onTableDataChange({ alias: e.target.value })}
            placeholder="请输入别名"
          />
        </div>
      </div>

      {/* 源数据库名和源表名 */}
      <div className="flex items-center gap-4">
        {tableData.type !== "file" && (
          <div className="grid gap-2 flex-1">
            <label className="text-sm font-medium">源数据库名</label>
            <Input defaultValue={tableData.connectName || ""} disabled />
          </div>
        )}
        {tableData.type !== "file" && tableData.dataMode === "local" && (
          <div className="grid gap-2 flex-1">
            <label className="text-sm font-medium">源表名</label>
            <Input
              defaultValue={tableData.sourceName || ""}
              onChange={(e) => onTableDataChange({ sourceName: e.target.value })}
              disabled
            />
          </div>
        )}
      </div>

      {/* 表说明 */}
      <div className="grid gap-2">
        <label className="text-sm font-medium">表说明</label>
        <Textarea
          value={tableData.description || ""}
          rows={4}
          onChange={(e) => onTableDataChange({ description: e.target.value })}
        />
        <p className="text-xs text-muted-foreground">添加表说明可以帮助AI更好地理解数据</p>
      </div>

      {/* 保存按钮 */}
      <Button onClick={onSave}>保存</Button>
    </>
  )
}
