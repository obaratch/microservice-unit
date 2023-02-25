import Axios from "axios";

const axios = Axios.create({
  baseURL: `//${location.hostname}:3000`,
});

export const ajax = (method, url, data, options) => {
  return axios({ method, url, data, ...options })
    .catch((err) => {
      console.error("ajax failed:", err);
      throw err;
    })
    .then((resp) => resp.data);
};

const get = (path, query, options) => ajax("GET", path, query, options);
const post = (path, data, options) => ajax("POST", path, data, options);
const put = (path, data, options) => ajax("POST", path, data, options);
const del = (path, data, options) => ajax("POST", path, data, options);

export const HttpClient = { get, post, put, del };
