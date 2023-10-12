import axios from "axios";
// import.meta.env.VITE_APP_URL
export default axios.create({
    baseURL: "https://eclipseaddict.com/v1",
    headers: {
        "Content-type": "application/json",
    },
});