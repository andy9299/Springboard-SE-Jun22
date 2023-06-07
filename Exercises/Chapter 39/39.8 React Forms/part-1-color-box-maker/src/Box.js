import React from "react";


function Box({
  id,
  width = 5,
  height = 5,
  backgroundColor = "red",
  removeBox
}) {
  const handleRemove = () => removeBox(id);
  return (
    <div>
      <div
        style={{
          height: `${height}em`,
          width: `${width}em`,
          backgroundColor
        }} />
      <button onClick={handleRemove}>X</button>
    </div>

  );
}

export default Box;