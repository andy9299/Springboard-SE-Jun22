import React from "react";
import { useParams, Link } from "react-router-dom";
import DogDetails from "./DogDetails";

function FilterDogDetails({ dogs }) {
  const { name } = useParams();
  if (name) {
    const targetDog =
      dogs.find((dog) =>
        dog.name.toLowerCase() === name.toLowerCase());
    if (targetDog) {
      return <DogDetails dog={targetDog} />;
    }
  }

  return (
    <div>
      <h1>Dog Not Found!</h1>
      <p><Link to={"/dogs"}>Go Home</Link></p>
    </div>
  );
}

export default FilterDogDetails;