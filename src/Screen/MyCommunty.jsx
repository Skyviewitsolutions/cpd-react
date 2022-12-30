import MyCommunityCard from "../Component/Cards/MyCommunityCard";
import Homepage_header from "../Component/Header/Homepage_header";
import Sidenavbar from "../Component/navbar/Sidenavbar";
import "./MyCommunity.css";
import { useState, useEffect } from "react";
import Event_button from "../Component/button/Event_button";
import { AiFillPicture } from "react-icons/ai";
import { endpoints } from "../Component/services/endpoints";
import axios from "axios";
import Networking_headers from "../Component/Header/Networking_headers";


const MyCommunty = () => {

  const [createdCommunity, setCreatedCommunity] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [imgFiles, setImgFiles] = useState(null);
  //Create community api

  const createCommunity = () => {
    const createdComunity = endpoints.community.createdCommunity;
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    axios
      .get(createdComunity, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          const val = res.data.data;
          const imgPath = res.data.image_path;
          setImagePath(imgPath);
          setCreatedCommunity(val);
          console.log(val, "Created Community");
        }
      })
      .catch((err) => {
        console.log(err, "Created communit data error");
      });
  };
  useEffect(() => {
    createCommunity();
  }, []);

  return (
    <>
      <Homepage_header />
   <Networking_headers/>
      <div className="container">
        <div class="row mb-4">
          <div className="col-sm-5 col-md-6 col-lg-3 mt-5 ">
            <Sidenavbar />
          </div>
          <div className="col-sm-5 col-md-6 col-lg-9 mt-5">
            <div className="row  ">
              <div className="col-12 col-md-12 col-lg-8 mb-3">
                <inputbox className="form-control networking_searchbox">
                  search{" "}
                </inputbox>
              </div>
              <div
                className="col-8 col-md-6 col-lg-3"
                // onClick={() => navigate("/event")}
              >
                <Event_button text="View Communities" />
              </div>
              <div className="col-4 col-md-6 col-lg-1">
                {/* <Plus_button  /> */}
                {/* <span style={{fontSize:"15px"}}> Create Event</span> */}

                {/* <AddEvent_Modal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                /> */}
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-lg-12">
                <div className="latest">
                  <h3>My Community</h3>
                  {/* <button>View All</button> */}
                </div>
              </div>
              {createdCommunity.length != 0 &&
                createdCommunity.map((itm, index) => {
                  return (
                    <>
                      <div className="col-sm-12 col-md-6 col-lg-4 ">
                        <MyCommunityCard
                          data={itm}
                          key={index}
                          imagePath={imagePath}
                        />
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCommunty;
