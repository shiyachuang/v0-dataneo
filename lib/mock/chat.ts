export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createTime: string;
  isLoading?: boolean;
}

export const mockMessages: Message[] = [
  {
    id: "1",
    role: "user",
    content: "请帮我分析一下销售数据",
    createTime: "2024-01-05 10:30:00",
  },
  {
    id: "2",
    role: "assistant",
    content: "好的，我来帮您分析销售数据。根据您提供的数据，我可以看到以下几个关键指标：\n\n1. **总销售额**：¥1,234,567\n2. **订单总数**：8,432\n3. **平均客单价**：¥146\n\n从数据趋势来看，销售额呈现稳定增长态势，移动端订单占比达到65%，建议继续优化移动端用户体验。",
    createTime: "2024-01-05 10:30:05",
  },
  {
    id: "3",
    role: "user",
    content: "能否给出更详细的区域分析？",
    createTime: "2024-01-05 10:31:00",
  },
  {
    id: "4",
    role: "assistant",
    content: "当然可以！以下是各区域的销售分析：\n\n**华东地区**：\n- 销售额占比：35%\n- 订单量：2,951\n- 增长率：+12.5%\n\n**华南地区**：\n- 销售额占比：28%\n- 订单量：2,361\n- 增长率：+25.3%（增长最快）\n\n**华北地区**：\n- 销售额占比：22%\n- 订单量：1,855\n- 增长率：+8.7%\n\n**西部地区**：\n- 销售额占比：15%\n- 订单量：1,265\n- 增长率：+5.2%\n\n建议重点关注华南地区的高增长趋势，同时加大西部地区的市场投入。",
    createTime: "2024-01-05 10:31:10",
  },
];

// 模拟 AI 回复生成器
export const generateMockResponse = (userInput: string): string => {
  const responses = [
    "我理解您的问题。让我为您分析一下...",
    "这是一个很好的问题！根据数据显示...",
    "好的，我来帮您处理这个请求。",
    "根据您提供的信息，我建议...",
    "让我为您查询相关数据...",
  ];

  // 简单的关键词匹配返回不同回复
  if (userInput.includes("数据") || userInput.includes("分析")) {
    return "根据您的数据分析需求，我为您生成了以下报告：\n\n**主要发现**：\n- 数据趋势呈现上升态势\n- 关键指标表现良好\n- 建议继续关注核心业务指标\n\n如需更详细的分析，请告诉我具体的分析维度。";
  }

  if (userInput.includes("报告") || userInput.includes("总结")) {
    return "我已经为您准备了详细的报告总结：\n\n**一、概述**\n整体表现符合预期，多项指标达成目标。\n\n**二、重点数据**\n- 核心业务增长率：+15.3%\n- 用户满意度：92%\n- 市场份额：提升2个百分点\n\n**三、建议**\n继续保持当前策略，加强用户体验优化。";
  }

  // 默认回复
  return responses[Math.floor(Math.random() * responses.length)] + "\n\n" +
         "您可以继续提问，我会尽力为您解答。";
};
