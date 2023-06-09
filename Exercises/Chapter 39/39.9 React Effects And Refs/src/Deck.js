import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";

const BASE_URL = "http://deckofcardsapi.com/api/deck";

function Deck() {
  const [deck, setDeck] = useState(null);
  const [drawnCards, setDrawnCards] = useState([]);
  const [autoDraw, setAutoDraw] = useState(false);
  const timerId = useRef(null);

  useEffect(() => {
    async function getData() {
      try {
        let res = await axios.get(`${BASE_URL}/new/shuffle/`);
        setDeck(res.data);
      }
      catch (err) {
        alert(err);
      }
    }
    getData();
  }, []);

  async function draw() {
    try {
      const res = await axios.get(`${BASE_URL}/${deck.deck_id}/draw`);
      if (!res.data.success && res.data.remaining === 0) {
        setAutoDraw(false);
        throw new Error("No more cards to draw!");
      }
      const card = res.data.cards[0];
      setDrawnCards(d => [...d, {
        id: card.code,
        name: `${card.value} ${card.suit}`,
        image: card.image
      }]);
    }
    catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    if (autoDraw && !timerId.current) {
      timerId.current = setInterval(async () => {
        await draw();
      }, 1000);
    }
    return () => {
      clearInterval(timerId.current);
      timerId.current = null;
    };

  }, [autoDraw, deck]);

  const toggleAutoDraw = () => {
    setAutoDraw(auto => !auto);
  };

  const cards = drawnCards.map(card => <Card key={card.id} name={card.name} image={card.image} />);

  return (
    <div>
      <button onClick={toggleAutoDraw}>Toggle Auto Draw</button>
      <div>
        {cards}
      </div>
    </div>
  );
}

export default Deck;