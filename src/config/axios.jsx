import axios from "axios";

const BASE_URL = "https://phygen.ticketresell-swp.click";
// Instance cho API
const api = axios.create({
  baseURL: BASE_URL+"/api",
  timeout: 120000,
});

// Instance cho các yêu cầu không sử dụng /api
const apiWithoutPrefix = axios.create({
  baseURL: BASE_URL,
  timeout: 120000,
});



// Thêm interceptor cho instance API nếu cần
const handleBefore = (config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

api.interceptors.request.use(handleBefore, (error) => {
  return Promise.reject(error);
});

apiWithoutPrefix.interceptors.request.use(handleBefore, (error) => {
  return Promise.reject(error);
});

// Export cả hai instance
export default api;
export {apiWithoutPrefix};

