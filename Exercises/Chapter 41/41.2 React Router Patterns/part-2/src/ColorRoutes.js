import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ColorList from "./ColorList.js";
import ColorWrapper from "./ColorWrapper";
import NewColorForm from "./NewColorForm.js";

const INITIAL_COLORS = {
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF"
};

function ColorRoutes() {
  const [colors, setColors] = useState(INITIAL_COLORS);
  const addColor = ({ name, hex }) => {
    console.log(name, hex);
    setColors({ ...colors, [name]: hex });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/colors" element={<ColorList colors={colors} />} />
        <Route exact path="/colors/new" element={<NewColorForm addColor={addColor} />} />
        <Route exact path="/colors/:name" element={<ColorWrapper colors={colors} />} />
        <Route
          path="*"
          element={<Navigate to="/colors" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default ColorRoutes;