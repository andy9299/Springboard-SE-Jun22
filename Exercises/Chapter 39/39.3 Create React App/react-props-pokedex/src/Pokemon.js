import React from "react";
import './Pokemon.css';


const Pokemon = (props) => {
  let imgURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`;
  return (
    <div className="Pokemon">
      <div className="Pokemon-name">{props.name}</div>
      <img className="Pokemon-image" src={imgURL} />
      <div className="Pokecard-data">Type: {props.type}</div>
      <div className="Pokecard-data">EXP: {props.exp}</div>
    </div>
  );
};

Pokemon.defaultProps = { id: 4, name: "Charmander", type: "fire", exp: 62 };

export default Pokemon;