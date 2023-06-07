import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BoxList from "./BoxList";

function addBox(boxList, height = "2", width = "2", color = "green") {
  const heightInput = boxList.getByLabelText("Height");
  const widthInput = boxList.getByLabelText("Width");
  const backgroundInput = boxList.getByLabelText("Background Color");
  fireEvent.change(backgroundInput, { target: { value: color } });
  fireEvent.change(widthInput, { target: { value: width } });
  fireEvent.change(heightInput, { target: { value: height } });
  const button = boxList.getByText("Add box");
  fireEvent.click(button);
}

it("renders without crashing", function () {
  render(<BoxList />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<BoxList />);
  expect(asFragment()).toMatchSnapshot();
});



it("adds a new box", function () {
  const boxList = render(<BoxList />);

  // no boxes yet
  expect(boxList.queryByText("X", { selector: "button" })).not.toBeInTheDocument();
  addBox(boxList);

  // 1 box
  const removeButton = boxList.getByText("X", { selector: "button" });
  expect(removeButton).toBeInTheDocument();
  expect(removeButton.previousSibling).toHaveStyle(`
    width: 2em;
    height: 2em;
    background-color: green;
  `);
  // expect form to be empty
  expect(boxList.getAllByDisplayValue("")).toHaveLength(3);
});

it("removes a box", function () {
  const boxList = render(<BoxList />);
  addBox(boxList);
  // remove box
  const removeButton = boxList.getByText("X", { selector: "button" });
  fireEvent.click(removeButton);
  expect(removeButton).not.toBeInTheDocument();
});
