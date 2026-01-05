"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Components
import OverviewTab from "./components/overview-tab"
import FieldsTab from "./components/fields-tab"
import DataTab from "./components/data-tab"
import FieldChangeModal from "./components/field-change-modal"
import UpdateModeDialog from "./components/update-mode-dialog"
import FieldInfoSheet from "./components/field-info-sheet"

// Hooks
import { useDataDetail, useFields, usePreview } from "./hooks"

interface DataDetailProps {
  dataId: string
  mode?: "standalone" | "chat"
  isShared?: boolean
  onInsertText?: (text: string) => void
  extType?: string
}

export default function DataDetail({
  dataId,
  mode = "standalone",
  isShared = false,
  onInsertText,
  extType,
}: DataDetailProps) {
  // UI状态
  const [fieldInfoSheetOpen, setFieldInfoSheetOpen] = useState(false)
  const [fieldInfo, setFieldInfo] = useState<any>(null)
  const [showUpdateModeDialog, setShowUpdateModeDialog] = useState(false)
  const [showFieldChangeModal, setShowFieldChangeModal] = useState(false)
  const [currentTab, setCurrentTab] = useState("info")

  // 当前使用的数据ID
  const [currentDataId, setCurrentDataId] = useState(dataId)

  // 使用自定义hooks
  const dataDetail = useDataDetail(dataId)
  const fieldsHook = useFields(currentDataId)
  const previewHook = usePreview(currentDataId)

  // 判断是否为GA数据
  const isGAData = extType === "ga"

  // 初始化数据
  useEffect(() => {
    setCurrentDataId(dataId)
    dataDetail.fetchTableData()
  }, [dataId])

  // Tab切换处理
  const handleTabChange = (value: string) => {
    setCurrentTab(value)
    if (value === "data") {
      previewHook.fetchPreviewData(dataDetail.tableData.name)
    } else if (value === "fields") {
      fieldsHook.fetchFields()
    } else if (value === "info") {
      dataDetail.fetchTableData()
    }
  }

  // 保存表数据
  const handleSave = async () => {
    await dataDetail.saveTableData({
      name: dataDetail.tableData.name,
      alias: dataDetail.tableData.alias,
      description: dataDetail.tableData.description,
    })
  }

  // 打开字段信息
  const handleFieldClick = (field: any) => {
    setFieldInfoSheetOpen(true)
    setFieldInfo(field)
  }

  // 分页变化
  const handlePageChange = (pageNum: number, size: number) => {
    previewHook.updatePagination(pageNum, size)
    previewHook.fetchPreviewData(dataDetail.tableData.name, pageNum, size)
  }

  // 刷新数据
  const handleRefresh = () => {
    previewHook.fetchPreviewData(dataDetail.tableData.name)
  }

  // 打开字段更换弹窗
  const handleOpenFieldChange = () => {
    setShowFieldChangeModal(true)
  }

  // 保存字段显示设置
  const handleSaveFieldsDisplay = async (selectedFields: any[]) => {
    const success = await fieldsHook.saveFieldsDisplay(selectedFields)
    if (success) {
      setShowFieldChangeModal(false)
    }
  }

  // 表数据变更
  const handleTableDataChange = (updates: any) => {
    dataDetail.updateTableData(updates)
  }

  // 获取资源类型图标
  const getResourceType = (type: string) => {
    const typeMap: Record<string, string> = {
      file: "Excel",
      postgres: "PostgreSQL",
      mysql: "MySQL",
      folder: "文件夹",
    }
    return typeMap[type] || type
  }

  return (
    <div className="p-6 bg-background min-h-screen">
      {/* 返回按钮和标题 */}
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-4 -ml-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回列表
          </Button>
        </Link>

        {isGAData ? (
          <h1 className="text-2xl font-semibold truncate max-w-full" title={dataDetail.overviewInfo.name}>
            {dataDetail.overviewInfo.name}
          </h1>
        ) : (
          <h1 className="text-2xl font-semibold truncate max-w-full">
            {dataDetail.tableData.name}{" "}
            {dataDetail.tableData.alias && (
              <span className="text-muted-foreground ml-2">({dataDetail.tableData.alias})</span>
            )}
          </h1>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="info" value={currentTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="info">概览</TabsTrigger>
          <TabsTrigger value="fields">字段元数据</TabsTrigger>
          <TabsTrigger value="data">数据预览</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="info">
          <OverviewTab
            tableData={dataDetail.tableData}
            overviewInfo={dataDetail.overviewInfo}
            onTableDataChange={handleTableDataChange}
            onSave={handleSave}
            onOpenUpdateMode={() => setShowUpdateModeDialog(true)}
            getResourceType={getResourceType}
            isGAData={isGAData}
          />
        </TabsContent>

        {/* Fields Tab */}
        <TabsContent value="fields">
          <FieldsTab
            fields={fieldsHook.fields}
            onFieldClick={isGAData ? () => {} : handleFieldClick}
            enableTooltip={mode === "chat"}
            onInsertText={onInsertText}
            isShared={isShared}
            isGAData={isGAData}
          />
        </TabsContent>

        {/* Data Tab */}
        <TabsContent value="data">
          <DataTab
            previewData={previewHook.previewData}
            onPageChange={handlePageChange}
            onRefresh={handleRefresh}
            onOpenFieldChange={handleOpenFieldChange}
            enableTooltip={mode === "chat"}
            onInsertText={onInsertText}
            isGAData={isGAData}
          />
        </TabsContent>
      </Tabs>

      {/* Modals and Sheets */}
      {fieldInfoSheetOpen && (
        <FieldInfoSheet
          fieldInfo={fieldInfo}
          open={fieldInfoSheetOpen}
          onOpenChange={(open) => {
            setFieldInfoSheetOpen(open)
            if (!open) setFieldInfo(null)
          }}
          onSave={(updatedField) => {
            fieldsHook.updateField(updatedField)
            setFieldInfoSheetOpen(false)
            setFieldInfo(null)
          }}
        />
      )}

      {showUpdateModeDialog && (
        <UpdateModeDialog
          open={showUpdateModeDialog}
          onOpenChange={setShowUpdateModeDialog}
          initialData={{}}
          onConfirm={(config, text) => {
            dataDetail.updateTableData({ updateModeText: text })
            setShowUpdateModeDialog(false)
          }}
        />
      )}

      {showFieldChangeModal && (
        <FieldChangeModal
          open={showFieldChangeModal}
          onOpenChange={setShowFieldChangeModal}
          fields={fieldsHook.fields}
          initialSelected={fieldsHook.selectedFields.map((f) => f.id)}
          onSave={handleSaveFieldsDisplay}
          loading={fieldsHook.saveLoading}
        />
      )}
    </div>
  )
}
