"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircleQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionPanelProps {
  onSelectQuestion?: (question: string) => void;
}

export default function QuestionPanel({ onSelectQuestion }: QuestionPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // 模拟常用问题数据
  const commonQuestions = [
    "帮我分析一下销售数据",
    "生成本月的销售报告",
    "对比上月和本月的业绩",
    "查看用户增长趋势",
  ];

  // 模拟知识库数据
  const knowledgeBase = [
    "如何使用数据分析功能",
    "报告模板说明",
    "数据源配置指南",
    "常见问题解答",
  ];

  // 模拟表字段数据
  const tableFields = [
    "用户表 - user_id",
    "用户表 - user_name",
    "订单表 - order_id",
    "订单表 - order_amount",
  ];

  const handleQuestionClick = (question: string) => {
    onSelectQuestion?.(question);
    setIsExpanded(false);
  };

  return (
    <>
      {/* 提问助手按钮 */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        size="sm"
        variant="ghost"
        className={cn(
          "ml-1 h-7 px-2 inline-flex items-center gap-1 text-xs font-normal",
          isExpanded ? "bg-accent" : ""
        )}
      >
        <MessageCircleQuestion className="w-[14px] h-[14px]" />
        提问助手
      </Button>

      {/* 浮动面板 */}
      {isExpanded && (
        <div
          className={cn(
            "flex flex-col right-[50px] bottom-[198px] z-[99] fixed transition-all duration-300",
            "bg-background border p-[16px] shadow-[0_6px_15px_0_rgba(0,0,0,0.08)] rounded-xl",
            "w-[360px] h-[480px]"
          )}
        >
          <Tabs defaultValue="common" className="w-full h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="common">常用问题</TabsTrigger>
              <TabsTrigger value="knowledge">知识库</TabsTrigger>
              <TabsTrigger value="fields">表字段</TabsTrigger>
            </TabsList>

            <TabsContent value="common" className="flex-1 overflow-y-auto mt-4">
              <div className="space-y-2">
                {commonQuestions.map((question, index) => (
                  <div
                    key={index}
                    onClick={() => handleQuestionClick(question)}
                    className="p-3 text-sm rounded-lg border cursor-pointer hover:bg-accent transition-colors"
                  >
                    {question}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="knowledge" className="flex-1 overflow-y-auto mt-4">
              <div className="space-y-2">
                {knowledgeBase.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleQuestionClick(item)}
                    className="p-3 text-sm rounded-lg border cursor-pointer hover:bg-accent transition-colors"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="fields" className="flex-1 overflow-y-auto mt-4">
              <div className="space-y-2">
                {tableFields.map((field, index) => (
                  <div
                    key={index}
                    onClick={() => handleQuestionClick(field)}
                    className="p-3 text-sm rounded-lg border cursor-pointer hover:bg-accent transition-colors font-mono"
                  >
                    {field}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
}
