import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
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