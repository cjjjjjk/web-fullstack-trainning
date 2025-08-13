import axios from "axios";

export const baseNESTDemoAPI = axios.create({
    baseURL: "http://192.168.168.110:3000/",
    timeout: 10000,
    withCredentials: true
})