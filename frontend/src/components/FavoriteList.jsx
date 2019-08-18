import React from "react";
import { connect } from "react-redux";

import { favoriteActions } from "../actions";
import { FavoriteCard } from "./FavoriteCard";
import Navigation from "./Navigation";
import "antd/dist/antd.css";
import { FavoritePage } from "./FavoritePage";

class FavoriteList extends React.Component {
  constructor(props) {
    super(props);
    this.FavoriteCard = React.createRef();
  }
  componentDidMount() {
    this.props.dispatch(favoriteActions.getAllFavorites());
  }

  handleShowFavorite = event => {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(favoriteActions.getFavorite(id));
  };
  render() {
    const { favorites, loggedIn } = this.props;
    return (
      <div className="favoritesList">
        <Navigation props={loggedIn} />
        <h2
          style={{
            textAlign: "center",
            fontSize: "32px",
            margin: "12px 0 12px 0"
          }}
        >
          {" "}
          All Favorites
        </h2>
        {favorites.loading && <em>Loading favorites...</em>}
        {favorites.error && (
          <span className="text-danger">ERROR: {favorites.error}</span>
        )}
        {favorites.favorites && (
          // <h1>Hello</h1>
          <FavoriteCard
            ref={this.FavoriteCard}
            props={favorites}
            handleShowFavorite={this.handleShowFavorite}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { favorites, authentication } = state;
  let { user, loggedIn } = authentication;
  return {
    loggedIn,
    favorites
  };
}

const ListFavorites = connect(mapStateToProps)(FavoriteList);
export { ListFavorites as FavoriteList };
