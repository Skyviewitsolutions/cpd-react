import React , {useState , useEffect} from 'react';
import "./communities.css";
import Event_cards from "../../Component/Cards/Event_cards";
import Event_button from "../../Component/button/Event_button";
import Plus_button from "../../Component/button/Plus_button";
import Sidenavbar from "../../Component/sidenavbar_community/Sidenavbar";
import Homepage_header from "../../Component/Header/Homepage_header";
import Footer from "../../Component/Footer/Footer";
import DomainCard from "../../Component/Cards/DomainCard/DomainCard";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../../Component/services/endpoints";
import axios from "axios";
import AddEvent_Modal from "../../Component/Modal/AddEvent_Modal";
import { toast, ToastContainer } from "react-toastify";
import Networking_headers from "../../Component/Header/Networking_headers";
import Add_committee from "../../Component/Cards/Add_committee";
import NoDataImg from "../../assets/Images/noDataFound.png";
import CustomFilter from '../../Component/CustomFilter/CustomFilter';


const Communities = () => {

  const [allCommunity, setAllCommunity] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [showCommunityForm, setShowCommunityForm] = useState(false);
  const [communityId, setCommunityId] = useState("");
  const [myCommunity, setMyCommunity] = useState([]);

  // adding form data here ;

  const [topics, setTopics] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [description, setDescriptions] = useState("");
  const [tags, setTags] = useState([]);
  const [imgFiles, setImgFiles] = useState(null);

  const navigate = useNavigate();

  const getCommunityUrl = endpoints.community.getAllCommunity;
  const addCommunityUrl = endpoints.community.addCommunity;

  const getAllCommunity = () => {
    axios
      .get(getCommunityUrl)
      .then((res) => {
       
        if (res.data.result === true) {
         
          const val = res.data.data;
        
          const imgPath = res.data.image_path;
          setImagePath(imgPath);
          // const communityId=res.data[0]._id;
          const comunityId = res.data.data[0]._id;
          localStorage.setItem("comunityId", comunityId);
          setCommunityId(comunityId);

          setAllCommunity(val);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error");
      });
  };

// my community api

  const getMyCommunity = () => {
    const token = localStorage.getItem("token");
    const getMycommunityUrl = endpoints.community.myCommunity;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    axios
      .get(getMycommunityUrl, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          const val = res.data.data;
          console.log(val ,"myCommunity here");
          setMyCommunity(val);
        }
        
      })
      .catch((err) => {
        console.log(err, "this is the error");
      });
  };

  useEffect(() => {
    getAllCommunity(allCommunity);
    getMyCommunity();
  }, []);

  // Add community api implementation

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
      formData.append("tag", JSON.stringify(tags));

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      axios
        .post(addCommunityUrl, formData, { headers: headers })
        .then((res) => {
          if (res.data.result) {
            toast("community created successfully", { type: "success" });
            navigate("/myCommunity");
          } else if (!res.data.result) {
            toast(res.data?.message, { type: "warning" });
          }
        })
        .catch((err) => {
          console.log(err, "this is the error");
        });
    }

    
  };

  // adding join api

 
  return (<> 
    <Homepage_header />
      <Networking_headers />
      {/*  */}
      <div className="p-4">
        <div class="row mb-4">
          <div className="  col-lg-3 mt-5 ">
            <CustomFilter />
          </div>

          <div className="col-sm-12 col-md-12 col-lg-9 mt-5">
            <div className="row  ">
              <div className="col-12 col-md-12 col-lg-8 mb-3">
                <inputbox className="form-control networking_searchbox">
                  search{" "}
                </inputbox>
              </div>
              <div
                className="col-8 col-md-6 col-lg-2"
                onClick={() => navigate( "/networking" )}
              >
                <button className="networkingcommunitybtn"> Back to Events </button>
                {/* <button className="BackToCommunites">Back to Events</button> */}
              </div>
              <div className="col-4 col-md-6 col-lg-2">
              {/* <div className="col-4 col-md-6 col-lg-2 addCmntyCont" > */}
              <button className="networkingcommunitybtn"> Add Community </button>
                {/* <Plus_button  onClick={() => navigate( "/create_community" )}
                  text=""
                /> */}
                {/* <h6 className="addCmntys">Add Community</h6> */}
              </div>
            </div>

            <div className="upcoming">
              <h3>Domain Based</h3>
            </div>

            <div className="row mt-3">
              {allCommunity.length != 0 &&
                allCommunity.map((itm, index) => {
                  const id = itm._id;
                  var isSubscribed = myCommunity.some((element) => {
                    if (element._id === id) {
                      return true;
                    }
                    return false;
                  });

                  return (
                    <>
                      <div className="col-sm-12 col-md-6 col-lg-4 px-4">
                        <DomainCard
                          data={itm}
                          key={index}
                          imagePath={imagePath}
                          isSubscribed={isSubscribed}
                          getMyCommunity={getMyCommunity}
                          getAllCommunity={getAllCommunity}
                        />
                      </div>
                    

                    </>
                  );
                })}
            </div>

            {allCommunity.length == 0 && (
                  <div className="noDataCont">
                    <img src={NoDataImg} alt="" />
                  </div>
                )}

            {/* here we are adding modal */}

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
        </div>
        <ToastContainer />
      </div>

      <Footer />
      </>)
}

export default Communities