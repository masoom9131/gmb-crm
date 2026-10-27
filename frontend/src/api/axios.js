import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "https://gmb-crm.onrender.com/api";

const api = axios.create({
  baseURL,
  timeout: 90000, // 90 seconds to accommodate Render free tier cold-start wake-up
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Automatic retry for Render cold-start transient errors (502, 503, 504, or network timeout)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    if (!config || config.__isRetry) {
      return Promise.reject(error);
    }

    const isColdStart =
      !error.response ||
      [502, 503, 504].includes(error.response?.status) ||
      error.code === "ECONNABORTED";

    if (isColdStart) {
      config.__isRetry = true;
      console.warn("[Axios] Cold start detected, retrying request in 3 seconds...");
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return api(config);
    }

    return Promise.reject(error);
  }
);

export default api;
