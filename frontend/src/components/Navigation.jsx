import React from "react";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";

export class Navigation extends React.Component {
  render() {
    const { Header } = Layout;
    const { loggedIn } = this.props;

    if (loggedIn === true) {
      return (
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="1">
              <Link to="/" className="btn btn-link">
                Home
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/favorite" className="btn btn-link">
                Favorites
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/login" className="btn btn-link">
                Logout
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
      );
    } else {
      return (
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="1">
              <Link to="/" className="btn btn-link">
                Home
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="#" className="btn btn-link">
                Signup
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/login" className="btn btn-link">
                Login
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
      );
    }
  }
}

function mapStateToProps(state) {
  const {
    favorites: { favorite, loading },
    authentication
  } = state;
  let { loggedIn } = authentication;
  return {
    loggedIn,
    favorite,
    loading
  };
}

const NavigationContainer = connect(mapStateToProps)(Navigation);
export default NavigationContainer;
