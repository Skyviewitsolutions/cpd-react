import { endpoints } from "../Component/services/endpoints";
import { fetchData } from "./api";
import axios from "axios";
import { he } from "date-fns/locale";

const token = localStorage.getItem("token")
const headers = {
    Authorization : `Bearer ${token}`
}

export const getCoachCategory = async () => {
  const url = endpoints.coaches.getCoachCategory;
  const response = await fetchData(url);
  if (response?.data?.result) {
    return response.data.data;
  } else {
    return null;
  }
};

export const getMyCoachings = async () => {
  const url = endpoints.coaches.getCoachCategory;
//   const response = await fetchData(url);
//   if (response?.data?.result) {
//     return response.data.data;
//   } else {
//     return null;
//   }
// console.log(response , "response here")
// return response ;

//  axios.get(url ,{headers : headers} )
//  .then((res) =>{
//     return "hello"
//  })
 return "bhola"
};
