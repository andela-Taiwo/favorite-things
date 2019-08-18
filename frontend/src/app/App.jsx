import React from "react";
// import { Router, Route } from 'react-router-dom';
import { Router, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";

import { history } from "../helpers";
import { alertActions } from "../actions";
import { PrivateRoute } from "../routes";
import { HomePage } from "../components/HomePage";
import { LoginPage } from "../components/LoginPage";
import { FavoritePage } from "../components/";
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

                <Route path="/login" component={LoginPage} />
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
