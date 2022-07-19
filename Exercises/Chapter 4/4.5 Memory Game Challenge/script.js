const gameContainer = document.getElementById('game');

const COLORS = [
  'red',
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'blue',
  'green',
  'orange',
  'purple',
];

let firstCard = null;
let matches = 0;
let attempts = 0;
let allowClick = true;
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement('div');

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener('click', handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if (!allowClick) return;
  // you can use event.target to see which element was clicked
  let color = event.target.className;
  let currColor = event.target.style.backgroundColor;
  //console.log('you just clicked', event.target)
  if (currColor != color) {
    event.target.style.backgroundColor = event.target.className;
    if (firstCard == null) {
      firstCard = event.target;
    } else {
      allowClick = false;
      if (firstCard.style.backgroundColor == color) {
        //console.log('Match')
        firstCard = null;
        matches++;
        attempts++;
        if (matches == COLORS.length / 2) {
          const congrats = document.createElement('h1');
          congrats.innerText = `CONGRATS! \nYou finished in ${attempts} attempts!`;
          document.body.appendChild(congrats);
        }
        allowClick = true;
      } else {
        //console.log('No Match')
        attempts++;
        event.target.style.backgroundColor = color;
        setTimeout(function () {
          firstCard.style.backgroundColor = '';
          event.target.style.backgroundColor = '';
          firstCard = null;
          allowClick = true;
        }, 1000);
      }
    }
  } /*else {
    console.log('already clicked')
  }*/
}

// when the DOM loads
createDivsForColors(shuffledColors);

/* */
