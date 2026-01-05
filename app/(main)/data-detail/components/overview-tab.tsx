"use client"

import GAOverview from "./ga-overview"
import RegularOverview from "./regular-overview"

interface OverviewTabProps {
  tableData: any
  overviewInfo: any
  onTableDataChange: (updates: any) => void
  onSave: () => void
  onOpenUpdateMode: () => void
  getResourceType: (type: string) => string
  isGAData: boolean
}

export default function OverviewTab({
  tableData,
  overviewInfo,
  onTableDataChange,
  onSave,
  onOpenUpdateMode,
  getResourceType,
  isGAData,
}: OverviewTabProps) {
  return (
    <div className="mt-6 space-y-5">
      {isGAData ? (
        <GAOverview overviewInfo={overviewInfo} />
      ) : (
        <RegularOverview
          tableData={tableData}
          onTableDataChange={onTableDataChange}
          onSave={onSave}
          onOpenUpdateMode={onOpenUpdateMode}
          getResourceType={getResourceType}
        />
      )}
    </div>
  )
}
