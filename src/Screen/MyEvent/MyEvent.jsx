import React from "react";
import Footer from "../../Component/Footer/Footer";
import "./MyEvent.css";
import MyEventCards from "../../Component/Cards/MyEventCards";
import Homepage_header from "../../Component/Header/Homepage_header";
import { useState, useEffect } from "react";
import { endpoints } from "../../Component/services/endpoints";
import axios from "axios";
import Networking_headers from "../../Component/Header/Networking_headers";
import NoDataImg from "../../assets/Images/noDataFound.png";
import CustomFilter from "../../Component/CustomFilter/CustomFilter";

const MyEvent = () => {

  const [createdEvent, setCreatedEvent] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [videoPath, setVideoPath] = useState("");
  const [imgFiles, setImgFiles] = useState(null);

  const createEvent = () => {
    const createEventsUrl = endpoints.events.createdEvents;
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    axios
      .get(createEventsUrl, { headers: headers })
      .then((res) => {
        console.log(res, "response here");
        if (res.data.result === true) {
          const val = res.data.data;
          const imgPath = res.data.image_path;
          const videoPath = res.data.video_path;
          setImagePath(imgPath);
          setVideoPath(videoPath);
          setCreatedEvent(val);
        }
      })
      .catch((err) => {
        console.log(err, "Created event data error");
      });
  };

  useEffect(() => {
    createEvent();
  }, []);

  return (
    <>
      <Homepage_header />
      <Networking_headers />
      <div className="">
        <div className=" row">
          <div className="col-lg-3 d-lg-block d-none mt-5 ps-5 pe-5 mb-5 d-lg-block d-none">
            <CustomFilter />
          </div>

          <div className="col-12 col-md-12 col-lg-9 mt-5">
            <h4 style={{ fontWeight: "700" }}> My Events List</h4>
            <div className="row">
              {createdEvent.length != 0 &&
                createdEvent.map((itm, index) => {
                  return (
                    <>
                      <div className="col-lg-4 col-md-6 col-12 mt-3 mb-5">
                        <MyEventCards
                          data={itm}
                          key={index}
                          imagePath={imagePath}
                          videoPath={videoPath}
                          createEvent={createEvent}
                        />
                      </div>
                    </>
                  );
                })}

              {createdEvent.length == 0 && (
                <div className="noDataCont">
                  <img src={NoDataImg} alt="" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyEvent;
