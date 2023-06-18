import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({ dogs }) {
  return (
    <div>
      <NavLink end to="/dogs">Home</NavLink>
      {dogs.map(dog => <NavLink end to={`/dogs/${dog.name}`}>{dog.name}</NavLink>)}
    </div>
  );
}

export default NavBar;