"use client"

import { useState, useCallback } from "react"
import { toast } from "sonner"

// 模拟表数据
const mockTableData = {
  id: "1",
  name: "销售数据表",
  alias: "sales_data",
  description: "这是一个包含销售数据的表格，包括产品销售额、客户信息等。",
  type: "file",
  dataMode: "local",
  dataRow: 1250,
  itemCount: 15,
  status: "normal",
  updateTime: "2024-01-15 10:30:00",
  synBeginTime: "2024-01-15 08:00:00",
  connectName: "本地数据库",
  sourceName: "sales_raw",
  config: JSON.stringify({ mode: 1 }),
  updateModeText: "全量读取全量替换 每天 08:00",
}

// 模拟字段数据
const mockFields = [
  {
    id: "f1",
    name: "order_id",
    alias: "订单ID",
    type: "string",
    description: "唯一订单标识符",
    sampleValue: JSON.stringify(["ORD-2024-001"]),
    className: "订单信息",
    subClassName: "基本信息",
    colType: "dimension",
    isDimension: "1",
    enable: 1,
  },
  {
    id: "f2",
    name: "customer_name",
    alias: "客户姓名",
    type: "string",
    description: "客户的全名",
    sampleValue: JSON.stringify(["张三"]),
    className: "客户信息",
    subClassName: "基本信息",
    colType: "dimension",
    isDimension: "1",
    enable: 1,
  },
  {
    id: "f3",
    name: "product_name",
    alias: "产品名称",
    type: "string",
    description: "购买的产品名称",
    sampleValue: JSON.stringify(["iPhone 15 Pro"]),
    className: "产品信息",
    subClassName: "基本信息",
    colType: "dimension",
    isDimension: "1",
    enable: 1,
  },
  {
    id: "f4",
    name: "quantity",
    alias: "数量",
    type: "number",
    description: "购买数量",
    sampleValue: JSON.stringify(["5"]),
    className: "订单信息",
    subClassName: "数量信息",
    colType: "metric",
    isDimension: "0",
    enable: 1,
  },
  {
    id: "f5",
    name: "unit_price",
    alias: "单价",
    type: "number",
    description: "产品单价",
    sampleValue: JSON.stringify(["9999.00"]),
    className: "价格信息",
    subClassName: "基本价格",
    colType: "metric",
    isDimension: "0",
    enable: 1,
  },
  {
    id: "f6",
    name: "total_amount",
    alias: "总金额",
    type: "number",
    description: "订单总金额",
    sampleValue: JSON.stringify(["49995.00"]),
    className: "价格信息",
    subClassName: "汇总价格",
    colType: "metric",
    isDimension: "0",
    enable: 1,
  },
  {
    id: "f7",
    name: "order_date",
    alias: "订单日期",
    type: "date",
    description: "订单创建日期",
    sampleValue: JSON.stringify(["2024-01-15"]),
    className: "时间信息",
    subClassName: "订单时间",
    colType: "dimension",
    isDimension: "1",
    enable: 1,
  },
  {
    id: "f8",
    name: "status",
    alias: "状态",
    type: "string",
    description: "订单状态",
    sampleValue: JSON.stringify(["已完成"]),
    className: "订单信息",
    subClassName: "状态信息",
    colType: "dimension",
    isDimension: "1",
    enable: 1,
  },
]

// 模拟预览数据
const generateMockPreviewData = () => {
  const columns = [
    { name: "order_id", alias: "订单ID" },
    { name: "customer_name", alias: "客户姓名" },
    { name: "product_name", alias: "产品名称" },
    { name: "quantity", alias: "数量" },
    { name: "unit_price", alias: "单价" },
    { name: "total_amount", alias: "总金额" },
    { name: "order_date", alias: "订单日期" },
    { name: "status", alias: "状态" },
  ]

  const data = Array.from({ length: 20 }, (_, i) => ({
    order_id: `ORD-2024-${String(i + 1).padStart(3, "0")}`,
    customer_name: ["张三", "李四", "王五", "赵六", "钱七"][i % 5],
    product_name: ["iPhone 15 Pro", "MacBook Pro", "iPad Air", "AirPods Pro", "Apple Watch"][i % 5],
    quantity: Math.floor(Math.random() * 10) + 1,
    unit_price: [9999, 14999, 4999, 1999, 2999][i % 5],
    total_amount: (Math.floor(Math.random() * 10) + 1) * [9999, 14999, 4999, 1999, 2999][i % 5],
    order_date: `2024-01-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
    status: ["已完成", "处理中", "已发货", "待付款"][i % 4],
  }))

  return { columns, data, total: 1250 }
}

// useDataDetail hook
export function useDataDetail(dataId: string) {
  const [tableData, setTableData] = useState<any>(mockTableData)
  const [overviewInfo, setOverviewInfo] = useState<any>({})
  const [loading, setLoading] = useState(false)

  const fetchTableData = useCallback(async () => {
    setLoading(true)
    // 模拟API调用
    await new Promise((resolve) => setTimeout(resolve, 500))
    setTableData({ ...mockTableData, id: dataId })
    setLoading(false)
  }, [dataId])

  const fetchGATables = useCallback(async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    const result = {
      tableInfo: { id: dataId, defaultColIds: "[]" },
      overviewInfo: { name: "GA数据源", showType: "Google Analytics" },
    }
    setOverviewInfo(result.overviewInfo)
    setLoading(false)
    return result
  }, [dataId])

  const saveTableData = useCallback(async (updates: any) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setTableData((prev: any) => ({ ...prev, ...updates }))
    toast.success("保存成功")
    setLoading(false)
  }, [])

  const updateTableData = useCallback((updates: any) => {
    setTableData((prev: any) => ({ ...prev, ...updates }))
  }, [])

  return {
    tableData,
    overviewInfo,
    loading,
    fetchTableData,
    fetchGATables,
    saveTableData,
    updateTableData,
  }
}

// useFields hook
export function useFields(dataId: string) {
  const [fields, setFields] = useState<any[]>([])
  const [selectedFields, setSelectedFields] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)

  const fetchFields = useCallback(async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setFields(mockFields)
    setLoading(false)
  }, [dataId])

  const setSelectedFieldsFromIds = useCallback(
    (ids: string[]) => {
      const selected = fields.filter((f) => ids.includes(f.id))
      setSelectedFields(selected)
    },
    [fields],
  )

  const saveFieldsDisplay = useCallback(async (selectedFields: any[]) => {
    setSaveLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setSelectedFields(selectedFields)
    toast.success("字段设置保存成功")
    setSaveLoading(false)
    return true
  }, [])

  const updateField = useCallback((updatedField: any) => {
    setFields((prev) => prev.map((f) => (f.id === updatedField.id ? { ...f, ...updatedField } : f)))
    toast.success("字段更新成功")
  }, [])

  return {
    fields,
    selectedFields,
    loading,
    saveLoading,
    fetchFields,
    setSelectedFieldsFromIds,
    saveFieldsDisplay,
    updateField,
  }
}

// usePreview hook
export function usePreview(dataId: string) {
  const [previewData, setPreviewData] = useState<any>({
    columns: [],
    data: [],
    total: 0,
    pageNum: 1,
    pageSize: 20,
    loading: false,
    updateTime: null,
  })

  const fetchPreviewData = useCallback(async (tableName?: string, pageNum?: number, pageSize?: number) => {
    setPreviewData((prev: any) => ({ ...prev, loading: true }))
    await new Promise((resolve) => setTimeout(resolve, 500))

    const mockData = generateMockPreviewData()
    setPreviewData((prev: any) => ({
      ...prev,
      columns: mockData.columns,
      data: mockData.data,
      total: mockData.total,
      pageNum: pageNum || prev.pageNum,
      pageSize: pageSize || prev.pageSize,
      loading: false,
      updateTime: new Date().toISOString(),
    }))
  }, [])

  const updatePagination = useCallback((pageNum: number, pageSize: number) => {
    setPreviewData((prev: any) => ({ ...prev, pageNum, pageSize }))
  }, [])

  return {
    previewData,
    fetchPreviewData,
    updatePagination,
  }
}
