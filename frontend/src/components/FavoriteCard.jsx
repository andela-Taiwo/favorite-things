import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Pagination } from "antd";
import "antd/dist/antd.css";

export class FavoriteCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minValue: 0,
      maxValue: 12
    };
  }
  handleChange = value => {
    this.setState({
      minValue: (value - 1) * 12,
      maxValue: value * 12
    });
  };

  render() {
    const favorites =
      (this.props &&
        this.props.props &&
        this.props.props
          .slice(this.state.minValue, this.state.maxValue)
          .map(favorite => {
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
        <Pagination
          style={{ marginBottom: "10vh" }}
          defaultCurrent={1}
          defaultPageSize={12} //default size of page
          onChange={this.handleChange}
          total={this.props.props.length} //total number of card data available
        />
      </div>
    );
  }
}
