"use client";

import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  BookOpenText,
  EllipsisVertical,
} from "lucide-react";
import { useImmer } from "use-immer";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface KnowledgeBase {
  id: string;
  name: string;
}

interface State {
  showKnowledgeDialog: boolean;
  knowledgeBases: KnowledgeBase[];
  open: boolean;
  deleteKnowledgeDialog: KnowledgeBase | null;
  renameKnowledgeDialog: KnowledgeBase | null;
}

export default function KnowledgeBasePage() {
  const router = useRouter();
  const [state, setState] = useImmer<State>({
    showKnowledgeDialog: false,
    knowledgeBases: [],
    open: false,
    deleteKnowledgeDialog: null,
    renameKnowledgeDialog: null,
  });

  const openKnowledgeDialog = () => {
    setState((draft) => {
      draft.showKnowledgeDialog = true;
    });
  };

  const goToKnowledgeList = (item: KnowledgeBase) => {
    router.push(`/knowledge-base/list/${item.id}`);
  };

  // 模拟数据
  const mockKnowledgeBases = [
    { id: "1", name: "产品知识库" },
    { id: "2", name: "技术文档" },
    { id: "3", name: "常见问题" },
    { id: "4", name: "业务流程" },
    { id: "5", name: "数据模型" },
    { id: "6", name: "分析指标" },
  ];

  useEffect(() => {
    setState((draft) => {
      draft.knowledgeBases = mockKnowledgeBases;
      draft.open = mockKnowledgeBases.length === 0;
    });
  }, []);

  const KnowledgeCard = ({ kb }: { kb: KnowledgeBase }) => (
    <div
      onClick={() => goToKnowledgeList(kb)}
      className="relative p-6 border border-[#E4E4E7] dark:border-[#27272A] rounded-[6px] hover:bg-[#F4F4F5] dark:hover:bg-[#303033] transition-colors cursor-pointer bg-white dark:bg-[#1D1D20] h-full group"
    >
      <div className="flex items-center justify-center gap-3 mb-2 w-[36px] h-[36px] bg-[#F1F1F1] dark:bg-[#979797] rounded-[50%]">
        <BookOpenText className="w-5 h-5 text-primary" />
      </div>
      <div className="text-[16px] break-words line-clamp-3" title={kb.name}>
        {kb.name}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute w-[24px] h-[24px] top-2 right-2 hover:bg-[#E9E9ED] dark:hover:bg-[#979797] opacity-0 group-hover:opacity-100 transition-opacity data-[state=open]:opacity-100"
          >
            <EllipsisVertical className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start">
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setState((draft) => {
                draft.renameKnowledgeDialog = kb;
              });
            }}
            className="cursor-pointer"
          >
            重命名
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setState((draft) => {
                draft.deleteKnowledgeDialog = kb;
              });
            }}
            className="cursor-pointer"
          >
            删除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return (
    <div className="flex bg-background h-full">
      <div className="flex-1 overflow-auto h-full p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">知识库</h1>
          <Button
            variant="default"
            className="h-8"
            onClick={openKnowledgeDialog}
          >
            新建知识库
          </Button>
        </div>
        <div className="h-[calc(100vh-160px)] overflow-auto">
          {state.knowledgeBases.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {state.knowledgeBases.map((kb) => (
                <KnowledgeCard key={kb.id} kb={kb} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              暂无知识库，创建一个开始吧！
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
