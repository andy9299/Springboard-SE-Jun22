import { useState } from "react";

function useFlip(isFaceUpInitial = true) {
  const [isFaceUp, setFlip] = useState(isFaceUpInitial);
  const flip = () => {
    setFlip(isUp => !isUp);
  };
  return [isFaceUp, flip];
}
export default useFlip;