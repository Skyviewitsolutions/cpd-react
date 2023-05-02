import React from "react";
import { Modal } from "react-bootstrap";
import "./videoPlayer.css";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";


const VideoPlayer = (props) => {

  const { videoSource, openVideoPlayer, setOpenVideoPlayer } = props;

  return (
    <Modal show={openVideoPlayer} size="lg">
      <div className="videoPlayer">
        <video
          className="VideoInput_video"
          width="100%"
          height="300px"
          controls
          src={videoSource}
        />
        <div className="videoClost">
          <AiOutlineCloseCircle color="var(--primary)" size={25} onClick={() => setOpenVideoPlayer(false)}/>
        </div>
      </div>
    </Modal>
  );
};

export default VideoPlayer;
