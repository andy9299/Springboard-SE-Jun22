import React from "react";
import { Link } from "react-router-dom";
import "./VendingMachine.css";

function VendingMachine() {
  return (
    <div>
      <h1>Vending Machine</h1>
      <ul>
        <li><Link to={"/chips"}>Chips</Link></li>
        <li><Link to={"/sardines"}>Sardines</Link></li>
        <li><Link to={"/soda"}>Soda</Link></li>
      </ul>
    </div>
  );
}

export default VendingMachine;