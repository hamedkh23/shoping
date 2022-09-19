import React from "react";

//Gif
import Spinner from "../../gif/Spinner.gif";

const Loader = () => {
  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <img src={Spinner} alt="loading" />
    </div>
  );
};

export default Loader;
