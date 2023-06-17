import React from "react";
import { Link } from "react-router-dom";
import sodaImage from "./images/soda.jpg";

function Soda() {
  return (
    <div>
      <img src={sodaImage} alt="soda cans" />
      <p><Link to={"/"}>Go Back</Link></p>
    </div>
  );
}

export default Soda;