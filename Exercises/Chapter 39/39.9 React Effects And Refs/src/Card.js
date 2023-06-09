import React from "react";

function Card({ name, image }) {
  return (
    <img alt={name} src={image}>
    </img>
  );
}

export default Card;