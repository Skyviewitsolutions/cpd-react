import React from "react";
import MainLayout from "../../Layouts/MainLayout";
// import "./normalDetailsPage.css";
import BackGroundImg from "../../assets/Images/background.jpg";
import Star from "../../assets/Icons/star.png";
import DummyBanner from "../../assets/Icons/dummyBanner.png";
import CourseContent from "../../Component/CourseContent/CourseContent";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineYoutube, AiOutlineTrophy } from "react-icons/ai";
import { BiFileBlank, BiMobile } from "react-icons/bi";
import { RiFolderDownloadLine } from "react-icons/ri";
import { MdOutlineLink } from "react-icons/md";
import { RiShareFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { endpoints, imgPath } from "../../Component/services/endpoints";
import Loader from "../../Component/Loader/Loader";
import UserCard from "../../Component/UserCard/UserCard";
import ReviewCard from "../../Component/ReviewCard/ReviewCard";
import UsersReview from "../../Component/UsersReview/UsersReview";
import parse from "html-react-parser";
import ShareModal from "../../Component/Modal/ShareModel/ShareModel"



const CoachingDetails = () => {

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



  const { coachingId } = useParams();
  const [coachingDetails, setCoachingDetails] = useState({});
  const token = localStorage.getItem("token");
  const [coachingImgPath, setCoachingImgPath] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [coachId, setCoachId] = useState("");
  const [coachInfo, setCoachInfo] = useState({});
  const [coachingList, setCoachingList] = useState([]);
  const [longDescriptions, setLongDescriptions] = useState("");
  const [allDomain, setAllDomain] = useState([]);
  const [allIndustry, setAllIndustry] = useState([]);
  const [industry, setIndustry] = useState("");
  const [domain, setDomain] = useState("");
  const [shortDescriptions, setShortDescriptions] = useState("");
  const [industryId, setIndustryId] = useState("");
  const [domainId, setDomainId] = useState("");
  const coachImgPath = imgPath.user;
  const [showShareModal , setShowShareModal] = useState(false)



  const [selectedDays, setSelectedDays] = useState([]);
  const [daysFormat, setDaysFormat] = useState("weekly");
  const [isRepeated, setIsRepeated] = useState(false);
  const [dateSlot, setDateSlot] = useState([]);
  const [daysSlot, setDaysSlot] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [editName, setEditName] = useState("");

  const [courseIncludeIcon, setCourseIncludeIcon] = useState([]);
  const [courseIncludeContent, setCourseIncludeContent] = useState([]);
  const [whatYouLearnPoints, setWhatYouLearnPoints] = useState([]);


  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const getCoachingDetailsById = () => {
    setLoading(true);
    const url = `${endpoints.coaches.getCoachingDetailsById}${coachingId}`;
    axios
      .get(url, { headers: headers })
      .then((res) => {
        setLoading(false);
        if (res.data.result) {
          const val = res.data.data?.[0];
          if (val) {
            const val = res.data.data?.[0];
            setCoachingDetails(val);
            var industry = val?.industry?.title;
            setIndustry(industry);
            var domain = val?.domain?.title;
            setDomain(domain);
            var path = res.data?.coaching_image_path;
            setCoachingImgPath(path);
            setDomainId(val?.domain?.domain_id);
            setIndustryId(val?.industry?.industry_id);
  
            var slots = JSON.parse(val?.availability_slot);
  
            setSelectedDays(slots?.selectedDays || []);
            setSelectedDates(slots?.selectedDates || []);
            setDaysSlot(slots?.daysSlot);
            setDateSlot(slots?.dateSlot);
            setDaysFormat(slots?.daysFormat);
  
            var coachData = val?.coach_info;
            setCoachId(val?.created_by);
            setCoachInfo(coachData);
            
            if(val?.long_description){
              setLongDescriptions(val?.long_description);
            }
           
            setShortDescriptions(val?.short_description);
  
            var courseDta = val?.course_includes;
            if (val?.course_includes?.content.length > 1) {
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
            // here we adding the part of the coaching details ;

          }
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "error here");
      });
  };

  

  useEffect(() => {
    getCoachingDetailsById();
  }, [coachingId]);

  useEffect(() => {
    getCoachingListByUser();
  }, [coachId]);

  const getCoachingListByUser = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    setLoading(true);
    const url = endpoints.coaches.coachingsByCoachId + coachId;

    axios
      .get(url, { headers: headers })
      .then((res) => {
        setLoading(false);
        if (res.data.result) {
          const val = res.data.data;
          setCoachingList(val);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "error here");
      });
  };

  useEffect(() => {
    getCoachingListByUser();
  }, [coachId]);

  const handleCoachingClick = (dta) =>{
    const id = dta?._id
    const path = generatePath("/coachingDetails/:coachingId" , {coachingId : id})
    navigate(path)
  }
  
  return (
    <MainLayout>
      <div className="dtlscont">
        <div className="dltsline"></div>
        <div className="dltsMain">
          {coachingDetails?.image ? (
            <img src={coachingImgPath + "/" + coachingDetails.image} />
          ) : (
            <img src={BackGroundImg} alt="" />
          )}
          <div className="wrkshoDtls">
            <h1 className="wrkshTitle">{coachingDetails?.title}</h1>
            <p className="wrkpara">{coachingDetails?.short_description}</p>
            <div className="wrkshpOther flex-wrap">
              {/* <h6>Max Members : {coachingDetails?.max_members}</h6> */}
              <h6>
                Joined Members : {coachingDetails?.coaching_members_count}
              </h6>
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
                <h5 onClick={() => navigate(-1)}>Coachings</h5>{" "}
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
                  <CourseContent data={coachingDetails?.courseContent} update={false} />
                </div>

                {/* here we are creating descriptions sections */}
                <div className="wrkshopDescriptions">
                  <h5>Descriptions</h5>
                  {longDescriptions != "" && parse(longDescriptions)}
                </div>

                <div className="relatedCourse">
                  <h4 className="corsTitle">Related Coachings</h4>
                  {coachingList.length !== 0 &&
                    coachingList.map((coaching, index) => {
                      const img = coachingImgPath + "/" + coaching?.image;
                      return (
                        <div className="courseBox" key={index} onClick={() => handleCoachingClick(coaching)}>
                          <div className="d-flex">
                            <img src={img} alt="" />
                            <div>
                              <h5>{coaching.title}</h5>
                              <h6>
                                23 hours total{" "}
                                <li>
                                  Members : ({coaching?.coaching_members_count})
                                </li>
                              </h6>
                            </div>
                          </div>
                          <div className="pricePart">
                            {coaching?.is_paid == 1 ? (
                              <h6>Price : {coaching.price} HKD</h6>
                            ) : (
                              <h6>Free</h6>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
                {/* users review section */}
                <UsersReview id={coachingId} />
              </div>
            </div>
            <div className="dltsSecondRght col-lg-5 col-md-12 col-12">
              <div className="vdoDtls">
                <div className="vdoDtlsVdo">
                  {/* <img src={DummyBanner} alt="" /> */}
                  {coachingDetails?.image ? (
                    <img src={imgPath + "/" + coachingDetails.image} />
                  ) : (
                    <img src={DummyBanner} alt="" />
                  )}
                  <div className="vdoPlay">
                    <BsFillPlayFill size={36} />
                  </div>
                  <h6>Preview this course</h6>
                </div>
                <div className="vdoTxt">
                  <h5>Price : 624 HKD </h5>
                  <button className="addtoCrt">Book Now</button>
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
                      {icn?.icon}
                      <h6>{item?.content}</h6>
                    </div>
                  );
                })}
                <div className="crsIncldBx" onClick={() => setShowShareModal(true)}>
                  {/* <h5>Share</h5> */}
                  <button className="addtoCrt">
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
                imgName={coachInfo?.avtar}
                imgPath={coachImgPath + coachInfo?.avtar}
              />
              <ReviewCard entityType={4} id={coachingId} />
            </div>
          </div>
        </div>
        {loading && <Loader />}
        <ShareModal showShareModal={showShareModal} setShowShareModal={setShowShareModal}/>
      </div>
    </MainLayout>
  );
};

export default CoachingDetails;
