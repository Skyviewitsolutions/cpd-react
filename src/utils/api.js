import React from "react";
import { endpoints } from "../Component/services/endpoints";
import axios from "axios";


const token = localStorage.getItem("token");

const headers = {
  Authorization: `Bearer ${token}`,
};


export function getIndustryList() {
    const url = endpoints.master.allIndustry;
    return axios.get(url , {headers : headers})
}

export function getDomainList() {
    const url = endpoints.master.allDomain;
    return axios.get(url , {headers : headers})
}

