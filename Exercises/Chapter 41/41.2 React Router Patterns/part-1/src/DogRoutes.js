import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import DogList from "./DogList";
import FilterDogDetails from "./FilterDogDetails";

function DogRoutes({ dogs }) {
  return (
    <Routes>
      <Route path="/dogs" element={<DogList dogs={dogs} />} />
      <Route path="/dogs/:name" element={<FilterDogDetails dogs={dogs} />} />
      <Route
        path="*"
        element={<Navigate to="/dogs" replace />}
      />
    </Routes>
  );
}
export default DogRoutes;