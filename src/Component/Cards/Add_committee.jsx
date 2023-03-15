import React from "react";
import "./Add_committee.css";
import event_cardimg from "../../assets/Images/event_cardimg.svg";
import eye from "../../assets/Images/eye.svg";
import { CiUser } from "react-icons/ci";
import Subscribe from "../button/Subscribe";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { toast , ToastContainer} from "react-toastify";
import showToast from "../../Component/CustomToast/CustomToast"

const Add_committee = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { data, key, imagePath, isInviteCommunity, getMyCommunity, inviteAllCommunity} = props;
  const image = imagePath + data.image;
// const [invitWholeCommunity,setInviteWholeCommunity]=useEffect([])

  const invitedCommunity = () => {
  
    const eventId = localStorage.getItem("eventId");
    const comunityId = localStorage.getItem("comunityId");

    const token = localStorage.getItem("token");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const InviteCommunityApi = `https://admin.cpdedu.com/api/v1/events/invite-whole-community?${eventId}&${comunityId}`;
//  console.log(InviteCommunityApi,"Invite community response...")
      axios
        .get(InviteCommunityApi, { headers: headers })
        .then((res) => {
      
           setLoading(false);
          if(res.data.result){
            alert("hello")
             setLoading(false);
            showToast("Community joined successfully",  "success" );
          }
        })
        .catch((err) => {
          console.log(err, "this is the All community invite error");
        });
    }
    else {
      showToast("Please login" , "warning")
    }
  };

  useEffect(() => {
    invitedCommunity();
  },[]);

  return (
    <>
    
      <div className="Card mt-5 addinvitecumnty">
        <div className="add_community_media">
          <img src={data.image ? image : event_cardimg} alt="" />
          <div className="add_community_title">
            <h6>{data?.display_name}</h6>
          </div>
        </div>
        <div className="add_community_description">
          <div className="add_community_definition">
            <h6>{data?.description}</h6>
          </div>
          <div className="add_communityname_box">
            <h6 onClick={() => navigate("/community_Detail")}>
              <img src={eye} alt=""></img> view details
            </h6>
          </div>

          <div className="member">
            <button className="invtMember">
              Invite Member
            </button>

            <button
              className="invtCommunity"
              // loading={loading}
             onClick={()=>invitedCommunity(data.id)}
            >
              Invite Community
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add_committee;
