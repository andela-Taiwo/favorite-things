import { favoriteConstants } from "../constants";
export function favorites(state = {}, action) {
  switch (action.type) {
    case favoriteConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case favoriteConstants.GETALL_SUCCESS:
      return {
        favorites: action.favorites
      };
    case favoriteConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case favoriteConstants.ADD_FAVORITE_REQUEST:
      return {
        proccessing: true
      };
    case favoriteConstants.ADD_FAVORITE__SUCCESS:
      return {
        favorite: action.favorite
      };
    case favoriteConstants.ADD_FAVORITE__FAILURE:
      return {
        error: action.error
      };
    case favoriteConstants.UPDATE_FAVORITE_REQUEST:
      return {
        proccessing: true
      };
    case favoriteConstants.UPDATE_FAVORITE__SUCCESS:
      return {
        favorite: action.favorite
      };
    case favoriteConstants.UPDATE_FAVORITE__FAILURE:
      return {
        error: action.error
      };
    case favoriteConstants.GET_FAVORITE_REQUEST:
      return {
        proccessing: true
      };
    case favoriteConstants.GET_FAVORITE__SUCCESS:
      return {
        favorite: action.favorite
      };
    case favoriteConstants.GET_FAVORITE__FAILURE:
      return {
        error: action.error
      };
    case favoriteConstants.DELETE_FAVORITE_REQUEST:
      // add 'deleting:true' property to favorite being deleted
      return {
        ...state,
        favorite: state.favorites.map(favorite =>
          favorite.id === action.id ? { ...favorite, deleting: true } : favorite
        )
      };
    case favoriteConstants.DELETE_FAVORITE_SUCCESS:
      // remove deleted favorite from state
      return {
        favorites: state.favorites.filter(favorite => favorite.id !== action.id)
      };
    case favoriteConstants.DELETE_FAVORITE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to favorite
      return {
        ...state,
        favorites: state.favorites.map(favorite => {
          if (favorite.id === action.id) {
            // make copy of favorite without 'deleting:true' property
            const { deleting, ...favoriteCopy } = favorite;
            // return copy of favorite with 'deleteError:[error]' property
            return { ...favoriteCopy, deleteError: action.error };
          }

          return favorite;
        })
      };
    default:
      return state;
  }
}
