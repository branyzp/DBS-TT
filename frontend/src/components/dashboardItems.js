import React from 'react'
import '../css/DashboardItems.css';

function DashboardItems({ClaimID, Status}) {
  return (
    <div className='DashboardItemsContainer'>
      <div className='dashboardItemsBody'>
        <div>ClaimId: {ClaimID}</div>
        <div>Status: {Status}</div>
      </div>
      <div className='dashboardItemsButtons'>
        <button>Edit</button>
      </div>
    </div>
  )
}

export default DashboardItems
