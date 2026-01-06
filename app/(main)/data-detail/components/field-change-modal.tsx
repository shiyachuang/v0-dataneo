"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ChevronRight, ChevronDown } from "lucide-react"

interface TreeNodeProps {
  node: any
  level?: number
  selectedFields: any[]
  toggleField: (field: any) => void
  toggleCategory: (key: string) => void
  expandedCategories: Record<string, boolean>
  maxDimensionFields: number
  maxMetricFields: number
}

// 树节点组件
function TreeNode({
  node,
  level = 0,
  selectedFields,
  toggleField,
  toggleCategory,
  expandedCategories,
  maxDimensionFields,
  maxMetricFields,
}: TreeNodeProps) {
  const isExpanded = expandedCategories[node.key]
  const hasChildren = node.children && node.children.length > 0

  const isChecked = node.type === "field" && selectedFields.some((f) => f.id === node.data.id)

  const isDisabled =
    node.type === "field" &&
    (() => {
      const isSelected = selectedFields.some((f) => f.id === node.data.id)
      if (isSelected) return false

      const isDimension = node.data.colType === "dimension" || node.data.isDimension === "1"
      const currentDimensionCount = selectedFields.filter(
        (f) => f.colType === "dimension" || f.isDimension === "1",
      ).length
      const currentMetricCount = selectedFields.filter((f) => f.colType === "metric" || f.isDimension === "0").length

      if (isDimension && currentDimensionCount >= maxDimensionFields) {
        return true
      }
      if (!isDimension && currentMetricCount >= maxMetricFields) {
        return true
      }
      return false
    })()

  return (
    <div>
      <div
        className="flex items-center py-1 px-2 hover:bg-muted/50 rounded"
        style={{ paddingLeft: `${level * 20 + 8}px` }}
      >
        {hasChildren && (
          <button className="mr-1 p-0.5 hover:bg-muted rounded" onClick={() => toggleCategory(node.key)}>
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        )}
        {!hasChildren && <span className="w-5 mr-1" />}

        {node.type === "field" ? (
          <Checkbox
            id={node.key}
            checked={isChecked}
            disabled={isDisabled}
            onCheckedChange={() => toggleField(node.data)}
          />
        ) : (
          <span className="w-4" />
        )}

        <label htmlFor={node.key} className="ml-2 text-sm font-medium leading-none cursor-pointer flex-1">
          {node.label}
        </label>
      </div>

      {isExpanded &&
        hasChildren &&
        node.children.map((child: any) => (
          <TreeNode
            key={child.key}
            node={child}
            level={level + 1}
            selectedFields={selectedFields}
            toggleField={toggleField}
            toggleCategory={toggleCategory}
            expandedCategories={expandedCategories}
            maxDimensionFields={maxDimensionFields}
            maxMetricFields={maxMetricFields}
          />
        ))}
    </div>
  )
}

interface FieldChangeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  fields: any[]
  initialSelected: string[]
  onSave: (selectedFields: any[]) => Promise<void>
  loading: boolean
}

export default function FieldChangeModal({
  open,
  onOpenChange,
  fields,
  initialSelected,
  onSave,
  loading,
}: FieldChangeModalProps) {
  const [searchDimensions, setSearchDimensions] = useState("")
  const [searchMetrics, setSearchMetrics] = useState("")
  const [selectedFields, setSelectedFields] = useState<any[]>([])
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})

  const MAX_DIMENSION_FIELDS = 9
  const MAX_METRIC_FIELDS = 9

  useEffect(() => {
    const initialSel = initialSelected ? fields.filter((field) => initialSelected.includes(field.id)) : []
    setSelectedFields(initialSel)
  }, [initialSelected, fields])

  // 区分维度和指标字段
  const dimensionFields = fields.filter((field) => field.colType === "dimension" || field.isDimension === "1")
  const metricFields = fields.filter((field) => field.colType === "metric" || field.isDimension === "0")

  // 构建树形结构
  const buildTree = (fieldsList: any[]) => {
    const tree: Record<string, Record<string, any[]>> = {}

    fieldsList.forEach((field) => {
      const className = field.className || "未分类"
      const subClassName = field.subClassName || "其他"

      if (!tree[className]) {
        tree[className] = {}
      }

      if (!tree[className][subClassName]) {
        tree[className][subClassName] = []
      }

      tree[className][subClassName].push(field)
    })

    const treeNodes: any[] = []
    Object.keys(tree)
      .sort()
      .forEach((className) => {
        const classNode = {
          key: `class-${className}`,
          label: className,
          type: "class",
          children: [] as any[],
        }

        Object.keys(tree[className])
          .sort()
          .forEach((subClassName) => {
            const subClassNode = {
              key: `subclass-${className}-${subClassName}`,
              label: subClassName,
              type: "subclass",
              children: [] as any[],
            }

            tree[className][subClassName].forEach((field, index) => {
              subClassNode.children.push({
                key: `field-${field.id}-${index}`,
                label: field.name + (field.alias ? ` (${field.alias})` : ""),
                type: "field",
                data: field,
              })
            })

            classNode.children.push(subClassNode)
          })

        treeNodes.push(classNode)
      })

    return treeNodes
  }

  const toggleCategory = (key: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const filterFields = (fieldsList: any[], searchTerm: string) => {
    if (!searchTerm) return fieldsList
    return fieldsList.filter(
      (field) =>
        field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (field.alias && field.alias.toLowerCase().includes(searchTerm.toLowerCase())),
    )
  }

  const filteredDimensionFields = filterFields(dimensionFields, searchDimensions)
  const filteredMetricFields = filterFields(metricFields, searchMetrics)

  const dimensionTree = buildTree(filteredDimensionFields)
  const metricTree = buildTree(filteredMetricFields)

  const toggleField = (field: any) => {
    setSelectedFields((prev) => {
      const isSelected = prev.some((f) => f.id === field.id)
      if (isSelected) {
        return prev.filter((f) => f.id !== field.id)
      } else {
        const isDimension = field.colType === "dimension" || field.isDimension === "1"
        const currentDimensionCount = prev.filter((f) => f.colType === "dimension" || f.isDimension === "1").length
        const currentMetricCount = prev.filter((f) => f.colType === "metric" || f.isDimension === "0").length

        if (isDimension && currentDimensionCount >= MAX_DIMENSION_FIELDS) {
          return prev
        }
        if (!isDimension && currentMetricCount >= MAX_METRIC_FIELDS) {
          return prev
        }

        return [...prev, field]
      }
    })
  }

  const handleSave = async () => {
    await onSave(selectedFields)
  }

  const selectedDimensions = selectedFields.filter(
    (field) => field.colType === "dimension" || field.isDimension === "1",
  )
  const selectedMetrics = selectedFields.filter((field) => field.colType === "metric" || field.isDimension === "0")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>更改显示字段</DialogTitle>
        </DialogHeader>

        <div className="flex flex-1 min-h-[300px] overflow-hidden gap-4">
          {/* 维度字段 */}
          <div className="flex-1 flex flex-col border rounded-md h-[400px]">
            <div className="p-3 border-b font-medium">
              <div className="relative mb-2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索维度..."
                  className="pl-8"
                  value={searchDimensions}
                  onChange={(e) => setSearchDimensions(e.target.value)}
                />
              </div>
              <span>
                维度 (限{MAX_DIMENSION_FIELDS}个)：已选{selectedDimensions.length}个
              </span>
            </div>
            <ScrollArea className="flex-1 p-2">
              {dimensionTree.map((node) => (
                <TreeNode
                  key={node.key}
                  node={node}
                  level={0}
                  selectedFields={selectedFields}
                  toggleField={toggleField}
                  toggleCategory={toggleCategory}
                  expandedCategories={expandedCategories}
                  maxDimensionFields={MAX_DIMENSION_FIELDS}
                  maxMetricFields={MAX_METRIC_FIELDS}
                />
              ))}
            </ScrollArea>
          </div>

          {/* 指标字段 */}
          <div className="flex-1 flex flex-col border rounded-md h-[400px]">
            <div className="p-3 border-b font-medium">
              <div className="relative mb-2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索指标..."
                  className="pl-8"
                  value={searchMetrics}
                  onChange={(e) => setSearchMetrics(e.target.value)}
                />
              </div>
              <span>
                指标 (限{MAX_METRIC_FIELDS}个)：已选{selectedMetrics.length}个
              </span>
            </div>
            <ScrollArea className="flex-1 p-2">
              {metricTree.map((node) => (
                <TreeNode
                  key={node.key}
                  node={node}
                  level={0}
                  selectedFields={selectedFields}
                  toggleField={toggleField}
                  toggleCategory={toggleCategory}
                  expandedCategories={expandedCategories}
                  maxDimensionFields={MAX_DIMENSION_FIELDS}
                  maxMetricFields={MAX_METRIC_FIELDS}
                />
              ))}
            </ScrollArea>
          </div>
        </div>

        {/* 已选字段 */}
        <div className="border rounded-md p-4">
          <div className="font-medium mb-2">已选字段</div>
          <div className="flex flex-wrap gap-2 min-h-8 max-h-[200px] overflow-y-auto">
            {selectedFields.map((field, index) => (
              <div
                key={`sel-field-${index}`}
                className={`px-2 py-1 rounded-md text-sm flex items-center ${
                  field.colType !== "metric" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                }`}
              >
                {field.name}
                {field.alias ? ` (${field.alias})` : ""}
                <button
                  className={`ml-1 ${
                    field.colType !== "metric"
                      ? "text-blue-600 hover:text-blue-800"
                      : "text-green-600 hover:text-green-800"
                  }`}
                  onClick={() => toggleField(field)}
                >
                  ×
                </button>
              </div>
            ))}
            {selectedFields.length === 0 && <span className="text-sm text-muted-foreground">暂无已选字段</span>}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            取消
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "保存中..." : "保存"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
