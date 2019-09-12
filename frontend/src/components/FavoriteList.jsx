import React from "react";
import { connect } from "react-redux";

import { favoriteActions } from "../actions";
import { FavoriteCard } from "./FavoriteCard";
import Navigation from "./Navigation";

import LoadingContainer from "./LoadingContainer";
import "antd/dist/antd.css";
import {Select} from 'antd'
class FavoriteList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch(favoriteActions.getAllCategories())
    this.props.dispatch(favoriteActions.getAllFavorites());

  }
  handleChange = (value) => {
      this.props.dispatch(favoriteActions.getAllFavorites(value));
      console.log(value)
  }
  render() {
    const { Option } = Select;
    const { favorites: {favorites, categories, loading}, loggedIn } = this.props;
    const children = categories && categories.map((category) => {
        return <Option  key={category.id}>{category.name}</Option>
    } )
    return (
      <div className="favoritesList">
        <Navigation props={loggedIn} />
        <h2
          style={{
            textAlign: "center",
            fontSize: "32px",
            margin: "12px 0 12px 0",
            color: "#1890FF"
          }}
        >
          All Favorites
        </h2>
          <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Please select"
              onChange={this.handleChange}
          >
              {children}
          </Select>

        {loading ? (
          <LoadingContainer backgroundColor="#000000" />
        ) : (
            favorites.length > 0 && <FavoriteCard props={favorites} />
        )}
      </div>
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

const ListFavorites = connect(mapStateToProps)(FavoriteList);
export { ListFavorites as FavoriteList };
