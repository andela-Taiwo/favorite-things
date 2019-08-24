import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, Form, Layout, Menu, Icon, Input, Button, Col } from "antd";
import LoadingContainer from "./LoadingContainer";
import "antd/dist/antd.css";

import { favoriteActions } from "../actions";
import { hasErrors } from "../helpers/hasErrors";
import Navigation from "./Navigation";
import Sidebar from "./Sidebar";

export class FavoriteEditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      category: "",
      ranking: "",
      description: "",
      submited: false
    };
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    const {
      dispatch,
      match: {
        params: { id }
      }
    } = this.props;
    if (!id) {
      return;
    }
    dispatch(favoriteActions.retrieveFavorite(id));
  }

  componentDidUpdate(prevProps) {
    const {
      form: { setFieldsValue },
      favorite
    } = this.props;
    if (favorite !== prevProps.favorite) {
      for (var field in favorite) {
        if (field === "category") {
          setFieldsValue({
            [field]: favorite[field].name
          });
        } else {
          setFieldsValue({
            [field]: favorite[field]
          });
        }
      }
    }
  }

  handleSubmit = e => {
    this.props.form.validateFields();
    e.preventDefault();
    this.setState({ submitted: true });
    const { title, category, ranking, description } = this.state;

    const { id } = this.props.match.params;
    const { dispatch } = this.props;
    var data = {};
    if (title !== "") {
      data["title"] = title;
    }
    if (ranking !== "") {
      data["ranking"] = ranking;
    }
    if (description !== "") {
      data["description"] = description;
    }
    if (category !== "") {
      data["category"] = category;
    }
    if (Object.keys(data).length) {
      dispatch(favoriteActions.updateFavorite(id, data));
    }
  };

  render() {
    const { TextArea } = Input;
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    const { favorite, loggedIn, loading } = this.props;
    const titleError = isFieldTouched("title") && getFieldError("title");
    const categoryError =
      isFieldTouched("category") && getFieldError("category");
    const rankingError = isFieldTouched("ranking") && getFieldError("ranking");
    const descriptionError =
      isFieldTouched("description") && getFieldError("description");
    return loading ? (
      <LoadingContainer backgroundColor="#000000" />
    ) : (
      <Sidebar>
        <div className="details">
          <Navigation props={loggedIn} />
          <Layout className="form-layout">
            <Form
              layout="vertical"
              onSubmit={this.handleSubmit}
              className="edit-form"
            >
              <h3>Edit Favorite</h3>
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
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
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
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
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
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
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
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
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
                  Edit Favorite
                </Button>
              </Form.Item>
            </Form>
          </Layout>
        </div>
      </Sidebar>
    );
  }
}

const WrappedHorizontalFavoriteForm = Form.create({ name: "horizontal_login" })(
  FavoriteEditPage
);

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

const connectedPage = connect(mapStateToProps)(WrappedHorizontalFavoriteForm);
export default connectedPage;
