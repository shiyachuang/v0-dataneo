"use client";

import { ArrowUpRight } from "lucide-react";

interface EmptyDataTipProps {
  children?: React.ReactNode;
  className?: string;
}

export default function EmptyDataTip({ children, className = "" }: EmptyDataTipProps) {
  return (
    <div className={`flex flex-col items-center justify-center h-full ${className}`}>
      <span className="text-lg">暂无数据</span>
      {children ? children : (
        <>
          <span className="mt-2 text-muted-foreground text-sm">请添加数据源或知识库开始使用</span>
          <ArrowUpRight className="w-8 h-8 mt-2 text-muted-foreground" />
        </>
      )}
    </div>
  );
}
