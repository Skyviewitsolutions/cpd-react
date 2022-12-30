import React from "react";
import Community_Invite_header from "../Header/Community_Invite_header";
import Homepage_header from "../Header/Homepage_header";
import user from "../../assets/Icons/Artboard26.svg";
import dommy_person from "../../assets/Images/dommy_person.jfif";
import Logininput from "../Inputbox/Logininput";
import "./InviteMember.css";
import InviteMembersCard from "./InviteMembersCard";
const InviteMember = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="InviteMember">
          <div className="row mt-3">
            <div className="col-lg-3 col-md-12 col-sm-12">
              {/* <div className="inviteSidebar">
                  <h4>Members</h4>
                  <div className="allMembers">
                    <h5>All members</h5>
                  </div>
                  <li>
                    {" "}
                    <input type="checkbox" />{" "}
                    <a class="active" href="#home">
                      Moderator
                    </a>
                  </li>
                  <li>
                    {" "}
                    <input type="checkbox" />{" "}
                    <a class="active" href="#home">
                      Expert
                    </a>
                  </li>
                  <li>
                    {" "}
                    <input type="checkbox" />{" "}
                    <a class="active" href="#home">
                      Recruiter
                    </a>
                  </li>
                  <li>
                    {" "}
                    <input type="checkbox" />{" "}
                    <a class="active" href="#home">
                      Alumini
                    </a>
                  </li>
                  <span>Location</span>
               <div>
               <input type="search" placeholder="hong-cong" className="allMemberLocationSerch"/>
                </div>  
                <h6>Filter By Univercity</h6>
                <li>
                    {" "}
                    <input type="checkbox" />{" "}
                    <a class="active" href="#home">
                      Alumini
                    </a>
                  </li>
                  <li>
                    {" "}
                   
                    <input type="checkbox" />{" "}
                    <a class="active" href="#home">
                      Alumini
                    </a>
                  </li>
                  <li>
                    {" "}
                    <input type="checkbox" />{" "}
                    <a class="active" href="#home">
                      Alumini
                    </a>
                  </li>
                </div> */}
            </div>
            <div className="col-lg-9 col-md-12 col-sm-12">
              <div className="row">
                <div className=" col-lg-9 col-md-6 col-sm-6">
                  <div className="AddMember">
                    <h4>Add Member</h4>
                  </div>
                </div>
                <div className=" col-lg-3 col-md-6 col-sm-6">
                  <button className="AddMemberBtn">Back to Communities</button>
                </div>
              </div>
              <Community_Invite_header />
              {/* <div className="row">
                <div className="memberCardDetails">
                <div class="row">
<div class="col-sm-12">
<div class="col-sm-2" style={{float:"left"}}></div>
<div class="col-8" style={{float:"left"}}>
<div class="card"  style={{minHeight:"150px",width:"100%",}}>
<img src={user} style={{height:"100px",width:"100px",borderRadius:"15px 15px 15px 15px",marginLeft:"20px",marginTop:"20px" }}/>
<div class="form-check" style={{marginTop:"-80px",marginLeft:"100px"}}>
  <input class="form-check-input" type="checkbox" value=""/>
  </div>
  
  <span style={{marginLeft:"135px",fontSize:"14px",marginTop:"-20px"}}>James</span>
  
 <span style={{marginLeft:"135px",fontSize:"14px",color:"blue;"}}>(Moderator)</span>
  <span style={{marginLeft:"135px",fontSize:"14px",color:"green"}}>Education Detail</span>
  <span style={{marginLeft:"135px",fontSize:"12px"}}>MBA Student, Year 1,KHU University</span>
  <div style={{marginLeft:"400px",marginTop:"-80px"}}>
  <span style={{float:"left",marginRight:"-180px",color:"blue",fontSize:"14px"}}>Education Deteil</span>
  <span style={{float:"left",marginRight:"-180px",fontSize:"12px",marginTop:"20px"}}>Skill : Communication, PM, Solution Management, Business Development</span>
  <button type="button" class="btn btn-info" style={{width:"130px",marginTop:"65px",borderRadius:"20px 20px 20px 20px " }}>invited</button>
  </div>
  
  

</div>
</div>
<div class="col-2" style={{float:"left"}}></div>
</div>
</div>
                </div>
              </div> */}
              <div className="InviteMemberCard_box">
              <InviteMembersCard/>
              <InviteMembersCard/>
              <InviteMembersCard/>
              <InviteMembersCard/>
              <InviteMembersCard/>
              <InviteMembersCard/>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InviteMember;
