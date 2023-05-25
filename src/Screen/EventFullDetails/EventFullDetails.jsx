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
import { useNavigate, useParams , generatePath } from "react-router-dom";
import axios from "axios";
import { endpoints, imgPath } from "../../Component/services/endpoints";
import Loader from "../../Component/Loader/Loader";
import UserCard from "../../Component/UserCard/UserCard";
import ReviewCard from "../../Component/ReviewCard/ReviewCard";
import parse from "html-react-parser";
import UsersReview from "../../Component/UsersReview/UsersReview";
import ShareModal from "../../Component/Modal/ShareModel/ShareModel"



const EventFullDetails = () => {

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

  const { eventId } = useParams();
  const token = localStorage.getItem("token");
  const [eventImgPath, setEventImgPath] = useState("");
  const [eventDetails, setEventDetails] = useState({});
  const navigate = useNavigate();
  const [loading , setLoading] = useState(false);
  const [eventImg, setEventImg] = useState([]);
  const [eventImgFiles, setEventImgFiles] = useState("");
  const [courseIncludeIcon, setCourseIncludeIcon] = useState([]);
  const [courseIncludeContent, setCourseIncludeContent] = useState([]);
  const [creatorId, setCreatorId] = useState("");
  const [creatorImgPath, setCreatorImgPath] = useState("");
  const [creatorInfo, setCreatorInfo] = useState({});
  const [sessionTags, setSessionTags] = useState([]);
  const [allCommunity, setAllCommunity] = useState([]);
  const [eventVideoImg, setEventVideoImg] = useState("");
  const [eventDocs, setEventDocs] = useState(null);
  const [eventList, setEventList] = useState([]);
  const [communityId, setCommunityId] = useState("");
  const [imgPath , setImgPath] = useState("")
  const [communityName, setCommunityName] = useState("");
  const [showShareModal , setShowShareModal] = useState(false)


  // reviews section state;
  const [rating , setRating] = useState(0)
  const [reviewNotes , setReviewNotes] = useState("")

  // create variables for holding value ;
  const [title, setTitle] = useState("");
  const [maxMembers, setMaxMembers] = useState("");
  const [duration, setDuration] = useState("");
  const [paid, setPaid] = useState(false);
  const [price, setPrice] = useState(0);
  const [shortDescriptions, setShortDescriptions] = useState("");

  const [joinedMembers, setJoinedMembers] = useState("");
  const [sessionType2, setSessionType2] = useState("");
  const [sessionType, setSessionType] = useState("");


    // creating useState for slotsCreations ;

    const [selectedDays, setSelectedDays] = useState([]);
    const [daysFormat, setDaysFormat] = useState("weekly");
    const [isRepeated, setIsRepeated] = useState(false);
    const [dateSlot, setDateSlot] = useState([]);
    const [daysSlot, setDaysSlot] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);
    const [editName, setEditName] = useState("");
    const [londDescriptionContent, setLongDescriptionContent] = useState("");
    const [whatYouLearnPoints, setWhatYouLearnPoints] = useState([]);

  
  const submitReview = () =>{}

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const getEventDetails = () => {
    const url = `${endpoints.events.eventDetails}${eventId}`;
    setLoading(true)
    axios
      .get(url, { headers: headers })
      .then((res) => {
        setLoading(false)
        if (res.data.result) {
          const val = res.data.data;
          setEventDetails(val);
          setTitle(val?.event_title);
          setMaxMembers(val?.max_members);
          setJoinedMembers(val?.members_count);
          setCreatorId(val?.created_by);
          var path = res.data?.image_path;
          setImgPath(path);
          var description = val?.event_description;
          setShortDescriptions(description);
          setSessionType(val?.session_type);
          setSessionTags(val?.tags);
          var imageUrl = path + "/" + val.event_photo;
          setEventImg(imageUrl);
          var slots = val?.availability_slot;
          setDuration(val?.event_duration)
          if (slots) {
            slots = JSON.parse(slots);
            setSelectedDays(slots?.selectedDays || []);
            setSelectedDates(slots?.selectedDates || []);
            setDaysSlot(slots?.daysSlot);
            setDateSlot(slots?.dateSlot);
            setDuration(slots?.duration);
            setDaysFormat(slots?.daysFormat);
          }

          setCommunityId(val?.community_id);
          var communityNam = allCommunity.find(
            (item) => item._id === val?.community_id
          );
          setCommunityName(communityNam?.display_name);
          if(val?.long_description){
            setLongDescriptionContent(val?.long_description);
          }
         
          var courseDta = val?.course_includes;
          if (val?.course_includes?.content?.length > 1) {
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
        setLoading(false)
        console.log(err, "error here");
      });
  };

  const getEventList = () => {
    const url = endpoints.events.eventsByCreatorId + creatorId;
    axios
      .get(url, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          setEventList(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error");
      });
  };

  const getCreatorDetails = () => {
    const url =
      endpoints.authentication.getProfileByID + "?user_id=" + creatorId;
    axios
      .get(url, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          setCreatorImgPath(res.data.avtarPath);
          var val = res?.data?.data?.[0];
          setCreatorInfo(val);
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
 
  useEffect(() => {
    getEventDetails();
  }, [eventId]);

  useEffect(() =>{
    getEventList();
    getCreatorDetails();
  },[creatorId])

  const eventImage = imgPath + eventDetails?.event_photo;

  const handleEventsClick  = (dta) =>{
    const id = dta?._id;
    const path = generatePath("/event-full-details/:eventId" , {eventId : id});
    navigate(path);
  }

  return (
    <MainLayout>
      <div className="dtlscont">
        <div className="dltsline"></div>
        <div className="dltsMain">
          {eventDetails?.event_photo ? (
            <img src={eventImage} />
          ) : (
            <img src={BackGroundImg} alt="" />
          )}

          <div className="wrkshoDtls">
            <h1 className="wrkshTitle">{eventDetails?.event_title}</h1>
            <p className="wrkpara">{eventDetails?.event_description}</p>
            <div className="wrkshpOther flex-wrap">
              <h6>Max Members : {eventDetails?.max_members}</h6>
              <h6>Joined Members : {eventDetails?.members_count}</h6>
              <h6>Session Type : {eventDetails?.session_type}</h6>
            </div>
          </div>
        </div>

        <div className="dltsSecond ">
          <div className="row " style={{ width: "100%" }}>
            <div className="dltsSecondLeft col-lg-7 col-md-12 col-12">
              <div className="harbar">
                <h5 onClick={() => navigate("/")}>Home</h5> <span>{'>'}</span>
                <h5 onClick={() => navigate(-1)}>Events</h5> <span>{'>'}</span>
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
                  <CourseContent data={eventDetails?.courseContent}/>
                </div>

                {/* here we are creating descriptions sections */}
                <div className="wrkshopDescriptions">
                <h5>Descriptions</h5>
                {londDescriptionContent != "" &&
                    parse(londDescriptionContent)}
                </div>

                <div className="relatedCourse">
                  <h4 className="corsTitle">Related Events</h4>
                  {eventList.length != 0 &&
                    eventList.map((event, index) => {
                      const img = imgPath + event?.event_photo;
                      return (
                        <div className="courseBox" key={index} onClick={() => handleEventsClick(event)}>
                          <div className="d-flex">
                            <img src={img} alt="" />
                            <div>
                              <h5>{event?.event_title}</h5>
                              <h6>
                                23 hours total{" "}
                                <li>Members : ({event?.members_count})</li>
                              </h6>
                            </div>
                          </div>
                          <div className="pricePart">
                            {event?.is_paid == 1 ? (
                              <h6>Price : {event.price} HKD</h6>
                            ) : (
                              <h6>Free</h6>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>

                  {/* users review section */}
                  <UsersReview id={eventId}/>
                
              </div>
            </div>
            <div className="dltsSecondRght col-lg-5 col-md-12 col-12">
              <div className="vdoDtls">
                <div className="vdoDtlsVdo">
                 
                  {eventDetails?.event_photo ? (
                    <img src={eventImage} />
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
               
                <div className="crsIncldBx">
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
                coachInfo={creatorInfo}
                imgName={creatorInfo?.avtar}
                imgPath={creatorImgPath + creatorInfo?.avtar}
              />

              <ReviewCard entityType={1} id={eventId}/>
            </div>
          </div>
        </div>
        {loading && <Loader />}
        <ShareModal showShareModal={showShareModal} setShowShareModal={setShowShareModal}/>
      </div>
    </MainLayout>
  );
};

export default EventFullDetails;


