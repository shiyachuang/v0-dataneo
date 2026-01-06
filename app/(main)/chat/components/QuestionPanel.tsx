"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircleQuestion, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import KnowledgeContent from "./KnowledgeContent";
import EmptyDataTip from "./EmptyDataTip";

interface QuestionPanelProps {
  onSelectQuestion?: (question: string) => void;
}

const class_name =
  "inline-flex items-center rounded-lg px-4 py-1.5 text-xs cursor-pointer border border-input bg-background hover:bg-muted";

export default function QuestionPanel({
  onSelectQuestion,
}: QuestionPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [activeQuestion, setActiveQuestion] = useState<any>(null);
  const [activeKnowledge, setActiveKnowledge] = useState<any>(null);
  const [activeTable, setActiveTable] = useState<any>(null);

  // 模拟个人常用问题数据
  const personsQuestion = [
    { id: "personal-1", name: "我的常用问题", type: 1, extType: 6 },
  ];

  // 模拟常见问题知识库
  const questionKnowledge = [
    { id: "q-1", name: "销售分析问题", type: 1, extType: 6 },
    { id: "q-2", name: "数据处理问题", type: 1, extType: 6 },
  ];

  // 模拟知识库数据
  const knowledgeData = [
    { id: "k-1", name: "术语库", type: 1, extType: 2 },
    { id: "k-2", name: "指标定义", type: 1, extType: 3 },
    { id: "k-3", name: "通用知识", type: 1, extType: 5 },
  ];

  // 模拟表字段数据
  const tableData = [
    {
      id: "t-1",
      name: "用户数据表",
      type: "table",
      extType: "mysql",
      fields: [
        { name: "user_id", desc: "用户ID", type: "string" },
        { name: "user_name", desc: "用户名", type: "string" },
        { name: "create_time", desc: "创建时间", type: "datetime" },
        { name: "email", desc: "邮箱", type: "string" },
      ],
    },
    {
      id: "t-2",
      name: "订单数据表",
      type: "table",
      extType: "mysql",
      fields: [
        { name: "order_id", desc: "订单ID", type: "string" },
        { name: "order_amount", desc: "订单金额", type: "number" },
        { name: "order_status", desc: "订单状态", type: "string" },
        { name: "user_id", desc: "用户ID", type: "string" },
        { name: "order_time", desc: "下单时间", type: "datetime" },
      ],
    },
    {
      id: "t-3",
      name: "产品数据表",
      type: "table",
      extType: "mysql",
      fields: [
        { name: "product_id", desc: "产品ID", type: "string" },
        { name: "product_name", desc: "产品名称", type: "string" },
        { name: "price", desc: "价格", type: "number" },
        { name: "stock", desc: "库存", type: "number" },
      ],
    },
  ];

  // 点击外部关闭面板
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target === overlayRef.current) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isExpanded]);

  // 初始化选中第一个
  useEffect(() => {
    if (!activeQuestion && personsQuestion.length > 0) {
      setActiveQuestion(personsQuestion[0]);
    }
    if (!activeKnowledge && knowledgeData.length > 0) {
      setActiveKnowledge(knowledgeData[0]);
    }
    if (!activeTable && tableData.length > 0) {
      setActiveTable(tableData[0]);
    }
  }, []);

  const handleQuestionClick = (question: string) => {
    onSelectQuestion?.(question);
    setIsExpanded(false);
  };

  const btnColor = "font-medium border-primary";

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              size="icon"
              variant="ghost"
              className={cn(
                "ml-1 w-auto h-7 px-2 inline-flex items-center gap-1 text-xs font-normal",
                isExpanded && "bg-accent"
              )}
            >
              <MessageCircleQuestion className="w-[14px] h-[14px]" />
              提问助手
            </Button>
          </TooltipTrigger>
          <TooltipContent>提问助手</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* 遮罩层 */}
      {isExpanded && (
        <div
          ref={overlayRef}
          className="fixed right-0 bottom-[128px] h-[100vh] z-[48] bg-transparent"
          style={{ width: "calc(100vw - 240px)" }}
        />
      )}

      {/* 主面板 */}
      <div
        className={cn(
          "flex flex-col right-[50px] bottom-[118px] z-[99] fixed transition-all duration-300",
          "bg-background border border-border p-4 shadow-[0_6px_15px_0_rgba(0,0,0,0.08)] rounded-xl",
          isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        style={{
          width: "calc(100vw - 332px)",
          height: "calc(100vh - 150px)",
        }}
      >
        <div className="overflow-y-auto w-full h-full">
          <Tabs defaultValue="question" className="text-center w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="question">常见问题</TabsTrigger>
              <TabsTrigger value="knowledge">知识</TabsTrigger>
              <TabsTrigger value="table">表字段</TabsTrigger>
            </TabsList>

            {/* 常见问题标签页 */}
            <TabsContent value="question" className="text-left">
              <div className="w-full flex mb-4 flex-wrap gap-2">
                <span
                  className={cn(
                    class_name,
                    "p-0 bg-transparent border-0 rounded-full"
                  )}
                >
                  <span className="p-1.5 rounded-full bg-primary/15">
                    <Plus className="h-4 w-4 text-primary" />
                  </span>
                </span>
                {personsQuestion.map((item) => (
                  <span
                    key={item.id}
                    onClick={() => setActiveQuestion(item)}
                    className={cn(
                      class_name,
                      activeQuestion?.id === item.id
                        ? btnColor
                        : "text-muted-foreground"
                    )}
                  >
                    {item.name}
                  </span>
                ))}
                {questionKnowledge.map((item) => (
                  <span
                    key={item.id}
                    onClick={() => setActiveQuestion(item)}
                    className={cn(
                      class_name,
                      activeQuestion?.id === item.id
                        ? btnColor
                        : "text-muted-foreground"
                    )}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
              <div className="border-b mb-4"></div>
              <div className="mb-3">
                <h1 className="text-base font-semibold truncate">
                  {activeQuestion?.name}
                </h1>
              </div>
              {activeQuestion && <KnowledgeContent info={activeQuestion} />}
            </TabsContent>

            {/* 知识标签页 */}
            <TabsContent value="knowledge" className="text-left">
              <div className="w-full flex mb-4 flex-wrap gap-2">
                <span
                  className={cn(
                    class_name,
                    "p-0 bg-transparent border-0 rounded-full"
                  )}
                >
                  <span className="p-1.5 rounded-full bg-primary/15">
                    <Plus className="h-4 w-4 text-primary" />
                  </span>
                </span>
                {knowledgeData.map((item) => (
                  <span
                    key={item.id}
                    onClick={() => setActiveKnowledge(item)}
                    className={cn(
                      class_name,
                      activeKnowledge?.id === item.id
                        ? btnColor
                        : "text-muted-foreground"
                    )}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
              <div className="border-b mb-4"></div>
              {activeKnowledge?.name && (
                <div className="mb-3">
                  <h1 className="text-base font-semibold truncate">
                    {activeKnowledge.name}
                  </h1>
                </div>
              )}
              {activeKnowledge ? (
                <KnowledgeContent info={activeKnowledge} />
              ) : (
                <EmptyDataTip className="min-h-[calc(100vh-300px)]">
                  <Button className="mt-4 h-8">创建知识库</Button>
                </EmptyDataTip>
              )}
            </TabsContent>

            {/* 表字段标签页 */}
            <TabsContent value="table" className="text-left">
              <div className="flex flex-wrap mb-4 gap-2">
                <span
                  className={cn(
                    class_name,
                    "p-0 bg-transparent border-0 rounded-full"
                  )}
                >
                  <span className="p-1.5 rounded-full bg-primary/15">
                    <Plus className="h-4 w-4 text-primary" />
                  </span>
                </span>
                {tableData.map((item) => (
                  <span
                    key={item.id}
                    onClick={() => setActiveTable(item)}
                    className={cn(
                      class_name,
                      activeTable?.id === item.id
                        ? btnColor
                        : "text-muted-foreground"
                    )}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
              <div className="border-b mb-4"></div>
              {activeTable && (
                <>
                  <div className="mb-3">
                    <h1 className="text-base font-semibold truncate">
                      {activeTable.name}
                    </h1>
                  </div>
                  <div className="space-y-2">
                    {activeTable.fields?.map((field: any, index: number) => (
                      <div
                        key={index}
                        onClick={() =>
                          handleQuestionClick(
                            `${activeTable.name}.${field.name}`
                          )
                        }
                        className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-accent transition-colors"
                      >
                        <div className="flex-1">
                          <div className="font-mono text-xs font-medium">
                            {field.name}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {field.desc} · {field.type}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
