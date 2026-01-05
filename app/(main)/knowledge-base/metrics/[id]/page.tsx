"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Search, Trash2, Plus } from "lucide-react";
import { useImmer } from "use-immer";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Metric {
  id: string;
  name: string;
  alias: string;
  category: string;
  calcMethod: string;
  unit: string;
  description: string;
}

// 模拟数据
const mockMetrics: Metric[] = [
  {
    id: "1",
    name: "总销售额",
    alias: "GMV, 成交额",
    category: "销售指标",
    calcMethod: "SUM(order_amount)",
    unit: "元",
    description: "所有订单的总金额",
  },
  {
    id: "2",
    name: "日活用户数",
    alias: "DAU",
    category: "用户指标",
    calcMethod: "COUNT(DISTINCT user_id)",
    unit: "人",
    description: "当天访问产品的独立用户数",
  },
  {
    id: "3",
    name: "转化率",
    alias: "成交率",
    category: "转化指标",
    calcMethod: "(成交用户数 / 访问用户数) * 100",
    unit: "%",
    description: "完成购买的用户占访问用户的比例",
  },
  {
    id: "4",
    name: "客单价",
    alias: "ARPU",
    category: "销售指标",
    calcMethod: "总销售额 / 订单数",
    unit: "元",
    description: "平均每个订单的金额",
  },
  {
    id: "5",
    name: "留存率",
    alias: "次日留存, 7日留存",
    category: "用户指标",
    calcMethod: "(留存用户数 / 新增用户数) * 100",
    unit: "%",
    description: "新用户在一段时间后继续使用产品的比例",
  },
];

const metricCategories = ["销售指标", "用户指标", "转化指标", "运营指标", "财务指标"];

interface State {
  list: Metric[];
  searchWord: string;
  selectedIds: string[];
  showEditDialog: boolean;
  editingItem: Metric | null;
}

export default function MetricsPage({ params }: { params: { id: string } }) {
  const [state, setState] = useImmer<State>({
    list: mockMetrics,
    searchWord: "",
    selectedIds: [],
    showEditDialog: false,
    editingItem: null,
  });

  const [formData, setFormData] = useImmer<Partial<Metric>>({
    name: "",
    alias: "",
    category: "",
    calcMethod: "",
    unit: "",
    description: "",
  });

  const handleCheckboxChange = (id: string) => {
    setState((draft) => {
      draft.selectedIds = draft.selectedIds.includes(id)
        ? draft.selectedIds.filter((item) => item !== id)
        : [...draft.selectedIds, id];
    });
  };

  const handleSelectAll = (checked: boolean) => {
    setState((draft) => {
      draft.selectedIds = checked ? draft.list.map((item) => item.id) : [];
    });
  };

  const handleDelete = () => {
    if (state.selectedIds.length === 0) return;
    toast.success(`已删除 ${state.selectedIds.length} 个指标`);
    setState((draft) => {
      draft.list = draft.list.filter((item) => !draft.selectedIds.includes(item.id));
      draft.selectedIds = [];
    });
  };

  const handleAdd = () => {
    setFormData({
      name: "",
      alias: "",
      category: "",
      calcMethod: "",
      unit: "",
      description: "",
    });
    setState((draft) => {
      draft.showEditDialog = true;
      draft.editingItem = null;
    });
  };

  const handleEdit = (item: Metric) => {
    setFormData(item);
    setState((draft) => {
      draft.showEditDialog = true;
      draft.editingItem = item;
    });
  };

  const handleSave = () => {
    if (!formData.name || !formData.category) {
      toast.error("请填写指标名称和分类");
      return;
    }

    if (state.editingItem) {
      // 编辑
      setState((draft) => {
        const index = draft.list.findIndex((item) => item.id === state.editingItem?.id);
        if (index !== -1) {
          draft.list[index] = { ...draft.list[index], ...formData } as Metric;
        }
        draft.showEditDialog = false;
      });
      toast.success("指标已更新");
    } else {
      // 新增
      const newItem: Metric = {
        id: Date.now().toString(),
        ...formData as Metric,
      };
      setState((draft) => {
        draft.list.unshift(newItem);
        draft.showEditDialog = false;
      });
      toast.success("指标已添加");
    }
  };

  const filteredList = state.list.filter(
    (item) =>
      item.name.toLowerCase().includes(state.searchWord.toLowerCase()) ||
      item.description.toLowerCase().includes(state.searchWord.toLowerCase()) ||
      item.alias.toLowerCase().includes(state.searchWord.toLowerCase())
  );

  const hasScroll = filteredList.length * 48 > 600;

  return (
    <div className="relative h-full p-6">
      <h1 className="text-2xl font-semibold mb-8">指标知识库</h1>

      {/* 搜索和操作栏 */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索指标"
            className="pl-8 w-96 max-w-[80vw]"
            value={state.searchWord}
            onChange={(e) =>
              setState((draft) => {
                draft.searchWord = e.target.value;
              })
            }
          />
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleDelete}
            variant="outline"
            size="icon"
            title="删除"
            disabled={state.selectedIds.length === 0}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-2" />
            添加指标
          </Button>
        </div>
      </div>

      <div className="h-[calc(100vh-248px)] relative">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className={cn("flex bg-muted/50", hasScroll && "pr-2")}>
                <TableHead className="min-w-[48px] flex items-center">
                  <Checkbox
                    className={cn("mt-[-5px]", filteredList.length > 0 ? "visible" : "hidden")}
                    checked={
                      state.selectedIds.length > 0 && state.selectedIds.length === filteredList.length
                    }
                    onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                  />
                </TableHead>
                <TableHead className="flex-1 min-w-[120px] flex items-center">指标名称</TableHead>
                <TableHead className="flex-1 min-w-[150px] flex items-center">别名</TableHead>
                <TableHead className="w-[100px] flex items-center">分类</TableHead>
                <TableHead className="flex-1 min-w-[180px] flex items-center">计算方法</TableHead>
                <TableHead className="w-[80px] flex items-center">单位</TableHead>
                <TableHead className="flex-1 min-w-[200px] flex items-center">说明</TableHead>
                <TableHead className="w-[80px] flex items-center">操作</TableHead>
              </TableRow>
            </TableHeader>
            {filteredList.length > 0 ? (
              <TableBody className="block overflow-y-auto overflow-x-hidden" style={{ height: "calc(100vh - 288px)" }}>
                {filteredList.map((item) => (
                  <TableRow
                    key={item.id}
                    className={cn("flex", state.selectedIds.includes(item.id) && "bg-muted/50")}
                  >
                    <TableCell className="min-w-[48px] flex items-center">
                      <Checkbox
                        className="mt-[-5px]"
                        checked={state.selectedIds.includes(item.id)}
                        onCheckedChange={() => handleCheckboxChange(item.id)}
                      />
                    </TableCell>
                    <TableCell className="flex-1 min-w-[120px] flex items-center">
                      <div className="line-clamp-2 font-medium">{item.name}</div>
                    </TableCell>
                    <TableCell className="flex-1 min-w-[150px] flex items-center">
                      <div className="line-clamp-2 text-muted-foreground text-sm">{item.alias}</div>
                    </TableCell>
                    <TableCell className="w-[100px] flex items-center">
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell className="flex-1 min-w-[180px] flex items-center">
                      <div className="line-clamp-2 text-sm font-mono">{item.calcMethod}</div>
                    </TableCell>
                    <TableCell className="w-[80px] flex items-center">
                      <div className="line-clamp-1">{item.unit}</div>
                    </TableCell>
                    <TableCell className="flex-1 min-w-[200px] flex items-center">
                      <div className="line-clamp-2 text-sm text-muted-foreground">{item.description}</div>
                    </TableCell>
                    <TableCell className="w-[80px] flex items-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer" onClick={() => handleEdit(item)}>
                            编辑
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => {
                              toast.success("已删除");
                              setState((draft) => {
                                draft.list = draft.list.filter((m) => m.id !== item.id);
                              });
                            }}
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
                className="block overflow-y-auto overflow-x-hidden flex items-center justify-center text-muted-foreground"
                style={{ height: "calc(100vh - 246px)" }}
              >
                暂无数据
              </div>
            )}
          </Table>
        </div>
      </div>

      {/* 编辑对话框 */}
      <Dialog open={state.showEditDialog} onOpenChange={(open) => setState((draft) => { draft.showEditDialog = open; })}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{state.editingItem ? "编辑指标" : "添加指标"}</DialogTitle>
            <DialogDescription>填写指标信息，帮助AI理解业务指标定义</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">指标名称 *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((draft) => { draft.name = e.target.value; })}
                  placeholder="如：总销售额、日活用户数"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="alias">别名</Label>
                <Input
                  id="alias"
                  value={formData.alias}
                  onChange={(e) => setFormData((draft) => { draft.alias = e.target.value; })}
                  placeholder="如：GMV, 成交额"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">分类 *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((draft) => { draft.category = value; })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择分类" />
                  </SelectTrigger>
                  <SelectContent>
                    {metricCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="unit">单位</Label>
                <Input
                  id="unit"
                  value={formData.unit}
                  onChange={(e) => setFormData((draft) => { draft.unit = e.target.value; })}
                  placeholder="如：元、人、%"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="calcMethod">计算方法</Label>
              <Textarea
                id="calcMethod"
                value={formData.calcMethod}
                onChange={(e) => setFormData((draft) => { draft.calcMethod = e.target.value; })}
                placeholder="如：SUM(order_amount) 或 (成交用户数 / 访问用户数) * 100"
                rows={2}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">说明</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((draft) => { draft.description = e.target.value; })}
                placeholder="指标的详细说明"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setState((draft) => { draft.showEditDialog = false; })}>
              取消
            </Button>
            <Button onClick={handleSave}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
