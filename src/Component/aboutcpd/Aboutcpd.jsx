import React from 'react'
import cpd_logo from '../../assets/Images/cpd_logo.png';
import './Aboutcpd.css';
import { useNavigate } from "react-router-dom";
const Aboutcpd = () => {
  const navigate = useNavigate("");
  return (
    <>
 <div className='about_con'>
 
 <img src={cpd_logo} alt="" className='limg' onClick={() => navigate('/')}/>
        <h4>About the CPD EDU</h4>
    <p>Continuing Professional Development (CPD) is a combination of approaches, ideas and techniques that will help you manage your own learning and growth.The focus of CPD is firmly on results – the benefits that professional development can bring you in the real world. </p>
 <button id='login'>Login to know more</button>
 </div>
    </>
  )
}

export default Aboutcpd
