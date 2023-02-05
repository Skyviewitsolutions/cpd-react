var userDetails = localStorage.getItem("users");
var userType = JSON.parse(userDetails);
userType = userType.user_type;


export const userRole = () => {
   if(userType == 1){
    return "student"
   }else if(userType == 2){
    return "coach"
   }
};
