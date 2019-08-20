import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Row, Col, Card } from "antd";
import "antd/dist/antd.css";

export class FavoriteCard extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    
    const favorites =
      (this.props && this.props.props && this.props.props.favorites &&
        this.props.props.favorites.map(favorite => {
          return (
            <Link
            to={`/details/`}
            >
            <Col key={favorite.title} span={8}>
              <Card key={favorite.id} title={favorite.title} bordered={true}>
                <h3>Category: {favorite.category.name} </h3> <br />
                <h3>Rank: {favorite.ranking} </h3>
                <br />
              </Card>{" "}
            </Col>
            </Link>
          );
        })) ||
      [];

    return (
      <div>
        <Row gutter={16}>{favorites}</Row>
      </div>
    );
  }
}
