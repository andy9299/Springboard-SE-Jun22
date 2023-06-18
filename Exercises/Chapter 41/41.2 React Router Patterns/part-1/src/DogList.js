import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from 'uuid';

function DogList({ dogs }) {
  return (
    <div>
      {dogs.map((dog) => {
        return (
          <div key={uuid()}>
            <img src={dog.src} alt={dog.name} />
            <p><Link to={`/dogs/${dog.name.toLowerCase()}`}>{dog.name}</Link></p>
          </div>
        );
      })}
    </div>
  );
}
export default DogList;