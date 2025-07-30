import axios from "axios";

import { axiosPrivate } from "../api/axios";
// import useRefreshToken from "./useRefreshToken";
import { useEffect } from "react";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  //   const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        const storedToken = sessionStorage.getItem("token");
        if (storedToken) {
          setAuth(storedToken);
        }
        console.log("Request Interceptor:", auth);
        if (auth && !config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth}`;
          console.log(
            "Attaching Authorization header:",
            config.headers["Authorization"]
          );
        } else if (storedToken && !config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${storedToken}`;
          console.log(
            "Attaching stored token to Authorization header:",
            config.headers["Authorization"]
          );
        }
        // Log the final request headers for debugging
        console.log("Final request headers:", config.headers);
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => {
        console.log(response);
        // Check for new authorization tokens in responses
        const newToken =
          response.config.headers["authorization"] ||
          response.config.headers["Authorization"];
        console.log(newToken);
        if (newToken) {
          const tokenValue = newToken.startsWith("Bearer ")
            ? newToken.slice(7)
            : newToken;
          setAuth(tokenValue);
          sessionStorage.setItem("token", tokenValue);
          console.log("New token set in auth context:", tokenValue);
        }

        return response;
      },
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          console.log("Error response status 403");
          prevRequest.sent = true;

          //   const newAccessToken = await refresh();
          //   console.log(newAccessToken);
          //   setAuth(newAccessToken);

          prevRequest.headers["Authorization"] = `Bearer ${auth}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, []);
  return axiosPrivate;
};

export default useAxiosPrivate;
