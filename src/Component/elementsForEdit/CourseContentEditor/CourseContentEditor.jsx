import "./courseContentEditor.css";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { AiOutlineCloseCircle, AiFillDelete } from "react-icons/ai";
import { Modal } from "react-bootstrap";
import Button from "../../../Component/button/Button/Button";
import { BsPlusCircleFill } from "react-icons/bs";
import "../../../Screen/WorkshopEdit/workshopEdit.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { endpoints } from "../../services/endpoints";
import { get } from "store";

const CourseContentEditor = (props) => {
  
  const {
    showCourseContent,
    setShowCourseContent,
    url,
    id,
    selectedTopicDta,
    allCourseContent,
    setSelectedTopicDta,
    getAllData,
    updateTopicUrl,
    deleteLectureUrl,
  } = props;

  const [title, setTitle] = useState("");
  const [lectureName, setLectureName] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [videoSource, setVideoSource] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [data, setData] = useState([1, 2, 3, 4]);
  const token = localStorage.getItem("token");
  const [uploadProgress, setUploadProgress] = useState("");
  const [loading, setLoading] = useState(false);
  const [topicLoading, setTopicLoading] = useState(false);
  const [courseCnt, setCourseCnt] = useState({});

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    setVideoFile(file);
    const url = URL.createObjectURL(file);
    setVideoSource(url);
  };

  const clearFields = () => {
    setTimePeriod("");
    setLectureName("");
    setVideoFile(null);
    setVideoSource("");
  };

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const submit = () => {
    if (!title) {
      toast("Please enter title", { type: "warning" });
    } else if (!lectureName) {
      toast("Lecture name is required", { type: "warning" });
    } else if (!timePeriod) {
      toast("Time period is required", { type: "warning" });
    } else if (!videoSource) {
      toast("Video is required", { type: "warning" });
    } else {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("topic", title);
      formData.append("lecture", lectureName);
      formData.append("video_length", timePeriod);
      formData.append("video_file", videoFile);
      setLoading(true);

      axios
        .post(url, formData, {
          headers: headers,
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
          },
        })
        .then((res) => {
          setLoading(false);
          if (res.data.result) {
            setUploadProgress(0);
            toast("Lecture uploaded successfully", { type: "success" });
            getAllData();
            clearFields();
          }
        })
        .catch((err) => {
          setLoading(false);
          setUploadProgress(0);
          toast("Video uploading failed", { type: "warning" });
          console.log(err, "err ");
        });
    }
  };

  const updateTopic = (dta) => {
    const url = updateTopicUrl;
    const data = {
      id: id,
      topic_id: selectedTopicDta?.id,
      topic: title,
    };
    setTopicLoading(true);

    axios
      .post(url, data, { headers: headers })
      .then((res) => {
        setTopicLoading(false);
        if (res.data.result) {
          getAllData();
          toast("Topic updated", { type: "success" });
        }
      })
      .catch((err) => {
        setTopicLoading(false);
        console.log(err, "err");
      });
  };

  const deleteLecture = (dta) => {
    const url = deleteLectureUrl;

    const data = {
      id: id,
      topic_id: selectedTopicDta?.id,
      lecture_id: dta?.id,
    };
    axios
      .post(url, data, { headers: headers })
      .then((res) => {
        setTopicLoading(false);
        if (res.data.result) {
          toast("lecure deleted", { type: "success" });
          getAllData();
        }
      })
      .catch((err) => {
        setTopicLoading(false);
        console.log(err, "err");
      });
  };

  useEffect(() => {
    if (selectedTopicDta) {
      var topicId = selectedTopicDta?.id;

      const filteredDta = allCourseContent?.find((itm, index) => {
        return itm?.id === topicId;
      });
      setCourseCnt(filteredDta);
      setTitle(filteredDta?.topic);
    }
    else {
      const filteredDta = allCourseContent?.find((itm, index) => {
        return itm?.topic === title;
      });
      console.log(filteredDta , "dd")
      setCourseCnt(filteredDta);
      setTitle(filteredDta?.topic)
    }

  }, [selectedTopicDta, allCourseContent]);

  const handleClose = () => {
    clearFields();
    setSelectedTopicDta({});
    setShowCourseContent(false);
  };

 

  return (
    <Modal show={showCourseContent} size="lg">
      <div className="whlearn">
        <div className="dmInEdHeader">
          <h4>Course Content</h4>
          <AiOutlineCloseCircle color="white" size={25} onClick={handleClose} />
        </div>
        <div className="learnInput">
          <label htmlFor="">Topics</label>
          <div style={{ width: "100%" }} className="d-flex align-items-center">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter topics here"
              className="mb-0"
            />
            {selectedTopicDta?.topic && (
              <Button
                title="Update Topics"
                style={{ margin: "0px", height: "40px" }}
                onClick={updateTopic}
                loading={topicLoading}
              />
            )}
          </div>
        </div>

        {/* here we are adding the course Content  */}

        {courseCnt?.lecture?.length != 0 && (
          <div className="crseConttable">
            {courseCnt?.lecture?.map((item, index) => {
              return (
                <div className="crseContentBox">
                  <div className="crseConteLeft">
                    <h4>{item?.lectureName}</h4>
                    <h6>( {item?.video_length} min ) </h6>
                  </div>
                  <div className="crseConteRight">
                    <AiFillDelete
                      color="red"
                      size={19}
                      style={{ marginLeft: "10px" }}
                      onClick={() => deleteLecture(item)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="crseContent">
          <div className="d-flex justify-content-between row flex-wrap mt-2">
            <div className="dmformBox col-lg-6 col-md-12 col-12 crseContBox">
              <label htmlFor="">Lecture name</label>
              <input
                type="text"
                min={0}
                value={lectureName}
                placeholder="Enter lecture name"
                onChange={(e) => setLectureName(e.target.value)}
              />
            </div>
            <div className="dmformBox col-lg-6 col-md-12 col-12 crseContBox">
              <label htmlFor="">Time (in min)</label>
              <input
                type="text"
                min={0}
                placeholder="Enter time period"
                max={59}
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
              />
            </div>
            <div className="dmformBox col-lg-6 col-md-12 col-12 crseContBox">
              <label htmlFor="">Upload file</label>
              <input
                type="file"
                min={0}
                placeholder="Enter time period"
                accept="video/mp4,video/x-m4v,video/*"
                max={59}
                onChange={(e) => handleVideoUpload(e)}
              />
            </div>
            <div className="dmformBox col-lg-12 col-md-12 col-12 crseContBox">
              <video
                className="VideoInput_video"
                width="100%"
                height="300px"
                controls
                src={videoSource}
              />
            </div>

            {uploadProgress > 0 && (
              <div className="progressCont">
                <h2>Uploading :{uploadProgress} %</h2>
                <progress value={uploadProgress} max="100" />
              </div>
            )}

            <div className="d-flex justify-content-center">
              <Button title="Save" onClick={submit} loading={loading} />
            </div>
          </div>
        </div>
        <div
          className="d-flex justify-content-center "
          style={{
            marginTop: "9px",
            marginBottom: "20px",
            marginRight: "-19px",
          }}
        ></div>
      </div>
    </Modal>
  );
};

export default CourseContentEditor;
