const BASE_URL = "https://admin.cpdedu.com/api/v1";

var userDetails = localStorage.getItem("users");
var userData = userDetails && JSON.parse(userDetails);
var userId = userData && userData._id;

export const endpoints = {
  authentication: {
    login: BASE_URL + "/user/login",
    signUp: BASE_URL + "/user/create",
    userProfile: BASE_URL + "/your-cv",
    updateProfile: BASE_URL + "/update-cv",
    getProfileByID: BASE_URL + "/cv-data",
    
  },
  community: {
    getAllCommunity: BASE_URL + "/community/get-all",
    addCommunity: BASE_URL + "/community/add",
    myCommunity: BASE_URL + "/community/my-community",
    joinCommunity: BASE_URL + "/community/join/",
    leaveCommunity: BASE_URL + "/community/leave/",
    createdCommunity: BASE_URL + "/community/get-list",
    updateCommunity: BASE_URL + "/community/update/",
    disableCommunity: BASE_URL + "/community/delete/",
    joinedMembers: BASE_URL + "/list-community-members/",
  },
  events: {
    getAllEvents: BASE_URL + "/events/get-all",
    createdEvents: BASE_URL + "/events/get-list",
    getNationalityUrl: BASE_URL + "/list-nationality",
    inviteCommunity: BASE_URL + "/events/invite-whole-community?",
    addEvent: BASE_URL + "/events/add",
    updateEvent: BASE_URL + "/events/update/",
    delete: BASE_URL + "/events/disable/",
    joinEvent: BASE_URL + "/events/join/",
    leaveEvent: BASE_URL + "/events/leave/",
    myEvents: BASE_URL + "/events/my-event",
    eventDetails: BASE_URL + "/event/get-details/",
    eventsByCommunityId: BASE_URL + "/events/get-events-by-community-id/",
    eventsByCreatorId : BASE_URL + "/events/get-list?created_by=",
    uploadVideoContent : BASE_URL + "/events/update-video",
    updateTopic : BASE_URL + "/events/update-eventcontentdata",
    deleteLecture : BASE_URL + "/events/delete-eventcontent"
  },

  coaches: {
    createCoachProfile: BASE_URL + "/upload-cv",
    updateCoachProfile: BASE_URL + "/update-cv",
    getCoachCategory: BASE_URL + "/coaches/categories",
    getCoachSubCategory: BASE_URL + "/coaches/subcategories",
    // coachings part here
    createCoaching: BASE_URL + "/coaches/coaching/create",
    allCoachesList:  BASE_URL + "/coaches/coaching/get-list" + "?skip_user_id=" + userId,
    enrollCoaching: BASE_URL + "/coaches/coaching/enroll?coaching_id=",
    enrolledCoaching: BASE_URL + "/coaches/coaching/enrollments",
    allCoachingNotification: BASE_URL + "/coaches/coaching/booking-list",
    cancellCoaching:  BASE_URL + "/coaches/coaching/respond-to-enrollment?booking_id=",
    confirmCoaching: BASE_URL + "/coaches/coaching/respond-to-enrollment?booking_id=",
    myCoachings: BASE_URL + "/coaches/coaching/get-list?user_id=" + userId,
    coachingsByCoachId: BASE_URL + "/coaches/coaching/get-list?user_id=",
    allCoachingList: BASE_URL + "/coaches/coaching/get-list",
    deleteCoaching: BASE_URL + "/coaches/coaching/delete?id=",
    updateCoaching: BASE_URL + "/coaches/coaching/update",
    getCoachingDetailsById:  BASE_URL + "/coaches/coaching/get-list?coaching_id=",
    uploadVideoContnet : BASE_URL + "/coaches/coaching/update-video",
    updateTopic : BASE_URL + "/coaches/coaching/update-topic",
    deleteLecture : BASE_URL + "/coaches/coaching/delete-lecture"
  },

  workshop: {
    createWorkshop: BASE_URL + "/coaches/workshop/create",
    allWorkshop:  BASE_URL + "/coaches/workshop/get-list" + "?skip_user_id=" + userId,
    enrollWorkshop: BASE_URL + "/coaches/workshop/enroll?workshop_id=",
    myEnrolledWorkshop: BASE_URL + "/coaches/workshop/enrollments",
    allEnrollRequestWorkshop: BASE_URL + "/coaches/workshop/booking-list",
    cancelWorkshop:  BASE_URL + "/coaches/workshop/respond-to-enrollment?booking_id=",
    confirmWorkshop:  BASE_URL + "/coaches/workshop/respond-to-enrollment?booking_id=",
    myWorkshop: BASE_URL + "/coaches/workshop/get-list?user_id=" + userId,
    WorkshopByCoachId: BASE_URL + "/coaches/workshop/get-list?user_id=",
    getWorkshopDetailsById: BASE_URL + "/coaches/workshop/get-list?workshop_id=",
    deleteWorkshop: BASE_URL + "/coaches/workshop/delete?id=",
    updateWorkshop: BASE_URL + "/coaches/workshop/update",
    uploadVideoContent : BASE_URL + "/coaches/workshop/update-video",
    updateTopic : BASE_URL + "/coaches/workshop/update-topic",
    deleteLecture : BASE_URL + "/coaches/workshop/delete-lecture"
  },
  
  master: {
    allIndustry: BASE_URL + "/list-industry",
    allDomain: BASE_URL + "/list-domain",
    allRecentFeeds: BASE_URL + "/recent-activities",
    recommendedList : BASE_URL + "/recommended_list"
  },
  review : {
    createReview : BASE_URL + "/review/create" ,
    listOfReview : BASE_URL + "/review/get-list?entity_id="
  } ,
  jobs : {
    createJob : BASE_URL + "/job/create",
    allJobs : BASE_URL + "/job/get-list",
    deleteJobs : BASE_URL + "/job/delete?",
    updateJob : BASE_URL + "/job/update",
    jobDetails : BASE_URL + "/job/getSingleJob?job_id=",
    applyJob : BASE_URL + "/job/apply?"
  } ,
  employer : {
    createEmployer : BASE_URL + "/addEmployer" ,
    updateEmployer : BASE_URL + "/updateEmployer"
  }
};

export const imgPath = {
  communtiy: "https://admin.cpdedu.com/public/images/community/",
  event: "https://admin.cpdedu.com/public/images/event/",
  workshop: "https://admin.cpdedu.com/images/workshop/",
  user: "https://admin.cpdedu.com/images/avatar/",
  coaching: "https://admin.cpdedu.com/images/coaching/",
  
};
