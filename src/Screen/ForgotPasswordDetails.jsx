import React from 'react'
import ForgotPasswordForm from '../Component/ForgotPassword/ForgotPasswordForm'
import Header from '../Component/Header/Header'
import { Link, useNavigate } from "react-router-dom";
import cpd_logo from "../assets/Images/cpd_logo.png";
import './ForgotPasswordDetails.css'
const ForgotPasswordDetails = () => {
    const navigate = useNavigate("");
  return (
    <>
    <Header/>
    <div className="sign-up-section loginpage_form common-form-user">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-12 mt-5 about_cpd_signup">
              <img
                src={cpd_logo}
                alt=""
                className="limg_signup"
                onClick={() => navigate("/")}
              />
              <h4>About the CPD EDU</h4>

              <p className="p_signup">
                Continuing Professional Development (CPD) is a combination of
                approaches, ideas and techniques that will help you manage your
                own learning and growth.The focus of CPD is firmly on results –
                the benefits that professional development can bring you in the
                real world.{" "}
              </p>
              <button className="login_aboutCpd" onClick={() => navigate("/login")}>
                Login to know more
              </button>
            </div>
            <div className="col-lg-1 "></div>
            <div className="col-lg-5 col-md-12 col-12 mt-5">
            <ForgotPasswordForm/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPasswordDetails