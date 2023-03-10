import React, { useEffect, useState } from 'react';
import DashboardItems from './DashboardItems';
import '../css/DashboardPage.css';
import { useNavigate } from 'react-router-dom';
import Popup from './Popup';
import axios from 'axios';

function DashboardPage() {
	let tempLst = [
		{
			ClaimID: 2010,
			InsuranceID: 1009,
			FirstName: 'Martin',
			LastName: 'Ong',
			ExpenseDate: '2022-07-14T08:00:00+08:00',
			Amount: 100.0,
			Purpose: 'Dentist',
			FollowUp: 0,
			PreviousClaimID: null,
			Status: 'Approved',
			LastEditedClaimDate: '2022-07-15T12:22:45+08:00',
		},
		{
			ClaimID: 2011,
			InsuranceID: 1008,
			FirstName: 'John',
			LastName: 'Tan',
			ExpenseDate: '2022-08-15T08:00:00+08:00',
			Amount: 100.0,
			Purpose: 'Outpatient Claim',
			FollowUp: 0,
			PreviousClaimID: null,
			Status: 'Approved',
			LastEditedClaimDate: '2022-08-16T19:35:53+08:00',
		},
		{
			ClaimID: 2012,
			InsuranceID: 1005,
			FirstName: 'Mary',
			LastName: 'Lee',
			ExpenseDate: '2022-08-16T08:00:00+08:00',
			Amount: 200.0,
			Purpose: 'Specialist Visit',
			FollowUp: 0,
			PreviousClaimID: null,
			Status: 'Approved',
			LastEditedClaimDate: '2022-08-17T12:28:46+08:00',
		},
		{
			ClaimID: 2013,
			InsuranceID: 1007,
			FirstName: 'Mary',
			LastName: 'Lee',
			ExpenseDate: '2022-08-18T08:00:00+08:00',
			Amount: 5000.0,
			Purpose: 'Car Repairs',
			FollowUp: 0,
			PreviousClaimID: null,
			Status: 'Approved',
			LastEditedClaimDate: '2022-08-19T11:16:32+08:00',
		},
		{
			ClaimID: 2014,
			InsuranceID: 1008,
			FirstName: 'John',
			LastName: 'Tan',
			ExpenseDate: '2022-08-20T08:00:00+08:00',
			Amount: 100.0,
			Purpose: 'Outpatient Claim',
			FollowUp: 0,
			PreviousClaimID: null,
			Status: 'Approved',
			LastEditedClaimDate: '2022-08-29T16:42:51+08:00',
		},
		{
			ClaimID: 2015,
			InsuranceID: 1009,
			FirstName: 'Martin',
			LastName: 'Ong',
			ExpenseDate: '2022-09-02T08:00:00+08:00',
			Amount: 100.0,
			Purpose: 'Outpatient Claim',
			FollowUp: 0,
			PreviousClaimID: null,
			Status: 'Rejected',
			LastEditedClaimDate: '2022-09-03T10:30:00+08:00',
		},
		{
			ClaimID: 2016,
			InsuranceID: 1008,
			FirstName: 'John',
			LastName: 'Tan',
			ExpenseDate: '2022-09-04T08:00:00+08:00',
			Amount: 100.0,
			Purpose: 'Outpatient Claim',
			FollowUp: 0,
			PreviousClaimID: null,
			Status: 'Rejected',
			LastEditedClaimDate: '2022-09-05T13:25:29+08:00',
		},
		{
			ClaimID: 2017,
			InsuranceID: 1005,
			FirstName: 'Mary',
			LastName: 'Lee',
			ExpenseDate: '2022-10-08T08:00:00+08:00',
			Amount: 200.0,
			Purpose: 'Specialist Visit Follow Up',
			FollowUp: 1,
			PreviousClaimID: 2013,
			Status: 'Approved',
			LastEditedClaimDate: '2022-10-09T13:08:24+08:00',
		},
		{
			ClaimID: 2018,
			InsuranceID: 1011,
			FirstName: 'John',
			LastName: 'Tan',
			ExpenseDate: '2022-10-10T08:00:00+08:00',
			Amount: 3000.0,
			Purpose: 'Aircon Repair',
			FollowUp: 0,
			PreviousClaimID: null,
			Status: 'Pending',
			LastEditedClaimDate: '2022-10-15T17:45:52+08:00',
		},
		{
			ClaimID: 2019,
			InsuranceID: 1009,
			FirstName: 'Martin',
			LastName: 'Ong',
			ExpenseDate: '2022-10-26T08:00:00+08:00',
			Amount: 100.0,
			Purpose: 'Dentist',
			FollowUp: 0,
			PreviousClaimID: null,
			Status: 'Approved',
			LastEditedClaimDate: '2022-10-28T13:08:24+08:00',
		},
		{
			ClaimID: 2020,
			InsuranceID: 1009,
			FirstName: 'Martin',
			LastName: 'Ong',
			ExpenseDate: '2023-01-03T08:00:00+08:00',
			Amount: 100.0,
			Purpose: 'Outpatient Claim',
			FollowUp: 0,
			PreviousClaimID: null,
			Status: 'Approved',
			LastEditedClaimDate: '2023-01-05T12:53:04+08:00',
		},
		{
			ClaimID: 2021,
			InsuranceID: 1011,
			FirstName: 'John',
			LastName: 'Tan',
			ExpenseDate: '2022-12-20T08:00:00+08:00',
			Amount: 2000.0,
			Purpose: 'Engine Repair',
			FollowUp: 0,
			PreviousClaimID: null,
			Status: 'Approved',
			LastEditedClaimDate: '2023-01-06T11:24:32+08:00',
		},
		{
			ClaimID: 2022,
			InsuranceID: 1005,
			FirstName: 'Mary',
			LastName: 'Lee',
			ExpenseDate: '2023-01-09T08:00:00+08:00',
			Amount: 200.0,
			Purpose: 'Specialist Visit Follow Up',
			FollowUp: 1,
			PreviousClaimID: 2017,
			Status: 'Approved',
			LastEditedClaimDate: '2023-01-09T17:23:56+08:00',
		},
		{
			ClaimID: 2023,
			InsuranceID: 1016,
			FirstName: 'Irene',
			LastName: 'Lim',
			ExpenseDate: '2023-02-11T08:00:00+08:00',
			Amount: 100.0,
			Purpose: 'Overseas Injury',
			FollowUp: 0,
			PreviousClaimID: null,
			Status: 'Approved',
			LastEditedClaimDate: '2023-02-16T15:32:24+08:00',
		},
		{
			ClaimID: 2024,
			InsuranceID: 1009,
			FirstName: 'Martin',
			LastName: 'Ong',
			ExpenseDate: '2023-02-23T08:00:00+08:00',
			Amount: 100.0,
			Purpose: 'Dentist',
			FollowUp: 0,
			PreviousClaimID: null,
			Status: 'Pending',
			LastEditedClaimDate: '2023-02-25T17:33:58+08:00',
		},
		{
			ClaimID: 2027,
			InsuranceID: 1016,
			FirstName: 'Irene',
			LastName: 'Lim',
			ExpenseDate: '2023-02-11T08:00:00+08:00',
			Amount: 200.0,
			Purpose: 'Lost Baggage',
			FollowUp: 0,
			PreviousClaimID: null,
			Status: 'Pending',
			LastEditedClaimDate: '2023-02-25T17:39:42+08:00',
		},
		{
			ClaimID: 2028,
			InsuranceID: 1016,
			FirstName: 'Irene',
			LastName: 'Lim',
			ExpenseDate: '2023-02-28T08:00:00+08:00',
			Amount: 50.0,
			Purpose: 'Overseas Injury Follow Up Treatment',
			FollowUp: 1,
			PreviousClaimID: 2023,
			Status: 'Pending',
			LastEditedClaimDate: '2023-02-28T17:33:58+08:00',
		},
		{
			ClaimID: 2025,
			InsuranceID: 1015,
			FirstName: 'Sean',
			LastName: 'Chia',
			ExpenseDate: '2023-02-28T08:00:00+08:00',
			Amount: 10000.0,
			Purpose: 'Repairs Due to Fire From Neighbor',
			FollowUp: 0,
			PreviousClaimID: null,
			Status: 'Pending',
			LastEditedClaimDate: '2023-03-01T10:00:00+08:00',
		},
		{
			ClaimID: 2026,
			InsuranceID: 1009,
			FirstName: 'Martin',
			LastName: 'Ong',
			ExpenseDate: '2023-03-10T08:00:00+08:00',
			Amount: 100.0,
			Purpose: 'Outpatient Claim',
			FollowUp: 0,
			PreviousClaimID: null,
			Status: 'Approved',
			LastEditedClaimDate: '2023-03-11T00:00:00+08:00',
		},
	];
	const [claimsLst, setClaimsLst] = useState([]);
	// console.log(claimsLst[0]);
	const [newClaimTrigger, setNewClaimTrigger] = useState(false);
	const [isloaded, setIsLoaded] = useState(false)
	let [popupType,setPopupType] = useState("");
    let [userInEdit,setuserInEdit] = useState({});
	const navigate = useNavigate();

	// let claimsBody = claimsLst && claimsLst.map((claim)=>{
	//     console.log("hello");
	//     <DashboardItems ClaimID = {claim.ClaimID} Status = {claim.Status}/>
	// });

	let api = 'http://localhost:5000';

	useEffect(() => {
		const fetchData = async () => {
			await axios
				.get(api + '/claims/58001001')
				.then((res) => {
					setClaimsLst(res.data);
					setIsLoaded(true);
					console.log(res.data);
				});
		};
		fetchData();
	}, []);
	return (!isloaded ? <div>Loading r...</div> :

		<div className="mainContainer">
			<div className="dashboardMainHeader">
				{/* <div></div> */}
				<div className="pageTitle">DASHBOARD</div>
				<div
					className="logoutBtn"
					onClick={() => {
						navigate('/');
					}}
				>
					Logout
				</div>
			</div>

			<div className="claimBtnContainer">
				{/* <div className='newClaimBtn' onClick={()=>{setNewClaimTrigger(true)}}>Create New Claim</div> */}
				<button className="newClaimBtn"
					onClick={() => {
						setNewClaimTrigger(true);
					}}>
					Create new claim
				</button>
			</div>

			<Popup trigger={newClaimTrigger} popupType={popupType} userInEdit={userInEdit} setNewClaimTrigger={setNewClaimTrigger} claimsLst = {claimsLst} setClaimsLst={setClaimsLst}/>

			{/* <div className="claimBtnContainer">
				<button className="newClaimBtn">Create new claim</button>
			</div> */}

			<div className="dashboardMainBody">
				{/* <DashboardItems ClaimID = {claimsLst[0].ClaimID} Status = {claimsLst[0].Status}/>
            <DashboardItems/> */}
				{console.log(claimsLst, '---')}
				{claimsLst["claims"]?.map((claim) => {
					return (
						<DashboardItems
							className="claimBody"
							ClaimID={claim.ClaimID}
							Status={claim.Status}
							setNewClaimTrigger= {setNewClaimTrigger}
							setPopupType={setPopupType}
							setuserInEdit = {setuserInEdit}
							claimCurrent={claim}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default DashboardPage;
