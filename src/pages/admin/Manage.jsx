import React from 'react'
import TableMember from './TableMember'

export default function Manage() {
  return (
    <div className="flex flex-col gap-4 bg-white rounded-sm border border-gray-200 p-4 shadow-md">
    <div>Manage</div>
        <TableMember />
  </div>
  )
}
