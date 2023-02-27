import React from "react";
import "./Signup.css";
import "../../Component/Loginform/Login_form.css";
import Header from "../../Component/Header/Header";
import Aboutcpd from "../../Component/aboutcpd/Aboutcpd.jsx";
import Signupform from "../../Component/Signupform/Signupform";
import cpd_logo from "../../assets/Images/cpd_logo.png";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
  
  const navigate = useNavigate("");

  return (
    <>
      <Header />
      <div className="sign-up-section loginpage_form common-form-user">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-12 mt-3 about_cpd_signup">
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
              <button
                className="login_aboutCpd"
                onClick={() => navigate("/login")}
              >
                Login to know more
              </button>
            </div>
            <div className="col-lg-1 "></div>
            <div className="col-lg-5 col-md-12 col-12 mt-3">
              <Signupform />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
