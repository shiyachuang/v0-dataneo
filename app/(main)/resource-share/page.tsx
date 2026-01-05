'use client'

import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { IconChevronRight, IconSearch } from '@tabler/icons-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

// Mock 数据
const mockRoles = [
  { id: '1', name: 'zhr123', children: [] },
  { id: '2', name: 'zhr2', children: [] },
  { id: '3', name: '华北地区', children: [] },
  { id: '4', name: '分组测试', children: [] },
  { id: '5', name: 'xiezuozhe', children: [] },
  { id: '6', name: 'BJ角色', children: [] },
  { id: '7', name: '角色1', children: [] },
  { id: '8', name: '角色2', children: [] },
  { id: '9', name: '2', children: [] },
  { id: '10', name: '研发', children: [] },
  { id: '11', name: '财务', children: [] },
]

const mockResources = [
  { id: '1', type: '工作区', name: '1210', permission: '仅可使用' },
  { id: '2', type: '工作区', name: '测试0001', permission: '仅可使用' },
  { id: '3', type: '工作区', name: '本地数据来测测试', permission: '仅可使用' },
  { id: '4', type: '工作区', name: '春司销售试权限测试', permission: '仅可使用' },
  { id: '5', type: '工作区', name: '测试组测试测试测试测试测试', permission: '仅可使用' },
  { id: '6', type: '工作区', name: 'pq推拉取', permission: '仅可使用' },
  { id: '7', type: '工作区', name: '数据库连接抽取', permission: '仅可使用' },
  { id: '8', type: '工作区', name: '丽娜测试权限小加萌', permission: '仅可使用' },
  { id: '9', type: '工作区', name: 'dq-sfa', permission: '仅可使用' },
  { id: '10', type: '工作区', name: '丽娜测试权限工作区', permission: '仅可使用' },
]

const mockUsers = [
  { id: '1', type: '用户', name: '测试test', orgUserCount: '-' },
  { id: '2', type: '用户', name: 'zhr20251201@datahunter.cn', orgUserCount: '-' },
  { id: '3', type: '用户', name: '丽娜测试权限电号02', orgUserCount: '-' },
  { id: '4', type: '用户', name: '丽娜测试权限电号01', orgUserCount: '-' },
  { id: '5', type: '用户', name: 'ldd-demo-test', orgUserCount: '-' },
  { id: '6', type: '用户', name: 'testdemo', orgUserCount: '-' },
  { id: '7', type: '用户', name: 'abcabc!@abc.com', orgUserCount: '-' },
  { id: '8', type: '用户', name: '样例', orgUserCount: '-' },
  { id: '9', type: '用户', name: 'lddabc', orgUserCount: '-' },
  { id: '10', type: '用户', name: 'ldd-test-me', orgUserCount: '-' },
]

export default function ResourceSharePage() {
  const [selectedRole, setSelectedRole] = React.useState(mockRoles[0])
  const [searchQuery, setSearchQuery] = React.useState('')
  const [expandedRoles, setExpandedRoles] = React.useState<Set<string>>(new Set())

  const filteredRoles = mockRoles.filter((role) =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleRole = (roleId: string) => {
    const newExpanded = new Set(expandedRoles)
    if (newExpanded.has(roleId)) {
      newExpanded.delete(roleId)
    } else {
      newExpanded.add(roleId)
    }
    setExpandedRoles(newExpanded)
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-16 items-center border-b px-6">
        <Button variant="ghost" size="sm" className="mr-4">
          ← 返回
        </Button>
        <h1 className="text-xl font-semibold">资源分享</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full">
          {/* Left Sidebar - Role List */}
          <aside className="w-[280px] border-r flex flex-col">
            <div className="p-4">
              <div className="relative">
                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索角色"
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-2">
              {filteredRoles.map((role) => (
                <div
                  key={role.id}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-accent',
                    selectedRole.id === role.id && 'bg-accent'
                  )}
                  onClick={() => setSelectedRole(role)}
                >
                  <IconChevronRight className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{role.name}</span>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="p-6 border-b">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">角色：</span>
                  <span className="text-sm">
                    @ {selectedRole.name}
                    {selectedRole.id === '1' && '-测试看板共享02（勿删）'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  可设置哪些角色能使用哪些资源（数据、知识库、工作区、报告）
                </p>
                {selectedRole.id === '1' && (
                  <p className="text-xs text-red-500">
                    此角色必定为权限资源的包含资源
                  </p>
                )}
              </div>

              <div className="flex gap-4 mt-4">
                <Button variant="ghost" size="sm" className="font-semibold">
                  总览
                </Button>
                <Button variant="ghost" size="sm">
                  工作区设置
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden flex">
              {/* Resources Table */}
              <div className="flex-1 overflow-y-auto p-6">
                <h3 className="text-sm font-semibold mb-4">可用的所有资源</h3>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>类型</TableHead>
                        <TableHead>资源名称</TableHead>
                        <TableHead>工作区权限</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockResources.map((resource) => (
                        <TableRow key={resource.id}>
                          <TableCell className="text-sm">{resource.type}</TableCell>
                          <TableCell className="text-sm">{resource.name}</TableCell>
                          <TableCell className="text-sm">{resource.permission}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Users/Orgs Table */}
              <div className="w-[400px] border-l overflow-y-auto p-6">
                <h3 className="text-sm font-semibold mb-4">所含用户/组织</h3>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>类型</TableHead>
                        <TableHead>名称</TableHead>
                        <TableHead>组织包含用户数</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="text-sm">{user.type}</TableCell>
                          <TableCell className="text-sm">{user.name}</TableCell>
                          <TableCell className="text-sm">{user.orgUserCount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
