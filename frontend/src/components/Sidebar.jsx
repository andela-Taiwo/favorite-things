import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { Modal, Form, Layout, Menu, Icon, Input, Button, Col } from "antd";

import "antd/dist/antd.css";

import { favoriteActions } from "../actions";
import { hasErrors } from "../helpers/hasErrors";

class Sidebar extends React.Component {
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
    this.signal = axios.CancelToken.source();
    // this.controller = new AbortController();
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  componentWillUnmount() {
    window.addEventListener("scroll", this.onScroll, false);
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    this.props.form.validateFields();
    e.preventDefault();
    this.setState({ submitted: true, confirmLoading: true });
    const { title, category, ranking, description } = this.state;
    const { dispatch } = this.props;

    if (title && category && ranking) {
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
    const { TextArea } = Input;
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
                defaultSelectedKeys={["sub2"]}
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
                  <Menu.Item key="10">
                    <Link to="#" className="btn btn-link">
                      Home
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="11">
                    <a className="btn btn-link" onClick={this.showModal}>
                      {" "}
                      +Add Favorite
                    </a>
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
                            <h3>Create A New Favorite</h3>
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
                                <TextArea
                                  rows={4}
                                  tyle={{ width: "100%" }}
                                  name="description"
                                  onChange={this.handleChange}
                                  prefix={
                                    <Icon
                                      type="lock"
                                      style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                  }
                                  type="text"
                                  min="10"
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
                                  type="number"
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
              </Menu>
            </Sider>
            <Layout>{this.props.children}</Layout>
          </Layout>
        </Content>
      </Layout>
    );
  }
}
const WrappedHorizontalFavoriteForm = Form.create({ name: "horizontal_login" })(
  Sidebar
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
export default connectedPage;
