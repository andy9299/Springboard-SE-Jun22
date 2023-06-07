import React from "react";

function TodoTask({
  id,
  removeTask,
  task = "Empty Task!"
}) {
  const handleRemove = () => removeTask(id);
  return (
    <div>
      {task}
      <button onClick={handleRemove}>Remove Task</button>
    </div>
  );
}

export default TodoTask;
