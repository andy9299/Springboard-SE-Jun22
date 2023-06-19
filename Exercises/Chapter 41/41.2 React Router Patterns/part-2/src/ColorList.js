import React from "react";
import { Link } from "react-router-dom";

function ColorList({ colors }) {
  return (
    <div>
      {Object.keys(colors).map(color => <p key={colors[color]}><Link to={`/colors/${color}`}>{color}</Link></p>)}
      <Link to="/colors/new">Add a Color</Link>
    </div>
  );
}

export default ColorList;