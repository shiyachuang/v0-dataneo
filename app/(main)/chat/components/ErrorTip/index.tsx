"use client";

import { AlertCircle } from "lucide-react";

interface ErrorTipProps {
  message?: string;
  className?: string;
}

export default function ErrorTip({ message = "出错了", className = "" }: ErrorTipProps) {
  return (
    <div className={`flex flex-col items-center justify-center h-full ${className}`}>
      <AlertCircle className="w-12 h-12 text-destructive mb-2" />
      <span className="text-sm text-muted-foreground">{message}</span>
    </div>
  );
}
