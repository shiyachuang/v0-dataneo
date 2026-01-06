"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const cellClassName = "cursor-pointer flex-1 min-w-[100px] max-w-[30%] flex items-center"
const tableHeadClassName = "flex-1 min-w-[100px] max-w-[30%] whitespace-nowrap flex items-center"

interface FieldsTabProps {
  fields: any[]
  onFieldClick: (field: any) => void
  enableTooltip?: boolean
  onInsertText?: (text: string) => void
  isGAData?: boolean
  isShared?: boolean
}

export default function FieldsTab({
  fields,
  onFieldClick,
  enableTooltip = false,
  onInsertText,
  isGAData = false,
  isShared = false,
}: FieldsTabProps) {
  const [search, setSearch] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  // 过滤字段
  const filteredFields = fields.filter((item) => item.name.includes(search) || item.alias?.includes(search))

  // 渲染单元格内容
  const renderCellContent = (content: string) => {
    if (enableTooltip && onInsertText) {
      return (
        <span
          onClick={(e) => {
            e.stopPropagation()
            onInsertText(content)
          }}
          className="hover:text-primary cursor-pointer"
        >
          {content}
        </span>
      )
    }
    return content
  }

  // 字段类型映射
  const getFieldType = (type: string) => {
    const typeMap: Record<string, string> = {
      number: "数值",
      string: "文本",
      date: "日期",
    }
    return typeMap[type] || type
  }

  const handleDownload = () => {
    // 模拟下载
    console.log("Download fields metadata")
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log("Upload file:", file)
    }
  }

  return (
    <>
      <div className="flex flex-wrap justify-between items-center">
        {/* 搜索框 */}
        <div className="relative my-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索字段..."
            className="pl-8 w-96 max-w-[80vw]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {!enableTooltip && !isGAData && (
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="group font-normal bg-transparent">
                  批量更新
                  <ChevronDown className={cn("ml-2 h-4 w-4 transition-transform duration-200")} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="end" side="bottom">
                <DropdownMenuItem onClick={handleDownload} className="p-3 cursor-pointer">
                  <div>
                    <div>下载</div>
                    <div className="text-xs text-muted-foreground mt-1">下载字段元数据Excel文件</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => !isShared && fileRef.current?.click()}
                  className="p-3 cursor-pointer"
                  disabled={isShared}
                >
                  <div>
                    <div>上传</div>
                    <div className="text-xs text-muted-foreground mt-1">上传修改后的Excel文件</div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <input type="file" ref={fileRef} style={{ display: "none" }} onChange={handleUpload} accept=".xlsx" />
          </div>
        )}
      </div>

      {/* 字段表格 */}
      <div className={cn("relative max-w-full", enableTooltip ? "h-[calc(100vh-468px)]" : "h-[calc(100vh-268px)]")}>
        <div className="overflow-x-auto rounded-md border h-full">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-background">
              <TableRow className="flex bg-muted/50">
                {isGAData && (
                  <>
                    <TableHead className={tableHeadClassName}>分类名称</TableHead>
                    <TableHead className={tableHeadClassName}>子分类名称</TableHead>
                  </>
                )}
                <TableHead className={tableHeadClassName}>字段名</TableHead>
                <TableHead className={tableHeadClassName}>字段别名</TableHead>
                <TableHead className={tableHeadClassName}>字段类型</TableHead>
                <TableHead className={tableHeadClassName}>字段说明</TableHead>
                <TableHead className={tableHeadClassName}>示例值</TableHead>
                {!enableTooltip && !isGAData && (
                  <TableHead className="w-[100px] pl-5 flex items-center">操作</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFields.map((item, index) => (
                <TableRow key={index} className="flex" onClick={() => !enableTooltip && onFieldClick(item)}>
                  {isGAData && (
                    <>
                      <TableCell className={cn(cellClassName, item.enable === 2 && "text-muted-foreground")}>
                        {renderCellContent(item.className)}
                      </TableCell>
                      <TableCell className={cn(cellClassName, item.enable === 2 && "text-muted-foreground")}>
                        {renderCellContent(item.subClassName)}
                      </TableCell>
                    </>
                  )}
                  <TableCell className={cn(cellClassName, item.enable === 2 && "text-muted-foreground")}>
                    {renderCellContent(item.name)}
                  </TableCell>
                  <TableCell className={cn(cellClassName, item.enable === 2 && "text-muted-foreground")}>
                    {renderCellContent(item.alias)}
                  </TableCell>
                  <TableCell className={cn(cellClassName, item.enable === 2 && "text-muted-foreground")}>
                    {getFieldType(item.type)}
                  </TableCell>
                  <TableCell className={cn(cellClassName, item.enable === 2 && "text-muted-foreground")}>
                    {renderCellContent(item.description)}
                  </TableCell>
                  <TableCell className={cn(cellClassName, item.enable === 2 && "text-muted-foreground")}>
                    {item.sampleValue ? JSON.parse(item.sampleValue || "[]")[0] : ""}
                  </TableCell>
                  {!enableTooltip && !isGAData && (
                    <TableCell className="w-[100px] flex items-center">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          onFieldClick(item)
                        }}
                        variant="ghost"
                        size="sm"
                        className={cn("text-primary", item.enable === 2 && "text-primary/50")}
                        disabled={isShared}
                      >
                        编辑
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
