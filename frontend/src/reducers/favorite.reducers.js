import { favoriteConstants } from "../constants";

const initialState = {
  loading: true,
  favorites: [],
  favorite: {}
};

export function favorites(state = initialState, action) {
  switch (action.type) {
    case favoriteConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case favoriteConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        favorites: action.favorites
      };
    case favoriteConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case favoriteConstants.GETALL_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.categories
      };
    case favoriteConstants.GETALL_CATEGORY_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case favoriteConstants.ADD_FAVORITE_REQUEST:
      return {
        ...state
        // loading: true
      };
    case favoriteConstants.ADD_FAVORITE__SUCCESS:
      return {
        ...state,
        favorite: action.favorite,
        loading: true
      };
    case favoriteConstants.ADD_FAVORITE__FAILURE:
      return {
        ...state,
        error: action.error
      };
    case favoriteConstants.UPDATE_FAVORITE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case favoriteConstants.UPDATE_FAVORITE__SUCCESS:
      return {
        ...state,
        favorite: action.favorite
      };
    case favoriteConstants.UPDATE_FAVORITE__FAILURE:
      return {
        ...state,
        error: action.error
      };
    case favoriteConstants.GET_FAVORITE_REQUEST:
      return {
        ...state
      };
    case favoriteConstants.GET_FAVORITE__SUCCESS:
      return {
        ...state,
        favorite: action.favorite,
        loading: false
      };
    case favoriteConstants.GET_FAVORITE__FAILURE:
      return {
        ...state,
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
        ...state,
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
