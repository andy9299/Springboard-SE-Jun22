import React from "react";
import Color from "./Color";
import { useParams } from "react-router-dom";

function ColorWrapper({ colors }) {
  const { name } = useParams();
  return <Color color={name} hex={colors[name]} />;
}

export default ColorWrapper;