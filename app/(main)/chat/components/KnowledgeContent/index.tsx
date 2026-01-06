"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Plus, Trash2 } from "lucide-react";
import EmptyDataTip from "../EmptyDataTip";

interface KnowledgeContentProps {
  info: any;
  isShared?: boolean;
}

export default function KnowledgeContent({ info, isShared }: KnowledgeContentProps) {
  const [searchWord, setSearchWord] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Mock 数据 - 根据不同的 extType 展示不同内容
  const getMockData = () => {
    const type = info?.extType || info?.type;

    // type 6: 常见问题
    if (type === 6 || type === "6") {
      return {
        title: "常见问题列表",
        columns: [
          { key: "question", label: "问题" },
          { key: "answer", label: "答案" },
        ],
        data: [
          {
            id: "1",
            question: "如何分析销售数据?",
            answer: "可以通过选择数据源，然后使用AI分析功能自动生成分析报告",
          },
          {
            id: "2",
            question: "如何导出报告?",
            answer: "在报告详情页面点击导出按钮，选择导出格式即可",
          },
          {
            id: "3",
            question: "如何添加数据源?",
            answer: "点击数据管理，选择添加数据源，支持数据库连接和文件上传",
          },
        ],
      };
    }

    // type 2: 术语
    if (type === 2 || type === "2") {
      return {
        title: "术语定义",
        columns: [
          { key: "term", label: "术语" },
          { key: "definition", label: "定义" },
          { key: "category", label: "分类" },
        ],
        data: [
          {
            id: "1",
            term: "GMV",
            definition: "Gross Merchandise Volume，商品交易总额",
            category: "业务指标",
          },
          {
            id: "2",
            term: "UV",
            definition: "Unique Visitor，独立访客数",
            category: "流量指标",
          },
          {
            id: "3",
            term: "ROI",
            definition: "Return On Investment，投资回报率",
            category: "财务指标",
          },
        ],
      };
    }

    // type 3: 指标
    if (type === 3 || type === "3") {
      return {
        title: "指标定义",
        columns: [
          { key: "name", label: "指标名称" },
          { key: "formula", label: "计算公式" },
          { key: "unit", label: "单位" },
        ],
        data: [
          {
            id: "1",
            name: "销售额",
            formula: "SUM(订单金额)",
            unit: "元",
          },
          {
            id: "2",
            name: "转化率",
            formula: "下单用户数 / 访问用户数 * 100%",
            unit: "%",
          },
          {
            id: "3",
            name: "客单价",
            formula: "销售额 / 订单数",
            unit: "元",
          },
        ],
      };
    }

    // 默认：通用知识
    return {
      title: "知识内容",
      columns: [
        { key: "title", label: "标题" },
        { key: "content", label: "内容" },
      ],
      data: [
        {
          id: "1",
          title: "数据分析方法",
          content: "描述性分析、诊断性分析、预测性分析、规范性分析",
        },
        {
          id: "2",
          title: "常用图表类型",
          content: "柱状图、折线图、饼图、散点图、热力图等",
        },
      ],
    };
  };

  const mockData = getMockData();
  const filteredData = searchWord
    ? mockData.data.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(searchWord.toLowerCase())
        )
      )
    : mockData.data;

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? mockData.data.map((item) => item.id) : []);
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      {/* 搜索和操作栏 */}
      <div className="flex items-center justify-between gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索..."
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>
        <div className="flex gap-2">
          {!isShared && selectedIds.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs"
              onClick={() => {
                setSelectedIds([]);
              }}
            >
              <Trash2 className="h-3 w-3 mr-1" />
              删除 ({selectedIds.length})
            </Button>
          )}
          {!isShared && (
            <Button size="sm" className="h-8 text-xs">
              <Plus className="h-3 w-3 mr-1" />
              新建
            </Button>
          )}
        </div>
      </div>

      {/* 数据表格 */}
      {filteredData.length > 0 ? (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedIds.length === mockData.data.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                {mockData.columns.map((col) => (
                  <TableHead key={col.key} className="text-xs font-semibold">
                    {col.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(row.id)}
                      onCheckedChange={() => handleCheckboxChange(row.id)}
                    />
                  </TableCell>
                  {mockData.columns.map((col) => (
                    <TableCell key={col.key} className="text-xs">
                      {row[col.key as keyof typeof row]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <EmptyDataTip>
          <Button size="sm" className="mt-4">
            <Plus className="h-3 w-3 mr-1" />
            添加内容
          </Button>
        </EmptyDataTip>
      )}
    </div>
  );
}
