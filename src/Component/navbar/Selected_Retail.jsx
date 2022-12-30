import React from 'react'
import './Selected_Retail.css';
import dommy_person from '../../assets/Images/dommy_person.jfif';
import call_blue from '../../assets/Images/call_blue.png';
import message_blue from '../../assets/Images/message_blue.png';
import mail_blue from "../../assets/Images/mail_blue.png";

const Selected_Retail = () => {
  return (
    <>
    <div className='selected_retail_outline'>
<div className='Selected_Retail '>
<div className='selected_profile'>
<img src={dommy_person} alt="" className=''></img>
</div>
    <div className='Selected_description'>
        <h4>James <span>(Moderate)</span></h4>
        <h5>Education Detail</h5>
<h6>MBA Student,Year 1,  KHU University, </h6>
<h4> Contact</h4>
<div className="selectedRetail_contact">
<img src={message_blue} alt="" className="selectedRetail_blueIcon"></img>
<img src={mail_blue} alt="" className="selectedRetail_blueIcon"></img>
<img src={call_blue} alt="" className="selectedRetail_blueIcon"></img>
</div>
    </div>
</div>
</div>
    </>
  )
}

export default Selected_Retail
