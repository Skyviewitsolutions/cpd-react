import React from "react";
import "./MyCommunityCards.css";
import eye from "../../assets/Images/eye.svg";
import { CiUser } from "react-icons/ci";
import event_cardimg from "../../assets/Images/event_cardimg.svg";
import Subscribe from "../button/Subscribe";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../services/endpoints";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { InlineShareButtons } from "sharethis-reactjs";
import { useState } from "react";
import MembersDetails from "../Modal/MembersDetails/MembersDetails";
import showToast from "../CustomToast/CustomToast";


const MyCommunityCards = (props) => {

  const { data, key, imgFiles, isSubscribed , myCommunity } = props;
  
  
  const image = imgFiles + data?.image;
  const [loading, setLoading] = useState(false);
  const [showModal , setShowModal] = useState(false)
  const [selectedCommunityIdForMember , setSelectedCommunityForMember] = useState("")
  
  const navigate = useNavigate();

  const joinCommunity = (id) => {
    const token = localStorage.getItem("token");

    if (token) {
      setLoading(true);

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const url = `${endpoints.community.joinCommunity}${id}`;

      axios
        .get(url, { headers: headers })
        .then((res) => {
          console.log(res, "join community response");
          setLoading(false);
          if (res.data.result) {
            myCommunity()
            showToast("Community joined successfully","success" );
          } else if (!res.data.result) {
            showToast(res.data?.message, "warning" );
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      showToast("Please login",  "warning" );
    }
  };

  const leaveCommunity = (id) => {
    const token = localStorage.getItem("token");

    if (token) {
      setLoading(true);

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const url = `${endpoints.community.leaveCommunity}${id}`;
      axios
        .get(url, { headers: headers })
        .then((res) => {
          console.log(res, "join community response");
          setLoading(false);
          if (res.data.result) {
            showToast("Community left ",  "success");
            myCommunity()
          } else if (!res.data.result) {
            showToast(res.data?.message,  "warning" );
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      showToast("Please login",  "warning" );
    }
  };


  const handleMembers = (id) =>{
    setShowModal(true);
    setSelectedCommunityForMember(id)
  }


  return (
    <>
      <div className="domainCard_outline">
        <div className="Card ">
          <div className="domainCard_media">
            <img src={data?.image ? image : event_cardimg} alt="" />
            <div className="domainCard_title">
              <h6
                onClick={() =>
                  navigate("/community-details", {
                    state: { communityDetails: data },
                  })
                }
              >
                {data?.display_name}
              </h6>
            </div>
          </div>
          <div className="domainCard_description">
            <div className="myjoincmntyCard_definition">
              <h6>{data?.description}</h6>
            </div>

            <div className="domainCardName_box domaintooltip">
              <h6
                onClick={() =>
                  navigate("/community-details", {
                    state: { communityDetails: data },
                  })
                }
              >
                <img src={eye} alt=""></img> view details
              </h6>
              <span className="tooltiptextabc">
                  <h5>{data?.display_name}</h5>
                  <div className="subType">
                    <h6>Sub Type : </h6>
                    <span>{data?.sub_type}</span>
                  </div>
                  <div className="subType">
                    <h6>Status : </h6>
                    <span>{data?.visibility}</span>
                  </div>
                  <div className="subType subTypeLast">
                    <h6>Members : </h6>
                    <span>{data?.members_count}</span>
                  </div>
                </span>
            </div>
            <div className="criteria_join" style={{ marginBottom: 5 }}>
              <h6>
                {" "}
                <span id="join">Criteria to Join:</span> {data?.criteria}
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
                size: 40, // the size of each button (INTEGER)

                // OPTIONAL PARAMETERS
                url: "https://cpdedu.com/myCommunity", // (defaults to current url)
                image: data?.image ? image : event_cardimg, // (defaults to og:image or twitter:image)
                description: data?.description, // (defaults to og:description or twitter:description)
                title: data?.display_name, // (defaults to og:title or twitter:title)
                message:
                  "https://cpdedu.com/myCommunity" + "\n" + data?.description, // (only for email sharing)
                subject: data?.display_name, // (only for email sharing)
              }}
            />
            </div>
            <div className="member" style={{ marginTop: 10 }}>
              <div className="domain_cards_members" onClick={() =>handleMembers(data._id)}>
                <h5>Members : </h5>
                <h6>{data?.members_count}</h6>
                <CiUser className="domain_cards_user_icon" />
              </div>

              {data ? (
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
              )}
            </div>
          </div>
          {showModal &&  <MembersDetails show={showModal} setShow={setShowModal} selectedCommunityIdForMember={selectedCommunityIdForMember}/>}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default MyCommunityCards;
