"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  Calendar,
  Download,
  Share2,
  Edit,
  Save,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// 模拟报告数据
const mockReport = {
  id: "1",
  title: "2024年1月销售分析报告",
  description: "本报告分析了2024年1月的销售情况，包括销售额、订单量、用户增长等关键指标",
  createTime: "2024-01-04 15:30:00",
  updateTime: "2024-01-05 10:20:00",
  author: "张三",
  charts: [
    {
      id: "1",
      title: "月度销售趋势",
      type: "line",
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      id: "2",
      title: "产品分类销售占比",
      type: "pie",
      data: [
        { name: "电子产品", value: 400 },
        { name: "服装", value: 300 },
        { name: "食品", value: 200 },
        { name: "其他", value: 100 },
      ],
    },
  ],
  metrics: [
    { label: "总销售额", value: "¥1,234,567", icon: DollarSign, trend: "+12.5%" },
    { label: "订单总数", value: "8,432", icon: ShoppingCart, trend: "+8.2%" },
    { label: "新增用户", value: "2,345", icon: Users, trend: "+15.3%" },
    { label: "转化率", value: "3.2%", icon: TrendingUp, trend: "+0.5%" },
  ],
  content: `
## 执行摘要

2024年1月，公司整体销售表现强劲，销售额达到123.4万元，同比增长12.5%。订单量稳步上升，新增用户数量创历史新高。

## 关键发现

### 1. 销售增长
- 月度销售额突破120万元大关
- 电子产品类目表现尤为突出，占比达到40%
- 移动端订单占比提升至65%

### 2. 用户行为
- 新用户转化率为3.2%，较上月提升0.5个百分点
- 用户平均客单价为146元
- 复购率达到32%

### 3. 区域分析
- 华东地区销售额占比最高（35%）
- 华南地区增长最快（+25%）
- 西部地区仍有较大增长空间

## 建议

1. **加强电子产品类目运营**：继续优化产品线，提升用户体验
2. **深耕移动端市场**：优化移动端购物流程，提升转化率
3. **拓展西部市场**：增加西部地区营销投入，开拓新市场
  `,
};

export default function ReportDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [report, setReport] = useState(mockReport);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(report.title);
  const [editedDescription, setEditedDescription] = useState(report.description);

  const handleSave = () => {
    setReport({
      ...report,
      title: editedTitle,
      description: editedDescription,
      updateTime: new Date().toLocaleString("zh-CN"),
    });
    setIsEditing(false);
    toast.success("报告已保存");
  };

  const handleExport = () => {
    toast.success("正在导出报告...");
  };

  const handleShare = () => {
    toast.success("已复制分享链接");
  };

  return (
    <div className="flex flex-col h-full overflow-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回
        </Button>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-3">
                <Input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="text-2xl font-semibold"
                />
                <Textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  rows={2}
                  className="text-muted-foreground"
                />
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-semibold mb-2">{report.title}</h1>
                <p className="text-muted-foreground">{report.description}</p>
              </>
            )}
            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
              <span>作者：{report.author}</span>
              <span>创建时间：{report.createTime}</span>
              <span>更新时间：{report.updateTime}</span>
            </div>
          </div>

          <div className="flex gap-2 ml-4">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedTitle(report.title);
                    setEditedDescription(report.description);
                  }}
                >
                  取消
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  保存
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  分享
                </Button>
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="h-4 w-4 mr-2" />
                  导出
                </Button>
                <Button size="sm" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  编辑
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {report.metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.label}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-green-600 mt-1">{metric.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {report.charts.map((chart) => (
          <Card key={chart.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {chart.type === "line" ? (
                  <LineChart className="h-5 w-5" />
                ) : chart.type === "pie" ? (
                  <PieChart className="h-5 w-5" />
                ) : (
                  <BarChart3 className="h-5 w-5" />
                )}
                {chart.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center bg-muted/50 rounded-lg">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="h-16 w-16 mx-auto mb-2 opacity-50" />
                  <p>图表数据可视化区域</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle>报告详情</CardTitle>
          <CardDescription>深入分析和详细说明</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <pre className="whitespace-pre-wrap font-sans">{report.content}</pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
