import React from "react";
import MainLayout from "../../Layouts/MainLayout";
import BackGroundImg from "../../assets/Images/background.jpg";
import Star from "../../assets/Icons/star.png";
import DummyBanner from "../../assets/Icons/dummyBanner.png";
import CourseContent from "../../Component/CourseContent/CourseContent";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineYoutube, AiOutlineTrophy } from "react-icons/ai";
import { BiFileBlank, BiMobile } from "react-icons/bi";
import { RiFolderDownloadLine } from "react-icons/ri";
import { MdOutlineLink } from "react-icons/md";
import User from "../../assets/Images/user3.jpg";
import workshopImg1 from "../../assets/Images/workshopimg1.png";
import workshopImg2 from "../../assets/Images/workshopimg2.jpeg";
import { RiShareFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../../Component/services/endpoints";
import { imgPath } from "../../Component/services/endpoints";
import Loader from "../../Component/Loader/Loader";
import UserCard from "../../Component/UserCard/UserCard";
import parse from "html-react-parser";
import ReviewCard from "../../Component/ReviewCard/ReviewCard";
import UsersReview from "../../Component/UsersReview/UsersReview";
import "../NormalDetailsPage/normalDetailsPage.css";
import ShareModal from "../../Component/Modal/ShareModel/ShareModel"
import showToast from "../../Component/CustomToast/CustomToast";
import DefaultImg from "../../assets/Images/default.png";


const CareerFareDetails = () => {

    const iconsMap = [
        {
          icon: <AiOutlineYoutube size={20} color="black" />,
          text: "Youtube",
          value: 1,
        },
        {
          icon: <BiFileBlank size={20} color="black" />,
          text: "File",
          value: 2,
        },
        {
          icon: <RiFolderDownloadLine size={20} color="black" />,
          text: "Folder",
          value: 3,
        },
        {
          icon: <MdOutlineLink size={20} color="black" />,
          text: "Link",
          value: 4,
        },
        {
          icon: <BiMobile size={20} color="black" />,
          text: "Mobile",
          value: 5,
        },
        {
          icon: <AiOutlineTrophy size={20} color="black" />,
          text: "Trophy",
          value: 6,
        },
      ];
    
      const navigate = useNavigate();
      const { workshopId } = useParams();
      const token = localStorage.getItem("token");
      const [workshopDtails, setWorkshopDtails] = useState({});
      const [workshopImgPath, setWorkshopImgPath] = useState([]);
      const [loading, setLoading] = useState(false);
      const [showShareModal , setShowShareModal] = useState(false)
    
      const coachImgPath = imgPath.user;
    
      const [selectedDays, setSelectedDays] = useState([]);
      const [daysFormat, setDaysFormat] = useState("weekly");
      const [isRepeated, setIsRepeated] = useState(false);
      const [dateSlot, setDateSlot] = useState([]);
      const [daysSlot, setDaysSlot] = useState([]);
      const [shortDescriptions, setShortDescriptions] = useState("");
      const [selectedDates, setSelectedDates] = useState([]);
      const [editName, setEditName] = useState("");
      const [paid, setPaid] = useState(false);
      const [price, setPrice] = useState(0);
      const [workshopList, setWorkshopList] = useState([]);
      const [sessionType, setSessionType] = useState("");
      const [coachInfo, setCoachInfo] = useState({});
      const [coachId, setCoachId] = useState("");
      const [londDescriptionContent, setLongDescriptionContent] = useState("");
      const [whatYouLearnPoints, setWhatYouLearnPoints] = useState([]);
      const [courseIncludeIcon, setCourseIncludeIcon] = useState([]);
      const [courseIncludeContent, setCourseIncludeContent] = useState([]);
    
      const headers = {
        Authorization: `Bearer ${token}`,
      };
    
      const getWorkshopDetailsById = () => {
        const url = `${endpoints.workshop.getWorkshopDetailsById}${workshopId}`;
        setLoading(true);
        axios
          .get(url, { headers: headers })
          .then((res) => {
            setLoading(false);
            if (res.data.result) {
              const val = res.data.data?.[0];
              var sessionTyp = val.payment_type == 1 ? "hourly" : "sessional";
              setSessionType(sessionTyp);
              setPrice(val?.price);
              setWorkshopDtails(val);
              var path = res.data?.workshop_image_path;
              setWorkshopImgPath(path);
    
              var slots = JSON.parse(val?.availability_slot);
    
              setSelectedDays(slots?.selectedDays || []);
              setSelectedDates(slots?.selectedDates || []);
              setDaysSlot(slots?.daysSlot);
              setDateSlot(slots?.dateSlot);
              setDaysFormat(slots?.daysFormat);
    
              var coachData = val?.coach_info;
              setCoachId(val?.created_by);
              setCoachInfo(coachData);
              if (val?.long_description) {
                setLongDescriptionContent(val?.long_description);
              }
              setShortDescriptions(val?.short_description);
    
              var courseDta = val?.course_includes;
              if (val?.course_includes.length > 1) {
                courseDta = courseDta?.content.map((itm, index) => {
                  var vll = {
                    content: itm,
                    icon: courseDta?.type?.[index],
                  };
                  return vll;
                });
                setCourseIncludeContent(courseDta);
              } else {
                setCourseIncludeContent([]);
              }
    
              if (val?.learn_topic?.length > 1) {
                setWhatYouLearnPoints(val?.learn_topic);
              } else {
                setWhatYouLearnPoints([]);
              }
            }
          })
          .catch((err) => {
            setLoading(false);
            console.log(err, "error here");
          });
      };
    
      const getWorkshopByUser = () => {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        setLoading(true);
        const url = endpoints.workshop.WorkshopByCoachId + coachId;
    
        axios
          .get(url, { headers: headers })
          .then((res) => {
            setLoading(false);
            if (res.data.result) {
              const val = res.data.data;
              setWorkshopList(val);
            }
          })
          .catch((err) => {
            setLoading(false);
            console.log(err, "error here");
          });
      };
    
      useEffect(() => {
        getWorkshopDetailsById();
      }, [workshopId]);
    
      useEffect(() => {
        getWorkshopByUser();
      }, [coachInfo]);
    
      var industry = workshopDtails?.industry?.title;
      var domain = workshopDtails?.domain?.title;
    
      const handleWorkshopClick = (dta) =>{
        const id = dta?._id;
        const path = generatePath("/workshopDetails/:workshopId" , { workshopId : id})
        navigate(path);
      }
    
      const enrollWorkshop = (workshopDetails) => {
        
        const token = localStorage.getItem("token");
        if (token) {
          var id = workshopDetails._id;
          const url = `${endpoints.workshop.enrollWorkshop}${id}`;
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          setLoading(true);
          axios
            .get(url, { headers: headers })
            .then((res) => {
              setLoading(false);
              if (res.data.result) {
                showToast("workshop enrolled successfully", "success");
              }
            })
            .catch((err) => {
              setLoading(false);
              console.log(err, "error here");
            });
        } else {
          showToast("Please login", "warning");
        }
      };
  return (
    <MainLayout>
    <div className="dtlscont">
      <div className="dltsline"></div>
      <div className="dltsMain">
        {workshopDtails?.image ? (
          <img src={workshopImgPath + "/" + workshopDtails.image} />
        ) : (
          <img src={DefaultImg} alt="" />
        )}
        <div className="wrkshoDtls">
          <h1 className="wrkshTitle">{workshopDtails?.title}</h1>
          <p className="wrkpara">{shortDescriptions}</p>
          <div className="wrkshpOther flex-wrap">
            <h6>Max Members : {workshopDtails?.max_members}</h6>
            <h6>Joined Members : {workshopDtails?.workshop_members_count}</h6>
            <h6>Domain : {domain}</h6>
            <h6>Industry : {industry}</h6>
          </div>
        </div>
      </div>

      <div className="dltsSecond ">
        <div className="row " style={{ width: "100%" }}>
          <div className="dltsSecondLeft col-lg-7 col-md-12 col-12">
            <div className="harbar">
              <h5 onClick={() => navigate("/")}>Home</h5> <span>{">"}</span>
              <h5 onClick={() => navigate(-1)}>Workshop</h5>{" "}
              <span>{">"}</span>
              <h5>Details</h5>
            </div>
            <div className="whatlearn">
              <h4>What You'll Learn</h4>
              <div className="whatLearnP">
                {whatYouLearnPoints.map((points, index) => {
                  return (
                    <h6 key={index}>
                      <img src={Star} alt="" />
                      {points}
                    </h6>
                  );
                })}
              </div>
            </div>

            <div className="crsCont">
              <h4>Course Content</h4>
              <div className="crsttitlesc">
                <p>
                  15 Sections <span></span> 146 Lectures <span></span> 14H 42M
                  Total Length
                </p>
                <h6>Expand All Sections</h6>
              </div>
              <div className="accordiancont">
                <CourseContent  data={workshopDtails?.courseContent} update={false}/>
              </div>

              {/* here we are creating descriptions sections */}
              <div className="wrkshopDescriptions">
                <h5>Descriptions</h5>
                {londDescriptionContent != "" &&
                  parse(londDescriptionContent)}
              </div>

              <div className="relatedCourse">
                <h4 className="corsTitle">Related Workshop</h4>
                {workshopList.length !== 0 &&
                  workshopList.map((workshop, index) => {
                    const img = workshopImgPath + "/" + workshop?.image;
                    return (
                      <div className="courseBox" key={index} onClick={() => handleWorkshopClick(workshop)}>
                        <div className="d-flex">
                          <img src={img} alt="" />
                          <div>
                            <h5>{workshop.title}</h5>
                            <h6>
                              23 hours total{" "}
                              <li>
                                Members : ({workshop?.workshop_members_count})
                              </li>
                            </h6>
                          </div>
                        </div>
                        <div className="pricePart">
                          {workshop?.is_paid == 1 ? (
                            <h6>Price : {workshop.price} HKD</h6>
                          ) : (
                            <h6>Free</h6>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* users review section */}
              <UsersReview id={workshopId} />
            </div>
          </div>
          <div className="dltsSecondRght col-lg-5 col-md-12 col-12">
            <div className="vdoDtls">
              <div className="vdoDtlsVdo">
                {/* <img src={DummyBanner} alt="" /> */}
                {workshopDtails?.image ? (
                  <img src={workshopImgPath + "/" + workshopDtails.image} />
                ) : (
                  <img src={DefaultImg} alt="" />
                )}
                <div className="vdoPlay">
                  <BsFillPlayFill size={36} />
                </div>
                <h6>Preview this course</h6>
              </div>
              <div className="vdoTxt">
                <h5>{paid ? `Price : ${price} HKD` : "Free"}</h5>
                <button className="addtoCrt" onClick={() =>enrollWorkshop()}>Book Now</button>
              </div>
            </div>

            <div className="crsIncld">
              <h6>This Course Includes : </h6>
              {courseIncludeContent.map((item, index) => {
                const icn = iconsMap.find(
                  (itm, ind) => itm.text === item.icon
                );
                return (
                  <div className="crsIncldBx" key={index}>
                    {icn.icon}
                    <h6>{item.content}</h6>
                  </div>
                );
              })}
              <div className="crsIncldBx">
                {/* <h5>Share</h5> */}
                <button className="addtoCrt" onClick={() => setShowShareModal(true)}> 
                  {" "}
                  <RiShareFill
                    size={18}
                    color="white"
                    style={{ marginRight: "10px" }}
                  />{" "}
                  Share
                </button>
              </div>
            </div>

            <UserCard
              coachInfo={coachInfo}
              imgName={coachInfo.avtar}
              imgPath={coachImgPath + coachInfo.avtar}
            />
            <ReviewCard entityType={5} id={workshopId} />
          </div>
        </div>
      </div>
      {loading && <Loader />}
      <ShareModal showShareModal={showShareModal} setShowShareModal={setShowShareModal}/>
    </div>
  </MainLayout>
  )
}

export default CareerFareDetails