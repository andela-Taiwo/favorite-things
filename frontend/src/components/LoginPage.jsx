import React from "react";
import { connect } from "react-redux";
import { Form, Layout, Input, Button, Col } from "antd";
import "antd/dist/antd.css";
import { userActions } from "../actions";
import Navigation from "./Navigation";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.dispatch(userActions.logout());

    this.state = {
      email: "",
      password: "",
      submitted: false,
      loggedIn: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (email && password) {
      dispatch(userActions.login(email, password));
    }
  }

  render() {
    const { Content } = Layout;
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;
    const email = isFieldTouched("email") && getFieldError("email");
    const password = isFieldTouched("password") && getFieldError("password");
    return (
      <Layout>
        <Content className="content" style={{ textAlign: "center" }}>
          <Navigation props={this.state.loggedIn} />
          <Col span={12} offset={6}>
            <Form
              layout="vertical"
              onSubmit={this.handleSubmit}
              name="form"
              style={{ textAlign: "center", marginTop: "27%" }}
            >
              <h3>Login</h3>
              <Form.Item
                validateStatus={email ? "error" : ""}
                help={email || ""}
              >
                {getFieldDecorator("email", {
                  rules: [
                    { required: true, message: "Please provide a valid email" }
                  ]
                })(
                  <Input
                    name="email"
                    onChange={this.handleChange}
                    type="email"
                    style={{ color: "rgba(0,0,0,.25)", width: "30%" }}
                    placeholder="Email"
                  />
                )}
              </Form.Item>
              <Form.Item
                validateStatus={password ? "error" : ""}
                help={password || ""}
              >
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "Please provide a valid password"
                    }
                  ]
                })(
                  <Input
                    name="password"
                    onChange={this.handleChange}
                    type="password"
                    style={{ color: "rgba(0,0,0,.25)", width: "30%" }}
                    placeholder="Password"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={hasErrors(getFieldsError())}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Content>
      </Layout>
    );
  }
}
const WrappedHorizontalLoginForm = Form.create({ name: "horizontal_login" })(
  LoginPage
);
function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

const connectedLoginPage = connect(mapStateToProps)(WrappedHorizontalLoginForm);
export { connectedLoginPage as LoginPage };
