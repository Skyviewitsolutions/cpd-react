import React from "react";
import "./forumScreen.css";
import Homepage_header from "../../Component/Header/Homepage_header";
import Footer from "../../Component/Footer/Footer";
import { BiMessageRounded } from "react-icons/bi";
import forumimg from "../../assets/Images/forumimg.png";
import forumimg2 from "../../assets/Images/forumimg2.png";
import { FiCornerUpLeft } from "react-icons/fi";
import dommyuserperson from "../../assets/Images/dommyuserperson.jfif";
import { HiSearch } from "react-icons/hi";
import WorkshsopSidenav from "../Workshop/WorkshsopSidenav";


const ForumScreen = () => {
  return (
    <>
      <Homepage_header />
      <div className="forum-wrapper">
        <div className="row">
          <div className="col-lg-3">
            {/* <WorkshsopSidenav/> */}
          </div>
          <div className="col-lg-9 col-md-12 col-12">
            <section>
              <div className="row">
                <div className="col-lg-2 col-md-2 col-12">
                  <h5 id="forumHeading">Forum</h5>
                </div>
                <div className="col-lg-10 col-md-10 col-12">
                  <div className="networkingsearchBox">
                    <div className="form-group">
                      <HiSearch id="networking_search" />
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Search Here"
                        Style={{color: "#2c6959" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="forumcardsection">
             <div classname="forum_card">
             <div className="row">
                <div className="col-lg-2 col-md-2 col-12">
                  <div className="Forumprofile">
                    <img src={dommyuserperson} alt="" />
                  </div>
                </div>
                <div className="col-lg-7 col-md-7 col-12">
                  <div className="col-lg-12 col-md-12 col-12">
                    <h5>The 12 Month Member Program</h5>
                  </div>
                  <div className="col-lg-12 col-md-12 col-12 forum">
                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-12 forum_descriptiontext">
                        {" "}
                        <h6>
                          <FiCornerUpLeft />
                          Latest from reply
                        </h6>
                      </div>
                      <div className="col-lg-4 col-md-5 col-12 forum_descriptionid">
                        {" "}
                        <h6>@harrysimtharrysimt</h6>{" "}
                      </div>
                      <div className="col-lg-3 col-md-3 col-12 forum_descriptiontime">
                        <h6>5 minutes ago</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-12">
                    <p>
                      {" "}
                      Hey Everyone,new member alert here! thought i did write a
                      bit about myself and why i am here. First of my name is
                      harry and i am 31 yeasr old MBA Student at ...
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-12">
                  <div className="ForumcommentImage">
                    <div className="forumImgaeList">
                      <ul>
                        <li>
                          <img src={forumimg} alt="" />
                        </li>
                        <li>
                          <img src={forumimg2} alt="" />
                        </li>
                        <li>
                          <img src={dommyuserperson} alt="" />
                        </li>
                        <li>
                          <img src={forumimg} alt="" />
                        </li>
                      </ul>
                    </div>
                    <div className="ForumCommentbox">
                      <h6>
                        <BiMessageRounded /> 25 Comment
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              
             </div>
             <hr/>
              
              
             <div classname="forum_card">
             <div className="row">
                <div className="col-lg-2 col-md-2 col-12">
                  <div className="Forumprofile">
                    <img src={dommyuserperson} alt="" />
                  </div>
                </div>
                <div className="col-lg-7 col-md-7 col-12">
                  <div className="col-lg-12 col-md-12 col-12">
                    <h5>The 12 Month Member Program</h5>
                  </div>
                  <div className="col-lg-12 col-md-12 col-12 forum">
                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-12 forum_descriptiontext">
                        {" "}
                        <h6>
                          <FiCornerUpLeft />
                          Latest from reply
                        </h6>
                      </div>
                      <div className="col-lg-4 col-md-5 col-12 forum_descriptionid">
                        {" "}
                        <h6>@harrysimtharrysimt</h6>{" "}
                      </div>
                      <div className="col-lg-3 col-md-3 col-12 forum_descriptiontime">
                        <h6>5 minutes ago</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-12">
                    <p>
                      {" "}
                      Hey Everyone,new member alert here! thought i did write a
                      bit about myself and why i am here. First of my name is
                      harry and i am 31 yeasr old MBA Student at ...
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-12">
                  <div className="ForumcommentImage">
                    <div className="forumImgaeList">
                      <ul>
                        <li>
                          <img src={forumimg} alt="" />
                        </li>
                        <li>
                          <img src={forumimg2} alt="" />
                        </li>
                        <li>
                          <img src={dommyuserperson} alt="" />
                        </li>
                        <li>
                          <img src={forumimg} alt="" />
                        </li>
                      </ul>
                    </div>
                    <div className="ForumCommentbox">
                      <h6>
                        <BiMessageRounded /> 25 Comment
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              
             </div>
              <hr/>
              
              <div classname="forum_card">
             <div className="row">
                <div className="col-lg-2 col-md-2 col-12">
                  <div className="Forumprofile">
                    <img src={dommyuserperson} alt="" />
                  </div>
                </div>
                <div className="col-lg-7 col-md-7 col-12">
                  <div className="col-lg-12 col-md-12 col-12">
                    <h5>The 12 Month Member Program</h5>
                  </div>
                  <div className="col-lg-12 col-md-12 col-12 forum">
                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-12 forum_descriptiontext">
                        {" "}
                        <h6>
                          <FiCornerUpLeft />
                          Latest from reply
                        </h6>
                      </div>
                      <div className="col-lg-4 col-md-5 col-12 forum_descriptionid">
                        {" "}
                        <h6>@harrysimtharrysimt</h6>{" "}
                      </div>
                      <div className="col-lg-3 col-md-3 col-12 forum_descriptiontime">
                        <h6>5 minutes ago</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-12">
                    <p>
                      {" "}
                      Hey Everyone,new member alert here! thought i did write a
                      bit about myself and why i am here. First of my name is
                      harry and i am 31 yeasr old MBA Student at ...
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-12">
                  <div className="ForumcommentImage">
                    <div className="forumImgaeList">
                      <ul>
                        <li>
                          <img src={forumimg} alt="" />
                        </li>
                        <li>
                          <img src={forumimg2} alt="" />
                        </li>
                        <li>
                          <img src={dommyuserperson} alt="" />
                        </li>
                        <li>
                          <img src={forumimg} alt="" />
                        </li>
                      </ul>
                    </div>
                    <div className="ForumCommentbox">
                      <h6>
                        <BiMessageRounded /> 25 Comment
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              
             </div>
              <hr/>
             
              <div classname="forum_card">
             <div className="row">
                <div className="col-lg-2 col-md-2 col-12">
                  <div className="Forumprofile">
                    <img src={dommyuserperson} alt="" />
                  </div>
                </div>
                <div className="col-lg-7 col-md-7 col-12">
                  <div className="col-lg-12 col-md-12 col-12">
                    <h5>The 12 Month Member Program</h5>
                  </div>
                  <div className="col-lg-12 col-md-12 col-12 forum">
                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-12 forum_descriptiontext">
                        {" "}
                        <h6>
                          <FiCornerUpLeft />
                          Latest from reply
                        </h6>
                      </div>
                      <div className="col-lg-4 col-md-5 col-12 forum_descriptionid">
                        {" "}
                        <h6>@harrysimtharrysimt</h6>{" "}
                      </div>
                      <div className="col-lg-3 col-md-3 col-12 forum_descriptiontime">
                        <h6>5 minutes ago</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-12">
                    <p>
                      {" "}
                      Hey Everyone,new member alert here! thought i did write a
                      bit about myself and why i am here. First of my name is
                      harry and i am 31 yeasr old MBA Student at ...
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-12">
                  <div className="ForumcommentImage">
                    <div className="forumImgaeList">
                      <ul>
                        <li>
                          <img src={forumimg} alt="" />
                        </li>
                        <li>
                          <img src={forumimg2} alt="" />
                        </li>
                        <li>
                          <img src={dommyuserperson} alt="" />
                        </li>
                        <li>
                          <img src={forumimg} alt="" />
                        </li>
                      </ul>
                    </div>
                    <div className="ForumCommentbox">
                      <h6>
                        <BiMessageRounded /> 25 Comment
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              
             </div>
              <hr/>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForumScreen;
