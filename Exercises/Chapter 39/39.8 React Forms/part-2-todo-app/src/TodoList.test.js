import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from './TodoList';

const createTask = (todoList, task = "Test Task") => {
  const taskInput = todoList.getByLabelText("Task");
  fireEvent.change(taskInput, { target: { value: task } });
  const button = todoList.getByText("Add Task");
  fireEvent.click(button);
};

it("renders without crashing", function () {
  render(<TodoList />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<TodoList />);
  expect(asFragment()).toMatchSnapshot();
});

it("adds a new task", function () {
  const todoList = render(<TodoList />);
  // no task initially
  expect(todoList.queryByText('Remove Task', { selector: "button" })).not.toBeInTheDocument();
  createTask(todoList);
  // 1 task
  const removeButton = todoList.getByText('Remove Task', { selector: "button" });
  expect(removeButton.previousSibling).toHaveTextContent("Test Task");
  expect(todoList.getAllByDisplayValue("")).toHaveLength(1);
});


it("deletes a task", function () {
  const todoList = render(<TodoList />);
  createTask(todoList);
  const removeButton = todoList.getByText('Remove Task', { selector: "button" });
  fireEvent.click(removeButton);
  expect(removeButton).not.toBeInTheDocument();
});