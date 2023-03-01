import { useState, useEffect } from "react";
import Footer from "../../Component/Footer/Footer";
import "./MyCommunity.css";
import Sidenav_communityFinance from "../../Component/navbar/Sidenav_communityFinance";
import Homepage_header from "../../Component/Header/Homepage_header";
import MyCreatedCommunityCard from "../../Component/Cards/MyCreatedCommunityCard";
import axios from "axios";
import { endpoints } from "../../Component/services/endpoints";
import AddEvent_Modal from "../../Component/Modal/AddEvent_Modal";
import Networking_headers from "../../Component/Header/Networking_headers";
import AddCommunitySidebar from "../../Component/AddCommunitySidebar/AddCommunitySidebar";
import MyCommunityCards from "../../Component/Cards/MyCommunityCards";
import { toast } from "react-toastify";
import NoDataImg from "../../assets/Images/noDataFound.png";
import CustomFilter from "../../Component/CustomFilter/CustomFilter";
import CommunityCard from "../../Component/CommmunityCard/CommunityCard";
import { useNavigate, useLocation } from "react-router-dom";

const MyCommunity = () => {
  
  const [createdCommunity, setCreatedCommunity] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [sortCreateCommunity, setSortCreatedCommunity] = useState([]);
  const [showCreatedCommunity, setShowCreatedCommunity] = useState(false);
  const [myJoinCommmunity, setMyJoinCommunity] = useState([]);
  const [showMyJoinCommunity, setShowMyJoinCommunity] = useState(false);
  const [imgFiles, setImgFiles] = useState("");
  const [sortMyJoinCommunity, setSortMyJoinCommunity] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // created community

  const createCommunity = () => {
    const createdComunity = endpoints.community.createdCommunity;
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    setCreatedCommunity([]);

    axios
      .get(createdComunity, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          const val = res.data.data;
          const createdCommunityId = res.data.data[0]._id;
          const imgPath = res.data.image_path;
          setImagePath(imgPath);
          setCreatedCommunity(val);
          if (val.length >= 3) {
            var shortCreatedCommunity = [val[0], val[1], val[2]];
            setSortCreatedCommunity(shortCreatedCommunity);
          } else {
            setShowCreatedCommunity(true);
          }
        }
      })
      .catch((err) => {
        console.log(err, "Created communit data error");
      });
  };

  // my community
  const myCommunity = () => {
    const myCommunityApi = endpoints.community.myCommunity;
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    axios
      .get(myCommunityApi, { headers: headers })
      .then((res) => {
        if (res.data.result === true) {
          const val = res.data.data;
          const imgPath = res.data.image_path;
          setImgFiles(imgPath);
          setMyJoinCommunity(val);
          setShowMyJoinCommunity(showMyJoinCommunity);
          if (val.length >= 3) {
            var shortCommunity = [val[0], val[1], val[2]];
            setSortMyJoinCommunity(shortCommunity);
          } else {
            setShowMyJoinCommunity(true);
          }
        }
      })
      .catch((err) => {
        console.log(err, "Myjoin community data error");
      });
  };

  useEffect(() => {
    createCommunity();
    myCommunity();
  }, []);

  // here we are writing code for deleting the community ;

  const deleteCommunity = (id) => {
    const deleteCommunityUrl = `${endpoints.community.disableCommunity}${id}`;
    console.log(deleteCommunityUrl, "delete community url");

    const headers = {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    };

    axios
      .get(deleteCommunityUrl, { headers: headers })
      .then((res) => {
        console.log(res, "delete api response");
        if (res.data.result) {
          createCommunity();
          toast("Community deleted successfully", { type: "success" });
        } else {
        }
      })
      .catch((err) => {
        console.log(err, "response here");
      });
  };

  const handleUpdateCommunity = (dta) => {
    var cmData = { ...dta, imagePath: imagePath };
    navigate("/create-community", { state: cmData });
  };

  return (
    <>
      <Homepage_header />
      <Networking_headers />
      <div className="px-4">
        <div className=" row">
          <div className="col-lg-3 col-md-12 col-sm-12 mt-5">
            {createdCommunity.length != 0 && myJoinCommmunity.length !== 0 && (
              <CustomFilter />
            )}
          </div>

          <div className="col-lg-9 col-md-12 col-sm-12 mt-5">
            <div className="cretedCommunity">
              <h4 style={{ fontWeight: "700" }}>Created Community List </h4>
              {/* <button
                onClick={() => setShowCreatedCommunity(!showCreatedCommunity)}
                className="showHideCreateCommunity"
              >
                {showCreatedCommunity ? "View Less" : "View All"}
              </button> */}
            </div>

            <div className="row">
              {createdCommunity.length != 0 ? (
                createdCommunity.map((itm, index) => {
                  return (
                    <>
                      <div className="col-lg-4 col-md-6 col-12 mt-3 mb-5">
                        <CommunityCard
                          data={itm}
                          key={index}
                          imagePath={imagePath}
                          createCommunity={createCommunity}
                          myCommunity={myCommunity}
                          handleUpdateCommunity={handleUpdateCommunity}
                          deleteCommunity={deleteCommunity}
                          showSubscribe={false}
                          showEdit={true}
                        />
                      </div>
                    </>
                  );
                })
              ) : (
                <div className="noDataCont">
                  <img src={NoDataImg} alt="" />
                </div>
              )}
            </div>

            <div className="myjoinCommunity">
              <h4 style={{ fontWeight: "700" }}>My Community List </h4>
              {/* <button
                onClick={() => setShowMyJoinCommunity(!showMyJoinCommunity)}
                className="showHideCreateCommunity"
              >
                {showMyJoinCommunity ? "View Less" : "View All"}
              </button> */}
            </div>
            <div className="row">
              {myJoinCommmunity.length !== 0 ? (
                myJoinCommmunity.map((item, index) => {
                  return (
                    <>
                      <div className="col-lg-4 col-md-6 col-12 mt-3 mb-5">
                        <CommunityCard
                          data={item}
                          key={index}
                          imagePath={imagePath}
                          createCommunity={createCommunity}
                          myCommunity={myCommunity}
                          showSubscribe={true}
                          showEdit={false}
                        />
                      </div>
                    </>
                  );
                })
              ) : (
                <div className="noDataCont">
                  <img src={NoDataImg} alt="" />
                </div>
              )}
            </div>
          </div>
        </div>
        <AddEvent_Modal />
      </div>

      <Footer />
    </>
  );
};

export default MyCommunity;
