export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createTime: string;
  isLoading?: boolean;
  // 数据类型：text | table | chart | markdown
  dataType?: "text" | "table" | "chart" | "markdown";
  // 表格数据
  tableData?: {
    columns: Array<{ title: string; dataIndex: string; key: string }>;
    data: Array<Record<string, any>>;
  };
  // 图表数据
  chartData?: {
    type: "bar" | "line" | "pie";
    option: any;
  };
}

export const mockMessages: Message[] = [
  {
    id: "1",
    role: "user",
    content: "请帮我分析一下销售数据",
    createTime: "01-05 10:30",
    dataType: "text",
  },
  {
    id: "2",
    role: "assistant",
    content:
      "好的，我来帮您分析销售数据。根据您提供的数据，我可以看到以下几个关键指标：\n\n**总销售额**：¥1,234,567\n\n**订单总数**：8,432\n\n**平均客单价**：¥146\n\n从数据趋势来看，销售额呈现稳定增长态势，移动端订单占比达到65%，建议继续优化移动端用户体验。",
    createTime: "01-05 10:30",
    dataType: "markdown",
  },
  {
    id: "3",
    role: "user",
    content: "能否给出更详细的区域销售数据表格？",
    createTime: "01-05 10:31",
    dataType: "text",
  },
  {
    id: "4",
    role: "assistant",
    content: "当然可以！以下是各区域的详细销售数据表格：",
    createTime: "01-05 10:31",
    dataType: "table",
    tableData: {
      columns: [
        { title: "区域", dataIndex: "region", key: "region" },
        { title: "销售额", dataIndex: "sales", key: "sales" },
        { title: "订单量", dataIndex: "orders", key: "orders" },
        { title: "增长率", dataIndex: "growth", key: "growth" },
        { title: "市场份额", dataIndex: "share", key: "share" },
      ],
      data: [
        {
          key: "1",
          region: "华东地区",
          sales: "¥432,098",
          orders: "2,951",
          growth: "+12.5%",
          share: "35%",
        },
        {
          key: "2",
          region: "华南地区",
          sales: "¥345,678",
          orders: "2,361",
          growth: "+25.3%",
          share: "28%",
        },
        {
          key: "3",
          region: "华北地区",
          sales: "¥271,604",
          orders: "1,855",
          growth: "+8.7%",
          share: "22%",
        },
        {
          key: "4",
          region: "西部地区",
          sales: "¥185,187",
          orders: "1,265",
          growth: "+5.2%",
          share: "15%",
        },
      ],
    },
  },
  {
    id: "5",
    role: "user",
    content: "用图表展示一下这些数据",
    createTime: "01-05 10:32",
    dataType: "text",
  },
  {
    id: "6",
    role: "assistant",
    content: "我为您生成了区域销售对比柱状图：",
    createTime: "01-05 10:32",
    dataType: "chart",
    chartData: {
      type: "bar",
      option: {
        title: {
          text: "各区域销售对比",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          data: ["华东地区", "华南地区", "华北地区", "西部地区"],
        },
        yAxis: {
          type: "value",
          name: "销售额（万元）",
        },
        series: [
          {
            name: "销售额",
            type: "bar",
            data: [43.2, 34.5, 27.1, 18.5],
            itemStyle: {
              color: "#3b82f6",
            },
          },
        ],
      },
    },
  },
];

// 模拟 AI 回复生成器
export const generateMockResponse = (userInput: string): Message => {
  const baseTime = new Date().toLocaleString("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  // 简单的关键词匹配返回不同类型的回复
  if (userInput.includes("表格") || userInput.includes("数据")) {
    return {
      id: "",
      role: "assistant",
      content: "根据您的需求，我为您生成了数据表格：",
      createTime: baseTime,
      dataType: "table",
      tableData: {
        columns: [
          { title: "产品名称", dataIndex: "product", key: "product" },
          { title: "销售量", dataIndex: "quantity", key: "quantity" },
          { title: "销售额", dataIndex: "amount", key: "amount" },
          { title: "同比增长", dataIndex: "growth", key: "growth" },
        ],
        data: [
          {
            key: "1",
            product: "产品 A",
            quantity: "1,245",
            amount: "¥124,500",
            growth: "+15.2%",
          },
          {
            key: "2",
            product: "产品 B",
            quantity: "987",
            amount: "¥98,700",
            growth: "+22.8%",
          },
          {
            key: "3",
            product: "产品 C",
            quantity: "2,156",
            amount: "¥215,600",
            growth: "+8.5%",
          },
          {
            key: "4",
            product: "产品 D",
            quantity: "756",
            amount: "¥75,600",
            growth: "+12.1%",
          },
        ],
      },
    };
  }

  if (userInput.includes("图表") || userInput.includes("可视化")) {
    return {
      id: "",
      role: "assistant",
      content: "我为您生成了数据可视化图表：",
      createTime: baseTime,
      dataType: "chart",
      chartData: {
        type: "line",
        option: {
          title: {
            text: "月度销售趋势",
            left: "center",
          },
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category",
            data: ["1月", "2月", "3月", "4月", "5月", "6月"],
          },
          yAxis: {
            type: "value",
            name: "销售额（万元）",
          },
          series: [
            {
              name: "销售额",
              type: "line",
              smooth: true,
              data: [32, 45, 38, 52, 48, 65],
              itemStyle: {
                color: "#10b981",
              },
              areaStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(16, 185, 129, 0.3)",
                    },
                    {
                      offset: 1,
                      color: "rgba(16, 185, 129, 0.05)",
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    };
  }

  if (
    userInput.includes("分析") ||
    userInput.includes("报告") ||
    userInput.includes("总结")
  ) {
    return {
      id: "",
      role: "assistant",
      content: `根据您的数据分析需求，我为您生成了以下报告：

## 主要发现

1. **整体趋势**：数据呈现稳定上升态势
2. **关键指标**：所有核心业务指标表现良好
3. **增长动力**：主要来自华南地区和移动端用户

## 详细分析

### 销售数据分析
- 总销售额：**¥1,234,567**
- 环比增长：**+12.3%**
- 目标完成率：**103.5%**

### 用户行为分析
- 活跃用户数：**8,432人**
- 复购率：**65%**
- 平均客单价：**¥146**

## 建议

1. 继续加强华南地区市场投入
2. 优化移动端用户体验
3. 提升复购率和用户粘性`,
      createTime: baseTime,
      dataType: "markdown",
    };
  }

  // 默认文本回复
  const responses = [
    "我理解您的问题。让我为您分析一下...",
    "这是一个很好的问题！根据数据显示...",
    "好的，我来帮您处理这个请求。",
    "根据您提供的信息，我建议...",
    "让我为您查询相关数据...",
  ];

  return {
    id: "",
    role: "assistant",
    content:
      responses[Math.floor(Math.random() * responses.length)] +
      "\n\n" +
      "您可以继续提问，我会尽力为您解答。",
    createTime: baseTime,
    dataType: "text",
  };
};
