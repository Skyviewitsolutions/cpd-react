import React, { useState, useEffect } from "react";
import coachesDetailscardimages from "../../assets/Images/coachesDetailscardimages.jpg";
import Homepage_header from "../../Component/Header/Homepage_header";
import Footer from "../../Component/Footer/Footer";
import { BsCalendarDateFill } from "react-icons/bs";
import { endpoints } from "../../Component/services/endpoints";
import { useParams } from "react-router-dom";
import UserImg from "../../assets/Images/user.jpeg";
import axios from "axios";
import BookBtn from "../button/BookBtn/BookBtn";

const CoachingCard = (props) => {

  const { coaching, key, imgPath } = props;
  const data = coaching.coaching_info;
  var image = imgPath + "/" + data.image;

  var bookingStatus = coaching.status;

  return (
    <>
      <div className="col-lg-3 col-md-6 col-12 workshop-card" key={key}>
        <div className="card">
          <div className="workshopcard_media">
            <img src={data.image && image} alt="" />
          </div>
          <div className="coachesDetailslistcard_descriptionBox">
            <div className="coachesDetailslistcardtitle">
              <h4>{data.title}</h4>
              <BsCalendarDateFill
                style={{ color: "#2c6959", fontSize: "20px" }}
              />
            </div>

            <div className="workshop_FreeBox">
              <h6>{data.is_paid == 1 ? `$ ${data.price}` : "Free"}</h6>
              <h6>Domain : {data.domain}</h6>
            </div>
            <div className="domainBox">
              <div className="row">
                <div className="col-lg-7 col-md-8 col-12">
                  <h6 id="enrolled">
                    Total Enrolled ({data.coaching_members_count})
                  </h6>
                </div>
                <div className="col-lg-5 col-md-4 col-12">
                  <div className="">
                    <BookBtn
                      status={bookingStatus}
                      styles={{
                        height: "30px",
                        paddingTop: "2px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const WorkshopCard = (props) => {

  const { workshop, key , imgPath} = props;
  console.log(workshop ,"workshop");
  var status = workshop.status;
  var data = workshop.workshop_info;
  var image = imgPath + "/" + data.image;

  console.log(image ,"image fo worksho")

  return (
    <>
      <div className="col-lg-3 col-md-6 col-12 workshop-card" key={key}>
        <div className="card">
          <div className="workshopcard_media">
            <img src={image && image} alt="" />
          </div>
          <div className="coachesDetailslistcard_descriptionBox">
            <div className="coachesDetailslistcardtitle">
              <h4>{data.title}</h4>
              <BsCalendarDateFill
                style={{ color: "#2c6959", fontSize: "20px" }}
              />
            </div>

            <div className="workshop_FreeBox">
              <h6>{data.is_paid ? `${data.price} $` : "Free"}</h6>
              <h6>Domain : {data.domain}</h6>
            </div>
            <div className="domainBox">
              <div className="row">
                <div className="col-lg-7 col-md-8 col-12">
                  <h6 id="enrolled">Currently Enrolled ({data.workshop_members_count}/{data.max_members})</h6>
                </div>
                <div className="col-lg-5 col-md-4 col-12">
                  <div className=" ">
                  <BookBtn
                        status={status}
                        styles={{
                          height: "30px",
                          paddingTop: "2px",
                        }}
                      />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MyCourses = () => {
  const [coachingImgPath, setCoachingImgPath] = useState("");
  const [workshopImgPath, setWorkshopImgPath] = useState("");
  const [myEnrolledCoachings, setMyEnrolledCoachings] = useState([]);
  const [myEnrolledWorkshop, setMyEnrolledWorkshops] = useState([]);

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const getMyEnrolledCoachings = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const url = endpoints.coaches.enrolledCoaching;

    axios
      .get(url, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          var val = res.data.data;
          setMyEnrolledCoachings(val);
          var img = res.data.coaching_image_path;
          setCoachingImgPath(img);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error");
      });
  };

  const getMyEnrolledWorkshops = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const url = endpoints.workshop.myEnrolledWorkshop;
    axios
      .get(url, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          var val = res.data.data;
          setMyEnrolledWorkshops(val);
          var img = res.data.workshop_image_path;
          setWorkshopImgPath(img);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error");
      });
  };

  useEffect(() => {
    getMyEnrolledWorkshops();
    getMyEnrolledCoachings();
  }, []);

  return (
    <>
      <Homepage_header />
      <div className="container-fluid">
        <div className="row ">
          <div className="col-lg-12 col-md-12 col-12 explore">
            <h5>My Booked courses</h5>
            {/* <h6>Please Click <a href=''>update your resume</a> for view more community and their events</h6> */}
          </div>
        </div>
      </div>
      <div className="coachesDetailsWrapper">
        <section className="coachesDetailsSection1"></section>
        <section className="Workshop_section2">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12 ">
              <h5 className="coachesDetailsheading">Coaching List</h5>
              <div className="row">
                {myEnrolledCoachings.length != 0 &&
                  myEnrolledCoachings.map((coaching, index) => {
                    return (
                      <>
                        <CoachingCard
                          coaching={coaching}
                          key={index}
                          imgPath={coachingImgPath}
                        />
                      </>
                    );
                  })}

                {myEnrolledCoachings.length == 0 && (
                  <h6>No coachings found !</h6>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="Workshop_section2">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12 ">
              <h5 className="coachesDetailsheading">Workshop List</h5>
              <div className="row">
                {myEnrolledWorkshop.length != 0 &&
                  myEnrolledWorkshop.map((workshop, index) => {
                    return (
                      <>
                        <WorkshopCard
                          workshop={workshop}
                          key={index}
                          imgPath={workshopImgPath}
                        />
                      </>
                    );
                  })}

                {myEnrolledWorkshop.length == 0 && <h6>No workshop found !</h6>}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default MyCourses;
