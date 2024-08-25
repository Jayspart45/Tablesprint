import axios from "axios";

export const ip = import.meta.env.IP || "localhost"
export const port = import.meta.env.PORT || "8000"

export const Baseaxios = axios.create({
    baseURL: `http://${ip}:${port}/api/v1`,
    withCredentials: true
})