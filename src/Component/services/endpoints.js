const BASE_URL = "https://admin.cpdedu.com/api/v1";

var userDetails = localStorage.getItem("users");
var userData = userDetails && JSON.parse(userDetails);
var userId = userData && userData._id


export const endpoints = {

  authentication: {
    login: BASE_URL + "/user/login",
    signUp: BASE_URL + "/user/create",
    userProfile : BASE_URL + "/your-cv" ,
    updateProfile : BASE_URL + "/update-cv",
    getProfileByID : BASE_URL + '/cv-data'
  },
  community: {
    getAllCommunity: BASE_URL + "/community/get-all",
    addCommunity: BASE_URL + "/community/add",
    myCommunity: BASE_URL + "/community/my-community",
    joinCommunity: BASE_URL + "/community/join/",
    leaveCommunity: BASE_URL + "/community/leave/",
    createdCommunity: BASE_URL + "/community/get-list",
    updateCommunity  : BASE_URL + "/community/update/",
    disableCommunity : BASE_URL + "/community/delete/",
    joinedMembers : BASE_URL + "/list-community-members/"
  },
  events: {
    getAllEvents : BASE_URL + "/events/get-all",
    createdEvents : BASE_URL + "/events/get-list",
    getNationalityUrl : BASE_URL + "/list-nationality",
    inviteCommunity : BASE_URL + "/events/invite-whole-community?" ,
    addEvent : BASE_URL + "/events/add" ,
    updateEvent : BASE_URL + "/events/update/",
    delete : BASE_URL + "/events/disable/"
  },

  coaches : {
    createCoachProfile : BASE_URL + "/upload-cv",
    updateCoachProfile : BASE_URL + "/update-cv",
    getCoachCategory : BASE_URL + "/coaches/categories",
    getCoachSubCategory : BASE_URL + '/coaches/subcategories',
    // coachings part here
    createCoaching : BASE_URL + "/coaches/coaching/create" ,
    allCoachesList : BASE_URL + "/coaches/coaching/get-list" ,
    enrollCoaching : BASE_URL + "/coaches/coaching/enroll?coaching_id=",
    enrolledCoaching : BASE_URL + "/coaches/coaching/enrollments" ,
    allCoachingNotification : BASE_URL +  '/coaches/coaching/booking-list',
    cancellCoaching : BASE_URL + "/coaches/coaching/respond-to-enrollment?booking_id=",
    confirmCoaching : BASE_URL + "/coaches/coaching/respond-to-enrollment?booking_id=",
    myCoachings : BASE_URL + "/coaches/coaching/get-list?user_id=" + userId,
    allCoachingList : BASE_URL + '/coaches/coaching/get-list'
  } ,

  workshop : {
    createWorkshop : BASE_URL + "/coaches/workshop/create" ,
    allWorkshop : BASE_URL + "/coaches/workshop/get-list" ,
    enrollWorkshop : BASE_URL + "/coaches/workshop/enroll?workshop_id=",
    myEnrolledWorkshop : BASE_URL + "/coaches/workshop/enrollments",
    allEnrollRequestWorkshop : BASE_URL + "/coaches/workshop/booking-list",
    cancelWorkshop : BASE_URL + "/coaches/workshop/respond-to-enrollment?booking_id=",
    confirmWorkshop : BASE_URL + "/coaches/workshop/respond-to-enrollment?booking_id=",
    myWorkshop : BASE_URL + "/coaches/workshop/get-list?user_id=" + userId,
    getWorkshopDetailsById : BASE_URL + "/coaches/workshop/get-list?workshop_id="
  } ,
  master : {
    allIndustry : BASE_URL + "/list-industry",
    allDomain : BASE_URL + "/list-domain"
  }
 
};
