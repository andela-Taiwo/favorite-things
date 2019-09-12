import { userConstants } from "../constants";
import { userService } from "../services";
import { alertActions } from "./";
import { history } from "../helpers";

function login(email, password) {
  return dispatch => {
    dispatch(request({ email }));

    userService.login(email, password).then(
      user => {
        dispatch(success(user));
        history.push("/favorite");
      },
      error => {
        // console.log(error, '$$$$$$$$$$$$$$$$$$$$')
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    )
  // .catch(error => console.log(error, 'gggggggg'));
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

export const userActions = {
  login,
  logout
};
