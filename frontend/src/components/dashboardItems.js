import React from 'react'
import '../css/DashboardItems.css';

function DashboardItems({ClaimID, Status,setNewClaimTrigger,setPopupType,setuserInEdit,claimCurrent}) {
  return (
    <div className='DashboardItemsContainer'>
      <div className='dashboardItemsBody'>
        <div>ClaimId: {ClaimID}</div>
        <div>Status: {Status}</div>
      </div>
      <div className='dashboardItemsButtons'>
        <button onClick={()=>{setNewClaimTrigger(true); setPopupType("edit");setuserInEdit(claimCurrent);}}>Edit</button>
      </div>
    </div>
  )
}

export default DashboardItems
