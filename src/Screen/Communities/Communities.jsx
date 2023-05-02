import React, { useState, useEffect } from "react";
import "./communities.css";
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
import showToast from "../../Component/CustomToast/CustomToast";
import Loader from "../../Component/Loader/Loader";

const Communities = () => {

  const [allCommunity, setAllCommunity] = useState([]);
  const [communityData , setCommunityData] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [showCommunityForm, setShowCommunityForm] = useState(false);
  const [communityId, setCommunityId] = useState("");
  const [myCommunity, setMyCommunity] = useState([]);
  const [inputCommunity , setInputCommunity] = useState("");
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
    setLoading(true)
    axios
      .get(getCommunityUrl)
      .then((res) => {
        setLoading(false)
        if (res.data.result === true) {
          const val = res.data.data;
          const imgPath = res.data.image_path;
          setImagePath(imgPath);
          // const communityId=res.data[0]._id;
          const comunityId = res.data.data?.[0]._id;
          localStorage.setItem("comunityId", comunityId);
          setCommunityId(comunityId);
          setAllCommunity(val);
          setCommunityData(val);
        }
      })
      .catch((err) => {
        setLoading(false)
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
    setLoading(true)

    axios
      .get(getMycommunityUrl, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          setLoading(false)
          const val = res.data.data;
          console.log(val, "myCommunity here");
          setMyCommunity(val);
        }
      })
      .catch((err) => {
         setLoading(false)
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
      setLoading(true)
      axios
        .post(addCommunityUrl, formData, { headers: headers })
        .then((res) => {
          setLoading(false)
          if (res.data.result) {
            showToast("community created successfully",  "success" );
            navigate("/myCommunity");
          } else if (!res.data.result) {
            showToast(res.data?.message,  "warning" );
          }
        })
        .catch((err) => {
          setLoading(false)
          console.log(err, "this is the error");
        });
    }
  };

  // writing code for joining and leaving the community;

  const joinCommunity = (id) => {
    const token = localStorage.getItem("token");
    
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      setLoading(true)
      const url = `${endpoints.community.joinCommunity}${id}`;

      axios
        .get(url, { headers: headers })
        .then((res) => {
          setLoading(false)
          if (res.data.result) {
            showToast("Community joined successfully",  "success" );
            getAllCommunity();
            getMyCommunity();
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
            showToast("Community left successfully",  "success" );
            getAllCommunity();
            getMyCommunity();
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

  const handleSearch = (e) => {
    var val = e.target.value;
    val = val.toLowerCase();
    setInputCommunity(e.target.value)

    const filterEvent = communityData.filter((item, index) => {
      var communityTitle = item.display_name.toLowerCase();
      return communityTitle.includes(val);
    });

    setAllCommunity(filterEvent);
    if(val == ""){
      setAllCommunity(communityData)
    }
  };


  return (
    <>
      <Homepage_header />
      <Networking_headers title="Communities" />
      {/*  */}
      <div className="networking_wrapper">
        <div class="networkingWrap mb-4">
          <div className="networkingleft" >
            <CustomFilter />
          </div>

          <div className="networkingRight">
            <div className="row d-flex align-items-center ">
              <div className="col-lg-7 col-md-6 col-12">
                <div className="workshop_searchBar">
                  <div className="form-group">
                   
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search Here"
                      value={inputCommunity}
                      onChange={(e) => handleSearch(e)}
                    />
                     <HiSearch id="networking_search" />
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-6 col-12 d-flex">
                <div className="eventBtn">
                  <Button
                    title="Back to Events"
                    onClick={() => navigate("/networking")}
                    style={{borderRadius : "29px"}}
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
        {loading && <Loader />}
      </div>

      <Footer />
    </>
  );
};

export default Communities;
