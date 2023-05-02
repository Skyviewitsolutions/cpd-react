// This is the common page for editing every domain industry and other minor parts for the details screen ;

import React from "react";
import { Modal } from "react-bootstrap";
import "./domainIndustryEditor.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Button from "../../../Component/button/Button/Button";

const DomainIndustryEditor = (props) => {

  const {
    allDomain,
    allIndustry,
    handleDomainSelection,
    showDomainInputBox,
    showIndustryInputBox,
    handleIndustrySelection,
    domain,
    showSessionType,
    maxMembers,
    domainManualInput,
    setDomainManualInput,
    industryManualInput,
    setIndustryManualInput,
    setMaxMembers,
    showMaxmembers,
    isDomainAvailable,
    joinedMembers,
    domainId,
    industry,
    sessionType ,
    setSessionType ,
    showDomainIndustryEditor,
    setShowDomainIndustryEditor,
    setJoinedMembers,
    industryId,
  } = props;

  return (
    <Modal show={showDomainIndustryEditor} size="lg">
      <div className="dmnInEditor">
        <div className="dmInEdHeader">
          <h4>Editor</h4>
          <AiOutlineCloseCircle
            color="white"
            size={25}
            onClick={() => setShowDomainIndustryEditor(false)}
          />
        </div>

        <div className="dmInForm row">
          {showMaxmembers && 
          <div className="dmformBox col-lg-6 col-md-12 col-12">
            <label htmlFor="">Max members</label>
            <input
              type="number"
              min={0}
              value={maxMembers}
              onChange={(e) => setMaxMembers(e.target.value)}
            />
          </div>}

          {/* <div className="dmformBox  col-lg-6 col-md-12 col-12">
            <label htmlFor="">Joined members</label>
            <input
              type="number"
              min={0}
              value={joinedMembers}
              onChange={(e) => setJoinedMembers(e.target.value)}
            />
          </div> */}

          {isDomainAvailable && (
            <>
              <div className="dmformBox  col-lg-6 col-md-12 col-12">
                <label htmlFor="">Domain</label>
                <select
                  value={domain}
                  required
                  onChange={(e) => handleDomainSelection(e.target.value)}
                >
                  <option value="">Choose</option>
                  {allDomain &&
                    allDomain.map((domain, index) => {
                      return (
                        <option value={domain.title} key={index}>
                          {domain.title}
                        </option>
                      );
                    })}
                  <option value="Others">Others</option>
                </select>
              </div>
              <div className="dmformBox  col-lg-6 col-md-12 col-12">
                <label htmlFor="">Industry</label>

                <select
                  value={industry}
                  required
                  onChange={(e) => handleIndustrySelection(e.target.value)}
                >
                  <option>Choose</option>
                  {allIndustry &&
                    allIndustry.map((industry, index) => {
                      return (
                        <option value={industry.title} key={index}>
                          {industry.title}
                        </option>
                      );
                    })}
                  <option value="Others">Others</option>
                </select>
              </div>
              {showDomainInputBox && (
                <div className="dmformBox  col-lg-6 col-md-12 col-12">
                  <label htmlFor="">Others (domain)</label>
                  <input
                    type="text"
                    value={domainManualInput}
                    onChange={(e) => setDomainManualInput(e.target.value)}
                  />
                </div>
              )}
              {showIndustryInputBox && (
                <div className="dmformBox  col-lg-6 col-md-12 col-12">
                  <label htmlFor="">Others (industry)</label>
                  <input
                    type="text"
                    value={industryManualInput}
                    onChange={(e) => setIndustryManualInput(e.target.value)}
                  />
                </div>
              )}
            </>
          )}

          {/* here we are creating the session type */}

          {showSessionType && 
          <div className="col-12 col-md-12 col-lg-6 dmformBox">
              <h5> Session Type</h5>
          <div className="col-12 col-md-12 col-lg-12 dmformCheck">

                <div class="form-check">
                  <input
                    class="form-check-input eventFormSessionType_checkbox "
                    type="radio"
                    value=""
                    name="sessionMode"
                    id="Online"
                    checked={sessionType === "online"}
                    onChange={(e) => setSessionType("online")}
                  />
                  <label
                    class="form-check-label eventFormSessionType_label"
                    htmlFor="Online"
                  >
                    Online
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input eventFormSessionType_checkbox"
                    type="radio"
                    value=""
                    name="sessionMode"
                    id="Offline"
                    checked={sessionType === "offline"}
                    onChange={(e) => setSessionType("offline")}
                  />
                  <label
                    class="form-check-label eventFormSessionType_label"
                    htmlFor="Offline"
                  >
                    Offline
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input eventFormSessionType_checkbox"
                    type="radio"
                    value=""
                    name="sessionMode"
                    id="Hybrid"
                    checked={sessionType === "hybrid"}
                    onChange={(e) => setSessionType("hybrid")}
                  />
                  <label
                    class="form-check-label eventFormSessionType_label"
                    htmlFor="Hybrid"
                  >
                    Both
                  </label>
                </div>
              </div>
              </div>}

          <div className="dmFormBtn mt-3">
            <Button
              title={"Update"}
              onClick={() => setShowDomainIndustryEditor(false)}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DomainIndustryEditor;
