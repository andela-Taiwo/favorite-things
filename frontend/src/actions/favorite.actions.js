import { favoriteConstants } from "../constants";
import { favoriteService } from "../services";
import { alertActions } from ".";

export const favoriteActions = {
  getAllFavorites,
  addFavorite,
  updateFavorite,
  retrieveFavorite,
  deleteFavorite
};

function getAllFavorites() {
  return dispatch => {
    dispatch(request());

    favoriteService.getAllFavorites().then(
      favorites => dispatch(success(favorites)),
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: favoriteConstants.GETALL_REQUEST };
  }
  function success(favorites) {
    return { type: favoriteConstants.GETALL_SUCCESS, favorites };
  }
  function failure(error) {
    return { type: favoriteConstants.GETALL_FAILURE, error };
  }
}

function addFavorite() {}

function updateFavorite() {}

function retrieveFavorite() {}

function deleteFavorite() {}
