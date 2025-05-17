import axios from "axios";

const Api = axios.create({
    baseURL : "https://wavenet-task.onrender.com",
    withCredentials:true
});

export default Api;

