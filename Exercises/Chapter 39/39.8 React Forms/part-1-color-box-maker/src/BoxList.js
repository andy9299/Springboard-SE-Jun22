import React, { useState } from "react";
import Box from "./Box";
import NewBoxForm from "./NewBoxForm";

function BoxList() {
  const [boxes, setBoxes] = useState([]);

  const removeBox = id => setBoxes(boxes.filter(box => box.id !== id));
  const addBox = box => setBoxes([...boxes, box]);

  const boxComponents = boxes.map(box => (
    < Box
      key={box.id}
      id={box.id}
      width={box.width}
      height={box.height}
      backgroundColor={box.backgroundColor}
      removeBox={removeBox}
    />
  ));

  return (
    <div>
      <NewBoxForm addBox={addBox} />
      {boxComponents}
    </div>
  );
}

export default BoxList;