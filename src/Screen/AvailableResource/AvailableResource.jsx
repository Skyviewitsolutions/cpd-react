import React from "react";
import "./availableResource.css";
import Footer from "../../Component/Footer/Footer";
import Homepage_header from "../../Component/Header/Homepage_header";
import { HiSearch } from "react-icons/hi";
import availRespdf from "../../assets/Icons/availRespdf.png";
import "../../fonts/Inter-Medium.ttf";
import { GoKebabVertical } from "react-icons/go";
import { TbStar } from "react-icons/tb";
import user_profile from "../../assets/Images/user_profile.svg";

const AvailableResource = () => {
  return (
    <>
      <Homepage_header />
      <div className="availResourceWrapper">
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-9 col-md-12 col-12">
            <section className="avialResourcefirstSec">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-12">
                  <h3>Available Resources</h3>
                </div>
                <div className="col-lg-7 col-md-7 col-12">
                  <div className="searchBox">
                    <div className="form-group">
                      <HiSearch id="availResource_search" />
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Search "
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-2 col-12">
                  <button type="submit" className="availResourceForumButton">
                    {" "}
                    Forum{" "}
                  </button>
                </div>
              </div>
            </section>
            <section className="avialResourcefirstSec2">
              <div className="row">
                <div className="col-lg-3 col-md-4 col-12">
                  <div className="availResourcePdfCard">
                    <div className="availResourcepdfbox">
                      <TbStar id="availResourcestar" />
                      <GoKebabVertical id="availResouceKebab" />
                      <img src={availRespdf} alt="" />
                      <h6>License Agreement on MBA.pdf</h6>
                    </div>
                    <div className="availResourcepdfdes">
                      <div className="row">
                        <div className="col-lg-3 col-md-3 col-2">
                          <div className="availResourceimg">
                            <img src={user_profile} alt="" />
                          </div>
                        </div>
                        <div className="col-lg-9 col-md-9 col-10">
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-12">
                              <h6>JamesWhatt</h6>
                            </div>
                            <div className="col-lg-12 col-md-12 col-12">
                              <div className="availResdesRight">
                                <h5>File Size: </h5>
                                <h4>2.31 MB</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-12">
                  <div className="availResourcePdfCard">
                    <div className="availResourcepdfbox">
                      <TbStar id="availResourcestar" />
                      <GoKebabVertical id="availResouceKebab" />
                      <img src={availRespdf} alt="" />
                      <h6>License Agreement on MBA.pdf</h6>
                    </div>
                    <div className="availResourcepdfdes">
                      <div className="row">
                        <div className="col-lg-3 col-md-3 col-2">
                          <div className="availResourceimg">
                            <img src={user_profile} alt="" />
                          </div>
                        </div>
                        <div className="col-lg-9 col-md-9 col-10">
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-12">
                              <h6>JamesWhatt</h6>
                            </div>
                            <div className="col-lg-12 col-md-12 col-12">
                              <div className="availResdesRight">
                                <h5>File Size: </h5>
                                <h4>2.31 MB</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-12">
                  <div className="availResourcePdfCard">
                    <div className="availResourcepdfbox">
                      <TbStar id="availResourcestar" />
                      <GoKebabVertical id="availResouceKebab" />
                      <img src={availRespdf} alt="" />
                      <h6>License Agreement on MBA.pdf</h6>
                    </div>
                    <div className="availResourcepdfdes">
                      <div className="row">
                        <div className="col-lg-3 col-md-3 col-2">
                          <div className="availResourceimg">
                            <img src={user_profile} alt="" />
                          </div>
                        </div>
                        <div className="col-lg-9 col-md-9 col-10">
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-12">
                              <h6>JamesWhatt</h6>
                            </div>
                            <div className="col-lg-12 col-md-12 col-12">
                              <div className="availResdesRight">
                                <h5>File Size: </h5>
                                <h4>2.31 MB</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-12">
                  <div className="availResourcePdfCard">
                    <div className="availResourcepdfbox">
                      <TbStar id="availResourcestar" />
                      <GoKebabVertical id="availResouceKebab" />
                      <img src={availRespdf} alt="" />
                      <h6>License Agreement on MBA.pdf</h6>
                    </div>
                    <div className="availResourcepdfdes">
                      <div className="row">
                        <div className="col-lg-3 col-md-3 col-2">
                          <div className="availResourceimg">
                            <img src={user_profile} alt="" />
                          </div>
                        </div>
                        <div className="col-lg-9 col-md-9 col-10">
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-12">
                              <h6>JamesWhatt</h6>
                            </div>
                            <div className="col-lg-12 col-md-12 col-12">
                              <div className="availResdesRight">
                                <h5>File Size: </h5>
                                <h4>2.31 MB</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-12">
                  <div className="availResourcePdfCard">
                    <div className="availResourcepdfbox">
                      <TbStar id="availResourcestar" />
                      <GoKebabVertical id="availResouceKebab" />
                      <img src={availRespdf} alt="" />
                      <h6>License Agreement on MBA.pdf</h6>
                    </div>
                    <div className="availResourcepdfdes">
                      <div className="row">
                        <div className="col-lg-3 col-md-3 col-2">
                          <div className="availResourceimg">
                            <img src={user_profile} alt="" />
                          </div>
                        </div>
                        <div className="col-lg-9 col-md-9 col-10">
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-12">
                              <h6>JamesWhatt</h6>
                            </div>
                            <div className="col-lg-12 col-md-12 col-12">
                              <div className="availResdesRight">
                                <h5>File Size: </h5>
                                <h4>2.31 MB</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-12">
                  <div className="availResourcePdfCard">
                    <div className="availResourcepdfbox">
                      <TbStar id="availResourcestar" />
                      <GoKebabVertical id="availResouceKebab" />
                      <img src={availRespdf} alt="" />
                      <h6>License Agreement on MBA.pdf</h6>
                    </div>
                    <div className="availResourcepdfdes">
                      <div className="row">
                        <div className="col-lg-3 col-md-3 col-2">
                          <div className="availResourceimg">
                            <img src={user_profile} alt="" />
                          </div>
                        </div>
                        <div className="col-lg-9 col-md-9 col-10">
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-12">
                              <h6>JamesWhatt</h6>
                            </div>
                            <div className="col-lg-12 col-md-12 col-12">
                              <div className="availResdesRight">
                                <h5>File Size: </h5>
                                <h4>2.31 MB</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-12">
                  <div className="availResourcePdfCard">
                    <div className="availResourcepdfbox">
                      <TbStar id="availResourcestar" />
                      <GoKebabVertical id="availResouceKebab" />
                      <img src={availRespdf} alt="" />
                      <h6>License Agreement on MBA.pdf</h6>
                    </div>
                    <div className="availResourcepdfdes">
                      <div className="row">
                        <div className="col-lg-3 col-md-3 col-2">
                          <div className="availResourceimg">
                            <img src={user_profile} alt="" />
                          </div>
                        </div>
                        <div className="col-lg-9 col-md-9 col-10">
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-12">
                              <h6>JamesWhatt</h6>
                            </div>
                            <div className="col-lg-12 col-md-12 col-12">
                              <div className="availResdesRight">
                                <h5>File Size: </h5>
                                <h4>2.31 MB</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-12">
                  <div className="availResourcePdfCard">
                    <div className="availResourcepdfbox">
                      <TbStar id="availResourcestar" />
                      <GoKebabVertical id="availResouceKebab" />
                      <img src={availRespdf} alt="" />
                      <h6>License Agreement on MBA.pdf</h6>
                    </div>
                    <div className="availResourcepdfdes">
                      <div className="row">
                        <div className="col-lg-3 col-md-3 col-2">
                          <div className="availResourceimg">
                            <img src={user_profile} alt="" />
                          </div>
                        </div>
                        <div className="col-lg-9 col-md-9 col-10">
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-12">
                              <h6>JamesWhatt</h6>
                            </div>
                            <div className="col-lg-12 col-md-12 col-12">
                              <div className="availResdesRight">
                                <h5>File Size: </h5>
                                <h4>2.31 MB</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-12">
                  <div className="availResourcePdfCard">
                    <div className="availResourcepdfbox">
                      <TbStar id="availResourcestar" />
                      <GoKebabVertical id="availResouceKebab" />
                      <img src={availRespdf} alt="" />
                      <h6>License Agreement on MBA.pdf</h6>
                    </div>
                    <div className="availResourcepdfdes">
                      <div className="row">
                        <div className="col-lg-3 col-md-3 col-2">
                          <div className="availResourceimg">
                            <img src={user_profile} alt="" />
                          </div>
                        </div>
                        <div className="col-lg-9 col-md-9 col-10">
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-12">
                              <h6>JamesWhatt</h6>
                            </div>
                            <div className="col-lg-12 col-md-12 col-12">
                              <div className="availResdesRight">
                                <h5>File Size: </h5>
                                <h4>2.31 MB</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-12">
                  <div className="availResourcePdfCard">
                    <div className="availResourcepdfbox">
                      <TbStar id="availResourcestar" />
                      <GoKebabVertical id="availResouceKebab" />
                      <img src={availRespdf} alt="" />
                      <h6>License Agreement on MBA.pdf</h6>
                    </div>
                    <div className="availResourcepdfdes">
                      <div className="row">
                        <div className="col-lg-3 col-md-3 col-2">
                          <div className="availResourceimg">
                            <img src={user_profile} alt="" />
                          </div>
                        </div>
                        <div className="col-lg-9 col-md-9 col-10">
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-12">
                              <h6>JamesWhatt</h6>
                            </div>
                            <div className="col-lg-12 col-md-12 col-12">
                              <div className="availResdesRight">
                                <h5>File Size: </h5>
                                <h4>2.31 MB</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-12">
                  <div className="availResourcePdfCard">
                    <div className="availResourcepdfbox">
                      <TbStar id="availResourcestar" />
                      <GoKebabVertical id="availResouceKebab" />
                      <img src={availRespdf} alt="" />
                      <h6>License Agreement on MBA.pdf</h6>
                    </div>
                    <div className="availResourcepdfdes">
                      <div className="row">
                        <div className="col-lg-3 col-md-3 col-2">
                          <div className="availResourceimg">
                            <img src={user_profile} alt="" />
                          </div>
                        </div>
                        <div className="col-lg-9 col-md-9 col-10">
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-12">
                              <h6>JamesWhatt</h6>
                            </div>
                            <div className="col-lg-12 col-md-12 col-12">
                              <div className="availResdesRight">
                                <h5>File Size: </h5>
                                <h4>2.31 MB</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-12">
                  <div className="availResourcePdfCard">
                    <div className="availResourcepdfbox">
                      <TbStar id="availResourcestar" />
                      <GoKebabVertical id="availResouceKebab" />
                      <img src={availRespdf} alt="" />
                      <h6>License Agreement on MBA.pdf</h6>
                    </div>
                    <div className="availResourcepdfdes">
                      <div className="row">
                        <div className="col-lg-3 col-md-3 col-2">
                          <div className="availResourceimg">
                            <img src={user_profile} alt="" />
                          </div>
                        </div>
                        <div className="col-lg-9 col-md-9 col-10">
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-12">
                              <h6>JamesWhatt</h6>
                            </div>
                            <div className="col-lg-12 col-md-12 col-12">
                              <div className="availResdesRight">
                                <h5>File Size: </h5>
                                <h4>2.31 MB</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AvailableResource;
