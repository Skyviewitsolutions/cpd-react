import React from "react";
import events_card from "../../assets/Images/event_cardimg.svg";
import eye from "../../assets/Images/eye.svg";
import time from "../../assets/Images/time.svg";
import Card from "react-bootstrap/Card";
import event_cardimg from "../../assets/Images/event_cardimg.svg";
import "./DetailsCard.css";
import { useNavigate } from "react-router-dom";

const DetailsCard = (props) => {

  const { data, key, picPath } = props;
  const image = picPath + data.event_photo;
  const navigate = useNavigate();

  var days = [] 

  return (
    <>
       <Card className="Ecard_outline">
        <div className="Ecard_media_event">
          <img src={image ? image : event_cardimg} alt="" />
        </div>

        <Card.Body>
          <Card.Title className="Ecard_title">
            <div className="evDiscript">
              <p>{data?.event_description}</p>
            </div>
            <div className="avlbltyEvent">
            <h6 className="evntt-days">
              Availble days : {" "}
               {days.map((itm, ind) => {
                 return (
                   <>
                     <span key={ind}>{itm} , </span>
                   </>
                 );
               })}
             </h6>
            </div>
          </Card.Title>
          <div className="Ename_boxes">
            <h6>{data?.creator_name}</h6>
            <button
              className="evntBtnViewDtls"
              onClick={() =>
                navigate("/event-details", { state: { eventDetails: data } })
              }
            >
              <img src={eye} alt="" style={{marginRight : "4px"}}></img> view details
            </button>
           
          </div>
          <div className="Etiming_boxes">
            <h6>
              <img src={time} alt=""></img>{" "}
              <span className="evntcrdDurtion">{data?.event_duration}</span>
            </h6>

            <h6>{data?.event_type}</h6>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default DetailsCard;
