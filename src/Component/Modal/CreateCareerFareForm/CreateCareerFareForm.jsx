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
  const { updateIncubation, setUpdateIncubation, getAllIncubation, selectedIncubation, showCareerFareForm, setShowCareerFareForm, setShowAllIncubation, getMyIncubation } = props;

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
  const [title, setTitle] = useState("");
  const [stage, setStage] = useState("");
  const [description, setDescription] = useState("");
  const [founder, setFounder] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [seekInvestment, setSeekInvestMent] = useState("");
  const [partnerRequirement, setPartnerRequirement] = useState("");
  const [sponsers, setSponsers] = useState([]);
  const [partners, setPartners] = useState([]);
  const [date, setDate] = useState("");

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

  const updateCarrerFares = () => {
    if (!title) {
      showToast("Title is required", "warning");
    } else if (!stage) {
      showToast("Please choose stage", "warning");
    } else if (!carrerFareImg) {
      showToast("Image is required", "warning");
    } else if (!date) {
      showToast("Date is required", "warning");
    } else if (!founder) {
      showToast("Founder is required", "warning");
    } else if (!websiteLink) {
      showToast("Website is required", "warning");
    } else if (!domain) {
      showToast("Domain is required", "warning");
    } else if (!industry) {
      showToast("Industry is required", "warning");
    } else if (!seekInvestment) {
      showToast("Please enter investment", "warning");
    } else if (!partnerRequirement) {
      showToast("Please choose partner requirement", "warning");
    } else {
      const token = localStorage.getItem("token");
      const url = endpoints.incubation.updateIncubation;

      var formdata = new FormData();
      formdata.append("title", title);
      formdata.append("image", carrerFareImg);
      formdata.append("stage", stage);
      formdata.append("since_date", date);
      formdata.append("founder", founder);
      formdata.append("website_link", websiteLink);
      formdata.append("project_name", companyName);
      formdata.append("domain", domainId);
      formdata.append("industry", industryId);
      formdata.append("investment", seekInvestment);
      formdata.append("partner_requirement", partnerRequirement);
      formdata.append("sponsers", sponsers);
      formdata.append("partners", partners);
      formdata.append("others", description);
      formdata.append("_id", selectedIncubation?._id);
      formdata.append("created_by", userId);

      setLoading(true);

      const config = {
        url: url,
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: formdata,
      };

      axios(config)
        .then(function (res) {
          setLoading(false);
          if (res.data.result) {
            showToast("Event created sucessfully", "success");
            setShowAllIncubation(false);
            getMyIncubation();
            setShowCareerFareForm(false);
          }
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (updateIncubation) {
      setTitle(selectedIncubation?.title);
      setStage(selectedIncubation?.stage);
      setDescription(selectedIncubation?.description);
      setFounder(selectedIncubation?.founder);
      setWebsiteLink(selectedIncubation?.website_link);
      setCompanyName(selectedIncubation?.project_name);
      setDescription(selectedIncubation?.others);
      setDomainId(selectedIncubation?.domain?._id);
      setIndustryId(selectedIncubation?.industry?._id);
      setDomain(selectedIncubation?.domain?.title);
      setIndustry(selectedIncubation?.industry?.title);
      setSeekInvestMent(selectedIncubation?.investment);
      setPartnerRequirement(selectedIncubation?.partner_requirement);
      setDate(selectedIncubation?.since_date);
      setSponsers(selectedIncubation?.sponsers);
      setPartners(selectedIncubation?.partners);

      let imgUrl = selectedIncubation?.image;
      let fileName = "incubation.jpg";

      fetch(imgUrl).then(async (response) => {
        const contentType = response.headers.get("content-type");
        const blob = await response.blob();
        const file = new File([blob], fileName, { contentType });
        setCareerFareImg(file);
      });
    }
  }, [updateIncubation]);

  const submitCarrerFares = () => {
    if (!title) {
      showToast("Title is required", "warning");
    } else if (!stage) {
      showToast("Please choose stage", "warning");
    } else if (!carrerFareImg) {
      showToast("Image is required", "warning");
    } else if (!date) {
      showToast("Date is required", "warning");
    } else if (!founder) {
      showToast("Founder is required", "warning");
    } else if (!websiteLink) {
      showToast("Website is required", "warning");
    } else if (!domain) {
      showToast("Domain is required", "warning");
    } else if (!industry) {
      showToast("Industry is required", "warning");
    } else if (!seekInvestment) {
      showToast("Please enter investment", "warning");
    } else if (!partnerRequirement) {
      showToast("Please choose partner requirement", "warning");
    } else {
      const token = localStorage.getItem("token");
      const url = endpoints.incubation.createIncubation;

      var formdata = new FormData();
      formdata.append("title", title);
      formdata.append("image", carrerFareImg);
      formdata.append("stage", stage);
      formdata.append("since_date", date);
      formdata.append("founder", founder);
      formdata.append("website_link", websiteLink);
      formdata.append("project_name", companyName);
      formdata.append("domain", domainId);
      formdata.append("industry", industryId);
      formdata.append("investment", seekInvestment);
      formdata.append("partner_requirement", partnerRequirement);
      formdata.append("sponsers", sponsers);
      formdata.append("partners", partners);
      formdata.append("others", description);

      setLoading(true);

      const config = {
        url: url,
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: formdata,
      };

      axios(config)
        .then(function (res) {
          setLoading(false);
          if (res.data.result) {
            showToast("Event created sucessfully", "success");
            getAllIncubation();
            setShowAllIncubation(false);
            setShowCareerFareForm(false);
          }
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false);
        });
    }
  };

  const refreshAllInputField = () => {
    setTitle("");
    setStage("");
    setDescription("");
    setFounder("");
    setWebsiteLink("");
    setCompanyName("");
    setDescription("");
    setDomainId("");
    setIndustryId("");
    setDomain("");
    setIndustry("");
    setSeekInvestMent("");
    setPartnerRequirement("");
    setDate("");
    setSponsers([]);
    setPartners([]);
  };

  return (
    <Modal show={showCareerFareForm} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <div className="formoutline_studentcv coachFormSt jobportalfomt">
        <div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12 ">
              <div className="form-group">
                <label for="exampleInputPassword1">Title</label>
                <input type="text" className="form-control field py-4 mb-3" id="" placeholder="Enter  name" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6 ">
              <div className="form-group">
                {carrerFareImg ? (
                  <>
                    <label htmlFor="takePhoto">Upload Img</label>
                    <h5 className="form-control" htmlFor="takePhone">
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
              <div className="form-group">
                <label for="exampleInputPassword1">Stage</label>
                <select className="form-select end-year " aria-label="Default select example" value={stage} onChange={(e) => setStage(e.target.value)}>
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
              <div className="form-group">
                <label for="exampleInputPassword1">Since When (date)</label>
                <input type="date" className="form-control field py-4" id="" placeholder="Enter job location" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6 mb-3">
              <div className="form-group">
                <label for="exampleInputPassword1">Founder</label>
                <input type="text" className="form-control field py-4" id="" placeholder="Enter founder name" value={founder} onChange={(e) => setFounder(e.target.value)} />
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-6 mb-3">
              <div className="form-group">
                <label for="exampleInputPassword1">Website Link (url)</label>
                <input
                  type="text"
                  className="form-control field py-4"
                  id=""
                  placeholder="Enter your website"
                  value={websiteLink}
                  onChange={(e) => setWebsiteLink(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6 mb-3">
              <div className="form-group">
                <label for="exampleInputPassword1">Company/Project Name</label>
                <input
                  type="text"
                  className="form-control field py-4"
                  id=""
                  placeholder="Enter company/Project name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-6 mb-3">
              <div className="form-group">
                <label for="exampleInputPassword1">Domain</label>
                <select className="form-select end-year " aria-label="Default select example" value={domain} required onChange={(e) => handleDomainSelection(e.target.value)}>
                  <option value="">Choose</option>
                  {allDomain.map((domain, index) => {
                    return (
                      <option value={domain.title} key={index + "1"}>
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
                <div className="form-group">
                  <label for="exampleInputPassword1">Others</label>
                  <input
                    type="text"
                    className="form-control field py-4 "
                    id=""
                    placeholder="Enter your domain "
                    value={domainManualInput}
                    onChange={(e) => setDomainManualInput(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="col-12 col-md-6 col-lg-6 mb-3">
              <div className="form-group">
                <label for="exampleInputPassword1">Industry</label>
                <select className="form-select end-year " aria-label="Default select example" value={industry} required onChange={(e) => handleIndustrySelection(e.target.value)}>
                  <option>Choose</option>
                  {allIndustry.map((industry, index) => {
                    return (
                      <option value={industry.title} key={index + "1"}>
                        {industry.title}
                      </option>
                    );
                  })}
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>
            {showIndustryInputBox && (
              <div className="col-12 col-md-6 col-lg-6 mb-3">
                <div className="form-group">
                  <label for="exampleInputPassword1">Others</label>
                  <input
                    type="text"
                    className="form-control field py-4"
                    id=""
                    placeholder="Enter your industry"
                    value={industryManualInput}
                    onChange={(e) => setIndustryManualInput(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="col-12 col-md-6 col-lg-6 mb-3">
              <div className="form-group">
                <label for="exampleInputPassword1">Seek Investment</label>
                <input
                  type="text"
                  className="form-control field py-4"
                  id=""
                  placeholder="Enter investment"
                  value={seekInvestment}
                  onChange={(e) => setSeekInvestMent(e.target.value)}
                />
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-6 mb-3">
              <div className="form-group">
                <label for="exampleInputPassword1">Partners Requirement</label>
                <select
                  className="form-select end-year "
                  aria-label="Default select example"
                  required
                  value={partnerRequirement}
                  onChange={(e) => setPartnerRequirement(e.target.value)}>
                  <option>Choose</option>
                  <option value="Technical Expertise">Technical Expertise</option>
                  <option value="Survey">Survey</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-12 col-lg-12 mb-3">
            <div className="form-group skillssss">
              <label for="exampleInputPassword1">Sporsers</label>
              <TagsInput placeHolder="Enter all sponsers" value={sponsers} onChange={setSponsers} />
            </div>
          </div>
          <div className="col-12 col-md-12 col-lg-12 mb-3">
            <div className="form-group skillssss">
              <label for="exampleInputPassword1">Partners</label>
              <TagsInput placeHolder="Enter all partners" value={partners} onChange={setPartners} />
            </div>
          </div>

          <div className="col-12 col-md-12 col-lg-12 mb-3">
            <div className="form-group">
              <label for="exampleInputPassword1">Others</label>
              <textarea
                type="text"
                className="form-control field py-4"
                id=""
                placeholder="Enter your description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          {/* here we aare adding payment div */}

          <div className="confirmBtn">
            <Button title={updateIncubation ? "Update Career Fare" : "Create Career Fare"} onClick={updateIncubation ? updateCarrerFares : submitCarrerFares} loading={loading} />
          </div>
        </div>
        <div
          className="coachingCutOptions"
          onClick={() => {
            setShowCareerFareForm(false);
            refreshAllInputField();
            setUpdateIncubation(false);
          }}>
          <IoIosCloseCircleOutline size={26} color="red" />
        </div>
      </div>
    </Modal>
  );
};

export default CreateCareerFareForm;
