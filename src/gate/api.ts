import axios, { Method } from "axios";

import { isEmpty, isServer } from "../helpers";

const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

client.defaults.timeout = 20000;
client.interceptors.response.use(
  (config) => config,
  (error: any) => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedError) {
      console.error(error);
    }
    if (error.response.status === 401) {
      // redirect to the login page
    }
    return Promise.reject(error);
  }
);

const call = async <T>(
  method: Method,
  url: string,
  data: any = {}
): Promise<T> => {
  const accessToken = isServer() ? "" : localStorage.getItem("token");

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (accessToken) {
    (client as any).defaults.headers.common["Authorization"] =
      "Bearer " + accessToken;
  }

  const request: any = { headers, method, url };

  if (!isEmpty(data)) {
    if (method === "get") {
      request.params = data;
    } else {
      request.data = data;
    }
  }

  try {
    const response = await client(request);
    return Promise.resolve(response.data);
  } catch (error: any) {
    let err = null;
    if (error.response) {
      err = error.response;
    } else if (error.request) {
      err = { message: error.request._response };
    } else {
      err = error;
    }
    return Promise.reject(err);
  }
};


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  delete: <T, D = any>(url: string, data?: D | null) =>
    call<T>("delete", url, data),
  get: <T, D = any>(url: string, data?: D | null) => call<T>("get", url, data),
  patch: <T, D = any>(url: string, data?: D | null) =>
    call<T>("patch", url, data),
  post: <T, D = any>(url: string, data?: D | null) =>
    call<T>("post", url, data),
  put: <T, D = any>(url: string, data?: D | null) => call<T>("put", url, data),
  
};
