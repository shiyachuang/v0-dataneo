"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Download, Table2 } from "lucide-react";
import { toast } from "sonner";

interface DataTableProps {
  data: Array<Record<string, any>>;
  title?: string;
}

export default function DataTable({ data, title }: DataTableProps) {
  if (!data || data.length === 0) {
    return (
      <div className="rounded-lg border bg-background p-8 text-center text-sm text-muted-foreground">
        暂无数据
      </div>
    );
  }

  const columns = Object.keys(data[0]);

  const handleExport = () => {
    toast.success("导出功能开发中...");
  };

  return (
    <div className="rounded-lg border bg-background overflow-hidden">
      {/* 表头工具栏 */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/30">
        <div className="flex items-center gap-2">
          <Table2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">
            {title || "查询结果"}
          </span>
          <span className="text-xs text-muted-foreground">
            ({data.length} 条记录)
          </span>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={handleExport}
              >
                <Download className="h-3.5 w-3.5 mr-1.5" />
                导出
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>导出为 Excel 文件</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* 表格内容 */}
      <div className="max-h-[400px] overflow-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-muted/50 z-10">
            <tr className="border-b">
              {columns.map((key) => (
                <th
                  key={key}
                  className="px-3 py-2 text-left font-semibold text-xs whitespace-nowrap"
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b hover:bg-muted/30 transition-colors"
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-3 py-2 text-xs whitespace-nowrap"
                  >
                    {row[col] !== null && row[col] !== undefined
                      ? String(row[col])
                      : "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 表格底部信息 */}
      <div className="px-4 py-2 border-t bg-muted/10 text-xs text-muted-foreground">
        显示 1-{data.length} 条，共 {data.length} 条记录
      </div>
    </div>
  );
}
