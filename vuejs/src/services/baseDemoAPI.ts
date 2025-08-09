import axios from "axios";

export const baseNESTDemoAPI = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 10000,
    withCredentials: true
})