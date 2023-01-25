import React from "react";
import { useEffect } from "react";
import { endpoints } from "../Component/services/endpoints";
import axios from "axios";

export const allCountry = () => {

  const token = localStorage.getItem("token");

  var country = []

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const url = endpoints.events.getNationalityUrl;

    axios
      .get(url, { headers: headers })
      .then((res) => {
        if (res.status === 200) {
          const val = res.data;
            country = val;
            return val
        }
        else {
          return []
        }
       
      })
      .catch((err) => {
        console.log(err, "nationality erro");
      });

 

};

