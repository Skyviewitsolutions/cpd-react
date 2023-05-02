import React, { useState, useEffect } from "react";
import "./membersDetails.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import membersDetails2 from "../../../assets/Icons/Artboard26.svg";
import "../../../fonts/Inter-SemiBold.ttf";
import "../../../fonts/Inter-Regular.ttf";
import "../../../fonts/Inter-Bold.ttf";
import { endpoints } from "../../services/endpoints";
import axios from "axios";
import Loader from "../../Loader/Loader";


const MembersDetails = (props) => {

  const { show, setShow, selectedCommunityIdForMember } = props;
  const token = localStorage.getItem("token");

  const [allMembers, setAllMembers] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [loading , setLoading] = useState(false);

  const getMembers = () => {
    const url = `${endpoints.community.joinedMembers}${selectedCommunityIdForMember}`;

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };
    setLoading(true);
    axios
      .get(url, { headers: headers })
      .then((res) => {
        setLoading(false)
        if (res.data.result) {
          const val = res.data.data;
          setAllMembers(val);
          const path = res.data.avtarPath;
          setImagePath(path);
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log(err, "error here members");
      });
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <>
      <div className="membersDetailsmodal">
        <Modal
          show={show}
          onHide={() => setShow(false)}
          className="membersDetailsModalContent"
          // dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <div  className="previewCont">
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              <div className="membersDetailsModalHeading">
                <h5>All Members</h5>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="mebersListOutline">
            {allMembers.length != 0 ? (
              allMembers.map((itm, ind) => {
                var userProfile = imagePath + itm.user_profile?.avtar;

                return (
                  <>
                    <div className="membersList_heading">
                      <div class="memberListModalAvatar">
                        <img
                          src={
                            itm.user_profile?.avtar
                              ? userProfile
                              : membersDetails2
                          }
                          alt="Avatar"
                        />
                      </div>
                      <div className="MembersExplanationmodal">
                        <h5>{itm.user_details?.name}</h5>
                        <h6>
                          Role : <span>{itm.user_profile?.role}</span>
                        </h6>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <h5>No members found !</h5>
            )}
          </Modal.Body>
          {loading && <Loader />}
          </div>
        </Modal>
      </div>
    </>
  );
};

export default MembersDetails;
