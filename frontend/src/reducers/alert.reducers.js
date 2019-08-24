import { alertConstants } from "../constants";
let inititalState = {
  type: "",
  message: "",
  loading: true
};
export function alert(state = inititalState, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: "success",
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: "error",
        message: action.message
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state;
  }
}
