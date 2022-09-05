from flask import Flask, request, render_template, redirect, flash
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey as survey

app = Flask(__name__)
app.config['SECRET_KEY'] = "temp"

RESPONSES = None

@app.route("/")
def survey_start():
    """Start page for survey"""
    return render_template("start_survey.html", survey=survey)

@app.route('/start', methods=["POST"])
def start_survey():
    """Directs user to first question page and resets RESPONSES"""
    global RESPONSES
    RESPONSES = []
    return redirect("/question/0")

@app.route("/question/<int:ques_num>")
def question(ques_num):
    """Show current question"""

    if RESPONSES == None:
        return redirect("/")
    if len(RESPONSES) !=  ques_num:
        flash(f"Invalid question number: {ques_num} ")
        return redirect(f"/question/{len(RESPONSES)}")
    if len(RESPONSES) == len(survey.questions):
        return redirect("/")
    question = survey.questions[ques_num]
    return render_template("question.html", ques_num=ques_num, question=question, title=survey.title)

@app.route("/answer", methods=["POST"])
def submit_answer():
    """Append answer to response list and check if user is finished"""
    RESPONSES.append(request.form["ans"])
    if len(RESPONSES) == len(survey.questions):
        return redirect("/done")
    else:
        return redirect(f"/question/{len(RESPONSES)}")

@app.route("/done")
def done():
    return render_template("done.html")