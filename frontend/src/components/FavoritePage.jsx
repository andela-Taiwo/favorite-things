import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Modal,
  Form,
  DatePicker,
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Input,
  Button,
  Col
} from "antd";

import "antd/dist/antd.css";
require("react-datetime");
import { FavoriteList } from "./FavoriteList";
import { userActions, favoriteActions } from "../actions";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class FavoritePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      category: "",
      description: "",
      ranking: "",
      submitted: false,
      visible: false,
      confirmLoading: false
    };
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ submitted: true, confirmLoading: true });
    const { title, category, ranking, description } = this.state;
    const { dispatch } = this.props;
    if (title & category & ranking) {
      dispatch(
        favoriteActions.addFavorite({
          title,
          description,
          ranking,
          category
        })
      );
    }

    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      });
    }, 2000);
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    const { creatingFavorite } = this.props;
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    // Only show error after a field is touched.
    const titleError = isFieldTouched("title") && getFieldError("title");
    const categoryError =
      isFieldTouched("category") && getFieldError("category");
    const rankingError = isFieldTouched("ranking") && getFieldError("ranking");
    const descriptionError =
      isFieldTouched("description") && getFieldError("description");
    const { Header, Footer, Sider, Content } = Layout;

    const { SubMenu } = Menu;
    return (
      <Layout className="content">
        <Content>
          <Layout>
            <Sider>
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub2"]}
                style={{ height: "100%", borderRight: 0 }}
              >
                <SubMenu
                  key="sub2"
                  title={
                    <span>
                      <Icon type="laptop" />
                      Favorite
                    </span>
                  }
                >
                  <Menu.Item key="5">
                    <Link to="/" className="btn btn-link">
                      Home
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="6">
                    <Link
                      to="/favorite"
                      className="btn btn-link"
                      onClick={this.showModal}
                    >
                      {" "}
                      +Add Favorite
                    </Link>
                    <Modal
                      title="Add a new favorite"
                      visible={visible}
                      onOk={this.handleSubmit}
                      confirmLoading={confirmLoading}
                      onCancel={this.handleCancel}
                    >
                      <Layout>
                        <Col span={12} offset={6}>
                          <Form layout="vertical" onSubmit={this.handleSubmit}>
                            <h3>Create A New Favvorite</h3>
                            <Form.Item
                              validateStatus={titleError ? "error" : ""}
                              help={titleError || ""}
                            >
                              {getFieldDecorator("title", {
                                rules: [
                                  {
                                    required: true,
                                    message: "Please provide title!"
                                  }
                                ]
                              })(
                                <Input
                                  style={{ width: "100%" }}
                                  name="title"
                                  onChange={this.handleChange}
                                  prefix={
                                    <Icon
                                      type="lock"
                                      style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                  }
                                  type="text"
                                  placeholder="Title"
                                />
                              )}
                            </Form.Item>

                            <Form.Item
                              validateStatus={descriptionError ? "error" : ""}
                              help={descriptionError || ""}
                            >
                              {getFieldDecorator("description", {
                                rules: [
                                  {
                                    required: false,
                                    message: "Please add a de!scription"
                                  }
                                ]
                              })(
                                <Input
                                  style={{ width: "100%" }}
                                  name="description"
                                  onChange={this.handleChange}
                                  prefix={
                                    <Icon
                                      type="lock"
                                      style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                  }
                                  type="text"
                                  placeholder="Description"
                                />
                              )}
                            </Form.Item>
                            <Form.Item
                              validateStatus={categoryError ? "error" : ""}
                              help={categoryError || ""}
                            >
                              {getFieldDecorator("category", {
                                rules: [
                                  {
                                    required: true,
                                    message: "Please provide category!"
                                  }
                                ]
                              })(
                                <Input
                                  style={{ width: "100%" }}
                                  name="category"
                                  onChange={this.handleChange}
                                  prefix={
                                    <Icon
                                      type="lock"
                                      style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                  }
                                  type="text"
                                  placeholder="Category"
                                />
                              )}
                            </Form.Item>
                            <Form.Item
                              validateStatus={rankingError ? "error" : ""}
                              help={rankingError || ""}
                            >
                              {getFieldDecorator("ranking", {
                                rules: [
                                  {
                                    required: true,
                                    message: "Please provide rank!"
                                  }
                                ]
                              })(
                                <Input
                                  onChange={this.handleChange}
                                  style={{ width: "100%" }}
                                  name="ranking"
                                  prefix={
                                    <Icon
                                      type="lock"
                                      style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                  }
                                  type="text"
                                  placeholder="Ranking"
                                />
                              )}
                            </Form.Item>
                            <Form.Item>
                              <Button
                                type="primary"
                                htmlType="submit"
                                disabled={hasErrors(getFieldsError())}
                              >
                                Create Favorite
                              </Button>
                            </Form.Item>
                          </Form>
                        </Col>
                      </Layout>
                    </Modal>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="user" />
                      subnav 1
                    </span>
                  }
                >
                  <Menu.Item key="5">
                    <Link to="/" className="btn btn-link">
                      Home
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="2">option2</Menu.Item>
                  <Menu.Item key="3">option3</Menu.Item>
                  <Menu.Item key="4">
                    <Link to="/login">Logout</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub3"
                  title={
                    <span>
                      <Icon type="notification" />
                      Notifications
                    </span>
                  }
                >
                  <Menu.Item key="9">option9</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout>
              <div className="favorites">
                <FavoriteList />
              </div>
            </Layout>
          </Layout>
        </Content>
      </Layout>
    );
  }
}
const WrappedHorizontalFavoriteForm = Form.create({ name: "horizontal_login" })(
  FavoritePage
);
function mapStateToProps(state) {
  const { favorites } = state;
  const errors = favorites.error;
  return {
    favorites,
    errors
  };
}

const connectedPage = connect(mapStateToProps)(WrappedHorizontalFavoriteForm);
export { connectedPage as FavoritePage };
