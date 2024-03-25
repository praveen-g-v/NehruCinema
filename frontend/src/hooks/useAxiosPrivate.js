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
        console.log(auth);
        if (!config.headers.Cookie) {
          config.headers["Authorization"] = `Bearer ${auth}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
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
