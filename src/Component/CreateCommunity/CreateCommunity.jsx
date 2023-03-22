import React, { useState, useEffect , useRef } from "react";
import Footer from "../Footer/Footer";
import Homepage_header from "../Header/Homepage_header";
import "./CreateCommunity.css";
import { TagsInput } from "react-tag-input-component";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { endpoints } from "../services/endpoints";
import { warning } from "@remix-run/router";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import $ from "jquery";
import Button from "../button/Button/Button";
import showToast from "../CustomToast/CustomToast";


const CreateCommunity = () => {

  const navigate = useNavigate("");
  const location = useLocation("");

  // Add community Data
  const [allCommunityType, setAllCommunityType] = useState([
    { val: "1", name: "Domain" },
    { val: "2", name: "Industry" },
    { val: "3", name: "Socail Club" },
    { val: "4", name: "Projects"},
    { val: "5", name: "Other Types"}
  ]);

  // here we are getting the reference for the input field ;
  const communityNameRef = useRef();
  const joinCriteriaRef = useRef();
  const descriptionRef = useRef();
  const tagsRef = useRef();

  const [domainData, setDomainData] = useState([]);
  const [industryData, setIndusryData] = useState([]);
  const [communityName, setCommunityName] = useState("");
  const [criteriaToJoin, setCriteriaToJoin] = useState("");
  const [description, setDiscription] = useState("");
  const [subType, setSubType] = useState("");
  const [visibility, setVisibility] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageName, setImageName] = useState("");
  const [imgFiles, setImgFiles] = useState(null);
  const [communityTypeId, setCommunityTypeId] = useState("");
  const [update, setUpdate] = useState(false);
  const [communityType, setCommunityType] = useState("");
  const [selectedCommunityId , setSelectedCommunityId] = useState("");


  const token = localStorage.getItem("token");

  // getting data for updating the community
  const selectedCommunityData = location.state;

  const updateWithSelectedCommunity = () => {

    setCommunityName(selectedCommunityData.display_name);
    setCriteriaToJoin(selectedCommunityData.criteria);
    setDiscription(selectedCommunityData.description);
    setSubType(selectedCommunityData.sub_type);
    setTags(selectedCommunityData.tag);
    setVisibility(selectedCommunityData.visibility);
    setSelectedCommunityId(selectedCommunityData._id)

    $(".subType").removeClass("d-none");

    var communityTypeName = allCommunityType.filter((itm, ind) => {
      return itm.name == selectedCommunityData.community_type;
    });

    communityTypeName = communityTypeName[0];
    setCommunityType(communityTypeName.name);
    setCommunityTypeId(selectedCommunityData.community_type);

    // handling img upload ;

    var imgUrl = selectedCommunityData.imagePath + selectedCommunityData.image;

    const fileName = "myFile.jpg";

    fetch(imgUrl).then(async (response) => {
      const contentType = response.headers.get("content-type");
      const blob = await response.blob();
      const file = new File([blob], fileName, { contentType });
      setImgFiles(file);
      setImageName(file.name);
    });

    setUpdate(true);
  };

  useEffect(() => {
    if (selectedCommunityData) {
      updateWithSelectedCommunity();
    }
  }, []);

  // Add Community Api
  const addCommunityUrl = endpoints.community.addCommunity;
  const updateCommunityUrl = endpoints.community.updateCommunity;


  const submitCommunity = () => {

    if (communityName === "") {
      showToast("Please Enter Community Name",  "warning" );
      communityNameRef.current.focus();
    } else if (criteriaToJoin === "") {
      showToast("Please Write Your Creiteria",  "warning" );
      joinCriteriaRef.current.focus();
    } else if (description === "") {
      showToast("Please Write Your Discription",  "warning" );
      descriptionRef.current.focus();
    } else if (imgFiles === "") {
      showToast("Please upload Your Image",  "warning" );
    } else if (visibility === "") {
      showToast("Please Choose Your Visibility ",  "warning" );
    } else if (communityType === "") {
      showToast("Please Choose Your Community Type ",  "warning" );
    } else if (subType === "") {
      showToast("Please Enter Your Sub Type ",  "warning" );
    } else if (tags === "") {
      showToast("Please Enter Your Tags",  "warning" );
      tagsRef.current.focus();
    } else {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("display_name", communityName);
      formData.append("criteria", criteriaToJoin);
      formData.append("description", description);
      formData.append("image", imgFiles);
      formData.append("visibility", visibility);
      formData.append("community_type", communityType);
      formData.append("sub_type", subType);
      formData.append("tag", tags);
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      axios
        .post(addCommunityUrl, formData, { headers: headers })
        .then((res) => {
          if (res.data.result === true) {
            setLoading(false);
            showToast("community created successfully",  "success" );
           
            setTimeout(() => {
              navigate("/myCommunity");
            }, 1000);
            
           
          } else if (!res.data.result) {
            setLoading(false);
            showToast(res.data?.message,  "warning" );
          }
        })
        .catch((err) => {
          console.log(err, "this is the error");
          setLoading(false);
        });
    }
  };

  // writing function for updating the community;

  const updateCommunity = () => {

    const url = `${updateCommunityUrl}${selectedCommunityId}`

    if (communityName === "") {
      showToast("Please Enter Community Name", "warning" );
    } else if (criteriaToJoin === "") {
      showToast("Please Write Your Creiteria", "warning" );
    } else if (description === "") {
      showToast("Please Write Your Discription", "warning" );
    } else if (imgFiles === "") {
      showToast("Please upload Your Image", "warning" );
    } else if (visibility === "") {
      showToast("Please Choose Your Visibility ", "warning" );
    } else if (communityType === "") {
      showToast("Please Choose Your Community Type ", "warning" );
    } else if (subType === "") {
      showToast("Please Enter Your Sub Type ", "warning" );
    } else if (tags === "") {
      showToast("Please Enter Your Tags", "warning" );
    } else {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("display_name", communityName);
      formData.append("criteria", criteriaToJoin);
      formData.append("description", description);
      formData.append("image", imgFiles);
      formData.append("visibility", visibility);
      formData.append("community_type", communityType);
      formData.append("sub_type", subType);
      formData.append("tag", tags);
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      setLoading(true)

      axios
        .post(url, formData, { headers: headers })
        .then((res) => {
          setLoading(false)
          console.log(res , "updated response")
          if (res.data.result === true) {
            setLoading(false);
            showToast("community updated successfully",  "success" );
            navigate("/myCommunity");
          } else if (!res.data.result) {
            setLoading(false);
            showToast(res.data?.message,  "warning" );
          }
        })
        .catch((err) => {
          console.log(err, "this is the error");
          setLoading(false);
        });
    }
  };

  const handleImageInput = (e) => {
    var files = e.target.files[0];
    setImgFiles(files);
    console.log(e.target.files[0], "file");
  };

  // domain Api

  const domainApiUrl = "https://admin.cpdedu.com/api/v1/list-domain";

  const getDomainData = () => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    axios
      .get(domainApiUrl, { headers: headers })
      .then((res) => {
        if (res.data.result === true) {
          const val = res.data.data;
          // console.log(val,"All DOmain Data here...")
          setDomainData(val);
        } else if (res.data.result === false) {
          showToast(res.data.message,  "errror" );
        }
      })
      .catch((err) => {
        console.log(err, "Community domain error");
      });
  };

  // list industry api

  const indusryApiUrl = "https://admin.cpdedu.com/api/v1/list-industry";
  const getIndusryData = () => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    axios
      .get(indusryApiUrl, { headers: headers })
      .then((res) => {
        if (res.data.result === true) {
          const val = res.data.data;
          setIndusryData(val);
        } else if (res.data.result === false) {
          showToast(res.data.message,  "errror" );
        }
      })
      .catch((err) => {
        console.log(err, "Community industry error");
      });
  };

  useEffect(() => {
    getDomainData();
    getIndusryData();
  }, []);

  useEffect(() => {
    $(".comType").change(function () {
      var val = $(this).val();
      if (val == undefined || val == "") {
        // $("#subTypeField").val('');
        $(".subType").addClass("d-none");
      } else {
        $(".subType").removeClass("d-none");
      }
      $("#subTypeField").val("");
    });
  }, []);

  // handling select community type ;

  const handleCommunityType = (e) => {
    const name = e.target.value;
    var communityTypeId = allCommunityType.filter((itm, ind) => {
      return itm.name == name;
    });
    communityTypeId = communityTypeId[0].val;
    setCommunityTypeId(communityTypeId);
    setCommunityType(name);
  };

  return (
    <>
      <Homepage_header />
      <div className="CreateCommunityScreen">
        <section>
          <div className="container">
            <div className="CommunityDetails">
              <div className="row">
                <div className="communityForm">
                  <h3 className="communityHeading">Create Community</h3>
                  <div className="row mt-3">
                    <div className="col-md-12 mb-4">
                      <div className="communityInput">
                        <label className="form-label" for="">
                          Name of community
                        </label>
                        <input
                          type="text"
                          className=""
                          ref={communityNameRef}
                          value={communityName}
                          placeholder="Enter community name"
                          onChange={(e) => setCommunityName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mb-4 d-flex align-items-center">
                      <div className="communityInput w-full" style={{width : "100%"}}>
                        <label for="" className="form-label">
                          Criteria to join
                        </label>
                        <textarea
                          className=""
                          rows="4"
                          cols="50"
                          value={criteriaToJoin}
                          placeholder="Enter criteria to join"
                          ref={joinCriteriaRef}
                          onChange={(e) => setCriteriaToJoin(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 mb-4 d-flex align-items-center">
                      <div className="communityInput w-full" style={{width : "100%"}}>
                        <label for="" className="form-label">
                          Description
                        </label>
                        <textarea
                          className=""
                          rows="4"
                          cols="50"
                          placeholder="Enter description of community"
                          ref={descriptionRef}
                          value={description}
                          onChange={(e) => setDiscription(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="communityInput">
                        <label className="form-label" for="emailAddress">
                          Image Upload
                        </label>
                        <input
                          class=""
                          id="takeImg"
                          type="file"
                          accept="image/png, image/gif, image/jpeg"
                          onChange={(e) => handleImageInput(e)}
                          style={{ display: imgFiles ? "none" : "flex" }}
                        />
                        {imgFiles && (
                          <label
                            class="form-control form-control-lg  cmntyForm"
                            htmlFor="takeImg"
                          >
                            {imgFiles.name}
                          </label>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline visibility communityInput">
                        <label className="form-label" for="phoneNumber">
                          Visibility
                        </label>
                        <div className="typeChecked d-flex">
                          <div class="form-check">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="communityMode"
                              id="Public"
                              checked={visibility === "public"}
                              value=""
                              onChange={(e) => setVisibility("public")}
                            />
                           
                            <label
                              className="form-check-label"
                              for="Public"
                            > Public</label>
                          </div>
                          <div className="form-check private">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="communityMode"
                              checked={visibility === "private"}
                              id="Pivate"
                              value=""
                              onChange={(e) => setVisibility("private")}
                            />
                          
                            <label
                              className="form-check-label"
                              for="Private"
                            >  Private</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="communityInput">
                        <label className="form-label" for="">
                          Community Type
                        </label>
                        <select
                          class=""
                          aria-label="Default select example"
                          value={communityType}
                          onChange={(e) => handleCommunityType(e)}
                        >
                          <option value="" selected>
                            Select Community Type
                          </option>
                          {allCommunityType.map((itm, ind) => {
                            return (
                              <>
                                <option value={itm.name} key={ind}>
                                  {itm.name}
                                </option>
                              </>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="communityInput">
                        <div style={{width : "100%"}}>
                        <label className="form-label" for="">
                          Sub Type
                        </label>
                        <input
                          id="subTypeField"
                          className=""
                          value={subType}
                          style={{width : "100%"}}
                          onChange={(e) => setSubType(e.target.value)}
                        />
                      </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mb-4 d-flex align-items-center">
                      <div className="form-outline communityTags w-100">
                        <label for="" className="form-label">
                          Tag
                        </label>
                       
                        <TagsInput
                          value={tags}
                          onChange={setTags}
                          name="tags"
                          ref={tagsRef}
                          placeHolder="Enter Tags"
                        />
                        <h6
                          style={{
                            color: "red",
                            fontSize: "12px",
                            marginTop: 2,
                          }}
                        >
                          Note : Press enter to add multiple tags
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div class="mb-2">
                    
                    <Button onClick={update ? updateCommunity : submitCommunity} loading={loading} title={ update ? "Update" :  "Submit" }/>
                    <Spinner />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default CreateCommunity;
