"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  MoreHorizontal,
  Search,
  Trash2,
  FileText,
  Folder,
  Database,
  BookOpen,
} from "lucide-react";
import { IconFileArrowRight } from "@tabler/icons-react";
import { useImmer } from "use-immer";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const fileTypeMap: Record<number, string> = {
  1: "文件夹",
  2: "术语",
  3: "指标",
  4: "模型关系",
  5: "通用知识",
  6: "常用问题",
};

const pathMap: Record<number, string> = {
  2: "terminology",
  3: "metrics",
  4: "modelRelation",
  5: "general",
  6: "commonQuestion",
};

// 模拟数据
const mockFiles = [
  {
    id: "1",
    name: "业务术语",
    type: 1,
    updated_time: "2024-01-05 10:30:00",
    created_time: "2024-01-01 09:00:00",
  },
  {
    id: "2",
    name: "销售相关术语",
    type: 2,
    updated_time: "2024-01-05 11:20:00",
    created_time: "2024-01-02 10:00:00",
  },
  {
    id: "3",
    name: "关键指标定义",
    type: 3,
    updated_time: "2024-01-04 15:45:00",
    created_time: "2024-01-03 14:00:00",
  },
  {
    id: "4",
    name: "数据模型关系",
    type: 4,
    updated_time: "2024-01-03 09:15:00",
    created_time: "2024-01-02 08:30:00",
  },
  {
    id: "5",
    name: "业务背景知识",
    type: 5,
    updated_time: "2024-01-05 16:20:00",
    created_time: "2024-01-04 13:00:00",
  },
  {
    id: "6",
    name: "常见业务问题",
    type: 6,
    updated_time: "2024-01-05 14:10:00",
    created_time: "2024-01-05 09:00:00",
  },
];

const getFileIcon = (type: number) => {
  switch (type) {
    case 1:
      return <Folder className="h-5 w-5 text-blue-500" />;
    case 2:
      return <FileText className="h-5 w-5 text-green-500" />;
    case 3:
      return <Database className="h-5 w-5 text-purple-500" />;
    case 4:
      return <Database className="h-5 w-5 text-orange-500" />;
    case 5:
      return <BookOpen className="h-5 w-5 text-indigo-500" />;
    case 6:
      return <FileText className="h-5 w-5 text-pink-500" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
};

interface FileItem {
  id: string;
  name: string;
  type: number;
  updated_time: string;
  created_time: string;
}

interface State {
  files: FileItem[];
  searchWord: string;
  selectedFileIds: string[];
}

export default function KnowledgeListPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [state, setState] = useImmer<State>({
    files: mockFiles,
    searchWord: "",
    selectedFileIds: [],
  });

  const handleCheckboxChange = (id: string) => {
    setState((draft) => {
      draft.selectedFileIds = draft.selectedFileIds.includes(id)
        ? draft.selectedFileIds.filter((item) => item !== id)
        : [...draft.selectedFileIds, id];
    });
  };

  const handleSelectAll = (checked: boolean) => {
    setState((draft) => {
      draft.selectedFileIds = checked ? draft.files.map((item) => item.id) : [];
    });
  };

  const handleDelete = () => {
    if (state.selectedFileIds.length === 0) return;
    toast.success(`已删除 ${state.selectedFileIds.length} 个项目`);
    setState((draft) => {
      draft.files = draft.files.filter(
        (file) => !draft.selectedFileIds.includes(file.id)
      );
      draft.selectedFileIds = [];
    });
  };

  const handleMove = () => {
    if (state.selectedFileIds.length === 0) return;
    toast.success(`已移动 ${state.selectedFileIds.length} 个项目`);
    setState((draft) => {
      draft.selectedFileIds = [];
    });
  };

  const onSearch = (value: string) => {
    setState((draft) => {
      draft.searchWord = value;
    });
  };

  const openFile = (file: FileItem) => {
    if (file.type === 1) {
      router.push(`/knowledge-base/list/${params.id}/${file.id}`);
    } else {
      router.push(`/knowledge-base/${pathMap[file.type]}/${file.id}`);
    }
  };

  const filteredFiles = state.files.filter((file) =>
    file.name.toLowerCase().includes(state.searchWord.toLowerCase())
  );

  const hasScroll = filteredFiles.length * 48 > 600;

  return (
    <div className="relative h-full p-6">
      <h1 className="text-2xl font-semibold mb-8">知识库文件列表</h1>

      {/* 搜索和操作栏 */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索"
            className="pl-8 w-96 max-w-[80vw]"
            value={state.searchWord}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleMove}
            variant="outline"
            size="icon"
            disabled={state.selectedFileIds.length === 0}
            title="移动"
          >
            <IconFileArrowRight className="h-4 w-4" />
          </Button>

          <Button
            onClick={handleDelete}
            variant="outline"
            size="icon"
            title="删除"
            disabled={state.selectedFileIds.length === 0}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button>创建知识文件</Button>
        </div>
      </div>

      <div className="h-[calc(100vh-248px)] relative">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow
                className={cn("flex bg-muted/50", hasScroll && "pr-2")}
              >
                <TableHead className="min-w-[48px] flex items-center">
                  <Checkbox
                    className={cn(
                      "mt-[-5px]",
                      filteredFiles.length > 0 ? "visible" : "hidden"
                    )}
                    checked={
                      state.selectedFileIds.length > 0 &&
                      state.selectedFileIds.length === filteredFiles.length
                    }
                    onCheckedChange={(checked) =>
                      handleSelectAll(checked as boolean)
                    }
                  />
                </TableHead>
                <TableHead className="flex-1 min-w-[120px] flex items-center">
                  名称
                </TableHead>
                <TableHead className="w-[100px] flex items-center">
                  类型
                </TableHead>
                <TableHead className="w-[200px] flex items-center">
                  更新时间
                </TableHead>
                <TableHead className="w-[100px] flex items-center">
                  操作
                </TableHead>
              </TableRow>
            </TableHeader>
            {filteredFiles.length > 0 ? (
              <TableBody
                className="block overflow-y-auto overflow-x-hidden"
                style={{ height: "calc(100vh - 288px)" }}
              >
                {filteredFiles.map((file) => (
                  <TableRow
                    key={file.id}
                    className={cn(
                      "flex",
                      state.selectedFileIds.includes(file.id) && "bg-muted/50"
                    )}
                  >
                    <TableCell className="min-w-[48px] flex items-center">
                      <Checkbox
                        className="mt-[-5px]"
                        checked={state.selectedFileIds.includes(file.id)}
                        onCheckedChange={() => handleCheckboxChange(file.id)}
                      />
                    </TableCell>
                    <TableCell
                      className="cursor-pointer flex-1 min-w-[120px] flex items-center"
                      onClick={() => openFile(file)}
                    >
                      <div className="flex items-center gap-2 cursor-pointer">
                        {getFileIcon(file.type)}
                        <div className="line-clamp-3">{file.name}</div>
                      </div>
                    </TableCell>
                    <TableCell
                      className="w-[100px] cursor-pointer flex items-center"
                      onClick={() => openFile(file)}
                    >
                      {fileTypeMap[file.type]}
                    </TableCell>
                    <TableCell
                      onClick={() => openFile(file)}
                      className="w-[200px] cursor-pointer flex items-center"
                    >
                      {file.updated_time}
                    </TableCell>
                    <TableCell className="w-[100px] flex items-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 cursor-pointer"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            重命名
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => {
                              toast.success("已删除");
                              setState((draft) => {
                                draft.files = draft.files.filter(
                                  (f) => f.id !== file.id
                                );
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
    </div>
  );
}
