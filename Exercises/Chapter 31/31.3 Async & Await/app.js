// part 1
const numbersBaseUrl = "http://numbersapi.com";
const favNumber = 5;
const favNumbers = [1, 2, 3, 4];
// 1
async function numberFacts1() {
  let data = await $.getJSON(`${numbersBaseUrl}/${favNumber}?json`);
  console.log(data);
}
numberFacts1();
// 2
async function numberFacts2() {
  let data = await $.getJSON(`${numbersBaseUrl}/${favNumbers}?json`);
  console.log(data);
}
numberFacts2();
// 3 
async function numberFacts3() {
  let data = await Promise.all(Array.from({ length: 4 }, () => $.getJSON(`${numbersBaseUrl}/${favNumber}?json`)));
  console.log(data);
}
numberFacts3();

// part 2
const cardsBaseUrl = "https://deckofcardsapi.com/api/deck";
// 1
async function cards1() {
  let data = await $.getJSON(`${cardsBaseUrl}/new/draw`);
  const { suit, value } = data.cards[0];
  console.log(suit, value);
}
cards1();
// 2
async function cards2() {
  let card1Data = await $.getJSON(`${cardsBaseUrl}/new/draw`);
  const { deck_id: deckId } = card1Data;
  const { suit: card1Suit, value: card1Value } = card1Data.cards[0];
  console.log(card1Data, card1Data.cards[0]);
  let card2Data = await $.getJSON(`${cardsBaseUrl}/${deckId}/draw`);
  const { suit: card2Suit, value: card2Value } = card2Data.cards[0];
  console.log("first card:", card1Suit, card1Value);
  console.log("second card:", card2Suit, card2Value);
}
cards2();
// 3

async function setup() {
  const $btn = $('button');
  const $cards = $('#cards');
  const deckData = await $.getJSON(`${cardsBaseUrl}/new/shuffle`);
  const { deck_id: deckId } = deckData;
  $btn.on('click', async function () {
    let cardData = await $.getJSON(`${cardsBaseUrl}/${deckId}/draw`);
    const { suit, value } = cardData.cards[0];
    $cards.append(`<li>${value} of ${suit}</li>`);
    if (cardData.remaining == 0) {
      $btn.remove();
    }
  });
}
setup();