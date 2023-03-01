import { useState } from "react";
import "./MyCreatedCommunityCard.css";
import Card from "react-bootstrap/Card";
import { InlineShareButtons } from "sharethis-reactjs";
import event_cardimg from "../../assets/Images/event_cardimg.svg";
import time from "../../assets/Images/time.svg";
import eye from "../../assets/Images/eye.svg";
import { CiUser } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { AiOutlineShareAlt, AiOutlineEye } from "react-icons/ai";
import Subscribe from "../button/Subscribe";
import { useNavigate } from "react-router-dom";
import AddEvent_Modal from "../Modal/AddEvent_Modal";
import { useEffect } from "react";
import { endpoints } from "../services/endpoints";
import { toast, ToastContainer } from "react-toastify";
import { FaUser } from "react-icons/fa";
import MembersDetails from "../Modal/MembersDetails/MembersDetails";
import axios from "axios";


const MyCreatedCommunityCard = (props) => {
  
  const [loading, setLoading] = useState(false);
  const [showModal , setShowModal] = useState(false)
  const { data, key, imagePath, createCommunity, deleteCommunity } = props;
  const [selectedCommunityIdForMember , setSelectedCommunityForMember] = useState("")

  const image = imagePath + data?.image;

  // adding form data here ;

  const [topics, setTopics] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [description, setDescriptions] = useState("");
  const [tags, setTags] = useState([]);
  const [imgFiles, setImgFiles] = useState(null);
  const [selectedId, setSelectedId] = useState();
  const [deleteIconColor, setDeleteColor] = useState("gray");

  const joinCommunity = (id) => {
    setLoading(true);
    const token = localStorage.getItem("token");
  };

  const leaveCommunity = (id) => {
    setLoading(true);
    const token = localStorage.getItem("token");
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setTopics(data.topic);
      setDisplayName(data.display_name);
      setDescriptions(data.description);
      // setTags(data?.tags)
      setSelectedId(data?._id);
      const fileName = "myFile.jpg";
      setTags(isJson(data.tag));

      fetch(image).then(async (response) => {
        const contentType = response.headers.get("content-type");
        const blob = await response.blob();
        const file = new File([blob], fileName, { contentType });
        setImgFiles(file);
      });
    }
  }, [data]);

  const isJson = (str) => {
    try {
      let value = JSON.parse(str);
      return value;
    } catch (e) {
      return false;
    }
  };

  const handleUpdateCommunity = (dta) => {
    var cmData = { ...dta, imagePath: imagePath };
    navigate("/create-community", { state: cmData });
  };

  const handleMembers = (id) =>{
    setShowModal(true);
    setSelectedCommunityForMember(id)
  }

  return (
    <>
      <div className="Card mycard">
        <div className="domainCard_media">
          <img src={data.image ? image : event_cardimg} alt="" />
          <div className="domainCard_title">
            <h6>{data?.display_name}</h6>
          </div>
        </div>
        <div className="domainCard_description">
          <div className="createcmntyCard_definition">
            <h6>{data.description}</h6>
          </div>
          <div className="name_boxex domaintooltip">
            <h6
              onClick={() =>
                navigate("/community-details", {
                  state: { communityDetails: data },
                })
              }
            >
              <span>
                <AiOutlineEye />
              </span>
              View details
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
            <h6 onClick={() => handleUpdateCommunity(data)}>
              <span>
                <BiEdit />
              </span>
              Edit
            </h6>
          </div>
          <div className="criteria_join">
            <h6>
              <span id="join">Criteria to Join : </span>
              {data.criteria}
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
                image: data.image ? image : event_cardimg, // (defaults to og:image or twitter:image)
                description: data?.description, // (defaults to og:description or twitter:description)
                title: data?.display_name, // (defaults to og:title or twitter:title)
                message:
                  "https://cpdedu.com/myCommunity" + "\n" + data?.description, // (only for email sharing)
                subject: data?.display_name, // (only for email sharing)
              }}
            />
          </div>
          <div className="member">
            <div className="domain_cards_members" onClick={() =>handleMembers(data._id)}>
              <h5>Members:</h5>
              <h6>{data?.members_count}</h6>
              <FaUser size={16} color="gray" className="user_icons" />
            </div>
            <MdDelete
              color={deleteIconColor}
              size={18}
              onMouseOver={() => setDeleteColor("red")}
              onMouseOut={() => setDeleteColor("gray")}
              onClick={() => deleteCommunity(data._id)}
            />
          </div>
          {showModal &&  <MembersDetails show={showModal} setShow={setShowModal} selectedCommunityIdForMember={selectedCommunityIdForMember}/>}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default MyCreatedCommunityCard;
