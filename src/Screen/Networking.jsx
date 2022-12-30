// import React from "react";
// import "./Networking.css";
// import { useState, useEffect } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Modal from "react-bootstrap/Modal";
// import Event_cards from "../Component/Cards/Event_cards";
// import Event_button from "../Component/button/Event_button";
// import Plus_button from "../Component/button/Plus_button";
// import AddCommunitySidebar from "../Component/AddCommunitySidebar/AddCommunitySidebar";
// import Homepage_header from "../Component/Header/Homepage_header";
// import Footer from "../Component/Footer/Footer";
// import { useNavigate } from "react-router-dom";
// import AddEvent_Modal from "../Component/Modal/AddEvent_Modal";
// import { endpoints } from "../Component/services/endpoints";
// import Networking_headers from "../Component/Header/Networking_headers";
// import axios from "axios";
// import { HiSearch } from "react-icons/hi";
// import { FaPlusCircle } from "react-icons/fa";


// const Networking = () => {
  
//   const navigate = useNavigate("");
//   const [modalShow, setModalShow] = useState(false);
//   const [picPath, setPicPath] = useState("");
//   const [allEvent, setAllEvent] = useState([]);
//   const [shortEvent, setShortEvent] = useState([]);
//   const [showAllEvents, setShowAllEvents] = useState(false);

//   const getAllEventsApi = endpoints.events.getAllEvents;

//   const getAllEvents = () => {
//     axios
//       .get(getAllEventsApi)
//       .then((res) => {
//         console.log(res, "events response here");
//         if (res.data.result === true) {
//           const val = res.data.data;
//           const eventId = res.data.data[0]._id;
//           localStorage.setItem("eventId", eventId);
//           const path = res.data.image_path;
//           setPicPath(path);
//           setAllEvent(val);

//           if (val.length > 3) {
//             var shrtEvent = [val[0], val[1], val[2]];
//             setShortEvent(shrtEvent);
//           } else {
//             setShowAllEvents(true);
//           }
//         }
//       })
//       .catch((err) => {
//         console.log(err, "this is events error");
//       });
//   };

//   useEffect(() => {
//     getAllEvents(getAllEvents);
//   }, []);


//   return (
//     <>
      
//         <Homepage_header />
//         <Networking_headers />

//         <div className="events-list">
//           <div className="container-fluid">
//             <div class="row mb-4 neworkingRow">
//               <div className="col-sm-12 col-md-12 col-lg-3 mt-5 ">
//                 <AddCommunitySidebar />
//               </div>
//               <div className="col-sm-12 col-md-12 col-lg-8 mt-5">
//                 <div className="row netWorkingHeader">
//                   <div className="col-12 col-md-12 col-lg-8 mb-3">
//                     <inputbox className="form-control networking_searchbox">
//                       search{" "}
//                     </inputbox>
//                   </div>
//                   <div
//                     className="col-8 col-md-6 col-lg-3"
//                     onClick={() => navigate("/community")}
//                   >
//                     <Event_button text="View Communities" />
//                   </div>
//                   <div className="col-4 col-md-6 col-lg-1">
//                     <Plus_button
//                       onClick={() => navigate("/addEvent")}
//                       text="Add Events"
//                     />

//                     {/* <span style={{fontSize:"15px"}}> Create Event</span> */}
//                     {/* <AddEvent_Modal
//                     show={modalShow}
//                     onHide={() => setModalShow(false)}
//                   /> */}
//                   </div>
//                 </div>

//                 <div className="row mt-3">
//                   <div className="col-lg-12">
//                     <div className="latest">
//                       <h3>Latest</h3>
//                       <button onClick={() => setShowAllEvents(!showAllEvents)}>
//                         {showAllEvents ? "View Less" : "View All"}
//                       </button>
//                     </div>
//                   </div>
//                   {showAllEvents
//                     ? allEvent.length != 0 &&
//                       allEvent.map((itm, index) => {
//                         return (
//                           <>
//                             <div className="col-sm-12 col-md-6 col-lg-4 ">
//                               <Event_cards
//                                 data={itm}
//                                 key={index}
//                                 picPath={picPath}
//                               />
//                             </div>
//                           </>
//                         );
//                       })
//                     : shortEvent.map((itm, index) => {
//                         return (
//                           <>
//                             <div className="col-sm-12 col-md-6 col-lg-4 ">
//                               <Event_cards
//                                 data={itm}
//                                 key={index}
//                                 picPath={picPath}
//                               />
//                             </div>
//                           </>
//                         );
//                       })}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <Footer />
    
//     </>
//   );
// };

// export default Networking;



import React from "react";
import "./Networking.css";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Event_cards from "../Component/Cards/Event_cards";
import Event_button from "../Component/button/Event_button";
import Plus_button from "../Component/button/Plus_button";
import AddCommunitySidebar from "../Component/AddCommunitySidebar/AddCommunitySidebar";
import Homepage_header from "../Component/Header/Homepage_header";
import Footer from "../Component/Footer/Footer";
import { useNavigate } from "react-router-dom";
import AddEvent_Modal from "../Component/Modal/AddEvent_Modal";
import { endpoints } from "../Component/services/endpoints";
import Networking_headers from "../Component/Header/Networking_headers";
import axios from "axios";
import '../fonts/Inter-SemiBold.ttf';
import { HiSearch } from "react-icons/hi";
import { FaPlusCircle } from "react-icons/fa";

const Networking = () => {

  const navigate = useNavigate("");
  const [modalShow, setModalShow] = useState(false);
  const [picPath, setPicPath] = useState("");
  const [allEvent, setAllEvent] = useState([]);
  const [shortEvent, setShortEvent] = useState([]);
  const [showAllEvents, setShowAllEvents] = useState(false);

  const getAllEventsApi = endpoints.events.getAllEvents;

  const getAllEvents = () => {
    axios
      .get(getAllEventsApi)
      .then((res) => {
        if (res.data.result === true) {
          const val = res.data.data;
          const eventId = res.data.data[0]._id;
          localStorage.setItem("eventId", eventId);
          const path = res.data.image_path;
          setPicPath(path);
          setAllEvent(val);

          if (val.length > 3) {
            var shrtEvent = [val[0], val[1], val[2]];
            setShortEvent(shrtEvent);
          } else {
            setShowAllEvents(true);
          }
        }
      })
      .catch((err) => {
        console.log(err, "this is events error");
      });
  };

  useEffect(() => {
    getAllEvents(getAllEvents);
  }, []);
  return (
    <>
      <Homepage_header />
      <Networking_headers />
      <div className="networking_wrapper">
        <div className="row">
          <div className="col-lg-3  ">
          <AddCommunitySidebar />
          </div>
          <div className="col-lg-9 col-md-12 col-12">
            <section>
            <div className="row">
              <div className="col-lg-8 col-md-12 col-12">
                <div className="networkingsearchBox">
                  <div className="form-group">
                    <HiSearch id="networking_search" />
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search Here"
                    />
                  </div>
                </div>
              </div>
              <div
                className="col-lg-2 col-md-3 col-6"
                onClick={() => navigate("/community")}
              >
                <button className="view_communities">View Communities</button>
              </div>
              <div className="col-lg-2 col-md-2 col-6 ">
            <div className="addEventplusButton">
            <FaPlusCircle className="addEventPlus" onClick={() => navigate("/addEvent")} />
            <span id="createEventText">Create Event</span>
            </div>
              </div>
              </div>
              </section>
          <section className='eventCardsection'>
            <div className="row">
            <div className="col-lg-12 col-md-12 col-12">
                <div className="latest">
                  <h3>Latest</h3>
                  <button onClick={() => setShowAllEvents(!showAllEvents)}>
                    {showAllEvents ? "View Less" : "View All"}
                  </button>
                </div>
              </div>
              </div>
              <div className="row">
              {showAllEvents
                ? allEvent.length != 0 &&
                  allEvent.map((itm, index) => {
                    return (
                      <>
                        <div className="col-sm-12 col-md-6 col-lg-4 ">
                          <Event_cards
                            data={itm}
                            key={index}
                            picPath={picPath}
                          />
                        </div>
                      </>
                    );
                  })
                : shortEvent.map((itm, index) => {
                    return (
                      <>
                        <div className="col-sm-12 col-md-6 col-lg-4 ">
                          <Event_cards
                            data={itm}
                            key={index}
                            picPath={picPath}
                          />
                        </div>
                      </>
                    );
                  })}
              </div>
          </section>
          </div>
        </div>
      </div>
       <Footer />
    </>
  );
};

export default Networking;