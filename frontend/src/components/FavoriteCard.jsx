import React from "react";
import { Table, Row, Col, Card } from "antd";
import "antd/dist/antd.css";

export class FavoriteCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      selectedCard: [], // Check here to configure the default column
      passengers: [],
      loading: false,
      visible: false,
      confirmLoading: false
    };
  }
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      this.setState({
        selectedRowKeys,
        selectedRows
      });
    }
  };

  render() {
    const favorites =
      (this.props && this.props.props && this.props.props.favorites &&
        this.props.props.favorites.map(favorite => {
          return (
            <Col key={favorite.title} span={8}>
              <Card key={favorite.id} title={favorite.title} bordered={true}>
                <h3>Category: {favorite.category.name} </h3> <br />
                <h3>Rank: {favorite.ranking} </h3>
                <br />
              </Card>{" "}
            </Col>
          );
        })) ||
      [];

    // const {Card} = Layout
    const tableColumns = [
      {
        title: "Title",
        dataIndex: "title",
        key: "title"
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category"
      },
      {
        title: "Rank",
        dataIndex: "ranking",
        key: "ranking"
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description"
      }
    ];
    // const { selectedRowKeys, visible, confirmLoading } = this.state;

    // const hasSelected = selectedRowKeys.length > 0;

    return (
      <div>
        <Row gutter={16}>{favorites}</Row>
        {/* <Table
          dataSource={this.props.props.favorites}
          rowSelection={this.rowSelection}
          columns={tableColumns}
        /> */}
      </div>
    );
  }
}
