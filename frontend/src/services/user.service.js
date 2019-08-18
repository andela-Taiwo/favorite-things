import config from "config";
import { authHeader } from "../helpers";
import axios from "axios";

export const userService = {
  login,
  logout,
  register,
  update
};

function login(email, password) {
  return axios
    .request({
      method: "post",
      url: `${config.apiUrl}/login/`,
      data: JSON.stringify({ email, password }),
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      const token = response.data.access;
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", token);

      return response.data.user;
    })
    .catch(error => {
      return Promise.reject(error.response.data.non_field_errors);
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function register(user) {
  const userInfo = {
    first_name: user.firstName,
    last_name: user.lastName,
    password1: user.password1,
    password2: user.password2,
    email: user.email
  };
  return axios
    .request({
      method: "post",
      url: `${config.apiUrl}/registration/`,
      data: JSON.stringify(userInfo),
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return response.data.payload;
    })
    .catch(error => {
      return Promise.reject(JSON.stringify(error.response.data));
    });
}

function update(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(
    handleResponse
  );
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;

      return Promise.reject(error);
    }

    return data;
  });
}
