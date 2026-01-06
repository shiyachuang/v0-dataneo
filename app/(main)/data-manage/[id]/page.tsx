"use client";

import DataDetail from "../../data-detail";

export default function DataManageDetailPage({ params }: { params: { id: string } }) {
  return <DataDetail dataId={params.id} mode="standalone" />;
}
