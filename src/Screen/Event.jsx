import React, { useState, useEffect } from "react";
import "./Event.css";
import Event_cards from "../Component/Cards/Event_cards";
import Event_button from "../Component/button/Event_button";
import Plus_button from "../Component/button/Plus_button";
import Sidenavbar from "../Component/sidenavbar_community/Sidenavbar";
import Homepage_header from "../Component/Header/Homepage_header";
import Footer from "../Component/Footer/Footer";
import Domain_cards from "../Component/Cards/DomainCard/DomainCard";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../Component/services/endpoints";
import axios from "axios";
import AddEvent_Modal from "../Component/Modal/AddEvent_Modal";
import { toast, ToastContainer } from "react-toastify";
import Networking_headers from "../Component/Header/Networking_headers";
import Add_committee from "../Component/Cards/Add_committee";
import showToast from "../Component/CustomToast/CustomToast";

const Event = () => {
  
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
      showToast("Topic is required",  "warning" );
    } else if (!displayName) {
      showToast("Display name is required",  "warning" );
    } else if (!description) {
      showToast("Description is required",  "warning" );
    } else if (!tags) {
      showToast("Tags is required",  "warning" );
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
            showToast("community created successfully",  "success" );
            navigate("/myCommunity");
          } else if (!res.data.result) {
            showToast(res.data?.message, "warning" );
          }
        })
        .catch((err) => {
          console.log(err, "this is the error");
        });
    }

    // Update community Api Implementation
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    const Updateapi = `https://admin.cpdedu.com/api/v1/community/update/=${communityId}`;

    axios
      .post(Updateapi, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          showToast("community created successfully",  "success" );
        } else if (!res.data.result) {
          showToast(res.data?.message, "warning" );
        }
      })
      .catch((err) => {
        console.log(err, "this is the community update error");
      });
  };

  // adding join api

  useEffect(() => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const api = `https://admin.cpdedu.com/api/v1/community/join/=${communityId}`;

    axios
      .get(api, { headers: headers })
      .then((res) => {
        console.log(res, "Community join");
      })
      .catch((err) => {
        console.log(err, "this is the community join error");
      });
  }, []);

  // adding leave api

  useEffect(() => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const api = `https://admin.cpdedu.com/api/v1community/leave/=${communityId}`;

    axios
      .get(api, { headers: headers })
      .then((res) => {
        console.log(res, "Leave Community");
      })
      .catch((err) => {
        console.log(err, "this is the community leave error");
      });
  }, []);

  return (
    <>
      <Homepage_header />
      <Networking_headers />
      {/*  */}
      <div className="container">
        <div class="row mb-4">
          <div className="col-sm-5 col-md-6 col-lg-2 mt-5 ">
            <Sidenavbar />
          </div>

          <div className="col-sm-5 col-md-6 col-lg-10 mt-5">
            <div className="row  ">
              <div className="col-12 col-md-12 col-lg-8 mb-3">
                <inputbox className="form-control networking_searchbox">
                  search{" "}
                </inputbox>
              </div>
              <div
                className="col-8 col-md-6 col-lg-3"
                onClick={() => navigate("/networking")}
              >
                <button className="BackToCommunites">Back to Events</button>
                {/* <Event_button text="Back to Events" /> */}
              </div>
              <div className="col-4 col-md-6 col-lg-1">
                <Plus_button  onClick={() => navigate("/create-community")}
                  // onClick={() => setShowCommunityForm(true)}
                  text=""
                />
                <span className="addCmnty">Add Community</span>
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
                      <div className="col-sm-12 col-md-6 col-lg-4 ">
                        <Domain_cards
                          data={itm}
                          key={index}
                          imagePath={imagePath}
                          isSubscribed={isSubscribed}
                          getMyCommunity={getMyCommunity}
                          getAllCommunity={getAllCommunity}
                        />
                      </div>
                      
                      {/* <div className="col-sm-12 col-md-6 col-lg-4 ">
                        <Add_committee
                          data={itm}
                          key={index}
                          imagePath={imagePath}
                          // isSubscribed={isSubscribed}
                          // getMyCommunity={getMyCommunity}
                          // getAllCommunity={getAllCommunity}
                        />
                      </div> */}

                    </>
                  );
                })}
            </div>

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
    </>
  );
};

export default Event;
