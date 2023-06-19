import React from "react";
import { Link } from "react-router-dom";

function Color({ color, hex }) {
  return (
    <>
      <div style={{
        backgroundColor: hex
      }}>
        <p>This is {color}</p>
      </div>
      <p><Link to="/colors" >See All Colors</Link></p>
    </>
  );
}
export default Color;