import React, { useEffect , useState } from "react";
import { endpoints } from "../../Component/services/endpoints";
import axios from "axios";


const useFetchCoachingsData = (url) => {

  const token = localStorage.getItem("token");
  const [data , setData] = useState([]);

  useEffect(() => {
    const url = endpoints.coaches.myCoachings;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .get(url, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          var val = res.data.data;
          setData(val)
        }
      })
      .catch((err) => {
        console.log(err, "this is the error");
      });
  }, [url]);

  return [data];

};

export default useFetchCoachingsData;
