import React, { useState } from "react";
import TodoTask from "./TodoTask";
import NewTodoForm from "./NewTodoForm";

function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const addTask = (task) => setTodoList([...todoList, task]);
  const removeTask = (id) => setTodoList(todoList.filter(task => task.id !== id));
  const todoTaskComponents = todoList.map(task => (
    <TodoTask
      key={task.id}
      id={task.id}
      task={task.task}
      removeTask={removeTask}
    />
  ));
  return (
    <div>
      <NewTodoForm addTask={addTask} />
      {todoTaskComponents}
    </div>
  );
}

export default TodoList;
