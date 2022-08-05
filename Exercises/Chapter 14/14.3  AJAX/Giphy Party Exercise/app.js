let API_KEY = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";

document.getElementById('add-gif').addEventListener('submit', async e => {
    e.preventDefault();
    let search = document.getElementById('search').value;
    let response;
    try {
        response = await getResponse(search);
    } catch (e) {
        alert('Search Failed!');
    }
    console.log(response);
    addRandomGIF(response);
});

document.getElementById('clear').addEventListener('click', () => {
    const gifList = document.getElementById('gif-list');
    gifList.innerHTML = '';
});

function getResponse(search) {
    return axios.get('http://api.giphy.com/v1/gifs/search', {
        params: {
            q: search,
            api_key: API_KEY
        }
    });
}

function addRandomGIF(json) {
    let numResults = json.data.data.length;
    let image;
    if (numResults) {
        let randomIndex = Math.floor(Math.random() * numResults);
        image = json.data.data[randomIndex].images.original.url;
    }
    const newHolder = document.createElement('div');
    newHolder.className = 'gif';
    const newGif = document.createElement('img');
    newGif.src = image;
    newGif.className = 'img';
    newHolder.append(newGif);
    const gifList = document.getElementById('gif-list');
    gifList.append(newHolder);
}