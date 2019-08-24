import React from "react";
import { Router } from "react-router";
import { Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import { history } from "../helpers";
import { alertActions } from "../actions";
import { PrivateRoute } from "../routes";
import { FavoritePage, NotFound, LoginPage, HomePage } from "../components/";
import FavoriteDetails from "../components/FavoriteDetails";
import FavoriteEditPage from "../components/FavoriteEditPage";
import { Alert } from "antd";
import "antd/dist/antd.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="overlay"></div>
          <div className="col-sm-8 col-sm-offset-2">
            {alert.message && (
              <Alert
                type={alert.type}
                message={alert.message}
                banner
                closable
              />
            )}
            <Router history={history}>
              <Switch>
                <Route exact path="/" component={HomePage} />

                <PrivateRoute path="/favorite" component={FavoritePage} />

                <PrivateRoute path="/details/:id" component={FavoriteDetails} />
                <PrivateRoute path="/edit/:id" component={FavoriteEditPage} />

                <Route path="/login" component={LoginPage} />
                <Route component={NotFound} />
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
