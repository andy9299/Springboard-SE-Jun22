import React, { useState, useEffect } from "react";
import './MadlibsForm.css';

function MadlibsForm({ words, updateWords, madlibId }) {
  const [formData, setFormData] = useState(words);
  const handleSubmit = (e) => {
    e.preventDefault();
    updateWords(formData);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };
  useEffect(() => {
    setFormData(words);
  }, [words]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {Object.keys(words).map((key) => (
          <input
            required
            key={`${madlibId}-${key}`}
            type="text"
            id={`${madlibId}-${key}`}
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