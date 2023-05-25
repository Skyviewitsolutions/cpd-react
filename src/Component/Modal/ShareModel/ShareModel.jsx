import React from "react";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./shareModel.css";
import { InlineShareButtons } from "sharethis-reactjs";

const ShareModel = (props) => {

  const {showShareModal , setShowShareModal} = props;

  return (
    <Modal show={showShareModal} size="md">
      <div className="dmnInEditor">
        <div className="dmInEdHeader">
          <h4>Share </h4>
          <AiOutlineCloseCircle
            color="white"
            size={25}
            onClick={() => setShowShareModal(false)}
          />
        </div>
        <div className="shareModalCont" >
        <div className="shareBtn2 ">
          <InlineShareButtons
            config={{
              alignment: "center",
              color: "social", // set the color of buttons (social, white)
              enabled: true, // show/hide buttons (true, false)
              font_size: 16, // font size for the buttons
              labels: null, // button labels (cta, counts, null)
              language: "en", // which language to use (see LANGUAGES)
              networks: [
                // which networks to include (see SHARING NETWORKS)
                "whatsapp",
                "linkedin",
                  "messenger",
                "facebook",
                "email",
              ],
              padding: 12, // padding within buttons (INTEGER)
              radius: 4, // the corner radius on each button (INTEGER)
              show_total: false,
              size: 70, // the size of each button (INTEGER)

              // OPTIONAL PARAMETERS//
              //   url: "https://cpdedu.com/myCommunity", // (defaults to current url)
              //   image: data.image ? image : event_cardimg, // (defaults to og:image or twitter:image)
              //   description: data?.description, // (defaults to og:description or twitter:description)
              //   title: data?.display_name, // (defaults to og:title or twitter:title)
              //  message:
              //    "https://cpdedu.com/myCommunity" + "\n" + data?.description, // (only for email sharing)
              //  subject: data?.display_name, // (only for email sharing)
            }}
          />
          </div>
          </div>
        </div>
      
    </Modal>
  );
};

export default ShareModel;
