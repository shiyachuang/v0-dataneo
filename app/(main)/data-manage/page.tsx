'use client'

import React, { useState } from 'react'
import { Database, Search, Briefcase } from 'lucide-react'
import { CreateJobDialog } from '@/components/dialogs/create-job-dialog'
import { Job } from '@/lib/types'

const mockData = [
  { id: 1, name: '销售数据', type: 'CSV', size: '2.3 MB', updated: '2024-01-04' },
  { id: 2, name: '客户信息', type: 'Excel', size: '5.1 MB', updated: '2024-01-03' },
  { id: 3, name: '产品目录', type: 'JSON', size: '1.2 MB', updated: '2024-01-02' },
  { id: 4, name: '订单记录', type: 'CSV', size: '8.5 MB', updated: '2024-01-01' },
]

const getPriorityColor = (priority: Job['priority']) => {
  switch (priority) {
    case 'high':
      return 'bg-red-500/10 text-red-500'
    case 'medium':
      return 'bg-yellow-500/10 text-yellow-500'
    case 'low':
      return 'bg-green-500/10 text-green-500'
  }
}

const getPriorityLabel = (priority: Job['priority']) => {
  switch (priority) {
    case 'high':
      return '高'
    case 'medium':
      return '中'
    case 'low':
      return '低'
  }
}

const getStatusLabel = (status: Job['status']) => {
  switch (status) {
    case 'pending':
      return '待开始'
    case 'in-progress':
      return '进行中'
    case 'completed':
      return '已完成'
  }
}

export default function DataManagePage() {
  const [jobs, setJobs] = useState<Job[]>([])

  const handleCreateJob = (
    jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    const newJob: Job = {
      ...jobData,
      id: `job-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setJobs([newJob, ...jobs])
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-6">
        <h1 className="text-xl font-semibold">数据管理</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索数据..."
              className="pl-8 pr-3 py-1.5 rounded-md border border-input bg-background text-sm w-64"
            />
          </div>
          <CreateJobDialog onCreateJob={handleCreateJob} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {jobs.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">工作任务</h2>
            <div className="grid gap-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{job.name}</h3>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(
                            job.priority
                          )}`}
                        >
                          {getPriorityLabel(job.priority)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {job.description || '暂无描述'} · {getStatusLabel(job.status)}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {job.dueDate
                      ? `截止 ${new Date(job.dueDate).toLocaleDateString('zh-CN')}`
                      : '无截止日期'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Existing data section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">数据文件</h2>
          <div className="grid gap-4">
            {mockData.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <Database className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.type} · {item.size}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  更新于 {item.updated}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
