// here we are writing all the api's format;
import axios from "axios";

const token = localStorage.getItem("token");
const headers = {
    Authorization : `Bearer ${token}`
}

export const fetchData = (url) =>{
    axios.get(url , { headers : headers})
    .then((res) =>{
        return res;
    })
    .catch((err) =>{
        
    })
}