import React from "react";
import Button from "react-bootstrap/Button";
import "./Login_form.css";
import Form from "react-bootstrap/Form";
import Btn from "../../Component/button/Btn";
import facebook_icon from "../../assets/Images/facebook_icon.svg";
import mail from "../../assets/Images/mail.svg";
import twitter from "../../assets/Images/twitter.svg";
import { GrMail } from "react-icons/gr";
import message from "../../assets/Images/message.svg";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { BsFillCheckCircleFill, BsEye } from "react-icons/bs";
//import { BsEye } from "react-icons/bs";
import { IoIosLock } from "react-icons/io";
import { useState } from "react";
import Logininput from "../Inputbox/Logininput";
// import Btn from "../element/button/Btn";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import showToast from "../CustomToast/CustomToast";


const Login_form = (props) => {

  const navigate = useNavigate("");
  const [showPassword, setShowpassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState({});

  const loginUrl = "https://admin.cpdedu.com/api/v1/login";

  const submit = () => {
    
    if (email === "") {
      setErrorMsg({ email: "Please enter valid email" });
    } else if (!validator.isEmail(email)) {
      setErrorMsg({ email: "Invalid Email" });
    } else if (password === "") {
      setErrorMsg({ password: "Please enter password" });
    } else if (password.length < 3) {
      setErrorMsg({ password: "Password must be greater then 3 digit " });
    } else {
      setErrorMsg("");

      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      setLoading(true);

      axios
        .post(loginUrl, formData)
        .then((res) => {
          setLoading(false);
          if (res.data.result === true) {
            const user_data = res.data.user;
            const token = res.data.access_token;
            localStorage.setItem("token", token);
            localStorage.setItem("users", JSON.stringify(user_data));
            localStorage.setItem("logedIn", true);
            console.log(res.data , "response here");
            showToast("Login successfully", "success" );
            setLoading(false);
            const isCvUploaded = res.data.user?.isCvAvailable;
            localStorage.setItem("isCvUploaded", isCvUploaded);
            console.log(isCvUploaded, "isCVUploaded here");
            if (isCvUploaded == true) {
              navigate("/");
            } else {
              const userType = user_data.user_type;
              if (userType == 2) {
                navigate("/coaches-form");
              } else if (userType == 1) {
                navigate("/resume");
              }
              else if(userType == 3){
                navigate("/employer-form")
              }
            }
          } else if (res.data.result) {
            showToast(res.data.message,  "error" );
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err, "login error");
          setLoading(false);
        });
    }
  };

  return (
    <>
      <div className="loginpage_form">
        <h4>Login</h4>
        <Form onSubmit={submit}>
          <div className="mb-4" >
            <label>Email Address</label>
            <Logininput
              licon={<GrMail />}
              type={"text"}
              place={"Enter email"}
              ricon={<BsFillCheckCircleFill />}
              value={email}
              setValue={(e) => setEmail(e.target.value)}
            />
            <span style={{ color: "red", fontSize: "14px" }}>
              {errorMsg.email}
            </span>
          </div>
          <Form.Group className="mb-4" >
            <label>Password</label>
            <Logininput
              value={password}
              setValue={(e) => setPassword(e.target.value)}
              licon={<IoIosLock />}
              type={showPassword ? "text" : "password"}
              place={"Enter password"}
              ricon={
                showPassword === false ? (
                  <AiOutlineEyeInvisible
                    onClick={() => setShowpassword(true)}
                    style={{ color: "gray" }}
                  />
                ) : (
                  <BsEye onClick={() => setShowpassword(false)} />
                )
              }
            />
            <span style={{ color: "red", fontSize: "14px" }}>
              {errorMsg.password}
            </span>
          </Form.Group>

          <Form.Group className="mb-4 formBasicCheckbox">
            <div className="check_and_forgot">
              <div className="lg_check d-flex align-items-center">
                <input
                  type="checkbox"
                  id="sign_check"
                  className="loginCheckbox"
                />{" "}
                <label htmlFor="sign_check">
                  <span className="LoginCheckText">
                    Keep me sign in on this device{" "}
                  </span>
                </label>
              </div>
              <div
                className="forgot-link"
                onClick={() => navigate("/forgot-password")}
              >
                <a href="" className="forgotPassword">
                  Forgot password?
                </a>
              </div>
            </div>
          </Form.Group>

          <Btn btn_name={"Login"} submit={submit} loading={loading} />
        </Form>

        <div className=" row login_bottom">
          <div className="col-lg-5 col-md-5 col-sm-5">
            <button type="submit" id="useotp">
              Use OTP to login
            </button>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 orLogin" id="or">
            <h6>- or -</h6>
          </div>
          <div className="col-lg-5 col-md-5 col-12 social_login">
            <div className="row ">
              <div className="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center">
                <b className="LoginSocial ">Login via Social</b>
              </div>
            </div>
            <div className="row social_icon">
              <div className="col md-7 col-12 flex-center socialIcons">
                <img src={facebook_icon} alt=""></img>
                <img src={mail} alt=""></img>
                <img src={twitter} alt=""></img>
              </div>
            </div>
          </div>
        </div>
        <p className="loginSignup">
          Not a member ?{" "}
          <span
            style={{ color: "#2c6959", cursor: "pointer", fontWeight: "bold" }}
            onClick={() => navigate("/signup")}
            className="context-menu"
          >
            Create account free
          </span>
        </p>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login_form;
