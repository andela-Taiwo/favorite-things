import axios from "axios";
import { store } from "./store";

export function authHeader() {
  let token = localStorage.getItem("token");
  let user = localStorage.getItem("user");

  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}
