"use client"
import Cookies from "js-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

export const AxiosReqInstance = () => {
  const access_token =
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken")
      : null;
  const refresh_token = Cookies.get("refreshToken");
  const BaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL
  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };
  const reqInstance = axios.create({
    baseURL: BaseUrl,
    headers: headers,
    withCredentials: true,
  });

  reqInstance.interceptors.request.use(async (req) => {
    if (access_token) {
      const user = jwtDecode(access_token);
      const isExpired = dayjs.unix(user.exp ?? 0).diff(dayjs()) < 1;
      if (isExpired) {
        const url = `${BaseUrl}/api/users/refresh/`;
        const data = { refresh: refresh_token };
        try {
          const res = await axios.post(url, data);
          if (res.status === 200) {
            const newToken = res.data.access;
            const authorization = `Bearer ${newToken}`;
            localStorage.setItem("accessToken", newToken);
            req.headers.Authorization = authorization;
          }
        } catch (error: unknown) {
          console.log("Error refreshing token:", error);
        }
      }
    }
    return req;
  });
  return reqInstance;
};
