import axios from "axios";

const instance = (token = "") =>
  axios.create({
    validateStatus(status) {
      return status < 500; // Reject only if the status code is greater than or equal to 500
    },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const methods = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
  PATCH: "patch",
};


const interceptedInstance = (token = "", dispatch = action => action) => {
  const axi = instance(token);
  // Add a request interceptor
  axi.interceptors.request.use(
    config =>
      // Do something before request is sent
      config,
    error =>
      // Do something with request error
      Promise.reject(error)
  );

  axi.interceptors.response.use(
    response => {
      if (response.status === 401) {
        dispatch({
          type: "AUTH_LOGOUT",
        });
      }
      return response;
    },
    error => Promise.reject(error)
  );
  return axi;
};

export default interceptedInstance;
