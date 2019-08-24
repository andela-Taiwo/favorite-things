import React from "react";
import Loading from "./Loader";

const LoadingContainer = ({ backgroundColor }) => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Loading backgroundColor={backgroundColor} />
    </div>
  );
};

export default LoadingContainer;
