const NUM_CATAGORIES = 6;
const NUM_QUESTIONS = 5;
const board = document.getElementById("board");
const loader = document.getElementById("lds-spinner");
// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
    let categoriesData = await axios.get("http://jservice.io/api/categories", {
        params: {
            count: 100
        }
    });
    // filtering out categories without enough questions + turning to an array
    // off chance but extremely unlikely not enough categories
    categoriesData = categoriesData.data.filter(cat => cat.clues_count >= NUM_QUESTIONS);
    let randomCategories = _.sampleSize(categoriesData, NUM_CATAGORIES);
    let randomIds = [];
    for (cat of randomCategories) {
        randomIds.push(cat.id);
    }
    return randomIds;
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
    let cluesData = await axios.get("http://jservice.io/api/clues", {
        params: {
            category: catId
        }
    });
    result = { title: cluesData.data[0].category.title };
    clueArray = [];
    let randomClues = _.sampleSize(cluesData.data, NUM_QUESTIONS);
    for (clue of randomClues) {
        clueArray.push({
            question: clue.question,
            answer: clue.answer,
            showing: null
        });
    }
    result.clues = clueArray;
    return result;
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

function fillTable() {
    const categoriesRow = document.createElement('tr');
    for (let x = 0; x < NUM_CATAGORIES; x++) {
        const categoriesTitle = document.createElement('th');
        categoriesTitle.innerText = categories[x].title;
        categoriesRow.append(categoriesTitle);
    }
    board.append(categoriesRow);
    for (let y = 0; y < NUM_QUESTIONS; y++) {
        const cluesRow = document.createElement('tr');
        for (let x = 0; x < NUM_CATAGORIES; x++) {
            const clue = document.createElement('td');
            clue.setAttribute("id", `${x},${y}`);
            clue.innerText = "?";
            cluesRow.append(clue);
        }
        board.append(cluesRow);
    }

}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
    let x = evt.target.id[0];
    let y = evt.target.id[2];
    if (evt.target.classList.contains("answer")) {
    }
    else if (evt.target.classList.contains("question")) {
        evt.target.classList = ("answer");
        evt.target.innerHTML = categories[x].clues[y].answer;
    }
    else {
        evt.target.classList = ("question");
        evt.target.innerHTML = categories[x].clues[y].question;
    }
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
    loader.classList.toggle("hidden");

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    loader.classList.toggle("hidden");
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
    categories = [];
    board.innerHTML = '';
    showLoadingView();
    let catIds = await getCategoryIds();
    for (catId of catIds) {
        let clues = await getCategory(catId);
        categories.push(clues);
    }
    hideLoadingView();
    fillTable();
}

/** On click of start / restart button, set up game. */

document.getElementById('start').addEventListener('click', () => {
    categories = [];
    board.innerHTML = '';
    setupAndStart();
});

/** On page load, add event handler for clicking clues */

document.getElementById('board').addEventListener('click', (evt) => {
    if (evt.target.localName == 'td') {
        handleClick(evt);
    }
});