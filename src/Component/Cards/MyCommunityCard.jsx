import React, { useState } from "react";
import "./MyCommunityCard.css";
import Card from "react-bootstrap/Card";

import event_cardimg from "../../assets/Images/event_cardimg.svg";
import time from "../../assets/Images/time.svg";
import eye from "../../assets/Images/eye.svg";
import { CiUser } from "react-icons/ci";
import Subscribe from "../button/Subscribe";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../services/endpoints";
import axios from "axios";
import { toast } from "react-toastify";
import { data } from "jquery";

const MyCommunityCard = (props) => {
  
  const [loading, setLoading] = useState(false);
  const { data, key, imagePath } = props;
  const image = imagePath + data.image;
  const joinCommunity = (id) => {
    setLoading(true);
    const token = localStorage.getItem("token");
  };

  const leaveCommunity = (id) => {
    setLoading(true);
    const token = localStorage.getItem("token");
  };

  return (
    <>
      <Card className="card_outline">
        <img
          src={data.image ? image : event_cardimg}
          alt=""
          className="card_img"
        />
        <div className="overlay_image">
          <h6>{data?.topic}</h6>
        </div>
        <span>{data.description}</span>
        <Card.Body>
          <Card.Title className="card_title">
            <h5>{data?.display_name}</h5>
          </Card.Title>
          <div
            className="name_box"
            //   onClick={community_Finance}
          >
            <h6>
              <img src={eye} alt=""></img> view details
            </h6>
          </div>
          <span>Create date:{data.created_at}</span>

          <div className="criteria_join">
            <h6>
              {" "}
              <span id="join">Criteria to Join:</span> 2 years of Relevant
            </h6>
          </div>
          <div className="member">
            <h5>Members:</h5>
            <h6>{data.members_count}</h6>
            <div className="user_icon">{/* <CiUser /> */}</div>

            {/* {data ?
             <Subscribe
              text="UnSubscribed"
              onClick={() => leaveCommunity(data.joining[0].joining_status)}
              loading={loading}
            />  : <Subscribe
            text="Subscribe"
            onClick={() => joinCommunity(data._id)}
            loading={loading}
          />} */}
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default MyCommunityCard;
