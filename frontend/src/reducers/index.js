import { combineReducers } from "redux";
import { authentication, setToken } from "./auth.reducers";
// import { registration } from "./registration.reducer";
import { alert } from "./alert.reducer";
import { favorites } from "./favorite.reducers";

const rootReducer = combineReducers({
  authentication,
  favorites,
  alert
});

export default rootReducer;
