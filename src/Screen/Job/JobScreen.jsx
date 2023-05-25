import React from "react";
import "./JobScreen.css";
import Homepage_header from "../../Component/Header/Homepage_header";
import Footer from "../../Component/Footer/Footer";
import { TagsInput } from "react-tag-input-component";



const JobScreen = () => {

  return (
    <>
      <Homepage_header />

      <div className="row">
        <div className="col-lg-12 col-md-12 col-12">
          <div className="jobHeader">
            <h5>For Employee</h5>
          </div>
        </div>
      </div>

      <div className="container">
        <h3 id="create_resume">Please Fill Some Detail</h3>
        <div className="formoutline_studentcv">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12">
              <h5 classname="personal_details_heading">Job Details</h5>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12">
              <div className="form-group">
                <label for="exampleInputPassword1">Job Title*</label>
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
                >
                  <option>select</option>
                  <option value="Rahul dubey">Rahul dubey</option>
                  <option value="William">William</option>
                  <option value="Rahul dubey">Rahul dubey</option>
                  <option value="William">William</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="form-group">
                <label for="exampleInputPassword1">Employement Type</label>
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
                >
                  <option>select</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="form-group">
                <label for="exampleInputPassword1">Select Company</label>
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
                >
                  <option>select</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="form-group">
                <label for="exampleInputPassword1">Country </label>
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
                >
                  <option>select</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="form-group">
                <label for="exampleInputPassword1">Postal Code</label>{" "}
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
                >
                  <option>select</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="form-group">
                <label for="exampleInputPassword1">Location</label>
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
                >
                  <option>select</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="form-group">
                <label for="exampleInputPassword1">Type </label>
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
                >
                  <option>select</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="form-group">
                <label for="exampleInputPassword1">Experience</label>
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
                >
                  <option>select</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12">
              <div className="personal_details_jobheading">
                <h5>Industry</h5>
              </div>

              <hr />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-6 col-12">
              <div className="form-group">
                <label for="exampleInputPassword1">Job Function</label>
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
                >
                  <option>select</option>
                </select>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-12">
              <div className="form-group">
                <label for="exampleInputPassword1">Industry</label>
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
                >
                  <option>select</option>
                </select>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-12">
              <div className="form-group">
                <label for="exampleInputPassword1">Job Function</label>
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
                >
                  <option>select</option>
                </select>
              </div>
            </div>
            <div classname="col-12 col-md-6 col-lg-12  ">
              <div class="form-group ">
                <label for="exampleInputPassword1">Skills</label>
                <TagsInput
                  type="text"
                  class="form-control hobbies_tags"
                  placeHolder="Enter here"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12">
              <div className="personal_details_jobheading">
                <h5>Compensation</h5>
              </div>
              <hr />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-6 col-12">
              <div className="form-group">
                <label for="exampleInputPassword1">Salary</label>
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
                >
                  <option>select</option>
                </select>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-12">
              <div className="form-group">
                <label for="exampleInputPassword1">Referal Bonus</label>
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
                >
                  <option>select</option>
                </select>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-12">
              <div className="form-group">
                <label for="exampleInputPassword1">Bonus</label>
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
                >
                  <option>select</option>
                </select>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button className="jobSumbit">Submit</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JobScreen;
