'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ChevronDown,
  EllipsisVertical,
  Search,
  FileText,
  Trash2,
  FolderIcon,
} from 'lucide-react'
import { IconFolderPlus, IconFileArrowRight } from '@tabler/icons-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

// Mock 数据
const mockReports = [
  {
    id: '1',
    name: '月度销售分析报告',
    type: 'report',
    createTime: '2024-01-04 15:30:00',
    updateTime: '2024-01-04 16:20:00',
  },
  {
    id: '2',
    name: '财务季度报表',
    type: 'folder',
    createTime: '2024-01-03 10:00:00',
    updateTime: '2024-01-03 10:00:00',
  },
  {
    id: '3',
    name: '用户行为分析',
    type: 'report',
    createTime: '2024-01-02 14:15:00',
    updateTime: '2024-01-03 09:30:00',
  },
  {
    id: '4',
    name: '年度业绩总结',
    type: 'report',
    createTime: '2024-01-01 09:00:00',
    updateTime: '2024-01-02 11:45:00',
  },
  {
    id: '5',
    name: '市场调研',
    type: 'folder',
    createTime: '2023-12-28 16:20:00',
    updateTime: '2023-12-28 16:20:00',
  },
  {
    id: '6',
    name: '产品数据分析',
    type: 'report',
    createTime: '2023-12-27 13:10:00',
    updateTime: '2023-12-28 10:30:00',
  },
]

const ReportIcon = ({ type }: { type: string }) => {
  if (type === 'folder') {
    return (
      <div className="flex mb-[40px] mt-[15%] items-center justify-center m-auto w-[46px] h-[46px] rounded-full bg-[rgba(223,170,87,0.08)]">
        <FolderIcon className="w-[22px] h-[22px] text-amber-600" />
      </div>
    )
  }
  return (
    <div className="flex mb-[40px] mt-[15%] items-center justify-center m-auto w-[46px] h-[46px] rounded-full bg-[rgba(52,126,170,0.08)]">
      <FileText className="w-[22px] h-[22px] text-blue-600" />
    </div>
  )
}

export default function ReportPage() {
  const router = useRouter()
  const [searchWord, setSearchWord] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [reports, setReports] = useState(mockReports)
  const [showDialog, setShowDialog] = useState(false)
  const [dialogType, setDialogType] = useState<'report' | 'folder'>('report')
  const [reportName, setReportName] = useState('')

  const filteredReports = reports.filter((report) =>
    report.name.toLowerCase().includes(searchWord.toLowerCase())
  )

  const handleCheckboxChange = (checked: boolean, id: string) => {
    if (checked) {
      setSelectedIds([...selectedIds, id])
    } else {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id))
    }
  }

  const handleDelete = (id: string) => {
    setReports(reports.filter((report) => report.id !== id))
    setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id))
  }

  const handleBatchDelete = () => {
    setReports(reports.filter((report) => !selectedIds.includes(report.id)))
    setSelectedIds([])
  }

  const handleCreateReport = (type: 'report' | 'folder') => {
    setDialogType(type)
    setReportName('')
    setShowDialog(true)
  }

  const handleSave = () => {
    if (!reportName.trim()) return

    const newReport = {
      id: String(Date.now()),
      name: reportName,
      type: dialogType,
      createTime: new Date().toLocaleString('zh-CN'),
      updateTime: new Date().toLocaleString('zh-CN'),
    }
    setReports([newReport, ...reports])
    setShowDialog(false)
    setReportName('')
  }

  return (
    <div className="flex flex-col h-full p-6">
      <h1 className="text-2xl font-semibold mb-8">报告</h1>

      <div className="flex flex-wrap justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索报告..."
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              className="pl-8 w-96 max-w-[80vw]"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Button
            disabled={selectedIds.length === 0}
            variant="outline"
            title="移动"
            size="icon"
            onClick={() => {
              console.log('移动选中项', selectedIds)
            }}
          >
            <IconFileArrowRight className="h-4 w-4" />
          </Button>
          <Button
            disabled={selectedIds.length === 0}
            variant="outline"
            title="删除"
            size="icon"
            onClick={handleBatchDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="group">
                新建
                <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end" side="bottom">
              <DropdownMenuItem
                onClick={() => handleCreateReport('report')}
                className="p-3 cursor-pointer hover:bg-accent hover:text-accent-foreground"
              >
                <div>新建报告</div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleCreateReport('folder')}
                className="p-3 cursor-pointer hover:bg-accent hover:text-accent-foreground"
              >
                <div>新建文件夹</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* 内容区 - 卡片布局 */}
      <div className="h-[calc(100vh-200px)] overflow-auto">
        {filteredReports.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>暂无报告</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className={`group relative p-6 px-[20px] border rounded-[6px] hover:bg-[#F4F4F5]
                  dark:hover:bg-[#303033] transition-colors cursor-pointer bg-white dark:bg-[#1D1D20]
                  h-[212px] border-[#E4E4E7] dark:border-[#27272A]`}
                style={{
                  background: selectedIds.includes(report.id)
                    ? 'var(--muted)'
                    : '',
                }}
                onClick={() => {
                  if (report.type === 'report') {
                    router.push(`/report/${report.id}`)
                  }
                }}
              >
                <div className="absolute left-2 top-2">
                  <Checkbox
                    checked={selectedIds.includes(report.id)}
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    onCheckedChange={(checked) => {
                      handleCheckboxChange(!!checked, report.id)
                    }}
                    className="opacity-0 group-hover:opacity-100 data-[state=checked]:opacity-100 transition-opacity"
                  />
                </div>

                <img
                  className="absolute right-0 bottom-0 w-[45%]"
                  src={
                    report.type === 'folder'
                      ? '/placeholder-folder.png'
                      : '/placeholder-doc.png'
                  }
                  alt=""
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />

                <ReportIcon type={report.type} />

                <div
                  className={`${
                    selectedIds.includes(report.id) ? 'opacity-50' : ''
                  } text-[16px] text-center font-normal break-words line-clamp-3`}
                  title={report.name}
                >
                  {report.name}
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute w-[24px] h-[24px] top-2 right-2 hover:bg-[#E9E9ED] dark:hover:bg-[#979797] opacity-0 group-hover:opacity-100 transition-opacity data-[state=open]:opacity-100"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <EllipsisVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        console.log('重命名', report.id)
                      }}
                      className="cursor-pointer"
                    >
                      重命名
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(report.id)
                      }}
                      className="cursor-pointer text-red-600"
                    >
                      删除
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        )}
      </div>

      {filteredReports.length > 0 && selectedIds.length > 0 && (
        <div className="mt-4 text-sm text-muted-foreground">
          已选择 {selectedIds.length} 项
        </div>
      )}

      {/* 创建对话框 */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新建{dialogType === 'report' ? '报告' : '文件夹'}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="name" className="mb-2 block">
              {dialogType === 'report' ? '报告' : '文件夹'}名称
            </Label>
            <Input
              id="name"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              placeholder={
                dialogType === 'report' ? '请输入报告标题' : '请输入文件夹名称'
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSave()
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              取消
            </Button>
            <Button onClick={handleSave} disabled={!reportName.trim()}>
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
