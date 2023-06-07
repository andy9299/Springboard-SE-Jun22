import React, { useState } from "react";
import { v4 as uuid } from 'uuid';


function NewTodoForm({ addTask }) {
  const INITIAL_DATA = {
    task: ""
  };
  const [formData, setFormData] = useState(INITIAL_DATA);
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    addTask({ ...formData, id: uuid() });
    setFormData(INITIAL_DATA);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="task">Task</label>
          <input
            onChange={handleChange}
            type="text"
            name="task"
            id="task"
            value={formData.task}
          />
        </div>
        <button>Add Task</button>
      </form>
    </div>
  );
}

export default NewTodoForm;
