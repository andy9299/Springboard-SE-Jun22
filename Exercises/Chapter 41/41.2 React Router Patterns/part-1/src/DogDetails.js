import React from "react";
import { v4 as uuid } from 'uuid';

function DogDetails({ dog }) {
  return (
    <div>
      <h1>{dog.name}</h1>
      <h2>Aged:{dog.age}</h2>
      <img src={dog.src} alt="dog" />
      <ul>{dog.facts.map((fact) => { return <li key={uuid()}>{fact}</li>; })}</ul>
    </div>
  );
}
export default DogDetails;