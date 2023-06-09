import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const BASE_URL = "http://deckofcardsapi.com/api/deck";

function Deck() {
  const [deck, setDeck] = useState(null);
  const [drawnCards, setDrawnCards] = useState([]);

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

  const draw = () => {
    async function getCard() {
      try {
        let res = await axios.get(`${BASE_URL}/${deck.deck_id}/draw`);
        if (!res.data.success && res.data.remaining === 0) throw new Error("No more cards to draw!");
        let card = res.data.cards[0];
        setDrawnCards([...drawnCards, {
          id: card.code,
          name: `${card.value} ${card.suit}`,
          image: card.image
        }]);
      }
      catch (err) {
        alert(err);
      }
    }
    getCard();
  };

  const cards = drawnCards.map(card => <Card key={card.id} name={card.name} image={card.image} />);

  return (

    <div>

      <button onClick={draw}>Draw A Card</button>
      <div>
        {cards}
      </div>
    </div>
  );
}

export default Deck;