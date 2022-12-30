import React from 'react'
import './Latest_session.css';
import Card from 'react-bootstrap/Card';
import time from '../../assets/Images/time.svg';
import eye from '../../assets/Images/eye.svg';
 import event_cardimg from '../../assets/Images/event_cardimg.svg'

const Latest_session = () => {
  return (
    <>
            <Card className="Ecard_outline">
       <img src={event_cardimg} alt=""></img> 
      <Card.Body>
        <Card.Title className="Ecard_title">
        <h5>Loader Administration Q&A Drop-in-Session</h5>
        <h6>September 20| 11.00am-12.00pm</h6>
        </Card.Title>
        <div className='Ename_box'>
        <h5>JAMES WHATT</h5>

       </div>
       <div className="Etiming_box">
     <h6><img src={time} alt=""></img> 40min</h6>

        <h5>VIRTUAL</h5>
       </div>
      </Card.Body>
         </Card>
    </>
  )
}

export default Latest_session
