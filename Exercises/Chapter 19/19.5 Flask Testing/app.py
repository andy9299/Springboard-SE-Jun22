from flask import Flask, request, render_template, jsonify, session
from boggle import Boggle

boggle_game = Boggle()

app = Flask(__name__)
app.config["SECRET_KEY"] = "key"


@app.route("/")
def start_game():
    """Initialize and display the board"""

    board = boggle_game.make_board()
    session["board"] = board
    highscore = session.get("highscore", 0)
    plays = session.get("plays", 0)

    return render_template("board.html", board=board, highscore=highscore, plays=plays)


@app.route("/validate-word")
def validate_word():
    """Check if word is legal in dictionary"""
    resp = boggle_game.check_valid_word(session["board"], request.args["word"])

    return jsonify({"result": resp})

@app.route("/end-game", methods=["POST"])
def end_game():
    """Check highscore and count plays"""
    highscore = session.get("highscore", 0)
    plays = session.get("plays", 0)
    score = request.json["score"]

    session["plays"] = plays + 1
    session["highscore"] = max(highscore, score)

    return jsonify({
        "didBreakScore": score > highscore,
        "plays": plays + 1,
        "highscore": session["highscore"]
    })