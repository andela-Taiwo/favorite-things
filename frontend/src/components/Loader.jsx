import React from "react";

const Loading = ({ backgroundColor }) => (
  <div className="lds-css ng-scope">
    <div className="lds-facebook">
      <div style={{ backgroundColor }} />
      <div style={{ backgroundColor }} />
      <div style={{ backgroundColor }} />
    </div>
  </div>
);

export default Loading;
