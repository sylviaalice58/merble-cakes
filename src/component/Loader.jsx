import React from "react";
import "../css/Loader.css";

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="spinner"></div>
      <p className="loading-text">Loading cakes...</p>
    </div>
  );
};

export default Loader;