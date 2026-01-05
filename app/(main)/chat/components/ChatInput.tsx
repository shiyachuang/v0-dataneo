"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconPlus } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import QuestionPanel from "./QuestionPanel";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  disabled = false,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 自动调整高度
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "49px";
      const scrollHeight = Math.min(textarea.scrollHeight, 200);
      textarea.style.height = `${scrollHeight}px`;
    }
  }, [value]);

  // 按键处理
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // 跳过输入法组合
    if (event.nativeEvent.isComposing) return;

    // Shift/Cmd + Enter: 换行
    if ((event.shiftKey || event.metaKey) && event.key === "Enter") {
      return; // 允许默认换行行为
    }

    // Enter: 发送消息
    if (!event.shiftKey && !event.metaKey && event.key === "Enter") {
      event.preventDefault();
      if (value.trim() && !disabled) {
        onSend();
      }
    }
  };

  return (
    <div
      className={cn(
        "w-full",
        "border border-[#E4E4E7] bg-background",
        "dark:border-[#27272A]",
        "shadow-[0_6px_15px_0_rgba(0,0,0,0.08)]",
        "rounded-[12px]",
        "relative flex flex-col overflow-hidden"
      )}
    >
      {/* Textarea 输入框 */}
      <textarea
        ref={textareaRef}
        placeholder="请输入你的问题..."
        className={cn(
          "w-full p-4 text-sm",
          "bg-transparent",
          "focus:outline-none",
          "placeholder:text-muted-foreground",
          "resize-none block overflow-y-auto",
          "dark:text-[#fff]"
        )}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        disabled={disabled}
      />

      {/* 底部工具栏 */}
      <div className="h-[40px] relative">
        {/* 左侧按钮组 */}
        <div className="absolute left-[9px] bottom-[9px] bg-background flex items-center gap-1">
          {/* 添加资源按钮 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                disabled={disabled}
              >
                <IconPlus className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>上传本地数据</DropdownMenuItem>
              <DropdownMenuItem>从数据源添加</DropdownMenuItem>
              <DropdownMenuItem>选择知识文件</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 提问助手按钮 */}
          <QuestionPanel onSelectQuestion={onChange} />
        </div>

        {/* 右侧发送按钮 */}
        <Button
          className={cn(
            "absolute right-[9px] bottom-[9px]",
            "h-[30px] w-[30px] p-0",
            "rounded-full"
          )}
          disabled={!value.trim() || disabled}
          onClick={onSend}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
