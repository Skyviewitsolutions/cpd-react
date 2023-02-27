import React from "react";
import "./Community_header.css";
import Plus_button from "../button/Plus_button";
import Event_button from "../button/Event_button";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import user from "../../assets/Icons/Artboard58.svg";

const Community_header = (props) => {
  
  var { communityDetails } = props;
  communityDetails = communityDetails.communityDetails;

  const navigate = useNavigate("");
  const BackEvent = () => {
    navigate("/event");
  };

  console.log(communityDetails, "comunityDetails");

  return (
    <>
      <div className="Communityheader">
        <div className="row">
          <div className="col-lg-7 col-md-12 col-sm-12 community_left">
            <div className="community_details">
              <h4>Community Name : {communityDetails.display_name}</h4>
              {/* <p>Discription : {communityDetails.description}</p> */}
              <p>Discription : here we are writing each and every options in this project from which we are writing anything which will be very userful</p>
              <h6>
                <span>Criteria To Join : </span> {communityDetails.criteria}
                {/* <span id="eligible">(Eligible)</span> */}
              </h6>
            </div>
          </div>
          <div className="col-lg-5 col-md-12 col-sm-12">
            <div className="UserDetails">
              <div className="row">
                <div className="col-sm-4">
                  <img src={user} />
                  <h6>
                    Member : <span>{communityDetails.members_count}</span>
                  </h6>
                </div>
                <div className="col-sm-4">
                  <Event_button
                    text="Back To Event"
                    onClick={() => BackEvent()}
                  />
                </div>
                <div className="col-sm-4">
                  <Plus_button onClick={() => navigate("/addEvent")} />
                  <h5 onClick={() => navigate("/addEvent")}> Create Event</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Community_header;
