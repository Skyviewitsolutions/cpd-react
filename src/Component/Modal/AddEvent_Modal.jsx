import { useState } from "react";
import "./AddEvent_Modal.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Btn from "../button/Btn";
import { MdAttachFile } from "react-icons/md";
import { endpoints } from "../../Component/services/endpoints";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Spinner from 'react-bootstrap/Spinner';
import { TagsInput } from "react-tag-input-component";

const AddEvent_Modal = (props) => {
  const [selected, setSelected] = useState(["papaya"]);
  const {
    onHide,
    topics,
    displayName,
    description,
    tags,
    addCommunity,
    imgFiles,
    setTopics,
    setDisplayName,
    setDescriptions,
    setTags,
    loading,
    setImgFiles,
  } = props;

  const handleImageInput = (e) => {
   
    var files = e.target.files[0];
    setImgFiles(files);
    console.log(e.target.files[0], "file");
  };

  return (
    <>
      <Modal
        className="mb-3  ps-3 pe-3"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="container">
          <Modal.Header className="modal_header" closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              { props.update?'Update Community':'Create Community' }
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form >
              <div className="row">
                <div className="col-12 col-md-12 col-lg-6">
                  <label for="exampleInputEmail1" class="form-label">
                    Create Topic
                  </label>
                  <input
                    type="text"
                    className="form-control modal_shadow"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={topics}
                    onChange={(e) => setTopics(e.target.value)}
                  />
                </div>
                <div className="col-12 col-md-12 col-lg-6">
                  <label for="exampleInputEmail1" class="form-label">
                    Display Name As
                  </label>
                  <input
                    type="text"
                    className="form-control modal_shadow"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-12 col-lg-12 mt-2">
                  <label for="exampleFormControlTextarea1">
                    Community Description
                  </label>
                  <textarea
                    className="form-control modal_shadow"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescriptions(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-12 col-md-12 col-lg-12 ">
                  <label for="exampleInputEmail1" class="form-label">
                    Tags
                  </label>
                  <TagsInput
                    value={tags}
                    onChange={setTags}
                    name="tags"
                    placeHolder="Enter Tags"
                  />
                  <h6 style={{ color: "red", fontSize: "12px", marginTop: 2 }}>
                    Note : Press enter to add multiple tags
                  </h6>
                  {/* <input
                    type="text"
                    className="form-control modal_shadow"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  /> */}
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-md-12 col-lg-12 text-center mt-2">
                  <Button className="upload_modal">
                    <input
                      type="file"
                      id="uploadFile"
                      onChange={(e) => handleImageInput(e)}
                      style={{ display: "none" }}
                    />
                    <label htmlFor="uploadFile">
                      <h6>
                        <MdAttachFile /> Attach File & Documents{" "}
                      </h6>
                    </label>
                  </Button>
                </div>
                <div
                  className="col-12 col-md-12 col-lg-12 text-center mt-4"
                  id="file_upload_text"
                >
                  <span>{imgFiles?.name}</span>
                  <h6 style={{ color: "red", fontSize: "13px" }}>
                    *File Format Should be The Pdf, PPt Xlss, TXT
                  </h6>
                </div>
                <div className="col-12 col-md-12 col-lg-12 text-center mt-4 modal_uploaded_file">
                
                </div>

               
              </div>
            </Form>
          </Modal.Body>
          <div className="footer_modal mb-4 ">
            <div>
              <button className="close_modal"
               onClick={onHide}
              >
                Cancel{" "}
              </button>
            </div>
            <div>
              <button onClick={addCommunity} className="submit_modal">
              {loading ?  <Spinner animation="border" variant="light" style={{width : "20px" , height : "20px"}}/> : "Submit" }
              </button>
            </div>
          </div>
        </div>
      </Modal>
      
{/* 
      <Modal
        className="mb-3 event_modal_outline"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="container">
          <Modal.Header className="modal_header" closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Create Community
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className="row">
                <div className="col-12 col-md-12 col-lg-6">
                  <label for="exampleInputEmail1" class="form-label">
                    Create Topic
                  </label>
                  <input
                    type="text"
                    className="form-control modal_shadow"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={topics}
                    onChange={(e) => setTopics(e.target.value)}
                  />
                </div>
                <div className="col-12 col-md-12 col-lg-6">
                  <label for="exampleInputEmail1" class="form-label">
                    Display Name As
                  </label>
                  <input
                    type="text"
                    className="form-control modal_shadow"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-12 col-lg-12 mt-2">
                  <label for="exampleFormControlTextarea1">
                    Community Description
                  </label>
                  <textarea
                    className="form-control modal_shadow"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescriptions(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-12 col-md-12 col-lg-7 ">
                  <label for="exampleInputEmail1" class="form-label">
                    Tags
                  </label>
                  <input
                    type="text"
                    className="form-control modal_shadow"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>

                <div className="col-lg-1"></div>
              </div>

            
              <div className="row">
                <div className="col-12 col-md-12 col-lg-12 text-center mt-2">
                  <Button className="upload_modal">
                    <input
                      type="file"
                      id="uploadFile"
                      onChange={(e) => handleImageInput(e)}
                      style={{ display: "none" }}
                    />
                    <label htmlFor="uploadFile">
                      <h6>
                        <MdAttachFile /> Attach File & Documents{" "}
                      </h6>
                    </label>
                  </Button>
                </div>
                <div
                  className="col-12 col-md-12 col-lg-12 text-center mt-4"
                  id="file_upload_text"
                >
                  <span>{imgFiles?.name}</span>
                  <h6 style={{ color: "red", fontSize: "13px" }}>
                    *File Format Should be The Pdf, PPt Xlss, TXT
                  </h6>
                </div>
                <div className="col-12 col-md-12 col-lg-12 text-center mt-4 modal_uploaded_file">
                
                </div>

               
              </div>
            </Form>
          </Modal.Body>
          <div className="footer_modal mb-4 ">
            <div>
              <button className="close_modal" onClick={onHide}>
                Cancel{" "}
              </button>
            </div>
            <div>
              <button onClick={addCommunity} className="submit_modal">
                Submit
              </button>
            </div>
          </div>
        </div>
      </Modal> */}
    </>
  );
};

export default AddEvent_Modal;
