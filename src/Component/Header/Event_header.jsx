import {useState} from "react";
import Plus_button from "../button/Plus_button";
import Event_button from "../button/Event_button";
import { FaRegUser } from "react-icons/fa";
import "./Event_header.css";
import { useNavigate } from 'react-router-dom';
import AddEvent_Modal from "../Modal/AddEvent_Modal";
import { endpoints } from "../services/endpoints";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import user from "../../assets/Icons/Artboard58.svg";

const Event_header = (props) => {

    const [showCommunityForm, setShowCommunityForm] = useState(false);
    const navigate = useNavigate();
    const{eventDetails}=props;
    const [topics, setTopics] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [description, setDescriptions] = useState("");
    const [tags, setTags] = useState("");
    const [imgFiles, setImgFiles] = useState(null);

    const addCommunityUrl = endpoints.community.addCommunity;
    const addCommunity = () => {
        if (!topics) {
          toast("Topic is required", { type: "warning" });
        } else if (!displayName) {
          toast("Display name is required", { type: "warning" });
        } else if (!description) {
          toast("Description is required", { type: "warning" });
        } else if (!tags) {
          toast("Tags is required", { type: "warning" });
        } else {
          const token = localStorage.getItem("token");
         
    
          const formData = new FormData();
    
          formData.append("topic", topics);
          formData.append("display_name", displayName);
          formData.append("description", description);
          formData.append("image", imgFiles);
          formData.append("criteria", tags);
    
          const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          };
    
          axios
            .post(addCommunityUrl, formData, { headers: headers })
            .then((res) => {
              if (res.data.result) {
                toast("community created successfully", { type: "success" });
              } else if (!res.data.result) {
                toast(res.data?.message, { type: "warning" });
              }
            })
            .catch((err) => {
              console.log(err, "this is the error");
            });
        }
    
        // Update community Api Implementation
        const token = localStorage.getItem("token");
        const communityId=localStorage.getItem("communityId")
        console.log(communityId,"event header community id")
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        };
        const Updateapi = `https://admin.cpdedu.com/api/v1/community/update/=${communityId}`;
    
        axios
          .post(Updateapi, { headers: headers })
          .then((res) => {
            if (res.data.result) {
              toast("community created successfully", { type: "success" });
            } else if (!res.data.result) {
              toast(res.data?.message, { type: "warning" });
            }
          })
          .catch((err) => {
            console.log(err, "this is the community update error");
          });
      };
       


  return (
    <>
    <div className="Communityheader">
        <div className="row">
          <div className="col-lg-7 col-md-12 col-sm-12 community_left">
            <div className="community_details">
              <h4>Event Name : {eventDetails?.event_title}</h4>
              <p>Discription : {eventDetails?.event_description}</p>
              <h6>
                <span>Criteria To Join:</span> {eventDetails?.event_type}
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
                  Member : <span>{eventDetails?.max_members}</span>
                </h6>
                </div>
                <div className="col-sm-4">
                <Event_button  text="Back To Event" onClick={()=>navigate("/networking")}/>
                </div>
                <div className="col-sm-4">
                  <Plus_button  onClick={() => setShowCommunityForm(true)}/>
                  <h5   onClick={() => setShowCommunityForm(true)}> Create Event</h5>
                </div>
              </div>
          
                

            </div>
          </div>
        </div>
     
        <AddEvent_Modal
         show={showCommunityForm}
         addCommunity={addCommunity}
         onHide={() => setShowCommunityForm(false)}

         topics={topics}
         setTopics={setTopics}
         setDisplayName={setDisplayName}
         displayName={displayName}
         description={description}
         setDescriptions={setDescriptions}
         tags={tags}
         setTags={setTags}
         imgFiles={imgFiles}
         setImgFiles={setImgFiles}
        />
       </div>
    </>
  );
};

export default Event_header;
