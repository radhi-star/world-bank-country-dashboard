import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const API = axios.create({
baseURL: "https://world-bank-country-dashboard-1.onrender.com/api/",
});

API.interceptors.request.use(
  async (config) => {

    const token = await AsyncStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);