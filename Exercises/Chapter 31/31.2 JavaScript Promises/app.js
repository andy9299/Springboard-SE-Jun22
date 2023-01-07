// Part 1
const numbersUrl = "http://numbersapi.com";
const favNum = 3;
const favNums = [1, 3, 5];

// 1
favNumRequest = axios.get(`${numbersUrl}/${favNum}?json`)
  .then((res) => console.log(res.data));

// 2
axios.get(`${numbersUrl}/${favNums}?json`)
  .then((res) => console.log(res.data));
// 3
fourFactsRequest = [];
for (let i = 1; i < 5; i++) {
  fourFactsRequest.push(axios.get(`${numbersUrl}/${favNum}?json`));
}
Promise.all(fourFactsRequest)
  .then(factsArr => factsArr.forEach(f => document.body.innerHTML += `<p>${f.data.text}</p>`));

// Part 2
const deckUrl = "https://deckofcardsapi.com/api/deck";

// 1
axios.get(`${deckUrl}/new/draw`)
  .then((res) => {
    let { suit, value } = res.data.cards[0];
    console.log(suit, value);
  });
// 2
let firstCard = {};
axios.get(`${deckUrl}/new/draw`)
  .then((res) => {
    let { suit, value } = res.data.cards[0];
    firstCard = { suit, value };
    let deckId = res.data.deck_id;
    return axios.get(`${deckUrl}/${deckId}/draw`);
  })
  .then((res) => {
    let { suit, value } = res.data.cards[0];
    console.log(`first card: ${firstCard.suit} ${firstCard.value}`);
    console.log(`second card: ${suit} ${value}`);
  })
  ;
// 3
let deckId = null;
const button = document.querySelector('button');
axios.get(`${deckUrl}/new`)
  .then((res) => deckId = res.data.deck_id);
button.addEventListener('click', (e) => {
  axios.get(`${deckUrl}/${deckId}/draw`).then((res) => {
    let { suit, value } = res.data.cards[0];
    document.body.innerHTML += `<p>${suit} ${value}</p>`;
  });
  if (res.data.remaining == 0) button.remove();
});