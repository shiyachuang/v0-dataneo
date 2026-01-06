"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import Pagination from "./pagination"
import DataToolbar from "./data-toolbar"

const cellClassName = "cursor-pointer flex-1 min-w-[154px] max-w-[30%] flex items-center leading-[1.3]"
const tableHeadClassName = "flex-1 min-w-[154px] max-w-[30%] whitespace-nowrap flex items-center"

interface DataTabProps {
  previewData: {
    columns: { name: string; alias?: string }[]
    data: any[]
    total: number
    pageNum: number
    pageSize: number
    loading: boolean
    updateTime: string | null
  }
  onPageChange: (pageNum: number, pageSize: number) => void
  onRefresh: () => void
  onOpenFieldChange: () => void
  enableTooltip?: boolean
  onInsertText?: (text: string) => void
  isGAData?: boolean
}

export default function DataTab({
  previewData,
  onPageChange,
  onRefresh,
  onOpenFieldChange,
  enableTooltip = false,
  onInsertText,
  isGAData = false,
}: DataTabProps) {
  const hasPreviewAlias = previewData.columns?.some((item) => item.alias)

  // 渲染单元格内容
  const renderCellContent = (content: any) => {
    if (enableTooltip && onInsertText) {
      return (
        <span onClick={() => onInsertText(String(content))} className="hover:text-primary cursor-pointer">
          {content}
        </span>
      )
    }
    return content
  }

  return (
    <div className="mt-4">
      {isGAData && (
        <DataToolbar
          updateTime={previewData.updateTime}
          loading={previewData.loading}
          onRefresh={onRefresh}
          showFieldChange={isGAData}
          onOpenFieldChange={onOpenFieldChange}
        />
      )}

      <div
        className={cn(
          "relative h-[calc(100vh-204px)] max-w-full",
          isGAData && !enableTooltip && "h-[calc(100vh-249px)]",
          isGAData && enableTooltip && "h-[calc(100vh-453px)]",
          !isGAData && enableTooltip && "h-[calc(100vh-403px)]",
        )}
      >
        <div
          className={cn(
            "overflow-x-auto rounded-md border",
            previewData.data.length ? "h-[calc(100%-48px)]" : "h-full",
          )}
        >
          <Table className="text-xs">
            <TableHeader className="sticky top-0 z-10 bg-background">
              <TableRow className="flex bg-muted/50">
                {previewData.columns?.map((item, index) => (
                  <TableHead
                    className={cn(
                      tableHeadClassName,
                      "overflow-hidden border-r",
                      previewData.columns.length === 1 && "max-w-full border-r-0",
                    )}
                    key={index}
                  >
                    <span className="truncate" title={item.name}>
                      {item.name}
                    </span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            {/* 别名行 */}
            {hasPreviewAlias && (
              <TableHeader className="sticky top-[41px] z-10 bg-background">
                <TableRow className="flex bg-muted/50">
                  {previewData.columns?.map((item, index) => (
                    <TableHead
                      className={cn(
                        tableHeadClassName,
                        "overflow-hidden border-r",
                        previewData.columns.length === 1 && "max-w-full border-r-0",
                      )}
                      key={index}
                    >
                      <span className="truncate" title={item.alias}>
                        {item.alias}
                      </span>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
            )}

            <TableBody>
              {previewData.loading ? (
                <TableRow>
                  <TableCell colSpan={previewData.columns?.length || 1} className="h-[calc(100vh-304px)]">
                    <div className="flex justify-center items-center h-full">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                previewData.data.map((row, index) => (
                  <TableRow key={index} className={cn("flex", index % 2 && "bg-muted/30")}>
                    {previewData.columns?.map((item, oindex) => (
                      <TableCell
                        className={cn(
                          cellClassName,
                          "border-r",
                          index === previewData.data.length - 1 && "border-b",
                          previewData.columns.length === 1 && "max-w-full border-r-0",
                        )}
                        key={oindex}
                      >
                        {renderCellContent(row[item.name])}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* 分页 */}
        {previewData.data.length > 0 && (
          <Pagination
            onPageChange={onPageChange}
            pageIndex={previewData.pageNum}
            total={previewData.total}
            pageSize={previewData.pageSize}
          />
        )}
      </div>
    </div>
  )
}
