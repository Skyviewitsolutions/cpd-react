// here we creating a part for the accordian which will shown here;
import React from "react";
import "./courseContent.css";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-headless-accordion";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiOutlineYoutube } from "react-icons/ai";
import { useState } from "react";
import { RiEditBoxFill } from "react-icons/ri";
import VideoPlayer from "../Modal/VideoPlayer/VideoPlayer";

const CourseContent = (props) => {
  

  const { data , update } = props;
  const { setShowCourseContent , setSelectedTopicDta , selectedTopicDta } = props;
  const [videoSource , setVideoSource] = useState("")
  const [openVideoPlayer , setOpenVideoPlayer] = useState(false);

  const handleVideoPlaying = (src) =>{
    setOpenVideoPlayer(true)
    setVideoSource(src)
  }

  const handleUpdate = (dta) =>{
    console.log(dta , "dta")
    setSelectedTopicDta(dta)
    setShowCourseContent(true)
  }

  return (<>
    <Accordion>
      {data &&
        data?.map((item, index) => {
          return (
            item && (
              <AccordionItem
                key={index}
                className="position-relative accordianItem"
              >
                <AccordionHeader>
                  <div className="accordianTitleCont" key={index}>
                    <div>
                      <IoIosArrowDown color="var(--black)" />
                      <h6>{item?.topic}</h6>
                    </div>
                    <span>{item?.lecture.length} Lectures </span>
                    {update &&
                    <RiEditBoxFill
                      size={18}
                      color="white"
                      className="wrkshopEditIcon"
                      onClick={() =>handleUpdate(item)}
                    />}
                  </div>
                </AccordionHeader>
                <AccordionBody>
                  {item?.lecture.length != 0 &&
                    item?.lecture.map((itm, ind) => {
                      return (
                        <div
                          className="accordion-body position-relative"
                          key={ind}
                        >
                          <div className="accordianBodyPart">
                            <div className="accordianBodyleft">
                              <AiOutlineYoutube
                                size={16}
                                color="var(--black)"
                              />
                              <h6>{itm?.lectureName}</h6>
                            </div>
                          </div>
                          <div className="d-flex align-items-center previewCont">
                            <h6 style={{width : "70px" , marginBottom : "0px" ,  }} onClick={() => handleVideoPlaying(itm?.video_file)}>Preview</h6>
                            <span style={{width : "60px"}}>{itm?.video_length} min</span>
                          </div>
                        </div>
                      );
                    })}
                </AccordionBody>
              </AccordionItem>
            )
          );
        })}
    </Accordion>

    <VideoPlayer videoSource={videoSource} openVideoPlayer={openVideoPlayer} setOpenVideoPlayer={setOpenVideoPlayer}/>
  </>);
};

export default CourseContent;
