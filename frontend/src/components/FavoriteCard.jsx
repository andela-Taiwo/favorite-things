import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "antd";
import "antd/dist/antd.css";

export class FavoriteCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const favorites =
      (this.props &&
        this.props.props &&
        this.props.props.favorites &&
        this.props.props.favorites.map(favorite => {
          const category = favorite.category ? favorite.category.name : "";
          return (
            <Link
              to={`/details/${favorite.id}`}
              id={favorite.id}
              key={favorite.id}
            >
              <Col className="favorite-card" key={favorite.id} span={8}>
                <Card
                  key={favorite.id}
                  title={`Title: ${favorite.title}`}
                  bordered={true}
                >
                  <h3>Category: {category}</h3>
                  <span></span>
                  <h3>Rank: {favorite.ranking} </h3>
                  <br />
                </Card>
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
