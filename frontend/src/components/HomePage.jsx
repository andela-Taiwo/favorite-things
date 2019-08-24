import React from "react";

import { connect } from "react-redux";
import "antd/dist/antd.css";
import Navigation from "./Navigation";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { loggedIn } = this.props;
    return (
      <div>
        <Navigation props={loggedIn} />

        <div className="message">
          <h1>Welcome to trackT</h1>
          <br />
        </div>
        <div className="slogan">
          <h1>Awesome Way to Track Favorites</h1>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { authentication } = state;
  let { user, loggedIn } = authentication;
  return {
    loggedIn,
    user
  };
}

const Home = connect(mapStateToProps)(HomePage);
export { Home as HomePage };
