
import React from 'react';
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineYoutube, AiOutlineTrophy } from "react-icons/ai";
import { BiFileBlank, BiMobile } from "react-icons/bi";
import { RiFolderDownloadLine } from "react-icons/ri";
import { MdOutlineLink } from "react-icons/md";
import BackGroundImg from "../../assets/Images/background.jpg";
import { RiShareFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import MainLayout from "../../Layouts/MainLayout";
import { endpoints, imgPath } from "../../Component/services/endpoints";
import Star from "../../assets/Icons/star.png";
import DummyBanner from "../../assets/Icons/dummyBanner.png";
import parse from "html-react-parser";
import UserCard from "../../Component/UserCard/UserCard";
import Loader from "../../Component/Loader/Loader";
import ShareModal from "../../Component/Modal/ShareModel/ShareModel"


const JobBoardEdit = () => {

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

  const shrtDesc = "As a React.js developer, you will implement new features and maintain existing code using React and other standard tools in the React ecosystem, such as Node.js and Yarn. Your duties will include designing software solutions to meet project requirements, maintaining and refactoring existing code, writing tests, and fixing bugs.";

  const navigate = useNavigate();

  const [jobDetails , setJobDetails] = useState({
    title : "React Js Developer"
  });
  const [jobImgPath , setJobImgPath] = useState("");
  const [allDomain, setAllDomain] = useState([]);
  const [allIndustry, setAllIndustry] = useState([]);
  const [industry, setIndustry] = useState("");
  const [domain, setDomain] = useState("");
  const [shortDescriptions, setShortDescriptions] = useState(shrtDesc);
  const [longDescriptions, setLongDescriptions] = useState("");
  const [jobList , setJobList] = useState([]);
  const [employeerInfo , setEmployeerInfo] = useState({});
  const [loading , setLoading] = useState(false);
  const [showShareModal , setShowShareModal] = useState(false)


  const [courseIncludeContent, setCourseIncludeContent] = useState([]);
  const [responsibilities , setResponsiblities] = useState([]);
  


 const handleJobClick = () =>{}
  return (
    <MainLayout>
    <div className="dtlscont">
      <div className="dltsline"></div>
      <div className="dltsMain">
        {jobDetails?.image ? (
          <img src={jobImgPath + "/" + jobDetails.image} />
        ) : (
          <img src={BackGroundImg} alt="" />
        )}

        <div className="wrkshoDtls">
          <h1 className="wrkshTitle">{jobDetails?.title}</h1>
          <p className="wrkpara">{shortDescriptions}</p>
          <div className="wrkshpOther flex-wrap">
            {/* <h6>Max Members : {coachingDetails?.max_members}</h6> */}
            <h6>
              Joined Members : {jobDetails?.coaching_members_count}
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
              <h4>Responsibilities</h4>
              <div className="whatLearnP">
                {responsibilities.map((points, index) => {
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
             
              {/* here we are creating descriptions sections */}
              <div className="wrkshopDescriptions">
                <h5>Descriptions</h5>
                {longDescriptions != "" && parse(longDescriptions)}
              </div>

              <div className="relatedCourse">
                <h4 className="corsTitle">Related Jobs</h4>
                {jobList.length !== 0 &&
                  jobList.map((job, index) => {
                    const img = jobImgPath + "/" + job?.image;
                    return (
                      <div className="courseBox" key={index} onClick={() => handleJobClick(job)}>
                        <div className="d-flex">
                          <img src={img} alt="" />
                          <div>
                            <h5>{job.title}</h5>
                            <h6>
                              23 hours total{" "}
                              <li>
                                Members : ({job?.coaching_members_count})
                              </li>
                            </h6>
                          </div>
                        </div>
                        <div className="pricePart">
                          {job?.is_paid == 1 ? (
                            <h6>Salary : {job.price} HKD</h6>
                          ) : (
                            <h6>Free</h6>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            
            </div>
          </div>
          <div className="dltsSecondRght col-lg-5 col-md-12 col-12">
            <div className="vdoDtls">
              <div className="vdoDtlsVdo">
                {/* <img src={DummyBanner} alt="" /> */}
                {jobDetails?.image ? (
                  <img src={jobImgPath + "/" + jobDetails.image} />
                ) : (
                  <img src={DummyBanner} alt="" />
                )}
                <div className="vdoPlay">
                  <BsFillPlayFill size={36} />
                </div>
                <h6>Preview this course</h6>
              </div>
              <div className="vdoTxt">
                <h5>Salary : 624 HKD </h5>
               
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
              <div className="crsIncldBx">
                {/* <h5>Share</h5> */}
                <button className="addtoCrt"  onClick={() => setShowShareModal(true)}>
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
              coachInfo={employeerInfo}
              imgName={employeerInfo?.avtar}
              imgPath={jobImgPath + employeerInfo?.avtar}
            />
          </div>
        </div>
      </div>
      {loading && <Loader />}
      <ShareModal showShareModal={showShareModal} setShowShareModal={setShowShareModal}/>
    </div>
  </MainLayout>
  )
}

export default JobBoardEdit
