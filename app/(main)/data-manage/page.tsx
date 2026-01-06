'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  MoreHorizontal,
  Search,
  Info,
  Trash2,
  Database,
  FileSpreadsheet,
  Folder as FolderIcon,
} from 'lucide-react'
import { IconFolderPlus, IconFileArrowRight } from '@tabler/icons-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

// Mock 数据
const mockData = [
  {
    id: '1',
    name: '销售数据表',
    alias: 'sales_data',
    itemCount: 25,
    type: 'mysql',
    showType: 'MySQL',
    dataMode: 'direct',
    updateTime: '2024-01-04 15:30:00',
    status: 'normal',
  },
  {
    id: '2',
    name: '用户信息',
    alias: 'user_info',
    itemCount: 18,
    type: 'file',
    showType: 'Excel',
    dataMode: 'local',
    updateTime: '2024-01-03 10:20:00',
    status: 'normal',
  },
  {
    id: '3',
    name: '财务报表',
    alias: '',
    itemCount: 0,
    type: 'folder',
    showType: '文件夹',
    dataMode: '',
    updateTime: '2024-01-02 14:15:00',
    status: 'normal',
  },
  {
    id: '4',
    name: '客户数据库',
    alias: 'customer_db',
    itemCount: 42,
    type: 'postgres',
    showType: 'PostgreSQL',
    dataMode: 'direct',
    updateTime: '',
    status: 'db_conn_fail',
  },
  {
    id: '5',
    name: 'GA统计数据',
    alias: 'ga_analytics',
    itemCount: 15,
    type: 'ga',
    showType: 'Google Analytics',
    dataMode: 'api',
    updateTime: '2024-01-01 09:00:00',
    status: 'normal',
  },
]

const FileIconComponent = ({ type }: { type: string }) => {
  if (type === 'folder') {
    return <FolderIcon className="h-5 w-5 text-amber-500" />
  }
  if (type === 'file') {
    return <FileSpreadsheet className="h-5 w-5 text-green-600" />
  }
  return <Database className="h-5 w-5 text-blue-600" />
}

export default function DataManagePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [data, setData] = useState(mockData)

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const hasScroll = filteredData.length * 48 > 600

  const renderCellContent = (row: typeof mockData[0]) => {
    if (row.status === 'db_conn_fail') {
      return (
        <div className="flex items-center cursor-pointer gap-2 text-red-600 dark:text-red-400">
          <span>连接失败</span>
          <Info className="h-4 w-4" />
        </div>
      )
    } else if (row.status === 'not_exist') {
      return (
        <div className="flex items-center cursor-pointer gap-2 text-red-600 dark:text-red-400">
          <span>源表不存在</span>
          <Info className="h-4 w-4" />
        </div>
      )
    } else if (row.updateTime) {
      if (row.type === 'file' || row.type === 'folder') {
        return row.updateTime
      }
      return <span className="w-[150px] text-center">—</span>
    }
    return ''
  }

  const handleDelete = (id: string) => {
    setData(data.filter((item) => item.id !== id))
    setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id))
  }

  const handleBatchDelete = () => {
    setData(data.filter((item) => !selectedIds.includes(item.id)))
    setSelectedIds([])
  }

  return (
    <div className="flex h-full flex-col p-6">
      <h1 className="text-2xl font-semibold mb-8">数据管理</h1>

      <div className="flex flex-wrap justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索数据..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-96 max-w-[80vw]"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Button
            variant="outline"
            size="icon"
            disabled={selectedIds.length === 0}
            title="移动"
            onClick={() => {
              console.log('移动选中项', selectedIds)
            }}
          >
            <IconFileArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            disabled={selectedIds.length === 0}
            title="删除"
            onClick={handleBatchDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            title="新建文件夹"
            onClick={() => {
              console.log('新建文件夹')
            }}
          >
            <IconFolderPlus className="h-4 w-4" />
          </Button>
          <Button
            variant="default"
            onClick={() => {
              console.log('添加数据')
            }}
          >
            添加数据
          </Button>
        </div>
      </div>

      <div className="h-[calc(100vh-254px)] max-w-[90vw] relative">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow
                className={cn('flex bg-muted/50', hasScroll ? 'pr-2' : '')}
              >
                <TableHead className="min-w-[48px] flex items-center">
                  <Checkbox
                    className={cn(
                      filteredData.length > 0 ? 'visible' : 'hidden'
                    )}
                    checked={
                      filteredData.length > 0 &&
                      selectedIds.length === filteredData.length
                    }
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedIds(filteredData.map((item) => item.id))
                      } else {
                        setSelectedIds([])
                      }
                    }}
                  />
                </TableHead>
                <TableHead className="flex-1 min-w-[100px] max-w-[30%] flex items-center">
                  名称
                </TableHead>
                <TableHead className="flex-1 min-w-[100px] max-w-[30%] flex items-center">
                  别名
                </TableHead>
                <TableHead className="w-[100px] flex items-center">
                  字段数
                </TableHead>
                <TableHead className="w-[150px] flex items-center">
                  类型
                </TableHead>
                <TableHead className="w-[200px] flex items-center">
                  数据更新时间
                </TableHead>
                <TableHead className="w-[100px] flex items-center">
                  操作
                </TableHead>
              </TableRow>
            </TableHeader>

            {filteredData.length > 0 ? (
              <TableBody
                className="block overflow-y-auto overflow-x-hidden"
                style={{ height: 'calc(100vh - 298px)' }}
              >
                {filteredData.map((row) => (
                  <TableRow
                    key={row.id}
                    className={cn(
                      'flex',
                      selectedIds.includes(row.id) ? 'bg-muted/50' : ''
                    )}
                  >
                    <TableCell className="min-w-[48px] flex items-center">
                      <Checkbox
                        checked={selectedIds.includes(row.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedIds([...selectedIds, row.id])
                          } else {
                            setSelectedIds(
                              selectedIds.filter((id) => id !== row.id)
                            )
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell
                      className="flex-1 min-w-[100px] max-w-[30%] flex items-center cursor-pointer hover:text-primary"
                      onClick={() => {
                        if (row.type !== 'folder') {
                          router.push(`/data-manage/${row.id}`)
                        }
                      }}
                    >
                      <FileIconComponent type={row.type} />
                      <span className="ml-2">{row.name}</span>
                    </TableCell>
                    <TableCell className="flex-1 min-w-[100px] max-w-[30%] flex items-center">
                      {row.alias}
                    </TableCell>
                    <TableCell className="w-[100px] flex items-center">
                      {row.itemCount}
                    </TableCell>
                    <TableCell className="w-[150px] flex items-center">
                      {row.showType}
                    </TableCell>
                    <TableCell className="w-[200px] flex items-center">
                      {renderCellContent(row)}
                    </TableCell>
                    <TableCell className="w-[100px] flex items-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {row.type === 'ga' && (
                            <DropdownMenuItem>编辑配置</DropdownMenuItem>
                          )}
                          {row.type === 'file' && (
                            <DropdownMenuItem>更新数据文件</DropdownMenuItem>
                          )}
                          {(row.type === 'mysql' ||
                            row.type === 'postgres') && (
                            <DropdownMenuItem>
                              更新表结构
                            </DropdownMenuItem>
                          )}
                          {(row.type === 'file' || row.type === 'folder') && (
                            <DropdownMenuItem>重命名</DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => handleDelete(row.id)}
                            className="text-red-600"
                          >
                            删除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <div
                className="block overflow-y-auto overflow-x-hidden flex items-center justify-center"
                style={{ height: 'calc(100vh - 246px)' }}
              >
                <div className="text-center text-muted-foreground">
                  <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>暂无数据</p>
                </div>
              </div>
            )}
          </Table>
        </div>
      </div>

      {filteredData.length > 0 && (
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <div>
            {selectedIds.length > 0 && (
              <span>已选择 {selectedIds.length} 项</span>
            )}
          </div>
          <div>共 {filteredData.length} 项</div>
        </div>
      )}
    </div>
  )
}
