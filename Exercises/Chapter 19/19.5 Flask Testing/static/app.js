class Boggle {
    constructor(gameNum, secs = 60) {
        this.board = $("#boggle");
        this.words = new Set();
        this.score = 0;
        this.secs = secs;
        $(".add-word", this.board).on("submit", this.handleSubmit.bind(this));
        this.showScore();
        this.showTimer();
        this.timer = setInterval(this.updateTimer.bind(this), 1000);
    }
    showMessage(msg) {
        $(".msg", this.board).text(msg);
    }
    addWordToDisplay(word) {
        $(".words", this.board).append($("<li>", { text: word }));
    }
    showScore() {
        $(".score", this.board).text("Score: " + this.score);
    }
    showTimer() {
        $(".timer", this.board).text("Timer: " + this.secs);
    }
    async updateTimer() {
        this.secs -= 1;
        this.showTimer();
        if (this.secs === 0) {
            clearInterval(this.timer);
            await this.endGame();
        }
    }
    async handleSubmit(evt) {
        evt.preventDefault();
        const $word = $(".word", this.board);
        const word = $word.val().toLowerCase();
        if (!word) return;
        if (this.words.has(word)) {
            this.showMessage(`Already guessed ${word}!`);
            return;
        }
        // use the boggle class in boggle.py to validate word
        const resp = await axios.get("/validate-word", {
            params: {
                word: word
            }
        });
        if (resp.data.result == "not-word") {
            this.showMessage(`"${word}" is not a word!`);
        }
        else if (resp.data.result == "not-on-board") {
            this.showMessage(`"${word}" is not on the board!`);
        }
        else {
            this.words.add(word);
            this.addWordToDisplay(word);
            this.score += 1;
            this.showScore();
            this.showMessage(`Added "${word}"!`);
        }
    }
    async endGame() {
        // disable submission
        $(".add-word", this.board).off().on("submit", function (evt) {
            evt.preventDefault();
        });
        this.showMessage("GAME OVER!");

        const resp = await axios.post("/end-game", { score: this.score });
        if (resp.data.didBreakScore) {
            this.showMessage(`New Record! ${resp.data.highscore}`);
        }
        else {
            this.showMessage(`Try to beat your old highscore of ${resp.data.highscore}!`);
        }
        $("footer").text(`High Score: ${resp.data.highscore} in ${resp.data.plays} plays`);
    }
}

