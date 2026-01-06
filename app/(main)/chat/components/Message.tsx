"use client";

import { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconCopy, IconLoader } from "@tabler/icons-react";
import {
  RotateCw,
  MoreVertical,
  Download,
  Image as ImageIcon,
  FileText,
  Code
} from "lucide-react";
import { toast } from "sonner";
import { Message as MessageType } from "@/lib/mock/chat";
import ReactECharts from "echarts-for-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import "katex/dist/katex.min.css";
import DataTable from "./DataTable";

interface MessageProps {
  message: MessageType;
  onRetry?: () => void;
}

export default function Message({ message, onRetry }: MessageProps) {
  const isUser = message.role === "user";
  const [showActions, setShowActions] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    toast.success("已复制到剪贴板");
  };

  const handleRetry = () => {
    onRetry?.();
    toast.info("正在重新生成...");
  };

  const handleExportImage = () => {
    toast.success("导出图片功能开发中...");
  };

  const handleExportPPT = () => {
    toast.success("导出PPT功能开发中...");
  };

  const handleViewSQL = () => {
    toast.info("SQL查看功能开发中...");
  };

  // 渲染表格 - 使用 DataTable 组件
  const renderTable = () => {
    if (!message.tableData) return null;
    const { columns, data } = message.tableData;

    // 转换数据格式为 DataTable 所需的格式
    const tableData = data.map((row) => {
      const obj: Record<string, any> = {};
      columns.forEach((col) => {
        obj[col.title] = row[col.dataIndex];
      });
      return obj;
    });

    return (
      <div className="my-4">
        <DataTable data={tableData} title="数据查询结果" />
      </div>
    );
  };

  // 渲染图表
  const renderChart = () => {
    if (!message.chartData) return null;
    const { option } = message.chartData;

    return (
      <div className="my-4">
        {/* 图表容器 */}
        <div className="rounded-lg border bg-white dark:bg-[#1a1a1a] overflow-hidden">
          {/* 图表标题栏 */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="text-base font-normal text-foreground">
              {option.title?.text || "数据可视化"}
            </div>
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={handleExportImage}
                    >
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>导出为图片</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={handleExportPPT}
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>导出为PPT</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleViewSQL}>
                    <Code className="h-4 w-4 mr-2" />
                    查看SQL
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExportImage}>
                    <Download className="h-4 w-4 mr-2" />
                    下载数据
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* 图表内容 */}
          <div className="p-4">
            <ReactECharts
              option={option}
              style={{ height: "283px", width: "100%" }}
              opts={{ renderer: "svg" }}
              notMerge={true}
              lazyUpdate={true}
            />
          </div>
        </div>
      </div>
    );
  };

  // 渲染 Markdown 内容
  const renderMarkdown = () => {
    return (
      <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-semibold prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-p:leading-relaxed prose-pre:bg-transparent prose-pre:p-0 prose-pre:text-sm">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            // 自定义代码块样式
            code({ node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || "");
              const language = match ? match[1] : "";

              if (inline) {
                return (
                  <code
                    className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono text-foreground"
                    {...props}
                  >
                    {children}
                  </code>
                );
              }

              return (
                <div className="my-3 rounded-lg overflow-hidden border bg-[#1e1e1e]">
                  {language && (
                    <div className="px-4 py-2 bg-muted/50 border-b text-xs text-muted-foreground">
                      {language}
                    </div>
                  )}
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={language || "text"}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      padding: "1rem",
                      background: "#1e1e1e",
                      fontSize: "0.875rem",
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
              );
            },
            // 自定义表格样式
            table({ children }) {
              return (
                <div className="my-4 overflow-x-auto rounded-lg border">
                  <table className="w-full border-collapse">{children}</table>
                </div>
              );
            },
            thead({ children }) {
              return (
                <thead className="bg-muted/50">{children}</thead>
              );
            },
            th({ children }) {
              return (
                <th className="border-b border-border px-3 py-2 font-semibold text-left text-sm">
                  {children}
                </th>
              );
            },
            tr({ children }) {
              return (
                <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                  {children}
                </tr>
              );
            },
            td({ children }) {
              return (
                <td className="px-3 py-2 text-sm">{children}</td>
              );
            },
            // 自定义列表样式
            ul({ children }) {
              return <ul className="my-2 list-disc list-inside space-y-1">{children}</ul>;
            },
            ol({ children }) {
              return <ol className="my-2 list-decimal list-inside space-y-1">{children}</ol>;
            },
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    );
  };

  // 渲染普通文本
  const renderText = () => {
    return <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>;
  };

  // 根据数据类型渲染内容
  const renderContent = () => {
    if (message.isLoading) {
      return (
        <div className="flex items-center gap-2 text-muted-foreground py-2">
          <IconLoader className="animate-spin h-4 w-4" />
          <span className="text-sm">思考中...</span>
        </div>
      );
    }

    switch (message.dataType) {
      case "table":
        return (
          <>
            {message.content && (
              <div className="mb-2 text-sm">{message.content}</div>
            )}
            {renderTable()}
          </>
        );
      case "chart":
        return (
          <>
            {message.content && (
              <div className="mb-2 text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
              </div>
            )}
            {renderChart()}
          </>
        );
      case "markdown":
        return renderMarkdown();
      case "text":
      default:
        return renderText();
    }
  };

  return (
    <div
      className="message-item max-w-[848px] px-4 pb-2 mx-auto relative"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {isUser ? (
        // 用户消息（右对齐）
        <div className="flex justify-end mb-5">
          <div className="max-w-[66.6%] w-auto p-0">
            <div className="rounded-lg px-4 py-3 bg-primary text-primary-foreground break-words text-sm">
              {message.content}
            </div>
          </div>
        </div>
      ) : (
        // AI 消息（左对齐）
        <>
          <div className="flex justify-start pr-[40px] mb-5">
            {/* AI 头像 */}
            <div className="mr-4 shrink-0 pt-[7px]">
              <Avatar className="w-[32px] h-[32px] bg-gradient-to-b from-white to-[#F2F2F2]">
                <AvatarImage src="/icon-light-32x32.png" />
              </Avatar>
            </div>

            {/* 消息内容 */}
            <div className="w-[calc(100%-48px)]">
              <div className="rounded-lg px-4 py-3 bg-[#F7F7F8] dark:bg-[#27272A]">
                {renderContent()}
              </div>
            </div>
          </div>

          {/* 消息操作按钮（hover 显示） */}
          {!message.isLoading && (
            <div
              className={`flex gap-3 items-center absolute left-[52px] bottom-[-20px] transition-opacity duration-200 ${
                showActions ? "opacity-100" : "opacity-20"
              }`}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 p-0 hover:text-primary"
                      onClick={handleCopy}
                    >
                      <IconCopy className="h-3.5 w-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>复制</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 p-0 hover:text-primary"
                      onClick={handleRetry}
                    >
                      <RotateCw className="h-3.5 w-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>重新生成</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <span className="text-xs text-muted-foreground ml-auto">
                {message.createTime}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
