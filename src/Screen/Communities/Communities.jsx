import React, { useState, useEffect } from "react";
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
import CustomFilter from "../../Component/CustomFilter/CustomFilter";
import { BiPlusCircle } from "react-icons/bi";
import { HiSearch } from "react-icons/hi";
import Button from "../../Component/button/Button/Button";
import CommunityCard from "../../Component/CommmunityCard/CommunityCard";

const Communities = () => {

  const [allCommunity, setAllCommunity] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [showCommunityForm, setShowCommunityForm] = useState(false);
  const [communityId, setCommunityId] = useState("");
  const [myCommunity, setMyCommunity] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

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
          const comunityId = res.data.data?.[0]._id;
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
          console.log(val, "myCommunity here");
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

  // writing code for joining and leaving the community;

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
            toast("Community joined successfully", { type: "success" });
            getAllCommunity();
            getMyCommunity();
          } else if (!res.data.result) {
            toast(res.data?.message, { type: "warning" });
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      toast("Please login", { warning: "warning" });
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
          setLoading(false);
          if (res.data.result) {
            toast("Community left successfully", { type: "success" });
            getAllCommunity();
            getMyCommunity();
          } else if (!res.data.result) {
            toast(res.data?.message, { type: "warning" });
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      toast("Please login", { type: "warning" });
    }
  };

  return (
    <>
      <Homepage_header />
      <Networking_headers />
      {/*  */}
      <div className="p-4">
        <div class="row mb-4">
          <div className="col-lg-3" style={{ width: "21%" }}>
            <CustomFilter />
          </div>

          <div className="col-sm-12 col-md-12 col-lg-9 ">
            <div className="row d-flex align-items-center ">
              <div className="col-lg-7 col-md-6 col-12">
                <div className="networkingsearchBox">
                  <div className="form-group">
                    <HiSearch id="networking_search" />
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search Here"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-6 col-12 d-flex">
                <div className="eventBtn">
                  <Button
                    title="Back to Events"
                    onClick={() => navigate("/networking")}
                  />
                </div>
                {token && 
                <div
                  className="createEvnet"
                  onClick={() => navigate("/create-community")}
                >
                  <h6>Create Community</h6>
                  <BiPlusCircle color="white" size={20} />
                </div>}
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
                        <CommunityCard
                          data={itm}
                          key={index}
                          imagePath={imagePath}
                          isSubscribed={isSubscribed}
                          getMyCommunity={getMyCommunity}
                          getAllCommunity={getAllCommunity}
                          joinCommunity={joinCommunity}
                          leaveCommunity={leaveCommunity}
                          loading={loading}
                          showSubscribe={true}
                          showEdit={false}
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
    </>
  );
};

export default Communities;
