import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Col, Sider, Button, Menu } from "antd";
import "antd/dist/antd.css";
import Navigation from "./Navigation";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { Header, Content, Footer } = Layout;
    const { loggedIn } = this.props;
    return (
      <Layout>
        <Content className="content">
          <Navigation props={loggedIn} />
          <div />
          <Col
            span={12}
            offset={6}
            style={{
              fontSize: "18x",
              marginTop: "22%",
              textAlign: "center"
            }}
          >
            <Content>
              <h1
                style={{
                  fontSize: "48px",
                  marginTop: "60px",
                  marginBottom: "40px",
                  textAlign: "center",
                  color: "#e65100"
                }}
              >
                Awesome Way to Track Favorites{" "}
              </h1>
            </Content>
            <Button type="primary" shape="round" size="large">
              Learn More ...
            </Button>
            <p>
              Welcome to Favorite Things . We are here to make sure you have a
              wonderful experience.{" "}
            </p>
          </Col>
        </Content>
      </Layout>
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
