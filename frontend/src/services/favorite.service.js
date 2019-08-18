import config from "config";
import { authHeader } from "../helpers";
import axios from "axios";

export const favoriteService = {
  getAllFavorites,
  createFavorite,
  updateFavorite,
  deleteFavorite,
  getFavorite
};

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
      // 'Content-Type': 'application/json',
    })
    .then(response => {
      if (response.status !== 200) {
        if (response.status === 401) {
          // auto logout if 401 response returned from api
          logout();
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

function createFavorite() {}

function getFavorite() {}

function updateFavorite() {}

function deleteFavorite() {}
