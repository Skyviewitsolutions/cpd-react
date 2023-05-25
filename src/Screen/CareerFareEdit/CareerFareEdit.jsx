import React, { useRef } from "react";
import MainLayout from "../../Layouts/MainLayout";
import BackGroundImg from "../../assets/Images/background.jpg";
import Star from "../../assets/Icons/star.png";
import DummyBanner from "../../assets/Icons/dummyBanner.png";
import CourseContent from "../../Component/CourseContent/CourseContent";
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
import { endpoints, imgPath } from "../../Component/services/endpoints";
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
import UserCard from "../../Component/UserCard/UserCard";
import showToast from "../../Component/CustomToast/CustomToast";
import Button from "../../Component/button/Button/Button";
import UsersReview from "../../Component/UsersReview/UsersReview";
import VideoPlayer from "../../Component/Modal/VideoPlayer/VideoPlayer";
import DefaultImg from "../../assets/Images/default.png"
import ShareModal from "../../Component/Modal/ShareModel/ShareModel";


const CareerFareEdit = () => {

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
      const { workshopId } = useParams();
      const token = localStorage.getItem("token");
      const [workshopDtails, setWorkshopDtails] = useState({});
      const [workshopImgPath, setWorkshopImgPath] = useState("");
      const [workshopImg, setWorkshopImg] = useState("");
      const [workhshopImgFiles, setWorkshopImgFiles] = useState([]);
      const [loading, setLoading] = useState(false);
      const [showShareModal , setShowShareModal] = useState(false)
    
      const coachImgPath = imgPath.user;
    
      // create variables for holding value ;
      const [title, setTitle] = useState("");
      const [maxMembers, setMaxMembers] = useState("");
      const [duration, setDuration] = useState("");
      const [allDomain, setAllDomain] = useState([]);
      const [allIndustry, setAllIndustry] = useState([]);
      const [industry, setIndustry] = useState("");
      const [domain, setDomain] = useState("");
      const [shortDescriptions, setShortDescriptions] = useState(shrtDesc);
      const [industryId, setIndustryId] = useState("");
      const [domainId, setDomainId] = useState("");
      const [showDomainInputBox, setShowDomainInputBox] = useState(false);
      const [showIndustryInputBox, setShowIndustryBox] = useState(false);
      const [domainManualInput, setDomainManualInput] = useState("");
      const [industryManualInput, setIndustryManualInput] = useState("");
      const [joinedMembers, setJoinedMembers] = useState("");
      const [updateCourseContent , setUpdateCourseContent] = useState(false)
    
      // creating useState for slotsCreations ;
    
      const [selectedDays, setSelectedDays] = useState([]);
      const [daysFormat, setDaysFormat] = useState("weekly");
      const [isRepeated, setIsRepeated] = useState(false);
      const [dateSlot, setDateSlot] = useState([]);
      const [daysSlot, setDaysSlot] = useState([]);
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
      const [selectedTopicDta , setSelectedTopicDta] = useState({})
    
      // handling the state of the toggleing model ;
    
      const [showDomainIndustryEditor, setShowDomainIndustryEditor] =
        useState(false);
      const [showWhatYouLearn, setShowWhatYouLearn] = useState(false);
      const [showLongDescriptionEditor, setShowLongDescriptionEditor] =
        useState(false);
      const [showCourseContent, setShowCourseContent] = useState(false);
      const [showCourseInclude, setShowCourseInclude] = useState(false);
      const [editPriceSection, setEditPriceSection] = useState(false);
    
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
              var industry = val?.industry?.title;
              setIndustry(industry);
              var domain = val?.domain?.title;
              setDomain(domain);
              setDomainId(val?.domain?.domain_id);
              setIndustryId(val?.industry?.industry_id);
              setTitle(val?.title);
              setMaxMembers(val?.max_members);
              setJoinedMembers(val?.workshop_members_count);
              var path = res.data?.workshop_image_path;
              setWorkshopImgPath(path);
    
              var imageUrl = path + "/" + val.image;
    
              setWorkshopImg(imageUrl);
    
              var slots = JSON.parse(val?.availability_slot);
    
              setSelectedDays(slots?.selectedDays || []);
              setSelectedDates(slots?.selectedDates || []);
              setDaysSlot(slots?.daysSlot);
              setDateSlot(slots?.dateSlot);
              setDuration(slots?.duration);
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
    
      useEffect(() => {
        getWorkshopDetailsById();
        getIndustryList()
          .then((res) => {
            if (res.data.data) {
              var data = res.data.data;
              setAllIndustry(data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
        getDomainList()
          .then((res) => {
            if (res.data.data) {
              var data = res.data.data;
              setAllDomain(data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, [workshopId]);
    
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
        getWorkshopByUser();
      }, [coachInfo]);
    
      const handleDomainSelection = (val) => {
        if (val === "Others") {
          setShowDomainInputBox(true);
          setDomain(val);
        } else {
          setShowDomainInputBox(false);
          setDomain(val);
          var domanId = allDomain.find((itm, index) => {
            return itm.title === val;
          });
    
          domanId = domanId._id;
          setDomainId(domanId);
        }
      };
    
      const handleIndustrySelection = (val) => {
        if (val === "Others") {
          setShowIndustryBox(true);
          setIndustry(val);
        } else {
          setIndustry(val);
          setShowIndustryBox(false);
          var indstryId = allIndustry.find((itm, index) => {
            return itm.title === val;
          });
          indstryId = indstryId._id;
          setIndustryId(indstryId);
        }
      };
    
      const handleWorkshopImg = (e) => {
        const files = e.target.files[0];
        setWorkshopImg(URL.createObjectURL(files));
        setWorkshopImgFiles(files);
      };
    
      const handleTextArea = (event) => {
        setShortDescriptions(event.target.value);
        event.target.style.height = "auto";
        event.target.style.height = event.target.scrollHeight + "px";
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
    
      // code for updating the workshops here;
    
      const updateWorkhop = () => {
        const url = endpoints.workshop.updateWorkshop;
    
        if (!title) {
          showToast("please fill the workshop title", "warning");
        } else if (!workshopImg) {
          showToast("workshop image is required", "warning");
        } else if (!domain) {
          showToast("please select workshop domain", "warning");
        } else if (!industry) {
          showToast("please select workshop industry", "warning");
        } else if (!maxMembers) {
          showToast("Max number of student is required", "warning");
        } else if (!sessionType) {
          showToast("please select session type", "warning");
        } else {
          var availability_type = daysFormat == "weekly" ? 1 : 2;
          var payment_type = sessionType == "hourly" ? 1 : 2;
          var is_paid = paid == true ? 1 : 0;
          var availability_timing = ["12:00:00", "01:00:00"];
          var is_repeated = isRepeated ? 1 : 0;
    
          var slots = {
            isRepeated: isRepeated,
            selectedDays: selectedDays,
            daysFormat: daysFormat,
            selectedDates: selectedDates,
            daysSlot: daysSlot,
            dateSlot: dateSlot,
            title: title,
            duration: duration,
          };
    
          var course_include_content_type = courseIncludeContent.map(
            (itm, ind) => itm.icon
          );
          var course_include_content = courseIncludeContent.map(
            (itm, ind) => itm.content
          );
    
          const formData = new FormData();
          formData.append("title", title);
          formData.append("availability_type", availability_type);
          formData.append("payment_type", payment_type);
          formData.append("price", price);
          formData.append("is_paid", is_paid);
          formData.append("availability_slot", JSON.stringify(slots));
          formData.append("availability_timing", availability_timing);
          formData.append("is_repeated", is_repeated);
          formData.append("max_members", maxMembers);
          formData.append("image", workshopImg);
          formData.append(
            "domain",
            showDomainInputBox ? domainManualInput : domainId
          );
          formData.append(
            "industry",
            showIndustryInputBox ? industryManualInput : industryId
          );
          formData.append("id", workshopId);
          formData.append("workshop_duration", duration);
          formData.append("short_description", shortDescriptions);
          formData.append("long_description", londDescriptionContent);
          formData.append("learn_topic", whatYouLearnPoints);
          formData.append(
            "course_include_content_type",
            course_include_content_type
          );
          formData.append("course_include_content", course_include_content);
    
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          setLoading(true);
          axios
            .post(url, formData, { headers: headers })
            .then((res) => {
              setLoading(false);
              if (res.data.result) {
                getWorkshopDetailsById();
                showToast("Workshop updated successfully", "success");
              }
            })
            .catch((err) => {
              console.log(err, "error");
              setLoading(false);
            });
        }
      };
    
      const handleWorkshopClick = (dta) => {
        const id = dta?._id;
        const path = generatePath("/workshopEdit/:workshopId", { workshopId: id });
        navigate(path);
      };

  return (
    <MainLayout>
    <div className="dtlscont">
      <div className="dltsline"></div>
      <div className="dltsMain">
        {workshopDtails?.image ? (
          <img src={workshopImg} />
        ) : (
          <img src={DefaultImg} alt="" />
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
            <h6>Domain : {domain}</h6>
            <h6>Industry : {industry}</h6>
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
          onChange={handleWorkshopImg}
        />
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
              <RiEditBoxFill
                size={23}
                color="white"
                className="wrkshopEditIcon"
                onClick={() => setShowWhatYouLearn(true)}
              />
            </div>

            <div className="crsCont">
              <h4>Workshop Content</h4>
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
                <CourseContent setShowCourseContent={setShowCourseContent} data={workshopDtails?.courseContent} selectedTopicDta={selectedTopicDta} setSelectedTopicDta={setSelectedTopicDta} update={true}/>
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
                <h4 className="corsTitle">Related Workshop</h4>
                {workshopList.length !== 0 &&
                  workshopList.map((workshop, index) => {
                    const img = workshopImgPath + "/" + workshop?.image;
                    return (
                      <div
                        className="courseBox"
                        key={index}
                        onClick={() => handleWorkshopClick(workshop)}
                      >
                        <div className="d-flex">
                          <img src={workshop?.image ?  img : DefaultImg} alt="" />
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
                {workshopDtails?.image ? (
                  <img src={workshopImg} />
                ) : (
                  <img src={DefaultImg} alt="" />
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

            <UserCard
              coachInfo={coachInfo}
              imgName={coachInfo.avtar}
              imgPath={coachImgPath + coachInfo.avtar}
            />
            <div className="updtButn">
              <Button title="Update" onClick={updateWorkhop} />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* here we are adding the edit portions */}

    <DomainIndustryEditor
      allDomain={allDomain}
      allIndustry={allIndustry}
      handleDomainSelection={handleDomainSelection}
      handleIndustrySelection={handleIndustrySelection}
      domain={domain}
      domainId={domainId}
      industry={industry}
      industryId={industryId}
      maxMembers={maxMembers}
      domainManualInput={domainManualInput}
      setDomainManualInput={setDomainManualInput}
      industryManualInput={industryManualInput}
      setIndustryManualInput={setIndustryManualInput}
      showDomainInputBox={showDomainInputBox}
      showIndustryInputBox={showIndustryInputBox}
      joinedMembers={joinedMembers}
      setMaxMembers={setMaxMembers}
      setJoinedMembers={setJoinedMembers}
      showDomainIndustryEditor={showDomainIndustryEditor}
      setShowDomainIndustryEditor={setShowDomainIndustryEditor}
      isDomainAvailable={true}
      showMaxmembers={true}
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
      url={`${endpoints.workshop.uploadVideoContent}`}
      id={workshopId}
      selectedTopicDta={selectedTopicDta}
      allCourseContent={workshopDtails?.courseContent}
      updateTopicUrl={endpoints.workshop.updateTopic}
      deleteLectureUrl={endpoints.workshop.deleteLecture}
      getAllData={getWorkshopDetailsById}
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

<ShareModal showShareModal={showShareModal} setShowShareModal={setShowShareModal}/>

    {loading && <Loader />}
  </MainLayout>
  )
}

export default CareerFareEdit