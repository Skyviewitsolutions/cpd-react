import React from 'react'
import "./Sidenav_communityFinance.css";
import Checkbox_sidenav from "../Inputbox/Checkbox_sidenav";
const Sidenav_communityFinance = () => {
  return (
    <>

 <div className='finance_nav_outline'>
      <div className='row'>
        <div className='col-12 col-md-12 col-lg-12 text-align'>
        <div className="nav_heading ">
        <h4 className='ps-5 ' style={{cursor: "no-drop"}}>Actions</h4>
    </div>
    
      <div className="finance_navlist opacity_nav ">
        <h5 className="" style={{cursor: "no-drop"}}>Latest</h5>
    <h6  style={{cursor: "no-drop"}}>All Session</h6>
    <h6  style={{cursor: "no-drop"}}>Upcoming</h6>

    <h5 className="" style={{cursor: "no-drop"}}>Events</h5>
    <h6 className="" style={{cursor: "no-drop"}}>All Events</h6>
    <h6 className="" style={{cursor: "no-drop"}}>Upcoming</h6>
    <h6 className="" style={{cursor: "no-drop"}}>Activities</h6>

    <h5 className="" style={{cursor: "no-drop"}}>Sessions</h5>
    <h6 className="" style={{cursor: "no-drop"}}>All Session</h6>
    <h6 className="" style={{cursor: "no-drop"}}>Upcoming</h6>
    

<h5 className="" style={{cursor: "no-drop"}}>Members</h5>
<h6 className="" style={{cursor: "no-drop"}}>All members</h6>
<div className='row ps-5'>
    <Checkbox_sidenav className="" text="Moderaters" style={{cursor: "no-drop"}}/>
    <Checkbox_sidenav className="" text="Expert" style={{cursor: "no-drop"}}/>
    <Checkbox_sidenav className="" text="Recruiter" style={{cursor: "no-drop"}}/>
    <Checkbox_sidenav className="" text="Alumini" style={{cursor: "no-drop"}}/>
    </div>
</div>
      </div>

        </div>


</div>






    </>
  )
}

export default Sidenav_communityFinance
