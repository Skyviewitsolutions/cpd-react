import React, { useState } from "react";
import "./courseInclude.css";
import { Modal } from "react-bootstrap";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsPlusCircleFill } from "react-icons/bs";
import Button from "../../button/Button/Button";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineYoutube, AiOutlineTrophy } from "react-icons/ai";
import { BiFileBlank, BiMobile } from "react-icons/bi";
import { RiFolderDownloadLine } from "react-icons/ri";
import { MdOutlineLink } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Select from "react-select";

const CourseInclude = (props) => {
  
  const {
    showCourseInclude,
    setShowCourseInclude,
    setCourseIncludeContent,
    courseIncludeContent,
    setCourseIncludeIcon,
    courseIncludeIcon,
  } = props;

  const [icons, setIcons] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState({});

  const iconsMap = [
    {
      icon: <AiOutlineYoutube size={20} color="black"/>,
      text: "Youtube",
      value: 1,
    },
    {
      icon: <BiFileBlank size={20} color="black"/>,
      text: "File",
      value: 2,
    },
    {
      icon: <RiFolderDownloadLine size={20} color="black"/>,
      text: "Folder",
      value: 3,
    },
    {
      icon: <MdOutlineLink size={20} color="black"/>,
      text: "Link",
      value: 4,
    },
    {
      icon: <BiMobile size={20} color="black"/>,
      text: "Mobile",
      value: 5,
    },
    {
      icon: <AiOutlineTrophy size={20} color="black"/>,
      text: "Trophy",
      value: 6,
    },
  ];

  // handle onChange event of the dropdown
  const handleChange = (e) => {
    setIcons(e);
    setCourseIncludeIcon(e.text);
  };

  const handleAddContent = () => {
    if (!icons) {
      setError({ icon: "Please select icon" });
    } else if (!inputValue) {
      setError({ content: "Please enter content" });
    } else {
      setError({});
      setIcons(null);
      setInputValue("");
      const val = {
        icon: icons.text,
        content: inputValue,
      };

      setCourseIncludeContent((item) => {
        return [...item, val];
      });
    }
  };

  const removeContent = (index) =>{
    const filteredDta = courseIncludeContent.filter((itm,ind) => index !== ind);
    setCourseIncludeContent(filteredDta);
  }

  return (
    <Modal show={showCourseInclude} size="lg">
      <div className="whlearn">
        <div className="dmInEdHeader">
          <h4>Course Include </h4>
          <AiOutlineCloseCircle
            color="white"
            size={25}
            onClick={() => setShowCourseInclude(false)}
          />
        </div>

        <div className="learnInput">
          <label htmlFor="">Select Icons</label>
          <div style={{ width: "100%" }} className="d-flex align-items-center">
            <Select
              placeholder="Select Option"
              value={icons}
              options={iconsMap}
              onChange={handleChange}
              className="selectBox"
              getOptionLabel={(e) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                  {e.icon}
                  <span style={{ marginLeft: 5 }}>{e.text}</span>
                </div>
              )}
            />
          </div>
          {error?.icon && <span className="crseError">{error.icon}</span>}
        </div>
        <div className="learnInput">
          <label htmlFor="">Content</label>
          <div style={{ width: "100%" }} className="d-flex align-items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter topics here"
            />
          </div>
          {error.content && <span className="crseError">{error.content}</span>}
          <div className="d-flex justify-content-center align-items-center mt-3">
            <Button title="Add Content" onClick={handleAddContent} />
          </div>
        </div>

        {/* from here we are going to show the select part; */}

        {courseIncludeContent.length != 0 && (
          <div className="crseIncludescont">
            {courseIncludeContent.map((item, index) => {
             
           const icn =  iconsMap.find((itm,ind) =>   itm.text === item.icon  )
              return (
                  <div className="d-flex justify-content-between align-items-center my-2 " key={index}>
                    <div className="crsIncldBx">  
                        {icn?.icon}
                      <h6>{item?.content}</h6>
                    </div>
                    <IoMdCloseCircleOutline color="var(--primary)" size={23} onClick={() => removeContent(index)}/>
                  </div>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CourseInclude;
