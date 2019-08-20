import React from "react";



import "antd/dist/antd.css";

import { FavoriteList } from "./FavoriteList";
import Sidebar from "./Sidebar"

export const FavoritePage = () => {

    return (
      <Sidebar> <FavoriteList /></Sidebar>
       
    );
}



