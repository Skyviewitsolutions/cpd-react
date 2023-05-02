import React from "react";
import Form from "react-bootstrap/Form";
import Btn from "../../Component/button/Btn";
import { GrMail } from "react-icons/gr";
import { BsFillCheckCircleFill, BsEye } from "react-icons/bs";
import Logininput from "../Inputbox/Logininput";
import "./EmailVerification.css";
import { useNavigate } from "react-router-dom";


const EmailVerificationForm = () => {

  const navigate = useNavigate("");

  return (
    <>
      <div className="loginpage_form forgetPasswordForm">
        <div className="mb-4" >
          <label>Email Address</label>
          <Logininput
            licon={<GrMail />}
            type={"text"}
            place={"Enter email"}
            ricon={<BsFillCheckCircleFill />}
          />
          <span style={{ color: "red", fontSize: "14px" }}></span>
        </div>

        <div
          className="verifiedEmail"
          onClick={() => navigate("/forgot_password_details")}
        >
          <Btn
            btn_name={"Send Verification"}
            onClick={() => navigate("/forgot_password_details")}
          />
        </div>
        <span>
          You have already account ? {" "}
          <a href="/Login" className="logInanker">
            Login
          </a>
        </span>
      </div>
    </>
  );
};

export default EmailVerificationForm;
