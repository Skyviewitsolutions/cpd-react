import React, { useState, useEffect } from "react";
import coachesDetailscardimages from "../../assets/Images/coachesDetailscardimages.jpg";
import Homepage_header from "../../Component/Header/Homepage_header";
import Footer from "../../Component/Footer/Footer";
import { BsCalendarDateFill } from "react-icons/bs";
import { endpoints } from "../../Component/services/endpoints";
import { useParams } from "react-router-dom";
import UserImg from "../../assets/Images/user.jpeg";
import axios from "axios";
import BookBtn from "../../Component/button/BookBtn/BookBtn";
import WorkshopCard from "../../Component/WorkshopCard/WorkshopCard";
import CoachingCard from "../../Component/CoachingCard/CoachingCard";

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
                    const data = coaching.coaching_info;
                    var image = coachingImgPath + "/" + data.image;
                    var bookingStatus = coaching.status;
                    return (
                      <>
                        <div className="col-lg-3 col-md-6 col-12 workshop-card">
                          <CoachingCard
                            coaching={data}
                            key={index}
                            image={image}
                            bookingStatus={bookingStatus}
                            imageName={data.image}
                          />
                        </div>
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
                    var status = workshop.status;
                    var data = workshop.workshop_info;
                    var image = workshopImgPath + "/" + data.image;
                    var imageName = data.image;
                    return (
                      <>
                        <div className="col-lg-3 col-md-6 col-12 workshop-card">
                          <WorkshopCard
                            workshop={data}
                            key={index}
                            img={image}
                            enrollStatus={status}
                            imageName={imageName}
                            showBookBtn={true}
                          />
                        </div>
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
