"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import Message from "../../components/Message";
import ChatInput from "../../components/ChatInput";
import {
  mockMessages,
  generateMockResponse,
  Message as MessageType,
} from "@/lib/mock/chat";
import { nanoid } from "nanoid";

interface WorkspaceConversationPageProps {
  params: {
    id: string;
    conversationId: string;
  };
}

export default function WorkspaceConversationPage({
  params,
}: WorkspaceConversationPageProps) {
  const [messages, setMessages] = useState<MessageType[]>(mockMessages);
  const [inputValue, setInputValue] = useState("");
  const [userScrolled, setUserScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 滚动到底部
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior,
      });
    }
  };

  // 检测用户滚动
  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 100;
    setUserScrolled(!isAtBottom);
  };

  // 新消息自动滚动
  useEffect(() => {
    if (!userScrolled) {
      scrollToBottom();
    }
  }, [messages, userScrolled]);

  // 发送消息
  const handleSend = () => {
    if (!inputValue.trim()) return;

    // 添加用户消息
    const userMessage: MessageType = {
      id: nanoid(),
      role: "user",
      content: inputValue,
      createTime: new Date().toLocaleString("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      dataType: "text",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // 添加加载中的 AI 消息
    const loadingMessage: MessageType = {
      id: nanoid(),
      role: "assistant",
      content: "",
      createTime: "",
      isLoading: true,
      dataType: "text",
    };

    setMessages((prev) => [...prev, loadingMessage]);

    // 模拟 AI 回复（1.5秒延迟）
    setTimeout(() => {
      const aiResponse = generateMockResponse(inputValue);
      const aiMessage: MessageType = {
        ...aiResponse,
        id: nanoid(),
      };

      setMessages((prev) => {
        // 移除加载消息，添加真实 AI 回复
        const withoutLoading = prev.filter((m) => !m.isLoading);
        return [...withoutLoading, aiMessage];
      });
    }, 1500);
  };

  return (
    <div className="bg-background h-[calc(100vh)] flex fixed top-0 right-0 bottom-0 left-[240px]">
      <div className="flex flex-1 flex-col h-[calc(100vh-64px)] mt-[64px] relative">
        {/* 消息滚动区域 */}
        <div
          ref={scrollRef}
          className="overflow-y-auto flex-1"
          onScroll={handleScroll}
        >
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>

        {/* 滚动到底部按钮 */}
        {userScrolled && (
          <div className="flex justify-center mb-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full shadow-lg"
              onClick={() => scrollToBottom()}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* 输入区域 */}
        <div className="p-4 pt-0 max-w-[848px] mx-auto w-full">
          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSend}
            disabled={messages.some((m) => m.isLoading)}
          />
        </div>
      </div>
    </div>
  );
}
