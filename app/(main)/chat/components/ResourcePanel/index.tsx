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
            "fixed md:absolute right-4 top-[76px] z-50 transition-all",
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
            className="fixed inset-0 z-[48] bg-transparent"
            style={{ left: "240px" }}
          />
        )}

        {/* 资源面板 */}
        <div
          className={cn(
            "fixed right-4 top-[120px] z-[49] transition-all duration-300",
            "bg-background border border-border rounded-xl shadow-lg",
            "w-[380px] max-h-[calc(100vh-140px)]",
            isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <div className="p-4 border-b">
            <h3 className="font-semibold text-sm">历史消息</h3>
            <p className="text-xs text-muted-foreground mt-1">
              共 {userMessages.length} 条消息
            </p>
          </div>

          <div className="overflow-y-auto max-h-[calc(100vh-240px)] p-2">
            {userMessages.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
                暂无消息
              </div>
            ) : (
              <div className="space-y-1">
                {userMessages.map((message, index) => (
                  <div
                    key={message.id}
                    onClick={() => scrollToMessage(message.id)}
                    className={cn(
                      "p-3 rounded-lg cursor-pointer transition-colors",
                      "hover:bg-accent text-sm",
                      "border border-transparent hover:border-border"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-xs text-muted-foreground shrink-0 mt-0.5">
                        #{index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs line-clamp-2 break-words">
                          {message.content}
                        </p>
                        {message.createTime && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {message.createTime}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
);
