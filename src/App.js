import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Resume_creation from "./Screen/Resume_creation";
import Home_screens from "./Screen/Home/Home_screens";
import { BrowserRouter as Router, Routes, Route , Navigate } from "react-router-dom";
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
import CareerFareLinear from "./Screen/Career/CareerFareLinear";
import ForumScreen from "./Screen/Forum/ForumScreen";
import AvailableResource from "./Screen/AvailableResource/AvailableResource";
import CoachesForm from "./Screen/Coaches_screen/CoachesForm";
import CoachesDetails from "./Screen/CoachDetails/CoachDetails";
import Header2 from "./Component/Header/Header2";
import BookCoaches from "./Component/Modal/BookCoaches/BookCoaches";
import MyCourses from "./Screen/MyCourses/MyCourses";
import CommunityNewSidebar from "./Component/navbar/CommunityNewSidebar";
import WorkshopDetails from "./Screen/WorkshopDetails/WorkshopDetails";
import WorkshopEdit from "./Screen/WorkshopEdit/WorkshopEdit";
import CoachingEdit from "./Screen/CoachingEdit/CoachingEdit";
import EventsEdit from "./Screen/EventsEdit/EventsEdit";
import JobBoard from "./Screen/JobBoard/JobBoard";
import JobBoardDetails from "./Screen/JobBoardDetails/JobBoardDetails";
import EventFullDetails from "./Screen/EventFullDetails/EventFullDetails"
import JobBoardEdit from "./Screen/JobBoardEdit/JobBoardEdit";
import EmployerForm from "./Screen/EmployerFom/EmployerForm";
import PublicRoute from "./Routing/PublicRoute";
import PrivateRoute from "./Routing/PrivateRoute";
import CareerFare from "./Screen/CareerFare/CareerFare"
import CareerFareDetails from "./Screen/CareerFareDetails/CareerFareDetails";
import CareerFareEdit from "./Screen/CareerFareEdit/CareerFareEdit";


function App() {
  return (
    <>
      <Router>
        <Routes>

        <Route path="/" element={<PublicRoute element={<Home_screens />} />} />
        <Route path="/resume" element={<PrivateRoute element={<Student_cv />} />} />
        <Route path="/login" element={<PublicRoute element={<Loginpage />} />} />
          <Route exact path="/signup" element={<PublicRoute element={<Signup />} />} />
          <Route exact path="/resume_creation" element={<Resume_creation />} />
          <Route exact path="/networking" element={<PublicRoute element={<Networking />} />} />
          <Route exact path="/community" element={<PublicRoute element={<Communities />} />} />
          <Route exact path="/forgot-password" element={<PublicRoute element={<ForgotPasssword />} />} />
          <Route exact path="/myprofile_cv" element={<PrivateRoute element={<ProfileCv />} />} />
          <Route
            exact
            path="/create_Event_form"
            element={<PrivateRoute element={<Create_EventForm />} />}
          />
          <Route exact path="/create-community" element={<PrivateRoute element={<CreateCommunity />} /> } />
          <Route
            exact
            path="/availableResource"
            element={<PublicRoute element={<AvailableResource />}/>}
          />
          <Route exact path="/coaches-form" element={<PrivateRoute element={<CoachesForm />} />} />
          <Route
            exact
            path="/sidebar_community"
            element={<AddCommunitySidebar />}
          />
          <Route
            exact
            path="/forgot_password_details"
            element={<PublicRoute element={<ForgotPasswordDetails />} />}
          />
          <Route exact path="/inviteMember" element={<CreateEvent_student />} />
          <Route
            exact
            path="/community-finance"
            element={<PublicRoute element={<Workshop />} />}
          ></Route>
          <Route
            exact
            path="/community-details/:communityId"
            element={<PublicRoute element={<CommunityDetails />} />}
          ></Route>
          <Route
            exact
            path="/community_RetailSelected"
            element={<PublicRoute element={<Community_RetailSelected />} />}
          ></Route>
          <Route
            exact
            path="/community_RetailLocation"
            element={<PublicRoute element={<Community_RetailLocation />} />}
          ></Route>
          <Route path="/add-event" element={<PrivateRoute element={<AddEvent />} />} />
          <Route exact path="/myEvents" element={<PrivateRoute element={<MyEvent />} />} />
          <Route exact path="/myCommunity" element={<PrivateRoute element={<MyCommunity />} />} />
          <Route exact path="/event-details" element={<PublicRoute element={<EventDetails />} />} />
          
          <Route exact Path="/coaches_form" element={<PrivateRoute element={<CoachesForm />} />} />
          <Route
            exact
            path="/coach-Details/:coachId"
            element={<PublicRoute element={<CoachesDetails />} />}
          />
          <Route exact path="/finalresume" element={<FinalResume />} />
          <Route exact path="/workshops" element={<PublicRoute element={<Workshop />}  />} />
          <Route exact path="/coachings" element={<PublicRoute element={<Coaches_homeScreen />}  />} />
          <Route exact path="/career" element={<PublicRoute element={<CareerFareLinear />} />} />
          <Route exact path="/careerDetails" element={<PublicRoute element={<CareerFareDetails />} />} />
          <Route exact path="/forum" element={<PublicRoute element={<ForumScreen />} />} />
          <Route exact path="/Header2" element={<PublicRoute element={<Header2 />} />} />
          <Route exact path="/myCourses" element={<PrivateRoute element={<MyCourses />} />} />
          <Route exact path="/bookCoaches" element={<PublicRoute element={<BookCoaches />} />} />
          <Route
            exact
            path="/communityHeader"
            element={<PublicRoute element={<CommunityNewSidebar />} />}
          />
          <Route
            exact
            path="/workshopDetails/:workshopId"
            element={<PublicRoute element={<WorkshopDetails />} />}
          />
          <Route
            exact
            path="/workshopEdit/:workshopId"
            element={<PrivateRoute element={<WorkshopEdit />} />}
          />
          <Route
            exact
            path="/coachingDetails/:coachingId"
            element={<PublicRoute element={<CoachesDetails />} />}
          />
          <Route
            exact
            path="/coachingEdit/:coachingId"
            element={<PrivateRoute element={<CoachingEdit />} />}
          />
          <Route
            exact
            path="/event-full-details/:eventId"
            element={<PublicRoute element={<EventFullDetails />} />}
          />
          <Route exact path="/eventEdit/:eventId" element={<PrivateRoute element={<EventsEdit />} />} />
          <Route exact path="/job-board" element={<PublicRoute element={<JobBoard />} />}/>
          <Route exact path="/job-board-details/:jobId" element={<PublicRoute element={<JobBoardDetails />} />}/>
          <Route exact path="/job-board-edit/:jobId" element={<PrivateRoute element={<JobBoardEdit />} />}/>
          <Route exact path="/employer-form" element={<PrivateRoute element={<EmployerForm />}/>} /> 
          <Route exact path="/career-fare" element={<CareerFare />}/>
          <Route exact path="/career-fare-details/:careerFareId" element={<CareerFareDetails />}/>
          <Route exact path="/career-fare-edit/:careerFareId" element={<CareerFareEdit />}/>
        </Routes>
      </Router>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
