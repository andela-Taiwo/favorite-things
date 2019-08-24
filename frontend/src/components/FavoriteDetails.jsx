import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { favoriteActions } from "../actions";
import Navigation from "./Navigation";
import { Row, Col, Card, Layout } from "antd";
import LoadingContainer from "./LoadingContainer";
import "antd/dist/antd.css";
import Sidebar from "./Sidebar";
import { Table, Icon, Divider, Tag } from "antd";
import moment from "moment";

moment.locale(); // en

class FavoriteDetails extends React.Component {
  constructor(props) {
    super(props);
  }
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

  render() {
    const columns = [
      {
        title: "Title",
        dataIndex: "title",
        key: 1,
        width: 300
      },
      {
        title: "Ranking",
        dataIndex: "ranking",
        key: 2,
        width: 300,
        textAlign: "center"
      },

      {
        title: "Description",
        dataIndex: "description",
        key: 3,
        width: 300
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        width: 250
      },

      {
        title: "Modified Date",
        dataIndex: "timestamp",
        key: 4,
        width: 300
      }
    ];

    let data = [];
    const {
      favorites: { favorite, loading },
      loggedIn
    } = this.props;

    const data_log =
      favorite && favorite.data_log && favorite.data_log.length > 0
        ? favorite.data_log
        : [];
    if (data_log.length > 0) {
      data = data_log.map(data => {
        let columns = {};
        for (let property in data.data) {
          columns[property] = <Icon type="check" />;
        }
        columns["timestamp"] = moment(
          data["timestamp"],
          moment.ISO_8601
        ).format("LLL");
        columns["key"] = data["timestamp"];
        return columns;
      });
    }
    return loading ? (
      <LoadingContainer backgroundColor="#000000" />
    ) : (
      <Layout>
        <div className="details">
          <Navigation props={loggedIn} />
          <div className="favorite-details">
            <Row key={favorite.id}>
              <Col>
                <Card
                  className="gradient"
                  key={favorite.id}
                  title={
                    <div
                      className="card-title"
                      style={{
                        display: "flex",
                        justifyContent: "space-around"
                      }}
                    >
                      <h2>{favorite.title}</h2>
                      <Link
                        to={`/edit/${favorite.id}`}
                        id={favorite.id}
                        key={favorite.id}
                      >
                        <Icon
                          type="edit"
                          style={{ fontSize: "36px", color: "#000" }}
                        />
                      </Link>
                    </div>
                  }
                  bordered={true}
                  style={{
                    minWidth: "600px",
                    color: "rgba(0,0,0,0.6)",
                    minHeight: "300px"
                  }}
                  hoverable={true}
                  bodyStyle={{ minHeight: "300px" }}
                >
                  <React.Fragment key={favorite.id}>
                    <Row style={{ display: "flex", marginBottom: "2vh" }}>
                      {" "}
                      <Col>
                        <h3>Category</h3>
                      </Col>
                      <Col offset={2} style={{ padding: "5px" }}>
                        <h4>{favorite.category.name}</h4>
                      </Col>
                    </Row>
                    <Row style={{ display: "flex", marginBottom: "2vh" }}>
                      {" "}
                      <Col>
                        <h3>Ranking</h3>
                      </Col>
                      <Col offset={3} style={{ padding: "5px" }}>
                        <h4>{favorite.ranking}</h4>
                      </Col>
                    </Row>
                    <Row style={{ display: "flex" }}>
                      {" "}
                      <Col>
                        <h3>Description</h3>
                      </Col>
                      <Col offset={2} style={{ paddingTop: "5px" }}>
                        <p>{favorite.description}</p>
                      </Col>
                    </Row>
                    <footer className="card-footer">
                      <Row style={{ display: "flex" }}>
                        {" "}
                        <Col>
                          <h4>Created </h4>
                        </Col>
                        <Col offset={2}>{favorite.created_at}</Col>
                      </Row>
                    </footer>
                    <br />
                  </React.Fragment>
                </Card>
              </Col>
            </Row>
          </div>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 10 }}
            scroll={{ y: 240 }}
            bordered
          />
          ,
        </div>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const {
    favorites,
    authentication: { loggedIn }
  } = state;
  return {
    loggedIn,
    favorites
  };
}

const Favorite = connect(mapStateToProps)(FavoriteDetails);
export default Favorite;
