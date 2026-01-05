"use client"

interface GAOverviewProps {
  overviewInfo: any
}

export default function GAOverview({ overviewInfo }: GAOverviewProps) {
  return (
    <>
      {/* 数据基本信息 */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-4">数据基本信息</h3>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-muted-foreground w-24">数据类型</label>
            <div className="text-sm">{overviewInfo.showType}</div>
          </div>

          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-muted-foreground w-24">应用ID</label>
            <div className="text-sm">
              {overviewInfo.config ? JSON.parse(overviewInfo.config)?.gaConfig?.propertyId : ""}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-muted-foreground w-24">连接状态</label>
              <span className="text-sm text-green-600">正常</span>
            </div>
          </div>
        </div>
      </div>

      {/* 数据来源与更新说明 */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-4">数据来源与更新说明</h3>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-muted-foreground w-24">数据来源</label>
            <div className="text-sm">{overviewInfo.showType} API</div>
          </div>

          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-muted-foreground w-24">更新说明</label>
            <div className="text-sm">实时</div>
          </div>
        </div>
      </div>

      {/* 数据范围描述 */}
      <div className="pt-6 border-t">
        <h3 className="text-sm font-medium mb-4">数据范围</h3>
        <div className="text-sm text-muted-foreground">
          GA数据源包含网站或应用的用户行为分析数据，包括页面浏览、会话、用户、事件等多种维度和指标。
        </div>
      </div>
    </>
  )
}
