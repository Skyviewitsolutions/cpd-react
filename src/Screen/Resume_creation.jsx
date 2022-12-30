import React from "react";
import "./Resume_creation.css";
import Form from "react-bootstrap/Form";
import Header from "../Component/Header/Header";
import Btn from '../Component/button/Btn';

const Resume_creation = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-lg-1 col-md-1"></div>
          <div className="col-lg-10 col-md-10 col-12 flex-center">
            <div className="row">
              <div
                className="col-lg-12 col-md-12 col-12 text-center mt-3"
              >
                <h3 id="create_resume">           
                  Please fill some details to create your resume
                </h3>
              </div>
            </div>
            <Form className="form_outline">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-12">
                  <div className="row">
                    <div className="col-lg-4 col-md-12 col-12 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">First Name</label>
                        <input
                          type="text"
                          class="form-control "
                          id="exampleInputPassword1"
                          placeholder="Enter here"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-12 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Last Name</label>
                        <input
                          type="text"
                          class="form-control "
                          id="exampleInputPassword1"
                          placeholder="Enter here"
                        />
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-12 col-12 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Contact</label>
                        <input
                          type="number"
                          class="form-control "
                          id="exampleInputPassword1"
                          placeholder="Enter here"
                        />
                      </div>
                    </div>
                  </div>
                  <h5 className="heading_second">Education Details</h5>
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-12 mt-2">
                      <label for="exampleInputPassword1">Password</label>
                      <input
                        type="password"
                        class="form-control "
                        id="exampleInputPassword1"
                        placeholder="Password"
                      />
                    </div>

                    <div className="col-lg-3 col-md-12 col-12 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Start year*</label>
                        <select
                          class="form-select  "
                          aria-label="Default select example"
                        >
                          <option selected>1998</option>
                          <option value="1">1999</option>
                          <option value="2">2000</option>
                          <option value="3">2001</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-3 col-md-12 col-12 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">End year*</label>
                        <select
                          class="form-select  "
                          aria-label="Default select example"
                        >
                          <option selected>1998</option>
                          <option value="1">1999</option>
                          <option value="2">2000</option>
                          <option value="3">2001</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4 col-md-12 col-12 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Program</label>
                        <input
                          type="text"
                          class="form-control "
                          id="exampleInputPassword1"
                          placeholder="Enter here"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-12 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Field Study</label>
                        <input
                          type="text"
                          class="form-control "
                          id="exampleInputPassword1"
                          placeholder="Enter here"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-12 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Description</label>
                        <textarea
                          type="text"
                          class="form-control "
                          id="exampleInputPassword1"
                          placeholder="Enter here"
                        />
                      </div>
                    </div>
                  </div>
                  <h5 className="heading_second">Add Details</h5>

                  <div className="row">
                    <div className="col-lg-5 col-md-12 col-12 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Domain</label>
                        <select
                          class="form-select  "
                          aria-label="Default select example"
                          placeholder="Technology"
                        >
                          <option selected>Technology</option>
                          <option value="1">Technology</option>
                          <option value="2">Technology</option>
                          <option value="3">Technology</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-5 col-md-12 col-12 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Industry</label>
                        <select
                          class="form-select  "
                          aria-label="Default select example"
                          placeholder="IT Sector"
                        >
                          <option selected>IT Sector</option>
                          <option value="1">IT Sector</option>
                          <option value="2">IT Sector</option>
                          <option value="3">IT Sector</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-12 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Skills</label>
                        <div>
                          <div className="show_search">
                            <tag>skills</tag>

                            <tag>skills</tag>
                          </div>
                          <input
                            type="search skills here"
                            class="form-control "
                            id="exampleInputPassword1"
                            placeholder="search"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-12 mt-2">
                    <div class="form-group">
                      <label for="exampleInputPassword1">Description</label>
                      <textarea
                        type="text"
                        class="form-control"
                        id="exampleInputPassword1"
                        placeholder="Enter here"
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12 col-12 mt-4 ">
                  <buttton type="submit" className="btn  submit_resumeCreation"> submit and preview resume</buttton>

                  </div>



                  <div className="col-lg-2"></div>
                </div>
              </div>
            </Form>
          </div>
          <div className="col-lg-1 col-md-1"></div>
        </div>
      </div>
    </>
  );
};

export default Resume_creation;
