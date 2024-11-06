import { useEffect } from "react";
import { api } from "../services/api";
// import { useRefreshToken } from "./useRefreshToken";

export const useAxiosPrivate = () => {
  // const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        if (config?.headers && !config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${localStorage.getItem(
            "token"
          )}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (
          error?.response?.status === 403 &&
          prevRequest &&
          !prevRequest.sent
        ) {
          prevRequest.sent = true;
          // const newAccessToken = await refresh();
          if (prevRequest.headers) {
            // prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          }
          return api(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
    // }, [refresh]);
  }, []);

  return api;
};
