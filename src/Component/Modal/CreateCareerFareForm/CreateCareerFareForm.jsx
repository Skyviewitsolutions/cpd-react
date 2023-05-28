import React from "react";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Button from "../../button/Button/Button";
import { TagsInput } from "react-tag-input-component";
import showToast from "../../CustomToast/CustomToast";
import { endpoints } from "../../services/endpoints";
import axios from "axios";
import { getDomainList, getIndustryList } from "../../../utils/api";

const CreateCareerFareForm = (props) => {

  const {
    updateCarrerFare,
    setUpdateCareerFare,
    showCareerFareForm,
    setShowCareerFareForm,
  } = props;

  const [carrerFareImg, setCareerFareImg] = useState(null);
  const [showDomainInputBox, setShowDomainInputBox] = useState(false);
  const [showIndustryInputBox, setShowIndustryBox] = useState(false);
  const [domainManualInput, setDomainManualInput] = useState("");
  const [industryManualInput, setIndustryManualInput] = useState("");
  const [industry, setIndustry] = useState("");
  const [domain, setDomain] = useState("");
  const [industryId, setIndustryId] = useState("");
  const [domainId, setDomainId] = useState("");
  const [allDomain, setAllDomain] = useState([]);
  const [allIndustry, setAllIndustry] = useState([]);
  const [loading, setLoading] = useState(false);
 
  // Title ---> 
  const [title , setTitle] = useState("");
  const [stage ,setStage] = useState("");
  const [description, setDescription] = useState("");
  const [founder , setFounder] = useState("");
  const [websiteLink , setWebsiteLink] = useState("")
  const [companyName , setCompanyName] = useState("");
  const [seekInvestment , setSeekInvestMent] = useState("")  
  const [partnerRequirement , setPartnerRequirement] = useState("")
  const [sponsers , setSponsers] = useState([])
  const [partners , setPartners] = useState([])
  const [date , setDate] = useState("")


  const handleCareerFareImg = (e) => {
    const files = e.target.files[0];
    setCareerFareImg(files);
  };

  var userDetails = localStorage.getItem("users");
  var userData = userDetails && JSON.parse(userDetails);
  var userId = userData && userData._id;

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

  useEffect(() => {
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
  }, []);

  const updateCarrerFares = () => {};

  const submitCarrerFares = () => {
    if(!title){
     showToast("Title is required" , "warning")
    }
    else if(!stage){
      showToast("Please choose stage" , "warning")
    }
    else if(!carrerFareImg){
      showToast("Image is required" , "warning")
    }
    else if(!date){
      showToast("Date is required" , "warning")
    }
    else if(!founder){
      showToast("Founder is required" , "warning")
    }
    else if(!websiteLink){
      showToast("Website is required" , "warning")
    }
    else if(!domain){
      showToast("Domain is required" , "warning")
    }
    else if(!industry){
      showToast("Industry is required" , "warning")
    }
    else if(!seekInvestment){
      showToast("Please enter investment" , "warning")
    }
    else if(!partnerRequirement){
      showToast("Please choose partner requirement" , "warning")
    }
    else {
      const url = endpoints.incubation.createIncubation;
      
      const headers
      var formdata = new FormData();
      formdata.append("title", "r");
      formdata.append("image", fileInput.files[0], "[PROXY]");
      formdata.append("stage", "d");
      formdata.append("since_date", "01-01-1998");
      formdata.append("founder", "e");
      formdata.append("website_link", "e");
      formdata.append("project_name", "e");
      formdata.append("domain", "6373291dfd4cab117e04ddb2");
      formdata.append("industry", "6373278b2b7154a908092562");
      formdata.append("investment", "e");
      formdata.append("partner_requirement", "e");
      formdata.append("sponsers", "e");
      formdata.append("partners", "e");
      formdata.append("others", "e");
    }
  };

  const refreshAllInputField = () => {};

  return (
    <Modal
      show={showCareerFareForm}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="formoutline_studentcv coachFormSt jobportalfomt">
        <div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12 ">
              <div class="form-group">
                <label for="exampleInputPassword1">Title</label>
                <input
                  type="text"
                  class="form-control field py-4 mb-3"
                  id=""
                  placeholder="Enter  name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6 ">
              <div class="form-group">
                {carrerFareImg ? (
                  <>
                    <label htmlFor="takePhoto">Upload Img</label>
                    <h5 class="form-control" htmlFor="takePhone">
                      {carrerFareImg.name}
                    </h5>
                    <input
                      type="file"
                      className="form-control imgUploader"
                      placeholder="Enter here"
                      accept="image/png, image/gif, image/jpeg"
                      onChange={(e) => handleCareerFareImg(e)}
                      id="takePhoto"
                      style={{ display: "none" }}
                    />
                  </>
                ) : (
                  <>
                    <label htmlFor="takePhoto">Upload Img</label>
                    <input
                      type="file"
                      className="form-control imgUploader"
                      placeholder="Enter here"
                      accept="image/png, image/gif, image/jpeg"
                      onChange={(e) => handleCareerFareImg(e)}
                      id="takePhoto"
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-6 col-lg-6 mb-3">
              <div class="form-group">
                <label for="exampleInputPassword1">Stage</label>
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
                  value={stage}
                  onChange={(e)  => setStage(e.target.value)}
                >
                  <option>Choose</option>
                  <option value="Pressed">Pressed</option>
                  <option value="Seed">Seed</option>
                  <option value="Early">Early</option>
                  <option value="Growth">Growth</option>
                  <option value="Expansion">Expansion</option>
                </select>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6 mb-3">
              <div class="form-group">
                <label for="exampleInputPassword1">Since When (date)</label>
                <input
                  type="date"
                  class="form-control field py-4"
                  id=""
                  placeholder="Enter job location"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6 mb-3">
              <div class="form-group">
                <label for="exampleInputPassword1">Founder</label>
                <input
                  type="text"
                  class="form-control field py-4"
                  id=""
                  placeholder="Enter founder name"
                  value={founder}
                  onChange={(e)=> setFounder(e.target.value)}
                />
              </div>
            </div>
            
            <div className="col-12 col-md-6 col-lg-6 mb-3">
              <div class="form-group">
                <label for="exampleInputPassword1">Website Link (url)</label>
                <input
                  type="text"
                  class="form-control field py-4"
                  id=""
                  placeholder="Enter your website"
                  value={websiteLink}
                  onChange={(e) =>setWebsiteLink(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6 mb-3">
              <div class="form-group">
                <label for="exampleInputPassword1">Company/Project Name</label>
                <input
                  type="text"
                  class="form-control field py-4"
                  id=""
                  placeholder="Enter company/Project name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-6 mb-3">
              <div class="form-group">
                <label for="exampleInputPassword1">Domain</label>
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
                  value={domain}
                  required
                  onChange={(e) => handleDomainSelection(e.target.value)}
                >
                  <option value="">Choose</option>
                  {allDomain.map((domain, index) => {
                    return (
                      <option value={domain.title} key={index}>
                        {domain.title}
                      </option>
                    );
                  })}
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>
            {showDomainInputBox && (
              <div className="col-12 col-md-6 col-lg-6 mb-3">
                <div class="form-group">
                  <label for="exampleInputPassword1">Others</label>
                  <input
                    type="text"
                    class="form-control field py-4 "
                    id=""
                    placeholder="Enter your domain "
                    value={domainManualInput}
                    onChange={(e) => setDomainManualInput(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="col-12 col-md-6 col-lg-6 mb-3">
              <div class="form-group">
                <label for="exampleInputPassword1">Industry</label>
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
                  value={industry}
                  required
                  onChange={(e) => handleIndustrySelection(e.target.value)}
                >
                  <option>Choose</option>
                  {allIndustry.map((industry, index) => {
                    return (
                      <>
                        <option value={industry.title} key={index}>
                          {industry.title}
                        </option>
                      </>
                    );
                  })}
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>
            {showIndustryInputBox && (
              <div className="col-12 col-md-6 col-lg-6 mb-3">
                <div class="form-group">
                  <label for="exampleInputPassword1">Others</label>
                  <input
                    type="text"
                    class="form-control field py-4"
                    id=""
                    placeholder="Enter your industry"
                    value={industryManualInput}
                    onChange={(e) => setIndustryManualInput(e.target.value)}
                  />
                </div>
              </div>
            )}
          

          <div className="col-12 col-md-6 col-lg-6 mb-3">
              <div class="form-group">
                <label for="exampleInputPassword1">Seek Investment</label>
                <input
                  type="text"
                  class="form-control field py-4"
                  id=""
                  placeholder="Enter investment"
                  value={seekInvestment}
                  onChange={(e) => setSeekInvestMent(e.target.value)}
                />
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-6 mb-3">
            <div class="form-group">
              <label for="exampleInputPassword1">Partners Requirement</label>
              <select
                class="form-select end-year "
                aria-label="Default select example"
                required
                value={partnerRequirement}
                onChange={(e)=> setPartnerRequirement(e.target.value)}
              >
                <option>Choose</option>
                <option value="Technical Expertise">Technical Expertise</option>
                <option value="Survey">Survey</option>
              </select>
            </div>
          </div>
          </div>
          <div className="col-12 col-md-12 col-lg-12 mb-3">
            <div class="form-group skillssss">
              <label for="exampleInputPassword1">Sporsers</label>
              <TagsInput placeHolder="Enter all sponsers" value={sponsers} onChange={setSponsers}/>
            </div>
          </div>
          <div className="col-12 col-md-12 col-lg-12 mb-3">
            <div class="form-group skillssss">
              <label for="exampleInputPassword1">Partners</label>
              <TagsInput placeHolder="Enter all partners" value={partners} onChange={setPartners}/>
            </div>
          </div>


          <div className="col-12 col-md-12 col-lg-12 mb-3">
            <div class="form-group">
              <label for="exampleInputPassword1">Others</label>
              <textarea
                type="text"
                class="form-control field py-4"
                id=""
                placeholder="Enter your description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          {/* here we aare adding payment div */}

          <div className="confirmBtn">
            <Button
              title={
                updateCarrerFare ? "Update Career Fare" : "Create Career Fare"
              }
              onClick={updateCarrerFare ? updateCarrerFares : submitCarrerFares}
              loading={loading}
            />
          </div>
        </div>
        <div
          className="coachingCutOptions"
          onClick={() => {
            setShowCareerFareForm(false);
            refreshAllInputField();
            setUpdateCareerFare(false);
          }}
        >
          <IoIosCloseCircleOutline size={26} color="red" />
        </div>
      </div>
    </Modal>
  );
};

export default CreateCareerFareForm;
