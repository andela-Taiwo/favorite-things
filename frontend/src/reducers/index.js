import { combineReducers } from "redux";
import { authentication } from "./auth.reducers";
import { alert } from "./alert.reducers";
import { favorites } from "./favorite.reducers";

const rootReducer = combineReducers({
  authentication,
  favorites,
  alert
});

export default rootReducer;
