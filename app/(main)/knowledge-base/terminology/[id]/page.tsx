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

interface Terminology {
  id: string;
  name: string;
  description: string;
  business: string[];
  relatedMetrics: string;
  relatedFields: string;
}

// 模拟数据
const mockTerminologies: Terminology[] = [
  {
    id: "1",
    name: "GMV",
    description: "Gross Merchandise Volume，商品交易总额",
    business: ["电商", "零售"],
    relatedMetrics: "销售额, 订单量",
    relatedFields: "order_table.total_amount",
  },
  {
    id: "2",
    name: "DAU",
    description: "Daily Active Users，日活跃用户数",
    business: ["产品", "运营"],
    relatedMetrics: "用户活跃度",
    relatedFields: "user_table.last_login_time",
  },
  {
    id: "3",
    name: "转化率",
    description: "完成目标行为的用户数占总用户数的比例",
    business: ["营销", "电商"],
    relatedMetrics: "成交率, 点击率",
    relatedFields: "conversion_table.rate",
  },
  {
    id: "4",
    name: "客单价",
    description: "平均每个客户购买的金额",
    business: ["电商", "零售"],
    relatedMetrics: "销售额, 订单数",
    relatedFields: "order_table.avg_amount",
  },
];

interface State {
  list: Terminology[];
  searchWord: string;
  selectedIds: string[];
  showEditDialog: boolean;
  editingItem: Terminology | null;
}

export default function TerminologyPage({ params }: { params: { id: string } }) {
  const [state, setState] = useImmer<State>({
    list: mockTerminologies,
    searchWord: "",
    selectedIds: [],
    showEditDialog: false,
    editingItem: null,
  });

  const [formData, setFormData] = useImmer<Partial<Terminology>>({
    name: "",
    description: "",
    business: [],
    relatedMetrics: "",
    relatedFields: "",
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
    toast.success(`已删除 ${state.selectedIds.length} 个术语`);
    setState((draft) => {
      draft.list = draft.list.filter((item) => !draft.selectedIds.includes(item.id));
      draft.selectedIds = [];
    });
  };

  const handleAdd = () => {
    setFormData({
      name: "",
      description: "",
      business: [],
      relatedMetrics: "",
      relatedFields: "",
    });
    setState((draft) => {
      draft.showEditDialog = true;
      draft.editingItem = null;
    });
  };

  const handleEdit = (item: Terminology) => {
    setFormData(item);
    setState((draft) => {
      draft.showEditDialog = true;
      draft.editingItem = item;
    });
  };

  const handleSave = () => {
    if (!formData.name || !formData.description) {
      toast.error("请填写术语名称和描述");
      return;
    }

    if (state.editingItem) {
      // 编辑
      setState((draft) => {
        const index = draft.list.findIndex((item) => item.id === state.editingItem?.id);
        if (index !== -1) {
          draft.list[index] = { ...draft.list[index], ...formData } as Terminology;
        }
        draft.showEditDialog = false;
      });
      toast.success("术语已更新");
    } else {
      // 新增
      const newItem: Terminology = {
        id: Date.now().toString(),
        name: formData.name!,
        description: formData.description!,
        business: formData.business || [],
        relatedMetrics: formData.relatedMetrics || "",
        relatedFields: formData.relatedFields || "",
      };
      setState((draft) => {
        draft.list.unshift(newItem);
        draft.showEditDialog = false;
      });
      toast.success("术语已添加");
    }
  };

  const filteredList = state.list.filter(
    (item) =>
      item.name.toLowerCase().includes(state.searchWord.toLowerCase()) ||
      item.description.toLowerCase().includes(state.searchWord.toLowerCase())
  );

  const hasScroll = filteredList.length * 48 > 600;

  return (
    <div className="relative h-full p-6">
      <h1 className="text-2xl font-semibold mb-8">术语知识库</h1>

      {/* 搜索和操作栏 */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索术语"
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
            添加术语
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
                <TableHead className="flex-1 min-w-[150px] flex items-center">术语名称</TableHead>
                <TableHead className="flex-1 min-w-[200px] flex items-center">术语解释</TableHead>
                <TableHead className="w-[120px] flex items-center">所属业务</TableHead>
                <TableHead className="w-[150px] flex items-center">对应指标</TableHead>
                <TableHead className="w-[150px] flex items-center">对应字段</TableHead>
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
                    <TableCell className="flex-1 min-w-[150px] flex items-center">
                      <div className="line-clamp-2">{item.name}</div>
                    </TableCell>
                    <TableCell className="flex-1 min-w-[200px] flex items-center">
                      <div className="line-clamp-2">{item.description}</div>
                    </TableCell>
                    <TableCell className="w-[120px] flex items-center flex-wrap gap-1">
                      {item.business.map((b, i) => (
                        <Badge key={i} variant="secondary">
                          {b}
                        </Badge>
                      ))}
                    </TableCell>
                    <TableCell className="w-[150px] flex items-center">
                      <div className="line-clamp-2">{item.relatedMetrics}</div>
                    </TableCell>
                    <TableCell className="w-[150px] flex items-center">
                      <div className="line-clamp-2">{item.relatedFields}</div>
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
                                draft.list = draft.list.filter((t) => t.id !== item.id);
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
            <DialogTitle>{state.editingItem ? "编辑术语" : "添加术语"}</DialogTitle>
            <DialogDescription>填写术语信息，让AI更好地理解业务术语</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">术语名称 *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((draft) => { draft.name = e.target.value; })}
                placeholder="如：GMV、DAU、转化率"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">术语解释 *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((draft) => { draft.description = e.target.value; })}
                placeholder="对术语的详细解释说明"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="business">所属业务</Label>
              <Input
                id="business"
                value={formData.business?.join(", ") || ""}
                onChange={(e) =>
                  setFormData((draft) => {
                    draft.business = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
                  })
                }
                placeholder="多个业务用逗号分隔，如：电商, 零售"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="relatedMetrics">对应指标</Label>
              <Input
                id="relatedMetrics"
                value={formData.relatedMetrics}
                onChange={(e) => setFormData((draft) => { draft.relatedMetrics = e.target.value; })}
                placeholder="与此术语相关的指标"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="relatedFields">对应字段</Label>
              <Input
                id="relatedFields"
                value={formData.relatedFields}
                onChange={(e) => setFormData((draft) => { draft.relatedFields = e.target.value; })}
                placeholder="如：[表名].[字段名]"
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
