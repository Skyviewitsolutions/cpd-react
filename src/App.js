import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Resume_creation from "./Screen/Resume_creation";
import Home_screens from "./Screen/Home_screens";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Networking from "./Screen/Networking";
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
import ForgotPasssword from "./Screen/ForgotPassword";
import ForgotPasswordDetails from "./Screen/ForgotPasswordDetails";
import CreateCommunity from "./Component/CreateCommunity/CreateCommunity";
import AddCommunitySidebar from "./Component/AddCommunitySidebar/AddCommunitySidebar";
import Communities from "./Screen/Communities/Communities";
import JobScreen from "./Screen/Job/JobScreen"
import CareerFareLinear from "./Screen/Career/CareerFareLinear";
import ForumScreen from "./Screen/Forum/ForumScreen"
import AvailableResource from "./Screen/AvailableResource/AvailableResource";
import CareerFareDetails from './Screen/Career/CareerFareDetails';
import CoachesForm from "./Screen/Coaches_screen/CoachesForm";
import ViewDetail from "./Screen/Workshop/ViewDetail";
import CoachesDetails from "./Screen/CoachDetails/CoachDetails";
import MyCourses from "./Component/MyCourses/MyCourses";
import Header2 from "./Component/Header/Header2";


function App() {
  
   
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home_screens />} />
        <Route exact path="/loginpage" element={<Loginpage />} />
        <Route exact path="/resume" element={<Student_cv />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/resume_creation" element={<Resume_creation />} />
        <Route exact path="/networking" element={<Networking />} />
        <Route exact path="/community" element={<Communities />} />
        <Route exact path="/forgot_password" element={<ForgotPasssword />} />
        <Route exact path="/myprofile_cv" element={<ProfileCv />} />
        <Route exact path="/create_Event_form" element={<Create_EventForm />} />
        <Route exact path="/create_community" element={<CreateCommunity />} />
        <Route exact path="/availableResource" element={<AvailableResource /> } />
        <Route exact path="/coachesForm" element={<CoachesForm /> } />
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
          path="/community_finance"
          element={<Community_finance />}
        ></Route>
        <Route
          exact
          path="/community-details"
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
        <Route path="/addEvent" element={<AddEvent />} />
        <Route exact path="/myEvents" element={<MyEvent />} />
        <Route exact path="/myCommunity" element={<MyCommunity />} />
        <Route exact path="/event_details" element={<EventDetails />} />
        {/* Coaches section */}
        <Route exact Path="/coaches_form" element={<CoachesForm/>} />
        <Route exact path="/coach-Details/:coachId" element={<CoachesDetails />}/>
        {/* <Route exact path="/speaker_cv" element={<CoachesForm2/>} /> */}
        <Route exact path="/finalresume" element={<FinalResume />} />
        {/* <Route exact path="/chathome" element={<ChatHome />} /> */}
        <Route exact path="/workshop_screen" element={<Workshop />} />
        <Route exact path="/coaches_screen" element={<Coaches_homeScreen />} />
        <Route exact path="/job" element={<JobScreen /> } />
        <Route exact path="/career" element={<CareerFareLinear /> } />
        <Route exact path="/careerDetails" element={<CareerFareDetails /> } />
        <Route exact path="/forum" element={<ForumScreen /> } />
        <Route exact path="/workshopviewdetails" element={<ViewDetail /> } />
        <Route exact path="/myCourses" element={<MyCourses />} />
        <Route exact path="/Header2" element={<Header2 />} />
      </Routes>
      
    </Router>
  );
}

export default App;
