import React from "react";
import "./Signupform.css";
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
import { endpoints } from "../services/endpoints";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import showToast from "../CustomToast/CustomToast";

const Signupform = (props) => {

  const [showPassword, setShowpassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState({});
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = () => {
    const url = endpoints.authentication.signUp;
    if (userType == "") {
      setErrorMsg({ userType: "Please select user type" });
    } else if (name === "") {
      setErrorMsg({ name: "Please enter name" });
    } else if (email === "") {
      setErrorMsg({ email: "Please enter email" });
    } else if (!validator.isEmail(email)) {
      setErrorMsg({ email: "Invalid email" });
    } else if (password === "") {
      setErrorMsg({ password: "Please enter password" });
    } else if (confPassword !== password) {
      setErrorMsg({ confPassword: "Password does not match" });
    } else {
      setErrorMsg({});

      const data = {
        name: name,
        email: email,
        password: password,
        user_type: userType,
        password_confirmation: confPassword,
      };

      const headers = {
        "Content-Type": "application/json",
      };

      setLoading(true);

      axios
        .post(url, data, { headers: headers })
        .then((res) => {
          setLoading(false);
          if (res.data.result === true) {
            showToast("Registered Successfully",  "success" );
            navigate("/login");
          } else if (res.data.result === false) {
            showToast(res.data.message , "error")
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err, "this is the error here");
        });
    }
  };

  return (
    <>
      <div className="row mb-1">
        <div className=""></div>
        <div
          className="col-lg-4 col-md-6 col-12 signUpPage"
          style={{ marginBottom: "0px" }}
        >
          <h4>Sign up</h4>
        </div>
      </div>

      <div>
        <Form.Group className="mb-2">
          <div>
            <select
              class="form-select"
              onChange={(e) => setUserType(e.target.value)}
              className="selectUser"
            >
              <option value="">Select User</option>
              <option value="1">Student</option>
              <option value="2">Speaker / Coach</option>
              <option value="3">Employer</option>
              <option value="4">University</option>
            </select>
            <span style={{ color: "red", fontSize: "14px" }}>
              {errorMsg.userType}
            </span>
          </div>
        </Form.Group>

        <Form.Group className="mb-2">
          <label>Name</label>

          <Logininput
            licon={<FaUserAlt size={17} />}
            type={"text"}
            place={"Enter name"}
            value={name}
            setValue={(e) => setName(e.target.value)}
          />
          <span style={{ color: "red", fontSize: "14px" }}>
            {errorMsg.name}
          </span>
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicEmail">
          <label>Email Address</label>

          <Logininput
            licon={<GrMail size={19} />}
            type={"text"}
            place={"Enter email"}
            // ricon={<BsFillCheckCircleFill />}
            value={email}
            setValue={(e) => setEmail(e.target.value)}
            // errors={errorMsg.email}
          />
          <span style={{ color: "red", fontSize: "14px" }}>
            {errorMsg.email}
          </span>
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicPassword">
          <label>Password</label>
          <Logininput
            licon={<IoIosLock />}
            type={showPassword ? "text" : "password"}
            place={"Enter password"}
            value={password}
            // errors={errorMsg.password}
            setValue={(e) => setPassword(e.target.value)}
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

        <Form.Group className="mb-2" controlId="formBasicPassword">
          <label>Confirm Password</label>
          <Logininput
            licon={<IoIosLock />}
            type={showConfirmPassword ? "text" : "password"}
            place={"Enter password"}
            value={confPassword}
            errors={errorMsg.confPassword}
            setValue={(e) => setConfPassword(e.target.value)}
            ricon={
              showConfirmPassword === false ? (
                <AiOutlineEyeInvisible
                  onClick={() => setShowConfirmPassword(true)}
                  style={{ color: "gray" }}
                />
              ) : (
                <BsEye onClick={() => setShowConfirmPassword(false)} />
              )
            }
          />
          <span style={{ color: "red", fontSize: "14px" }}>
            {errorMsg.confPassword}
          </span>
        </Form.Group>

        <Btn btn_name={"Sign Up"} submit={submit} loading={loading} />
        {/* <span>You have already account?<a href="/loginpage" className="logInanker">Login</a></span> */}
      </div>

      <div className=" row login_bottom">
        <div className="col-lg-5 col-md-5 col-sm-5">
          <button type="submit" id="useotp">
            Use OTP to login
          </button>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2 orLogin" id="or">
          <h6>-or-</h6>
        </div>
        <div className="col-lg-5 col-md-5 col-sm-5 social_login">
          <div className="row ">
            <div className="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center">
              <b style={{ fontSize: "14px" }} className="LoginSocial">
                Login via Social
              </b>
            </div>
          </div>
          <div className="row social_icon">
            <div className="col md-7 flex-center socialIcons">
              <img src={facebook_icon} alt=""></img>
              <img src={mail} alt=""></img>
              <img src={twitter} alt=""></img>
            </div>
          </div>
        </div>
      </div>
      <p className="loginSignup">
        Already have an account ?{" "}
        <span
          style={{ color: "#2c6959", cursor: "pointer" }}
          onClick={() => navigate("/login")}
          className="context-menu"
        >
          Login
        </span>
      </p>
      <ToastContainer />
    </>
  );
};

export default Signupform;
