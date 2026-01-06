"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconCopy, IconLoader } from "@tabler/icons-react";
import { toast } from "sonner";
import { Message as MessageType } from "@/lib/mock/chat";

interface MessageProps {
  message: MessageType;
}

export default function Message({ message }: MessageProps) {
  if (!message) {
    console.log("[v0] Message component received undefined message");
    return null;
  }

  const isUser = message.role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    toast.success("已复制到剪贴板");
  };

  return (
    <div className="message-item max-w-[848px] px-4 pb-2 mx-auto">
      {isUser ? (
        // 用户消息（右对齐）
        <div className="flex justify-end mb-5">
          <div className="max-w-[66.6%] w-auto p-0">
            <div className="rounded-lg px-3 py-2 bg-primary text-primary-foreground break-words text-sm">
              {message.content}
            </div>
          </div>
        </div>
      ) : (
        // AI 消息（左对齐）
        <div className="flex justify-start pr-[40px] mb-5">
          {/* AI 头像 */}
          <div className="mr-4 shrink-0 pt-[7px]">
            <Avatar className="w-[32px] h-[32px] bg-gradient-to-b from-white to-[#F2F2F2]">
              <AvatarImage src="/icon-light-32x32.png" />
            </Avatar>
          </div>

          {/* 消息内容 */}
          <div className="w-[calc(100%-48px)]">
            <div className="rounded-lg px-3 py-2 bg-[#F7F7F8] dark:bg-[#27272A] break-words whitespace-pre-wrap text-sm">
              {message.isLoading ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <IconLoader className="animate-spin h-4 w-4" />
                  <span className="text-sm">思考中...</span>
                </div>
              ) : (
                message.content
              )}
            </div>
          </div>
        </div>
      )}

      {/* 消息操作按钮（hover 显示） */}
      {!message.isLoading && (
        <div className="flex gap-4 -mt-[14px] justify-end pr-[40px]">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="message-time hover:bg-accent cursor-pointer w-6 h-6"
                  onClick={handleCopy}
                >
                  <IconCopy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>复制</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <span className="message-time text-[12px] text-[#A4A4AC] flex items-center">
            {message.createTime}
          </span>
        </div>
      )}

      <style jsx>{`
        .message-time {
          opacity: 0;
          transition: opacity 0.2s;
        }
        .message-item:hover .message-time {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
