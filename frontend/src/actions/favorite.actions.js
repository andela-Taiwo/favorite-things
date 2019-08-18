import { flightConstants } from "../constants";
import { flightService } from "../services";
import { alertActions } from ".";
import { history } from "../helpers/history";

export const flightActions = {
  getAllFlights,
  bookFlight,
  bookFlightTicket
  // getFlight
};

function getAllFlights() {
  return dispatch => {
    dispatch(request());

    flightService.getAll().then(
      flights => dispatch(success(flights)),
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: flightConstants.GETALL_REQUEST };
  }
  function success(flights) {
    return { type: flightConstants.GETALL_SUCCESS, flights };
  }
  function failure(error) {
    return { type: flightConstants.GETALL_FAILURE, error };
  }
}

function bookFlight(data) {
  return dispatch => {
    dispatch(request());
    flightService.bookFlight(data).then(
      flight => {
        dispatch(success(flight));
        dispatch(alertActions.success("New flight created successfully"));
        location.reload(true);
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: flightConstants.BOOK_REQUEST };
  }
  function success(flight) {
    return { type: flightConstants.BOOK_SUCCESS, flight };
  }
  function failure(error) {
    return { type: flightConstants.BOOK_FAILURE, error };
  }
}

function bookFlightTicket(data) {
  return dispatch => {
    dispatch(request());
    flightService.bookFlightTicket(data).then(
      flight => {
        dispatch(success(flight));
        dispatch(alertActions.success("New flight ticket successfully added."));
        history.push("/flight/order");
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: flightConstants.BOOK_TICKET_REQUEST };
  }
  function success(flight) {
    return { type: flightConstants.BOOK_TICKET_SUCCESS, flight };
  }
  function failure(error) {
    return { type: flightConstants.BOOK_TICKET_FAILURE, error };
  }
}
