import React from "react";
import { connect } from "react-redux";
import { favoriteActions } from "../actions";
import Navigation from "./Navigation";
import {Row, Col, Card } from "antd";
import LoadingContainer from './LoadingContainer'
import "antd/dist/antd.css";
import Sidebar from "./Sidebar"
import { Table, Divider, Tag } from 'antd';
 
class FavoriteDetails extends React.Component{
    constructor(props) {
        super(props);
        this.FavoriteCard = React.createRef();
      }
  componentDidMount() {
    
    const { dispatch, match: { params: { id } } } = this.props;
    if (!id) {
        return;
      }

    dispatch(favoriteActions.retrieveFavorite(id))
  }

  render() {
    const columns = [
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
        },
      ];

      const data = [
        {
          key: '1',
          action: 'update rank ',
          date: '2019-04-02',
        },
        {
          key: '2',
          date: '2019-04-02',
          action: 'update category '
        },
        {
          key: '3',
          action: 'create the favorite',
          date: '2019-04-02',
        },
      ]
      
    const {
      favorite, loggedIn
    } = this.props;
    let category = favorite && favorite.category ? favorite.category.name : 'Not Available'
    return !favorite ? (
        <LoadingContainer backgroundColor="#000000"/>
    ) : (
    <Sidebar>
      <div className="details">
        <Navigation props={loggedIn} />
        <div className='favorite-details'>
            <Row >
                <Col key={favorite.id} title={favorite.id}>
                    <Card key={favorite.id} title={favorite.title} bordered={true} style={{minWidth: '600px', minHeight: '300px',backgroundColor: 'rgb(180, 200, 204)'}} hoverable={true} bodyStyle={{minHeight: '300px'}}>
                        <React.Fragment key={favorite.id} >
                            <h3>Category: {category} </h3> <br />
                            <h3>Rank: {favorite.ranking} </h3>
                            <Card>{favorite.description}</Card>
                            <h3>Created: {favorite.created_at}</h3>
                            <h3>Modified:  {favorite.last_modified}</h3>
                            <br />
                        </React.Fragment>
                    </Card>
                </Col>
            </Row>
            <Row >
                <Col key={favorite.id} title={favorite.id}>
                    <Card key={favorite.id} title='History' bordered={true} style={{minWidth: '600px', minHeight: '300px',backgroundColor: 'rgb(180, 200, 204)'}} hoverable={true} bodyStyle={{minHeight: '300px'}}>
                    <Table columns={columns} dataSource={data} />,
                    </Card>
                </Col>
            </Row>

        </div>
        
      </div>
      </Sidebar>
    );
  }
}


function mapStateToProps(state) {
    const { favorites: { favorite }, authentication } = state;
    let {loggedIn } = authentication;
    return {
      loggedIn,
      favorite
    };
  }

  const Favorite = connect(mapStateToProps)(FavoriteDetails);
  export default Favorite;