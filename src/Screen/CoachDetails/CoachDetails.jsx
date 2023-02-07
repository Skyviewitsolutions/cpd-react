import React, { useState, useEffect } from "react";
import "./CoachDetails.css";
import dommyperson from "../../assets/Images/dommyperson.jpg";
import coachesDetailscardimages from "../../assets/Images/coachesDetailscardimages.jpg";
import Homepage_header from "../../Component/Header/Homepage_header";
import Footer from "../../Component/Footer/Footer";
import { BsCalendarDateFill } from "react-icons/bs";
import { endpoints } from "../../Component/services/endpoints";
import { useParams } from "react-router-dom";
import UserImg from "../../assets/Images/user.jpeg";
import axios from "axios";
import { getMyCoachings } from "../../utils/coaches";

const CoachingCard = (props) => {
  const { coaching, key , } = props;
  return (
    <>
      <div className="col-lg-3 col-md-6 col-12 workshop-card" key={key}>
        <div className="card">
          <div className="workshopcard_media">
            <img src={coachesDetailscardimages} alt="" />
          </div>
          <div className="coachesDetailslistcard_descriptionBox">
            <div className="coachesDetailslistcardtitle">
              <h4>{coaching.title}</h4>
              <BsCalendarDateFill
                style={{ color: "#2c6959", fontSize: "20px" }}
              />
            </div>

            <div className="workshop_FreeBox">
              <h6>{coaching.is_paid == 1 ? `$ ${coaching.price}` : "Free"}</h6>
              <h6>Domain : Retail</h6>
            </div>
            <div className="domainBox">
              <div className="row">
                <div className="col-lg-7 col-md-8 col-12">
                  <h6 id="enrolled">Currently Enrolled (5/10)</h6>
                </div>
                <div className="col-lg-5 col-md-4 col-12">
                  <div className=" coachesDetailsbuttonpending">
                    <button className="">Pending</button>
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
  const { workshop, key } = props;
  return (
    <>
      <div className="col-lg-3 col-md-6 col-12 workshop-card">
        <div className="card">
          <div className="workshopcard_media">
            <img src={coachesDetailscardimages} alt="" />
          </div>
          <div className="coachesDetailslistcard_descriptionBox">
            <div className="coachesDetailslistcardtitle">
              <h4>DIY Organic Bath and Body Products</h4>
              <BsCalendarDateFill
                style={{ color: "#2c6959", fontSize: "20px" }}
              />
            </div>

            <div className="workshop_FreeBox">
              <h6>Free</h6>
              <h6>Domain : Retail</h6>
            </div>
            <div className="domainBox">
              <div className="row">
                <div className="col-lg-7 col-md-8 col-12">
                  <h6 id="enrolled">Currently Enrolled (5/10)</h6>
                </div>
                <div className="col-lg-5 col-md-4 col-12">
                  <div className=" coachesDetailsbuttonpending">
                    <button className="">Pending</button>
                  </div>
                </div>
              </div>
              <h6 id="enrolled">Currently Enrolled (5/10)</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mycoachings = getMyCoachings();

const CoachesDetails = () => {

  const [allCoachings, setAllCoachings] = useState([]);
  const [allWorkshops, setAllWorkshops] = useState([]);
  const [coachingImgPath, setCoachingImgPath] = useState("");
  const [workshopImgPath, setWorkshopImgPath] = useState("");
  const [coachImgPath, setCoachImgPath] = useState("");
  const [myEnrolledCoachings , setMyEnrolledCoachings] = useState([])
  const [coachDetails, setCoachDetails] = useState({
    first_name: "",
    last_name: "",
    subCategory: "",
    category: "",
    avatar: "",
  });

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const { coachId } = useParams();

const getCoachings = () => {
    const url = `${endpoints.coaches.allCoachingList}?user_id=${coachId}`;
    axios
      .get(url, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          var data = res.data.data;
          var path = res.data.coaching_image_path;
          setCoachingImgPath(path);
          setAllCoachings(data);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error");
      });
  };

  const getWorkshops = () => {
    const url = `${endpoints.workshop.allWorkshop}?user_id=${coachId}`;
    axios
      .get(url, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          var data = res.data.data[0];
          var path = res.data.workshop_image_path;
        }
      })
      .catch((err) => {
        console.log(err, "this is the error");
      });
  };

  const getCoachDetails = () => {
    const url = `${endpoints.authentication.getProfileByID}?user_id=${coachId}`;
    axios
      .get(url, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          var data = res.data.data[0];
          var imagePath = res.data.avtarPath;
          setCoachImgPath(imagePath);
          setCoachDetails((itm) => {
            return { ...itm, ...data };
          });
        }
      })
      .catch((err) => {
        console.log(err, "this is the error");
      });
  };

  useEffect(() => {
    if (coachId) {
      getCoachings();
      getWorkshops();
      getCoachDetails();
    }
  }, []);

 
  return (
    <>
      <Homepage_header />
      <div className="container-fluid">
        <div className="row ">
          <div className="col-lg-12 col-md-12 col-12 explore">
            <h5>Explore Coaching and Workshop</h5>
            {/* <h6>Please Click <a href=''>update your resume</a> for view more community and their events</h6> */}
          </div>
        </div>
      </div>
      <div className="coachesDetailsWrapper">
        <section className="coachesDetailsSection1">
          <div className="coachesDetailsimagesBox">
            <img
              src={
                coachDetails?.avatar
                  ? `${coachImgPath}${coachDetails?.avatar}`
                  : UserImg
              }
              alt=""
            />
          </div>

          <div className="coachesDetailsDescription">
            <h4>
              Coache Name :{" "}
              <span style={{ color: "#2c6959" }}>
                {coachDetails.first_name} {coachDetails.last_name}
              </span>
            </h4>
            <h6>
              Speacility: {coachDetails.category} | {coachDetails.subCategory}
            </h6>
            <p>{coachDetails.description}</p>
          </div>
        </section>
        <section className="Workshop_section2">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12 ">
              <h5 className="coachesDetailsheading">Coaching List</h5>
              <div className="row">
                {allCoachings.length != 0 &&
                  allCoachings.map((coaching, index) => {
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

                {allCoachings.length == 0 && <h6>No coachings found !</h6>}
              </div>
            </div>
          </div>
        </section>

        <section className="Workshop_section2">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12 ">
              <h5 className="coachesDetailsheading">Workshop List</h5>
              <div className="row">
                {allWorkshops.length != 0 &&
                  allWorkshops.map((workshop, index) => {
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

                {allWorkshops.length == 0 && <h6>No workshop found !</h6>}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default CoachesDetails;
