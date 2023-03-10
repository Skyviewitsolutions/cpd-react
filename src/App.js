import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Resume_creation from "./Screen/Resume_creation";
import Home_screens from "./Screen/Home/Home_screens";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Networking from "./Screen/Networking/Networking";
import Loginpage from "./Screen/Login/LoginPage";
import Signup from "./Screen/SignUp/SignUp";
import Event from "./Screen/Event";
import Create_EventForm from "./Screen/Create_EventForm";
import CreateEvent_student from "./Screen/CreateEvent_student";
import Community_finance from "./Screen/Community_finance";
import Community_RetailSelected from "./Screen/Community_RetailSelected";
import CommunityDetails from "./Screen/CommunityDetails/CommunityDetails";
import Community_RetailLocation from "./Screen/Community_RetailLocation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Student_cv from "./Component/Student_cv/Student_cv";
import ProfileCv from "./Component/ProfileCv/ProfileCv";
import MyEvent from "./Screen/MyEvent/MyEvent";
import MyCommunity from "./Screen/MyCommunity/MyCommunity";
import AddEvent from "./Screen/AddEvent/AddEvent";
import Coaches_homeScreen from "./Screen/Coaches_screen/Coaches_homeScreen";
import Workshop from "./Screen/Workshop/Workshop";
import AddEvent_Form_second from "../src/Component/form/AddEvent_Form_second";
import EventDetails from "./Screen/EventDetails/EventDetails";
import FinalResume from "./Component/Student_cv/FinalResume";
import ForgotPasssword from "./Screen/ForgotPassword/ForgotPassword";
import ForgotPasswordDetails from "./Screen/ForgotPasswordDetails";
import CreateCommunity from "./Component/CreateCommunity/CreateCommunity";
import AddCommunitySidebar from "./Component/AddCommunitySidebar/AddCommunitySidebar";
import Communities from "./Screen/Communities/Communities";
import JobScreen from "./Screen/Job/JobScreen";
import CareerFareLinear from "./Screen/Career/CareerFareLinear";
import ForumScreen from "./Screen/Forum/ForumScreen";
import AvailableResource from "./Screen/AvailableResource/AvailableResource";
import CareerFareDetails from "./Screen/Career/CareerFareDetails";
import CoachesForm from "./Screen/Coaches_screen/CoachesForm";
import ViewDetail from "./Screen/Workshop/ViewDetail";
import CoachesDetails from "./Screen/CoachDetails/CoachDetails";
// import MyCourses from "./Component/MyCourses/MyCourses";
import Header2 from "./Component/Header/Header2";
import BookCoaches from "./Component/Modal/BookCoaches/BookCoaches";
import MyCourses from "./Screen/MyCourses/MyCourses";
import CommunityNewSidebar from "./Component/navbar/CommunityNewSidebar";
import WorkshopDetails from "./Screen/WorkshopDetails/WorkshopDetails";
import MainLayout from "./Layouts/MainLayout";
import CoachingDetails from "./Screen/CoachingDetails/CoachingDetails";
import EventFullDetails from "./Screen/EventFullDetails/EventFullDetails";


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home_screens />} />
          <Route exact path="/login" element={<Loginpage />} />
          <Route exact path="/resume" element={<Student_cv />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/resume_creation" element={<Resume_creation />} />
          <Route exact path="/networking" element={<Networking />} />
          <Route exact path="/community" element={<Communities />} />
          <Route exact path="/forgot-password" element={<ForgotPasssword />} />
          <Route exact path="/myprofile_cv" element={<ProfileCv />} />
          <Route
            exact
            path="/create_Event_form"
            element={<Create_EventForm />}
          />
          <Route exact path="/create-community" element={<CreateCommunity />} />
          <Route
            exact
            path="/availableResource"
            element={<AvailableResource />}
          />
          <Route exact path="/coaches-form" element={<CoachesForm />} />
          <Route
            exact
            path="/sidebar_community"
            element={<AddCommunitySidebar />}
          />
          <Route
            exactf
            path="/forgot_password_details"
            element={<ForgotPasswordDetails />}
          />
          <Route exact path="/inviteMember" element={<CreateEvent_student />} />
          <Route
            exact
            path="/community-finance"
            element={<Community_finance />}
          ></Route>
          <Route
            exact
            path="/community-details/:communityId"
            element={<CommunityDetails />}
          ></Route>
          <Route
            exact
            path="/community_RetailSelected"
            element={<Community_RetailSelected />}
          ></Route>
          <Route
            exact
            path="/community_RetailLocation"
            element={<Community_RetailLocation />}
          ></Route>
          <Route path="/add-event" element={<AddEvent />} />
          <Route exact path="/myEvents" element={<MyEvent />} />
          <Route exact path="/myCommunity" element={<MyCommunity />} />
          <Route exact path="/event-details" element={<EventDetails />} />
          {/* Coaches section */}
          <Route exact Path="/coaches_form" element={<CoachesForm />} />
          <Route
            exact
            path="/coach-Details/:coachId"
            element={<CoachesDetails />}
          />
          <Route exact path="/finalresume" element={<FinalResume />} />
          <Route exact path="/workshops" element={<Workshop />} />
          <Route
            exact
            path="/coachings"
            element={<Coaches_homeScreen />}
          />
          <Route exact path="/job" element={<JobScreen />} />
          <Route exact path="/career" element={<CareerFareLinear />} />
          <Route exact path="/careerDetails" element={<CareerFareDetails />} />
          <Route exact path="/forum" element={<ForumScreen />} />
          <Route exact path="/workshopviewdetails" element={<ViewDetail />} />
          {/* <Route exact path="/myCourses" element={<MyCourses />} /> */}
          <Route exact path="/Header2" element={<Header2 />} />
          <Route exact path="/myCourses" element={<MyCourses />} />
          <Route exact path="/bookCoaches" element={<BookCoaches />} />
          <Route
            exact
            path="/communityHeader"
            element={<CommunityNewSidebar />}
          />
          <Route
            exact
            path="/workshopDetails/:workshopId"
            element={<WorkshopDetails />}
          />
          <Route 
            exact 
            path='/coachingDetails/:coachingId'
            element={<CoachingDetails/>}
          />
          {/* This is the dashboard layout here */}
          <Route exact path="/dashboardLayout" element={<MainLayout />} />
          <Route exact path="/event-full-details/:eventId" element={<EventFullDetails />} />
        </Routes>
      </Router>
      <ToastContainer autoClose={3000}/>
    </>
  );
}

export default App;
