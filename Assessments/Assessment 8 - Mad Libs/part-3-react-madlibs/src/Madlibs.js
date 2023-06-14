import React, { useState } from 'react';
import Story from './Story';
import emptyMadlibs from './emptyMadlibs';
import MadlibsForm from './MadlibsForm';

function Madlibs() {
  const [madlib, setMadlib] = useState(emptyMadlibs[0]);
  const [finishedStory, setFinishedStory] = useState(false);
  const updateWords = (wordsObj) => {
    setMadlib({ ...madlib, words: wordsObj });
    setFinishedStory(true);
  };
  const restart = () => {
    setFinishedStory(false);
    setMadlib(emptyMadlibs[0]);
  };
  return (
    <>
      <h1>Madlibs!</h1>
      <div>
        {finishedStory ? <Story madlib={madlib} restart={restart} /> : <MadlibsForm words={madlib.words} updateWords={updateWords} />}
      </div>
    </>
  );
}
export default Madlibs;