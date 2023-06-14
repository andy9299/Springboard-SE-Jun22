import React from 'react';

function Story({ madlib, restart }) {
  return (
    <div>
      <p>{madlib.story()}</p>
      <button onClick={restart}>Restart</button>
    </div>
  );
}
export default Story;