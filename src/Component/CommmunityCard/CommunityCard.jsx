import React, { useState, useEffect } from "react";
import "./communityCard.css";
import { useNavigate } from "react-router-dom";
import { InlineShareButtons } from "sharethis-reactjs";
import MembersDetails from "../Modal/MembersDetails/MembersDetails";
import { toast, ToastContainer } from "react-toastify";
import event_cardimg from "../../assets/Images/event_cardimg.svg";
import eye from "../../assets/Images/eye.svg";
import Subscribe from "../button/Subscribe";
import { FaUser } from "react-icons/fa";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { generatePath } from "react-router-dom";
import DefaultImg from "../../assets/Images/default.png"


const CommunityCard = (props) => {
  
  const {
    data,
    key,
    imagePath,
    isSubscribed,
    showSubscribe,
    showEdit,
    leaveCommunity,
    joinCommunity,
    handleUpdateCommunity ,
    deleteCommunity,
    loading,
  } = props;

  const image = imagePath + data?.image;
  const [selectedCommunityIdForMember, setSelectedCommunityForMember] =
    useState("");
    const token = localStorage.getItem("token")
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleMembers = (id) => {
    if(token){
    setSelectedCommunityForMember(id);
    setShow(true);
    }
    else {
      toast("Please login" , {type : "warning"})
    }
  };

  const handleDetails = (dta) =>{
    const communityId = dta._id;
    const path = generatePath("/community-details/:communityId", {
      communityId: communityId,
    });
    navigate(path , {state: { communityDetails: data } });
  }
 
  return (
    <>
      <div className="domainCard_outline">
        <div className="Card ">
          <div className="domainCard_media">
            <img src={data?.image ? image : DefaultImg} alt="" />
            <div className="domainCard_title">
              <h6
              >
                {data?.display_name}
              </h6>
            </div>
          </div>
          <div className="domainCard_description">
            <div className="domainCard_definition">
              <h6>{data?.description}</h6>
            </div>
            <div className="domainCardName_box">
              <div className="domaintooltip">
                <h6
                  onClick={() => handleDetails(data) }
                  className="domaintooltipT"
                >
                  view details{" "}
                  <AiOutlineEye
                    color="white"
                    size={15}
                    style={{ marginLeft: "6px" }}
                  />
                </h6>
                <span className="tooltiptextabc">
                  <h5>{data?.display_name}</h5>
                  <div className="subType">
                    <h6>Sub Type </h6> : <span>{data?.sub_type}</span>
                  </div>
                  <div className="subType">
                    <h6>Status </h6> : <span>{data?.visibility}</span>
                  </div>
                  <div className="subType">
                    <h6>Members </h6> : <span>{data?.members_count}</span>
                  </div>
                </span>
              </div>
            </div>
            <div className="criteria_join" style={{ marginBottom: 5 }}>
              <h6>
                Criteria to Join &nbsp; : &nbsp;<span>{data?.criteria}</span>
              </h6>
            </div>
            <div className="shareBtn">
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
                  size: 32, // the size of each button (INTEGER)
                  // OPTIONAL PARAMETERS
                  url: "https://cpdedu.com/event", // (defaults to current url)
                  image: data?.image ? image : event_cardimg, // (defaults to og:image or twitter:image)
                  description: data?.description, // (defaults to og:description or twitter:description)
                  title: data?.display_name, // (defaults to og:title or twitter:title)
                  message:
                    "https://cpdedu.com/event" + "\n" + data?.description, // (only for email sharing)
                  subject: data?.display_name, // (only for email sharing)
                }}
              />
            </div>
            <div className="member" style={{ marginTop: 10 }}>
              <div
                className="domain_cards_members"
                onClick={() => handleMembers(data._id)}
              >
                <h5>Members : </h5>
                <h6>{data?.members_count}</h6>
                <FaUser size={12} color="var(--lightgray)" />
              </div>
              {showSubscribe &&
                (isSubscribed ? (
                  <Subscribe
                    text="UNSUBSCRIBE"
                    onClick={() => leaveCommunity(data._id)}
                    loading={loading}
                  />
                ) : (
                  <Subscribe
                    text="SUBSCRIBE"
                    onClick={() => joinCommunity(data._id)}
                    loading={loading}
                  />
                ))}

              {show && (
                <MembersDetails
                  show={show}
                  setShow={setShow}
                  selectedCommunityIdForMember={selectedCommunityIdForMember}
                />
              )}

              {showEdit && (
                <div className="workshopEdit">
                  <FiEdit
                    color="#2c6959"
                    onClick={() => handleUpdateCommunity(data)}
                  />
                  <AiOutlineDelete
                    color="#2c6959"
                    onClick={() => deleteCommunity(data._id)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default CommunityCard;
