const BASE_URL = "https://admin.cpdedu.com/api/v1";

export const endpoints = {
  authentication: {
    login: BASE_URL + "/user/login",
    signUp: BASE_URL + "/user/create",
    userProfile : BASE_URL + "/your-cv" ,
    updateProfile : BASE_URL + "/update-cv"
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
    getCoachCategory : BASE_URL + "/coaches/categories",
    getCoachSubCategory : BASE_URL + '/coaches/subcategories'
  }
 
};
