import config from "config";
import { authHeader } from "../helpers";
import axios from "axios";
import {userService} from './'
const axiosInstance = axios.create({
  baseURL: `${config.apiUrl}`
});

function getAllFavorites() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };
  return axios
    .request({
      method: "get",
      url: `${config.apiUrl}/favorite/`,
      mode: "no-cors",
      headers: authHeader()
    })
    .then(response => {
      if (response.status !== 200) {
        if (response.status === 401) {
          // auto logout if 401 response returned from api
          userService.logout();
          location.reload(true);
        }
        const data = response.statusText;
        const error = (data && data.message) || response.statusText;

        return Promise.reject(error);
      }
      return response.data.payload;
    })
    .catch(error => {
      return error;
    });
}

function createFavorite(data) {
  return axios
    .request({
      method: "post",
      url: `${config.apiUrl}/favorite/`,
      mode: "no-cors",
      data: data,
      headers: authHeader()
      // 'Content-Type': 'application/json',
    })
    .then(response => {
      if (response.status == 200) {
        return response.data.payload;
      }
      location.reload(true);
      return response.data.error;
    })
    .catch(error => {
      const err = error.response.data;
      for (var key in err) {
        if (err.hasOwnProperty(key)) {
          return Promise.reject(`${key} is required`);
        }
      }
    });
}

function getFavorite(favoriteId) {
  return axios
    .request({
      method: "get",
      url: `${config.apiUrl}/favorite/${favoriteId}/`,
      mode: "no-cors",
      headers: authHeader()
    })
    .then(response => {
      if (response.status !== 200) {
        if (response.status === 401) {
          // auto logout if 401 response returned from api
          userService.logout();
          location.reload(true);
        }
        const data = response.statusText;
        const error = (data && data.message) || response.statusText;

        return Promise.reject(error);
      }
      return response.data.payload;
    })
    .catch(error => {
      return error;
    });
}

function updateFavorite(favoriteId, data) {
  return axios
    .request({
      method: "put",
      url: `${config.apiUrl}/favorite/${favoriteId}/`,
      mode: "no-cors",
      headers: authHeader(),
      data: data
    })
    .then(response => {
      if (response.status !== 200) {
        if (response.status === 401) {
          // auto logout if 401 response returned from api
          userService.logout();
          location.reload(true);
        }
        const data = response.statusText;
        const error = (data && data.message) || response.statusText;

        return Promise.reject(error);
      }
      return response.data.payload;
    })
    .catch(error => {
      return error;
    });
}

function deleteFavorite() {}

export const favoriteService = {
  getAllFavorites,
  createFavorite,
  updateFavorite,
  deleteFavorite,
  getFavorite
};
