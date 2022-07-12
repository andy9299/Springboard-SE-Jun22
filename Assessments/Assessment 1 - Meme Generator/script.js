const form = document.querySelector('#addMeme');
const imageURL = document.querySelector("input[name='imageURL']");
const topText = document.querySelector("input[name='topText']");
const bottomText = document.querySelector("input[name='bottomText']");
const memeList = document.querySelector('.memeList');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!isValidImageURL(imageURL.value)) {
    alert('Not Valid Image URL!');
    return;
  }
  createMeme();
  form.reset();
});

memeList.addEventListener('dblclick', function (e) {
  let meme = e.target;
  if ((meme.className = 'img')) {
    meme.parentElement.remove();
  }
});

//I don't know a better way to check
function isValidImageURL(url) {
  return url.match(/^http.*\.(jpeg|jpg|gif|png)$/) != null;
}

function createMeme() {
  const newMeme = document.createElement('div');
  newMeme.className = 'meme';
  const newImg = document.createElement('img');
  newImg.className = 'img';
  newImg.setAttribute('src', imageURL.value);
  const newTop = document.createElement('h2');
  newTop.className = 'top';
  newTop.innerText = topText.value;
  const newBottom = document.createElement('h2');
  newBottom.className = 'bottom';
  newBottom.innerText = bottomText.value;

  newMeme.appendChild(newImg);
  newMeme.appendChild(newTop);
  newMeme.appendChild(newBottom);
  memeList.appendChild(newMeme);
}
