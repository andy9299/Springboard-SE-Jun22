import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const INITAL_DATA = {
  "name": "",
  "hex": "#000000"
};

function NewColorForm({ addColor }) {
  const [formData, setFormData] = useState(INITAL_DATA);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addColor(formData);
    setFormData(INITAL_DATA);
    navigate("/colors");
  };

  return <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Color Name:</label>
        <input onChange={handleChange} type="text" name="name" id="name" />
      </div>
      <div>
        <label htmlFor="hex">Color:</label>
        <input onChange={handleChange} type="color" name="hex" id="hex" />
      </div>
      <button>Add a Color!</button>
    </form>
    <Link to="/colors">See all Colors</Link>
  </div>;
}

export default NewColorForm;