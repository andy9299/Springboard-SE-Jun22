import React, { useState, useEffect } from 'react';
import Story from './Story';
import emptyMadlibs from './emptyMadlibs';
import MadlibsForm from './MadlibsForm';


function Madlibs() {
  const [madlibId, setMadlibId] = useState(0);
  const [madlib, setMadlib] = useState(emptyMadlibs[madlibId]);
  const [finishedStory, setFinishedStory] = useState(false);
  const updateWords = (wordsObj) => {
    console.log({ ...madlib, words: wordsObj });
    setMadlib({ ...madlib, words: wordsObj });
    setFinishedStory(true);
  };
  const restart = () => {
    setFinishedStory(false);
  };
  const handleChangeMadlib = (e) => {
    setMadlibId(e.target.value);
  };
  useEffect(() => {
    if (finishedStory) return;
    setMadlib(emptyMadlibs[madlibId]);
  }, [madlibId, finishedStory]);
  return (
    <>
      <h1>Madlibs!</h1>

      <div>
        {finishedStory ? (
          <Story madlib={madlib} restart={restart} />)
          :
          <>
            <select onChange={handleChangeMadlib}>
              {emptyMadlibs.map((madlib, index) =>
                <option key={madlib.name} value={index}>
                  {madlib.name}
                </option>)}
            </select>
            <MadlibsForm words={madlib.words} updateWords={updateWords} madlibId={madlibId} />
          </>
        }
      </div>
    </>
  );
}
export default Madlibs;