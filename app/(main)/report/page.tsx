'use client'

import React from 'react'
import { FileText, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

const mockReports = [
  { id: 1, title: '月度销售报告', date: '2024-01-04', status: '已完成' },
  { id: 2, title: '季度业绩分析', date: '2024-01-03', status: '进行中' },
  { id: 3, title: '年度总结报告', date: '2024-01-02', status: '已完成' },
  { id: 4, title: '市场调研报告', date: '2024-01-01', status: '已完成' },
]

export default function ReportPage() {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-6">
        <h1 className="text-xl font-semibold">报告</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          创建报告
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid gap-4">
          {mockReports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{report.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    创建于 {report.date}
                  </p>
                </div>
              </div>
              <div>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    report.status === '已完成'
                      ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                  }`}
                >
                  {report.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
