import React from "react";
import { Link } from "react-router-dom";
import chipsImage from "./images/chips.jpg";

function Chips() {
  return (
    <div>
      <img src={chipsImage} alt="chips" />
      <p><Link to={"/"}>Go Back</Link></p>
    </div>
  );
}

export default Chips;