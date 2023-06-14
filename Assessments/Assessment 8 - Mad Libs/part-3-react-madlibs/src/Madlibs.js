import React, { useState, useEffect } from 'react';
import Story from './Story';
import emptyMadlibs from './emptyMadlibs';

function Madlibs() {
  const [madlib, setMadlib] = useState(emptyMadlibs[0]);
  const updateWords = (wordsObj) => {
    setMadlib({ ...madlib, words: wordsObj });
  };
  useEffect(() => updateWords({
    "noun 1": "slug",
    "noun 2": "butterfly",
    "adjective": "hungry",
    "color": "purple"
  }
  ), []);
  return (
    <div>
      <Story madlib={madlib} />
    </div>
  );
}
export default Madlibs;