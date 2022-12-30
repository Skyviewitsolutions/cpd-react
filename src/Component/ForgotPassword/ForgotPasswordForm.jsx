import React from 'react'
import Form from "react-bootstrap/Form";
import Btn from "../../Component/button/Btn";
import facebook_icon from "../../assets/Images/facebook_icon.svg";
import mail from "../../assets/Images/mail.svg";
import twitter from "../../assets/Images/twitter.svg";
import { FaUserAlt } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { GrMail } from "react-icons/gr";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { IoIosLock } from "react-icons/io";
import { useState } from "react";
import Logininput from "../Inputbox/Logininput";
import axios from "axios";
import validator from "validator";
import {endpoints} from "../services/endpoints"
import { useNavigate } from "react-router-dom";
import './ForgotForm.css'
const ForgotPasswordForm = () => {
    const navigate = useNavigate("");
  return (
    <div>

    <Form.Group className="mb-4">
      <label>Enter Otp</label>

      <Logininput
        licon={<FaUserAlt />}
        type={"text"}
        place={"Enter Otp"}
      
        
      />
  
    </Form.Group>

   

    <Form.Group className="mb-4" controlId="formBasicPassword">
      <label>New Password</label>
      <Logininput
        licon={<IoIosLock />}
      
        place={"Enter password"}
       
       
        
      />
    
    </Form.Group>

    <Form.Group className="mb-4" controlId="formBasicPassword">
      <label>Confirm Password</label>
      <Logininput
        licon={<IoIosLock />}
       
        place={"Enter password"}
      
       
      />
     
    </Form.Group>

  <div onClick={()=>navigate("/")}>  <Btn btn_name={"Submit"} /></div>
    
  
  </div>
  )
}

export default ForgotPasswordForm;