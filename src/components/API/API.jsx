import axios from "axios";

const API = axios.create({
    // baseURL: 'http://localhost:5000',
    baseURL: 'https://ecommerce-project-backend-tan.vercel.app/',
    headers: {
        "Content-Type": "application/json",
    },
});

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        // console.log("API URL:", config.url);
    // console.log("TOKEN AVAILABLE:", !!token);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default API;


// https://ecommerce-project-frontend-eta.vercel.app/
// https://ecommerce-project-backend-tan.vercel.app/