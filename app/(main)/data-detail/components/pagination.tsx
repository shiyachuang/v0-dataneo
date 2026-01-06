"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  onPageChange: (pageNum: number, pageSize: number) => void
  pageIndex: number
  total: number
  pageSize: number
}

export default function Pagination({ onPageChange, pageIndex, total, pageSize }: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize)

  return (
    <div className="flex items-center justify-between px-2 py-2 border-t">
      <div className="text-sm text-muted-foreground">
        共 {total} 条数据，第 {pageIndex} / {totalPages} 页
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(pageIndex - 1, pageSize)}
          disabled={pageIndex <= 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(pageIndex + 1, pageSize)}
          disabled={pageIndex >= totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
