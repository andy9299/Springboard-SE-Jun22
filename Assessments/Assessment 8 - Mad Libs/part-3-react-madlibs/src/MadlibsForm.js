import React, { useState } from "react";
import './MadlibsForm.css';

function MadlibsForm({ words, updateWords }) {
  const [formData, setFormData] = useState(words);
  const handleSubmit = (e) => {
    e.preventDefault();
    updateWords(formData);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {Object.keys(words).map((key) => (
          <input
            required
            key={key}
            type="text"
            id={key}
            name={key}
            placeholder={key}
            value={formData[key]}
            onChange={handleChange}
          />
        ))}
        <button>Get Story</button>
      </form>
    </div>
  );
}
export default MadlibsForm;