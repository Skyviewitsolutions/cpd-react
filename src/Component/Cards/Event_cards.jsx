import React from "react";
import "./Event_cards.css";
import Card from "react-bootstrap/Card";
import time from "../../assets/Images/time.svg";
import eye from "../../assets/Images/eye.svg";
import event_cardimg from "../../assets/Images/event_cardimg.svg";
import { useNavigate } from "react-router-dom";
import { InlineShareButtons } from "sharethis-reactjs";



const Event_cards = (props) => {

  const { data, key, picPath } = props ;
  const image = picPath + data.event_photo;
  const navigate = useNavigate();

  // var days = data?.availability_date;
  // days = days.replaceAll('"', "");
  // days = days.split(",");
 

  // var timeslots = data?.timeslots;

  console.log(data , "data here which we are getting here");

  return (
    <>
      <Card className="Ecard_outline cardCont">
        <div className="Ecard_media_event">
          <img src={image ? image : event_cardimg} alt="" />
        </div>

        <Card.Body>
          <Card.Title className="Ecard_title titleCont">
            <div className="evDiscript">
              <p>{data?.event_description}</p>
            </div>
            <div className="avlbltyEvent">
            <h6 className="evntt-days">
              Available days : {" "}
               {/* {days.map((itm, ind) => {
                 return (
                   <>
                     <span key={ind}>{itm} , </span>
                   </>
                 );
               })} */}
             </h6>
            </div>
          </Card.Title>
          <div className="Ename_boxes domaintooltip">
            <h6>{data?.creator_name}</h6>
            <button
              className="evntBtnViewDtls"
              onClick={() =>
                navigate("/event-details", { state: { eventDetails: data } })
              }
            >
              <img src={eye} alt="" style={{marginRight : "4px"}}></img> view details
            </button>
            {/* <h6  onClick={() =>navigate('/event_details',{state:{eventDetails:data}})}>
            </h6> */}
            <span className="eventtooltiptextabc">
                  <h5>{data?.creator_name}</h5>
                  <div className="subType">
                    <h6>Event Title  </h6>{" "}:{" "}
                    <span>{data?.event_title}</span>
                  </div>
                  <div className="subType">
                    <h6>Mode  </h6>{" "}:{" "}
                    <span>{data?.event_type}</span>
                  </div>
                  <div className="subType">
                    <h6>Max Members  </h6>{" "}:{" "}
                    <span>{data?.max_members}</span>
                  </div>
                </span>
          </div>
          <div className="shareBtn2">
            <InlineShareButtons
              config={{
                alignment: "center",
                color: "social", // set the color of buttons (social, white)
                enabled: true, // show/hide buttons (true, false)
                font_size: 16, // font size for the buttons
                labels: null, // button labels (cta, counts, null)
                language: "en", // which language to use (see LANGUAGES)
                networks: [
                  // which networks to include (see SHARING NETWORKS)
                  "whatsapp",
                  "linkedin",
                  "messenger",
                  "facebook",
                  "email",
                ],
                padding: 12, // padding within buttons (INTEGER)
                radius: 4, // the corner radius on each button (INTEGER)
                show_total: false,
                size: 40, // the size of each button (INTEGER)

                // OPTIONAL PARAMETERS
                url: "https://cpdedu.com/myCommunity", // (defaults to current url)
                image: data.image ? image : event_cardimg, // (defaults to og:image or twitter:image)
                description: data?.description, // (defaults to og:description or twitter:description)
                title: data?.display_name, // (defaults to og:title or twitter:title)
                message:
                  "https://cpdedu.com/myCommunity" + "\n" + data?.description, // (only for email sharing)
                subject: data?.display_name, // (only for email sharing)
              }}
            />
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

export default Event_cards;