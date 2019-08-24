import React from "react";
import { connect } from "react-redux";

import { favoriteActions } from "../actions";
import { FavoriteCard } from "./FavoriteCard";
import Navigation from "./Navigation";

import LoadingContainer from "./LoadingContainer";
import "antd/dist/antd.css";

class FavoriteList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch(favoriteActions.getAllFavorites());
  }

  render() {
    const { favorites, loggedIn } = this.props;
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
        {favorites.loading ? (
          <LoadingContainer backgroundColor="#000000" />
        ) : (
          favorites.favorites && <FavoriteCard props={favorites} />
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
