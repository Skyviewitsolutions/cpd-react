// here we are writing code for workshop editing part ;
import React, { useState, useEffect } from "react";
import Footer from "../../Component/Footer/Footer";
import Homepage_header from "../../Component/Header/Homepage_header";
import "./workshopEdit.css";
import profileimg from "../../assets/Images/profileimg.png";
import workshopPre from "../../assets/Images/workshopPre.jfif";
import { GiRoundStar } from "react-icons/gi";
import { useParams } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../../Component/services/endpoints";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../Layouts/MainLayout";
import { getDomainList, getIndustryList } from "../../utils/api";
import { data } from "jquery";

const WorkshopEdit = () => {
  const navigate = useNavigate();
  const { workshopId } = useParams();
  const token = localStorage.getItem("token");
  const [workshopDtails, setWorkshopDtails] = useState({});
  const [imgPath, setImgPath] = useState("");
  const [workshopImg, setWorkshopImg] = useState([]);
  const [workhshopImgFiles , setWorkshopImgFiles] = useState("")

  // create variables for holding value ;
  const [title, setTitle] = useState("");
  const [maxMembers, setMaxMembers] = useState("");
  const [duration, setDuration] = useState("");
  const [allDomain, setAllDomain] = useState([]);
  const [allIndustry, setAllIndustry] = useState([]);
  const [industry, setIndustry] = useState("");
  const [domain, setDomain] = useState("");
  const [industryId, setIndustryId] = useState("");
  const [domainId, setDomainId] = useState("");
  const [showDomainInputBox, setShowDomainInputBox] = useState(false);
  const [showIndustryInputBox, setShowIndustryBox] = useState(false);
  const [domainManualInput, setDomainManualInput] = useState("");
  const [industryManualInput, setIndustryManualInput] = useState("");

   // creating useState for slotsCreations ;

   const [selectedDays, setSelectedDays] = useState([]);
   const [daysFormat, setDaysFormat] = useState("weekly");
   const [isRepeated, setIsRepeated] = useState(false);
   const [dateSlot, setDateSlot] = useState([]);
   const [daysSlot, setDaysSlot] = useState([]);
   const [selectedDates, setSelectedDates] = useState([]);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const getWorkshopDetailsById = () => {
    const url = `${endpoints.workshop.getWorkshopDetailsById}${workshopId}`;
    axios
      .get(url, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          const val = res.data.data?.[0];
          setWorkshopDtails(val);

          var industry = val?.industry?.title;
          setIndustry(industry);
          var domain = val?.domain?.title;
          setDomain(domain);
          setTitle(val?.title);
          setMaxMembers(val?.max_members);

          var path = res.data?.workshop_image_path;
          setImgPath(path);

          var imageUrl = path + "/" + val.image;

          const fileName = "workshop.jpg";

          fetch(imageUrl).then(async (response) => {
            const contentType = response.headers.get("content-type");
            const blob = await response.blob();
            const file = new File([blob], fileName, { contentType });
            setWorkshopImgFiles(file);
            setWorkshopImg(URL.createObjectURL(file));
          });

          var slots = JSON.parse(val?.availability_slot);
          
          setSelectedDays(slots?.selectedDays || []);
          setSelectedDates(slots?.selectedDates || []);
          setDaysSlot(slots?.daysSlot);
          setDateSlot(slots?.dateSlot);
          setDuration(slots?.duration);
          setDaysFormat(slots?.daysFormat);
        }
      })
      .catch((err) => {
        console.log(err, "error here");
      });
  };

  useEffect(() => {
    getWorkshopDetailsById();
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

  const handleWorkshopImg = (e) => {
    const files = e.target.files[0];
    setWorkshopImg(URL.createObjectURL(files));
    setWorkshopImgFiles(files)
  };

  return (
    <MainLayout>
      <section className="workshopDetailsSection1 position-relative">
        <div className="container-fluid">
          <div className="breadCrum">
            <h4 onClick={() => navigate("/")}>Home</h4> <span>></span>{" "}
            <h4 onClick={() => navigate(-1)}>Workshops</h4> <span>></span>
            <h4 style={{ borderBottom: "2px solid white" }}>Edit</h4>
          </div>
          <div className="workshopDetailsfirst">
            <div className="evDtlTitle">
              <h5>Learn</h5>
              <span>:</span>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control  domInput"
                  max={20}
                  id=""
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="evntDtlsBox ">
              <h5>Max Members</h5>
              <span>:</span>
              <div class="form-group">
                <input
                  type="num"
                  class="form-control  domInput"
                  max={20}
                  min={0}
                  id=""
                  placeholder="Enter max members"
                  value={maxMembers}
                  onChange={(e) => setMaxMembers(e.target.value)}
                />
              </div>
            </div>
            <div className="evntDtlsBox ">
              <h5>Duration </h5>
              <span>:</span>
              <div class="form-group">
                <input
                  type="num"
                  class="form-control  domInput"
                  max={20}
                  min={0}
                  id=""
                  placeholder="Enter duration (in hours)"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
            </div>
            <div className="evntDtlsBox ">
              <h5>Domain</h5>
              <span>:</span>
              {/* <h6>{domain}</h6> */}
              <select
                className="domainSlt"
                aria-label="Default select example"
                value={domain}
                required
                onChange={(e) => handleDomainSelection(e.target.value)}
              >
                <option value="">Choose</option>
                {allDomain.map((domain, ind) => {
                  return (
                    <>
                      <option value={domain.title} key={ind}>
                        {domain.title}
                      </option>
                    </>
                  );
                })}
                <option value="Others">Others</option>
              </select>
              {showDomainInputBox && (
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control  domInput"
                    max={20}
                    id=""
                    placeholder="Enter manual domain"
                    value={domainManualInput}
                    onChange={(e) => setDomainManualInput(e.target.value)}
                  />
                </div>
              )}
            </div>
            <div className="evntDtlsBox ">
              <h5>Industry</h5>
              <span>:</span>
              <select
                className="domainSlt"
                aria-label="Default select example"
                value={industry}
                required
                onChange={(e) => handleIndustrySelection(e.target.value)}
              >
                <option value="">Choose</option>
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
              {showIndustryInputBox && (
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control domInput"
                    max={20}
                    id=""
                    placeholder="Enter manual industry"
                    value={industryManualInput}
                    onChange={(e) => setIndustryManualInput(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="workshopDetailsSection2">
        <div className="row">
          <div className="col-lg-8">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-12">
                <div className="workshopDetailsBox1">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                      <h4>What you'll Learn</h4>
                    </div>
                    <div className="col-lg-12 col-md-12 col-12">
                      <ul>
                        <li>
                          {" "}
                          <p>Create their own Python Program</p>
                        </li>
                        <li>
                          <p>Create their own Python Program</p>
                        </li>
                        <li>
                          {" "}
                          <p>Create their own Python Program</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12 col-md-12 col-12">
                    <h5 style={{ marginTop: "20px" }}>Description</h5>
                    <p style={{ lineHeight: "25px", marginBottom: "50px" }}>
                      Do you want to become a programmer? Do you want to learn
                      how to create games, automate your browser, visualize
                      data, and much more? Python has rapidly become one of the
                      most popular programming languages around the world.
                      Compared to other languages such as Java or C++, Python
                      consistently outranks and outperforms these languages in
                      demand from businesses and job availability. The average
                      Python developer makes over $100,000 - this number is only
                      going to grow in the coming years.
                    </p>
                  </div>
                </div>
              </div>
             
                
            </div>
          </div>
          <div className="col-lg-4">
            <div className="workshopReveiw">
              <div className="workshopMedia">
                <div className="workshopMediaImg">
                  <label htmlFor="workshopImg">
                    <img src={workshopImg} alt="img" />
                  </label>
                  <input
                    type="file"
                    id="workshopImg"
                    onChange={handleWorkshopImg}
                    style={{ visibility: "hidden" }}
                  />
                </div>
              </div>
              <div className="workshopReveiwBody">
                <h2>This course include</h2>
                <ul>
                  <li>14 hours on-demand video </li>
                  <li>1 article</li>
                  <li>3 downloadable resources</li>
                  <li>Full lifetime access</li>
                  <li>Access on mobile and TV</li>
                  <li>Certificate of completion</li>
                </ul>
                <div className="link">
                  <ul>
                    <li> </li>
                    <li> </li>
                    <li> </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default WorkshopEdit;
