import { favoriteConstants } from "../constants";
import { favoriteService } from "../services";
import { alertActions } from ".";
import { history } from "../helpers";

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
      favorites => {
        dispatch(success(favorites));
      },
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

function addFavorite(data) {
  return dispatch => {
    dispatch(request());

    favoriteService.createFavorite(data).then(
      favorite => {
        dispatch(success(favorite));
        dispatch(alertActions.success("New favorite created successfully"));
        history.push(`/details/${favorite[0].id}`);
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: favoriteConstants.ADD_FAVORITE_REQUEST };
  }
  function success(favorite) {
    return { type: favoriteConstants.ADD_FAVORITE__SUCCESS, favorite };
  }
  function failure(error) {
    return { type: favoriteConstants.ADD_FAVORITE__FAILURE, error };
  }
}

function updateFavorite(favoriteId, data) {
  return dispatch => {
    dispatch(request());
    favoriteService.updateFavorite(favoriteId, data).then(
      favorite => {
        dispatch(success(favorite));
        history.push(`/details/${favorite.id}`);
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: favoriteConstants.UPDATE_FAVORITE_REQUEST };
  }
  function success(favorite) {
    return { type: favoriteConstants.UPDATEFAVORITE__SUCCESS, favorite };
  }
  function failure(error) {
    return { type: favoriteConstants.UPDATE_FAVORITE__FAILURE, error };
  }
}

function retrieveFavorite(favoriteId) {
  return dispatch => {
    dispatch({ type: favoriteConstants.GET_FAVORITE_REQUEST });
    favoriteService.getFavorite(favoriteId).then(
      favorite => {
        dispatch(success(favorite));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: favoriteConstants.GET_FAVORITE_REQUEST };
  }
  function success(favorite) {
    return { type: favoriteConstants.GET_FAVORITE__SUCCESS, favorite };
  }
  function failure(error) {
    return { type: favoriteConstants.GET_FAVORITE__FAILURE, error };
  }
}

function deleteFavorite() {}
