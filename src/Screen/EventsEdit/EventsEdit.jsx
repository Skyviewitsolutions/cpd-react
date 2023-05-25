// here we are creating a page for editing the event page ;

import React, { useRef } from "react";
import MainLayout from "../../Layouts/MainLayout";
import BackGroundImg from "../../assets/Images/background.jpg";
import Star from "../../assets/Icons/star.png";
import DummyBanner from "../../assets/Icons/dummyBanner.png";
import CourseContent from "../../Component/CourseContent/CourseContent";
import { TagsInput } from "react-tag-input-component";
import { BsFillPlayFill } from "react-icons/bs";
import {
  AiOutlineYoutube,
  AiOutlineTrophy,
  AiFillEdit,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { BiFileBlank, BiMobile } from "react-icons/bi";
import { RiFolderDownloadLine } from "react-icons/ri";
import { MdOutlineLink } from "react-icons/md";
import { RiShareFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../../Component/services/endpoints";
import { getIndustryList, getDomainList } from "../../utils/api";
import { FiEdit } from "react-icons/fi";
import { RiEditBoxFill } from "react-icons/ri";
import DomainIndustryEditor from "../../Component/elementsForEdit/DomainIndustyEditor/DomainIndustryEditor";
import WhatYouLearn from "../../Component/elementsForEdit/WhatYouLearn/WhatYouLearn";
import DescriptionEditor from "../../Component/elementsForEdit/DescriptionEditor/DescriptionEditor";
import parse from "html-react-parser";
import CourseContentEditor from "../../Component/elementsForEdit/CourseContentEditor/CourseContentEditor";
import { BsPlusCircleFill } from "react-icons/bs";
import CourseInclude from "../../Component/elementsForEdit/CourseInclude/CourseInclude";
import Loader from "../../Component/Loader/Loader";
import Button from "../../Component/button/Button/Button";
import UserCard from "../../Component/UserCard/UserCard";
import showToast from "../../Component/CustomToast/CustomToast";
import UsersReview from "../../Component/UsersReview/UsersReview";
import ShareModal from "../../Component/Modal/ShareModel/ShareModel"


const EventsEdit = () => {
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

  const shrtDesc = "";

  const titleRef = useRef();
  const shortDescriptionRef = useRef();
  const navigate = useNavigate();
  const { eventId } = useParams();
  const token = localStorage.getItem("token");
  const [eventDetails, setEventDetails] = useState({});
  const [imgPath, setImgPath] = useState("");
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
  const [communityName, setCommunityName] = useState("");
  const [showShareModal , setShowShareModal] = useState(false)


  // create variables for holding value ;
  const [title, setTitle] = useState("");
  const [maxMembers, setMaxMembers] = useState("");
  const [duration, setDuration] = useState("");
  const [paid, setPaid] = useState(false);
  const [price, setPrice] = useState(0);
  const [shortDescriptions, setShortDescriptions] = useState(shrtDesc);
  const [selectedTopicDta , setSelectedTopicDta] = useState({})

  const [joinedMembers, setJoinedMembers] = useState("");
  const [sessionType2, setSessionType2] = useState("");
  const [sessionType, setSessionType] = useState("");
  const [loading, setLoading] = useState(false);

  // creating useState for slotsCreations ;

  const [selectedDays, setSelectedDays] = useState([]);
  const [daysFormat, setDaysFormat] = useState("weekly");
  const [isRepeated, setIsRepeated] = useState(false);
  const [dateSlot, setDateSlot] = useState([]);
  const [daysSlot, setDaysSlot] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [editName, setEditName] = useState("");

  // handling the state of the toggleing model ;

  const [showDomainIndustryEditor, setShowDomainIndustryEditor] =
    useState(false);
  const [showWhatYouLearn, setShowWhatYouLearn] = useState(false);
  const [showLongDescriptionEditor, setShowLongDescriptionEditor] =
    useState(false);
  const [londDescriptionContent, setLongDescriptionContent] = useState("");
  const [whatYouLearnPoints, setWhatYouLearnPoints] = useState([]);
  const [showCourseContent, setShowCourseContent] = useState(false);
  const [showCourseInclude, setShowCourseInclude] = useState(false);
  const [editPriceSection, setEditPriceSection] = useState(false);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const getEventDetailsById = () => {
    const url = `${endpoints.events.eventDetails}${eventId}`;
    setLoading(true);
    axios
      .get(url, { headers: headers })
      .then((res) => {
        setLoading(false);
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
        setLoading(false);
        console.log(err, "error here");
      });
  };

  const handleEventImg = (e) => {
    const files = e.target.files[0];
    setEventImg(URL.createObjectURL(files));
    setEventImgFiles(files);
  };

  const handleTextArea = (event) => {
    setShortDescriptions(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
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

  const handleCommunity = (e) => {
    var val = e.target.value;
    setCommunityName(val);
    var selectedCommunity = allCommunity.filter((itm, ind) => {
      return itm.display_name == val;
    });
    selectedCommunity = selectedCommunity[0];
    setCommunityId(selectedCommunity._id);
  };

  const getAllCommunity = () => {
    const getCommunity = endpoints.community.getAllCommunity;
    axios
      .get(getCommunity)
      .then((res) => {
        if (res.data.result === true) {
          const val = res.data.data;
          setAllCommunity(val);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error");
      });
  };

  useEffect(() => {
    getEventDetailsById();
    getAllCommunity();
  }, []);

  useEffect(() => {
    getCreatorDetails();
    getEventList();
  }, [creatorId]);

  // writing code for updating the events ;

  const updateEvent = () => {
    if (!title) {
      showToast("session title is required", "warning");
    } else if (!shortDescriptions) {
      showToast("session descrition is required", "warning");
    } else if (!sessionTags) {
      showToast("session tags is required", "warning");
    } else if (!sessionType) {
      showToast("session type is required", "warning");
    } else if (!maxMembers) {
      showToast("max number of student is required", "warning");
    } else {
      const token = localStorage.getItem("token");

      var availability_type = daysFormat == "weekly" ? 1 : 2;
      var is_paid = paid == true ? 1 : 0;
      var is_repeated = isRepeated ? 1 : 0;
      var payment_type;
      if (sessionType2 === "online") {
        payment_type = 1;
      } else if (sessionType2 === "offline") {
        payment_type = 2;
      } else if (sessionType2 == "hybrid") {
        payment_type = 3;
      }
      var price_type = sessionType == "hourly" ? 1 : 2;

      var slots = {
        isRepeated: isRepeated,
        selectedDays: selectedDays,
        daysFormat: daysFormat,
        selectedDates: selectedDates,
        daysSlot: daysSlot,
        dateSlot: dateSlot,
        title: title,
      };

      var course_include_content_type = courseIncludeContent.map(
        (itm, ind) => itm.icon
      );
      var course_include_content = courseIncludeContent.map(
        (itm, ind) => itm.content
      );

      var data = new FormData();
      data.append("event_title", title);
      data.append("event_description", shortDescriptions);
      data.append("tags", sessionTags);
      data.append("session_type", sessionType);
      data.append("event_duration", duration);
      data.append("max_members", maxMembers);
      data.append("formFilePic", eventImgFiles);
      data.append("formFileVid", "eventVideo");
      data.append("formFileAttach", eventDocs);
      data.append("availability", availability_type);
      data.append("days", selectedDays);
      data.append("paid", is_paid);
      data.append("duration_payment", payment_type);
      data.append("price", price);
      data.append("timeslots", JSON.stringify(slots));
      data.append("price_type", price_type);
      data.append("availability_type", availability_type);
      data.append("community_id", communityId);
      data.append("is_repeated", is_repeated);
      data.append("availibilityDate", selectedDays);
      data.append("sheduleDate", availability_type);
      data.append("sheduleTime", JSON.stringify(slots));
      data.append("availibilityDateTiming", duration);
      data.append("short_description", shortDescriptions);
      data.append("long_description", londDescriptionContent);
      data.append("learn_topic", whatYouLearnPoints);
      data.append("include_content_type", course_include_content_type);
      data.append("include_content", course_include_content);

      setLoading(true);

      var config = {
        method: "post",
        url: endpoints.events.updateEvent  + eventId,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: data,
      };

      axios(config)
        .then(function (res) {
          setLoading(false);
          if (res.data.result) {
            showToast("Event updated sucessfully", "success");
            getEventDetailsById()
          }
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false);
        });
    }
  };

  const activeBx = {
    background: "var(--primary)",
    color: "white",
    borderColor: "var(--primary)",
  };

  const inActiveBx = {
    background: "white",
    color: "var(--black)",
    borderColor: "gray",
  };

  const handleEventsClick  = (dta) =>{
    const id = dta?._id;
    const path = generatePath("/eventEdit/:eventId" , {eventId : id});
    navigate(path);
  }


  return (
    <MainLayout>
      <div className="dtlscont">
        <div className="dltsline"></div>
        <div className="dltsMain">
          {eventDetails?.event_photo ? (
            <img src={eventImg} />
          ) : (
            <img src={BackGroundImg} alt="" />
          )}
          <div className="wrkshoDtls ">
            <div className="position-relative wrkshTitleInput">
              <input
                type="text"
                className="wrkshTitle "
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                readOnly={editName !== "title"}
                ref={titleRef}
              />
              <RiEditBoxFill
                size={23}
                color="white"
                className="wrkshopEditIcon"
                onClick={() => {
                  setEditName("title");
                  titleRef.current.focus();
                }}
              />
            </div>
            <div className="position-relative wrkparaTextArea">
              <textarea
                cols={8}
                rows={5}
                className="wrkpara "
                value={shortDescriptions}
                onChange={(e) => handleTextArea(e)}
                readOnly={editName !== "description"}
                ref={shortDescriptionRef}
              />
              <RiEditBoxFill
                size={23}
                color="white"
                className="wrkshopEditIcon"
                onClick={() => {
                  setEditName("description");
                  shortDescriptionRef.current.focus();
                }}
              />
            </div>

            <div className="wrkshpOther flex-wrap wrkshpOthersEdit">
              <h6>Max Members : {maxMembers}</h6>
              <h6>Joined Members : {joinedMembers}</h6>
              <h6>Session : {sessionType}</h6>
              <RiEditBoxFill
                size={23}
                color="white"
                className="wrkshopEditIcon"
                onClick={() => setShowDomainIndustryEditor(true)}
              />
            </div>
          </div>

          <label htmlFor="backgroundImg">
            <RiEditBoxFill
              size={23}
              color="white"
              className="wrkshopEditIcon2"
            />
          </label>
          <input
            type="file"
            id="backgroundImg"
            style={{ visibility: "hidden" }}
            onChange={handleEventImg}
          />
        </div>

        <div className="dltsSecond ">
          <div className="row " style={{ width: "100%" }}>
            <div className="dltsSecondLeft col-lg-7 col-md-12 col-12">
              <div className="harbar">
                <h5 onClick={() => navigate("/")}>Home</h5> <span>{">"}</span>
                <h5 onClick={() => navigate(-1)}>Event</h5>{" "}
                <span>{">"}</span>
                <h5>Edit</h5>
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
                <RiEditBoxFill
                  size={23}
                  color="white"
                  className="wrkshopEditIcon"
                  onClick={() => setShowWhatYouLearn(true)}
                />
              </div>

              <div className="crsCont">
                <h4>Event Content</h4>
                <div className="crsttitlesc">
                  <p>
                    15 Sections <span></span> 146 Lectures <span></span> 14H 42M
                    Total Length
                  </p>
                  <div className="d-flex align-items-center">
                    <h6 style={{ marginRight: "9px" }}>Expand All Sections</h6>
                    <BsPlusCircleFill
                      size={23}
                      color="var(--primary)"
                      className="wrkshopAddIcon"
                      onClick={() => setShowCourseContent(true)}
                    />
                  </div>
                </div>
                <div className="accordiancont ">
                  <CourseContent setShowCourseContent={setShowCourseContent}  data={eventDetails?.courseContent} selectedTopicDta={selectedTopicDta} setSelectedTopicDta={setSelectedTopicDta} update={true}/>
                </div>

                {/* here we are creating descriptions sections */}
                <div className="wrkshopDescriptions">
                  <h5>Descriptions</h5>

                  {londDescriptionContent != "" &&
                    parse(londDescriptionContent)}
                  <RiEditBoxFill
                    size={23}
                    color="white"
                    className="wrkshopEditIcon"
                    onClick={() => setShowLongDescriptionEditor(true)}
                  />
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

                {/* here we are adding some other fields required */}
                <div className="relatedCourse " style={{ padding: "20px" }}>
                  <div className="inputBox2 " style={{ marginBottom: "12px" }}>
                    <label htmlFor="">Session Tags</label>
                    <TagsInput
                      classNames="tagsInput"
                      value={sessionTags}
                      onChange={setSessionTags}
                      placeHolder="Enter tags"
                    />
                  </div>
                  <div className="inputBox">
                    <label htmlFor="">Select Community</label>
                    <select
                      class="form-select "
                      aria-label="Default select example"
                      value={communityName}
                      onChange={(e) => handleCommunity(e)}
                    >
                      <option value="">Choose Community</option>
                      {allCommunity.map((item, index) => {
                        return (
                          <>
                            <option value={item.display_name}>
                              {item.display_name}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                  <div className="inputBox">
                    <label htmlFor="">Total Session Duration (in hours)</label>
                    <input
                      classNames=""
                      value={duration}
                      type="number"
                      min={0}
                      onChange={(e) => setDuration(e.target.value)}
                      placeHolder="Enter duration"
                    />
                  </div>
                </div>

                  {/* users review section */}
                  <UsersReview id={eventId}/>
              </div>
            </div>
            <div className="dltsSecondRght col-lg-5 col-md-12 col-12">
              <div className="vdoDtls">
                <div className="vdoDtlsVdo">
                  {eventDetails?.event_photo ? (
                    <img src={eventImg} />
                  ) : (
                    <img src={DummyBanner} alt="" />
                  )}
                  <div className="vdoPlay">
                    <BsFillPlayFill size={36} />
                  </div>
                  <h6>Preview this course</h6>
                </div>
                <div className="vdoTxt">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5>{paid ? `Price : ${price} HKD` : "Free"} </h5>
                    {!editPriceSection && (
                      <AiFillEdit
                        size={23}
                        color="var(--primary)"
                        style={{ marginTop: "6px" }}
                        onClick={() => setEditPriceSection(true)}
                      />
                    )}
                    {editPriceSection && (
                      <AiOutlineCloseCircle
                        size={23}
                        color="var(--primary)"
                        style={{ marginTop: "6px" }}
                        onClick={() => setEditPriceSection(false)}
                      />
                    )}
                  </div>
                  {editPriceSection && (
                    <div className="priceSection">
                      <div className="frePd">
                        <h6
                          onClick={() => setPaid(false)}
                          style={!paid ? activeBx : inActiveBx}
                        >
                          Free
                        </h6>
                        <h6
                          onClick={() => setPaid(true)}
                          style={paid ? activeBx : inActiveBx}
                        >
                          Paid
                        </h6>
                      </div>
                      {paid && (
                        <>
                          <div className="priceSess">
                            <div>
                              <input
                                type="radio"
                                id="paybyhours"
                                name="priceSess"
                                checked={sessionType == "hourly"}
                                onChange={() => setSessionType("hourly")}
                              />
                              <label htmlFor="paybyhours">Pay by hours</label>
                            </div>
                            <div>
                              <input
                                type="radio"
                                id="paybysession"
                                name="priceSess"
                                checked={sessionType == "sessional"}
                                onChange={() => setSessionType("sessional")}
                              />
                              <label htmlFor="paybysession">
                                Pay by session
                              </label>
                            </div>
                          </div>
                          <div className="priceIn">
                            <label htmlFor="paybyhours">Price (in HKD)</label>
                            <input
                              type="number"
                              min={0}
                              placeholder="Enter price here"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="crsIncld position-relative">
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

                <RiEditBoxFill
                  size={23}
                  color="white"
                  className="wrkshopEditIcon"
                  onClick={() => setShowCourseInclude(true)}
                />
              </div>

              {/* coach profile */}
              <UserCard
                coachInfo={creatorInfo}
                imgName={creatorInfo?.avtar}
                imgPath={creatorImgPath + creatorInfo?.avtar}
              />

              <div className="updtButn">
                <Button title="Update" onClick={updateEvent} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* here we are adding the edit portions */}

      <DomainIndustryEditor
        sessionType={sessionType}
        setSessionType={setSessionType}
        maxMembers={maxMembers}
        joinedMembers={joinedMembers}
        setMaxMembers={setMaxMembers}
        setJoinedMembers={setJoinedMembers}
        showDomainIndustryEditor={showDomainIndustryEditor}
        setShowDomainIndustryEditor={setShowDomainIndustryEditor}
        isDomainAvailable={false}
        showMaxmembers={true}
        showSessionType={true}
      />

      <WhatYouLearn
        showWhatYouLearn={showWhatYouLearn}
        setShowWhatYouLearn={setShowWhatYouLearn}
        setWhatYouLearnPoints={setWhatYouLearnPoints}
        whatYouLearnPoints={whatYouLearnPoints}
      />

      <DescriptionEditor
        showLongDescriptionEditor={showLongDescriptionEditor}
        setShowLongDescriptionEditor={setShowLongDescriptionEditor}
        londDescriptionContent={londDescriptionContent}
        setLongDescriptionContent={setLongDescriptionContent}
      />

      <CourseContentEditor
        showCourseContent={showCourseContent}
        setShowCourseContent={setShowCourseContent}
        url={`${endpoints.events.uploadVideoContent}`}
        id={eventId}
        selectedTopicDta={selectedTopicDta}
        allCourseContent={eventDetails?.courseContent}
        updateTopicUrl={endpoints.events.updateTopic}
        deleteLectureUrl={endpoints.events.deleteLecture}
        getAllData={getEventDetailsById}
        setSelectedTopicDta={setSelectedTopicDta}
      />

      <CourseInclude
        showCourseInclude={showCourseInclude}
        setShowCourseInclude={setShowCourseInclude}
        courseIncludeIcon={courseIncludeIcon}
        setCourseIncludeIcon={setCourseIncludeIcon}
        courseIncludeContent={courseIncludeContent}
        setCourseIncludeContent={setCourseIncludeContent}
      />
      {loading && <Loader />}
      <ShareModal showShareModal={showShareModal} setShowShareModal={setShowShareModal}/>
    </MainLayout>
  );
};

export default EventsEdit;
