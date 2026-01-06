"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface UpdateModeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData: any
  onConfirm: (config: any, text: string) => void
}

const weekDays = [
  { value: "1", label: "星期一" },
  { value: "2", label: "星期二" },
  { value: "3", label: "星期三" },
  { value: "4", label: "星期四" },
  { value: "5", label: "星期五" },
  { value: "6", label: "星期六" },
  { value: "7", label: "星期日" },
]

const monthDays = Array.from({ length: 31 }, (_, i) => ({
  value: String(i + 1),
  label: `${i + 1}日`,
}))

export default function UpdateModeDialog({ open, onOpenChange, initialData, onConfirm }: UpdateModeDialogProps) {
  const [mode, setMode] = useState(initialData.mode?.toString() || "1")
  const [frequency, setFrequency] = useState(initialData.frequency || "days")
  const [updateTime, setUpdateTime] = useState(initialData.updateTime || "")
  const [week, setWeek] = useState(initialData.week?.toString() || "")
  const [dayOfMonth, setDayOfMonth] = useState(initialData.dayOfMonth?.toString() || "")

  const weekMap: Record<string, string> = {
    "1": "一",
    "2": "二",
    "3": "三",
    "4": "四",
    "5": "五",
    "6": "六",
    "7": "日",
  }

  const handleSave = () => {
    const config = {
      mode: Number.parseInt(mode),
      updateTime,
      frequency,
      week: Number.parseInt(week),
      dayOfMonth: Number.parseInt(dayOfMonth),
    }

    const text = `${mode === "1" ? "全量读取全量替换" : "增量读取增量追加"} ${
      frequency === "days" ? "每天" : frequency === "weeks" ? `每周${weekMap[week]}` : `每月${dayOfMonth}日`
    } ${updateTime}`

    onConfirm(config, text)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>更新方式设置</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* 更新方式 */}
          <div className="grid gap-2">
            <Label>更新方式</Label>
            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger>
                <SelectValue placeholder="选择更新方式" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">全量读取全量替换</SelectItem>
                <SelectItem value="2">增量读取增量追加</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 更新周期 */}
          <div className="grid gap-2">
            <Label>更新周期</Label>
            <Select
              value={frequency}
              onValueChange={(val) => {
                setFrequency(val)
                setUpdateTime("")
                setWeek("")
                setDayOfMonth("")
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="选择更新周期" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="days">每天</SelectItem>
                <SelectItem value="weeks">每周</SelectItem>
                <SelectItem value="months">每月</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 星期选择 */}
          {frequency === "weeks" && (
            <div className="grid gap-2">
              <Select value={week} onValueChange={setWeek}>
                <SelectTrigger>
                  <SelectValue placeholder="选择星期" />
                </SelectTrigger>
                <SelectContent>
                  {weekDays.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* 日期选择 */}
          {frequency === "months" && (
            <div className="grid gap-2">
              <Select value={dayOfMonth} onValueChange={setDayOfMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="选择日期" />
                </SelectTrigger>
                <SelectContent>
                  {monthDays.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* 更新时间 */}
          <div className="grid gap-2">
            <Label>更新时间</Label>
            <Input value={updateTime} onChange={(e) => setUpdateTime(e.target.value)} placeholder="00:00" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSave}>确认</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
