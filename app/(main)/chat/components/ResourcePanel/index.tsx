"use client";

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { Button } from "@/components/ui/button";
import { IconFileText } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Message as MessageType } from "@/lib/mock/chat";

interface ResourcePanelProps {
  messages: MessageType[];
  isOpen?: boolean;
}

export default forwardRef<{ setOpen: (open: boolean) => void }, ResourcePanelProps>(
  function ResourcePanel({ messages, isOpen = false }, ref) {
    const [isExpanded, setIsExpanded] = useState(isOpen);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setIsExpanded(isOpen);
    }, [isOpen]);

    useImperativeHandle(ref, () => ({
      setOpen: (open: boolean) => setIsExpanded(open),
    }));

    // 跳转到指定消息
    const scrollToMessage = (messageId: string) => {
      const element = document.getElementById(messageId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        // 添加高亮效果
        element.classList.add("highlight-message");
        setTimeout(() => {
          element.classList.remove("highlight-message");
        }, 2000);
      }
    };

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

    // 过滤用户消息
    const userMessages = messages.filter((msg) => msg.role === "user" && !msg.isLoading);

    return (
      <>
        {/* 切换按钮 */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "fixed md:absolute right-0 -translate-x-1/2 top-[10px] md:-top-14 z-50 transition-all ease-linear hover:bg-accent/50",
            isExpanded && "bg-accent"
          )}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <IconFileText className="h-4 w-4" />
        </Button>

        {/* 遮罩层 */}
        {isExpanded && (
          <div
            ref={overlayRef}
            className="absolute w-[calc(100vw-300px)] h-[100vh] z-[48] bg-transparent"
          />
        )}

        {/* 资源面板 */}
        <div
          className={cn(
            "flex flex-col right-[17px] z-[49] absolute transition-all duration-300 h-[calc(100vh-80px)]",
            "bg-background border py-[20px] border-[#E4E4E7] shadow-[0_6px_15px_0_rgba(0,0,0,0.08)] rounded-xl dark:border-[#27272A]",
            isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <div
            className={cn(
              "overflow-y-auto w-[calc(100vw-40px)] md:w-[380px]",
              isExpanded ? "" : "hidden"
            )}
          >
            <div className="px-2 min-h-[200px]">
              {userMessages.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
                  暂无消息
                </div>
              ) : (
                <div className="space-y-0.5">
                  {userMessages.map((message, index) => (
                    <div
                      key={message.id}
                      onClick={() => scrollToMessage(message.id)}
                      className={cn(
                        "flex items-center w-full group min-h-[24px] px-2 py-1 rounded cursor-pointer transition-colors",
                        "hover:bg-muted"
                      )}
                    >
                      <span
                        className="flex-1 file-name truncate text-xs text-[#71717A] dark:text-[#A1A1AA]"
                        title={message.content}
                      >
                        {message.content}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
);
