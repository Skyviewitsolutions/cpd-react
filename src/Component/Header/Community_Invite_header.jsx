import React from "react";
import "./Community_invite_header.css";
import Event_button from "../button/Event_button";

import user from "../../assets/Icons/Artboard58.svg";
import Plus_button from "../button/Plus_button";
const Community_Invite_header = () => {
  return (
    <>
      <div className="CommunityheaderInvite">
        <div className="row">
          <div className="col-lg-9 col-md-12 col-sm-12 community_left">
            <div className="community_details">
              <h4>Community Name:</h4>
              <p>communityDetails.description</p>
              <h6>
                <span>Criteria To Join:</span> 2Yrs of Relevant{" "}
                <span id="eligible">(Eligible)</span>
              </h6>
            </div>
          </div>
          <div className="col-lg-3 col-md-12 col-sm-12">
            <div className="UserDetails">
              <div className="row">
                <div className="col-sm-12 inviteUser">
                <img src={user} />
                <h6>
                  Member : <span>50</span>
                </h6>
                </div>
                
              </div>
          
                

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Community_Invite_header;
