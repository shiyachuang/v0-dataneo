"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FieldInfoSheetProps {
  fieldInfo: any
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (updatedField: any) => void
}

export default function FieldInfoSheet({ fieldInfo, open, onOpenChange, onSave }: FieldInfoSheetProps) {
  const [alias, setAlias] = useState(fieldInfo?.alias || "")
  const [description, setDescription] = useState(fieldInfo?.description || "")
  const [type, setType] = useState(fieldInfo?.type || "string")

  const handleSave = () => {
    onSave({
      ...fieldInfo,
      alias,
      description,
      type,
    })
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>字段信息</SheetTitle>
          <SheetDescription>编辑字段的别名、类型和说明</SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>字段名</Label>
            <Input value={fieldInfo?.name || ""} disabled />
          </div>

          <div className="grid gap-2">
            <Label>字段别名</Label>
            <Input value={alias} onChange={(e) => setAlias(e.target.value)} placeholder="请输入字段别名" />
          </div>

          <div className="grid gap-2">
            <Label>字段类型</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="string">文本</SelectItem>
                <SelectItem value="number">数值</SelectItem>
                <SelectItem value="date">日期</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>字段说明</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="请输入字段说明"
              rows={4}
            />
          </div>

          <div className="grid gap-2">
            <Label>示例值</Label>
            <Input value={fieldInfo?.sampleValue ? JSON.parse(fieldInfo.sampleValue)[0] : ""} disabled />
          </div>
        </div>

        <SheetFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSave}>保存</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
