import React from 'react';
import { render } from "@testing-library/react";
import TodoTask from './TodoTask';

it("renders without crashing", function () {
  render(<TodoTask />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<TodoTask />);
  expect(asFragment()).toMatchSnapshot();
});
