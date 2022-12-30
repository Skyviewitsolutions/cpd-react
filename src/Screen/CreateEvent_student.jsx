import React from "react";
import "./CreateEvent_student.css";
import Form from "react-bootstrap/Form";
import Homepage_header from "../Component/Header/Homepage_header";
import Footer from "../Component/Footer/Footer";
import AddEvent_Form_second from "./AddEvent/AddEvent_Form_second";
import StudentEvents from "../Component/StudentEvents/StudentEvents";
import InviteMember from "../Component/InviteMember/InviteMember";
const CreateEvent_student = () => {
  return (
    <>
      <Homepage_header />
      <div className="StudenEventDetails">
       <InviteMember/>
      </div>

      <Footer />
    </>
  );
};

export default CreateEvent_student;
