import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  const language = localStorage.getItem("LANGUAGE") || "en";
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers["X-Language"] = language;

  return config;
});

export const fetchTranslations = async (language) => {
  try {
    const response = await axiosClient.get(`/locale/${language}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching translations:", error);
    return {};
  }
};

axiosClient.interceptors.response.use(
  (response) => {
    // Handle responses as needed
    return response;
  },
  (error) => {
    const { response } = error;
    // Handle errors as needed
    throw error;
  }
);

export default axiosClient;
