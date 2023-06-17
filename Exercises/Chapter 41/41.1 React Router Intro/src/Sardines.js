import React from "react";
import { Link } from "react-router-dom";
import sardinesImage from "./images/sardines.jpg";

function Sardines() {
  return (
    <div>
      <img src={sardinesImage} alt="sardines" />
      <p><Link to={"/"}>Go Back</Link></p>
    </div>
  );
}

export default Sardines;