import React from "react";
import "./InviteMembersCard.css";
import dommy_person from "../../assets/Images/dommy_person.jfif";

const InviteMembersCard = () => {
  return (
    <>
    <div className="row">
      <div className="col-lg-12 col-md-12 col-12">
      <div className="invite_memberAll_list">
      <div className="row mb-4">
        <div className="col-12 col-md-2 col-lg-2">
        
            
          <div className="inviteMembers_list">
            <label className="card">
              <input className="card__input" type="checkbox" />
              <div className="card__body">
                <div className="card__body-cover">
                  <img
                    src={dommy_person}
                    alt="#"
                    className="card__body-cover-image"
                  />
                  <span className="card__body-cover-checkbox">
                    <svg
                      className="card__body-cover-checkbox--svg"
                      viewBox="0 0 12 10"
                    >
                      <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                    </svg>
                  </span>
                </div>
              </div>
            </label>
          </div>
        </div>

        <div className="col-12 col-md-10 col-lg-10">
          <div className="row">
            <div className="col-12 col-md-3 col-lg-3 inviteMembers_listCard">
              <h4>James</h4>
              <span>(Moderator)</span>
            </div>
            <div className="col-12 col-md-9 col-lg-9 inviteMembers_listCard">
              <h5>Educaton Detail</h5>
              <h6>
                Skills : Communication PM, Solution Management, Business
                Development
              </h6>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-9 col-md-9 col-12 inviteMembers_listCard">
              <h5>Education Detail</h5>
              <h6>MBA Student, Year 1, KHU University</h6>
            </div>
            <div className="col-lg-3 col-md-3 col-12 inviteMembers_listCard">
              <button className="InviteMemberscard_button">Invited</button>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
    </>
  );
};

export default InviteMembersCard;
