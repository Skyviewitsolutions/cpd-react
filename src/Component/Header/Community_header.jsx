import React from "react";
import "./Community_header.css";
import Plus_button from "../button/Plus_button";
import Event_button from "../button/Event_button";
import { FaRegUser, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import user from "../../assets/Icons/Artboard58.svg";
import { BiPlusCircle } from "react-icons/bi";
import Button from "../button/Button/Button";


const Community_header = (props) => {
  
  var { communityDetails } = props;
  communityDetails = communityDetails.communityDetails;
  const token = localStorage.getItem("token");


  const navigate = useNavigate("");
  const BackEvent = () => {
    navigate("/community");
  };

  return (
    <>
      <div className="Communityheader cmntyHeadercont">
        <div className="row">
          <div className="col-lg-7 col-md-12 col-sm-12 community_left">
            <div className="community_details">
              <div className="cmTitle d-flex align-items-center cmnTitle">
                <h5  style={{width : '100%'}}>Community Name : {communityDetails.display_name}</h5>{" "}
              
              </div>

              <div className="cmDetails d-flex cmnTitle">
                {/* <h5>Descriptions </h5>{" "} */}
                {/* <span style={{ marginBottom: "8px" }}>:</span> */}
                <h6>{communityDetails.description}</h6>
              </div>

              <div className="cmDetails d-flex ">
                <h5 style={{width : "80px"}}>Criteria </h5>{" "}
                <span style={{ marginBottom: "8px" , marginRight : '8px'}}> : </span>{" "}
                <h6>{communityDetails.criteria}</h6>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-12 col-sm-12 d-flex align-items-center">
            <div className="userDetails">
              <div className="eventMem d-flex flex-column align-items-center">
                <FaUsers size={42} color="var(--primary)" />
                <h6> Members ({communityDetails.members_count})</h6>
              </div>
              <div className="eventBtn">
                <Button title="Back To Community" onClick={() => BackEvent()} />
              </div>
              {token && 
              <div
                className="createEvnet"
                onClick={() => navigate("/create-community")}
              >
                <h6>Create Community</h6>
                <BiPlusCircle color="white" size={20} />
              </div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Community_header;
