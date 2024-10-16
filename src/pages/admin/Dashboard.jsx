import React from 'react'
import TableDashboard from '../../components/admin/TableDashboard'

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4 bg-white rounded-sm border border-gray-200 p-4 shadow-md">
      <div>Dashboard</div>
      <TableDashboard />
    </div>
  )
}
