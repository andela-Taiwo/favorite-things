import { userConstants } from "../constants";

const tokenInitialState = null;
export function setToken(state = tokenInitialState, action) {
  switch (action.type) {
    case userConstants.SET_TOKEN:
      return action.data;
    default:
      return state;
  }
}

let user = localStorage.getItem("user");
const initialState = user ? { loggedIn: true, user } : {};
export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        error: action.error
      };
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}
