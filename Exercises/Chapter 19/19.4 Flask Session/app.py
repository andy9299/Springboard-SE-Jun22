from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey as survey

app = Flask(__name__)
app.config['SECRET_KEY'] = "temp"
app.config["DEBUG_TB_INTERCEPT_REDIRECTS"] = False

debug = DebugToolbarExtension(app)

@app.route("/")
def survey_start():
    """Start page for survey"""

    return render_template("start_survey.html", survey=survey)

@app.route('/start', methods=["POST"])
def start_survey():
    """Directs user to first question page and resets RESPONSES"""

    session['responses'] = []
    return redirect("/question/0")

@app.route("/question/<int:ques_num>")
def question(ques_num):
    """Show current question"""

    responses = session['responses']
    if responses == None:
        return redirect("/")
    if len(responses) != ques_num:
        flash(f"Invalid question number: {ques_num} ")
        raise
        return redirect(f"/question/{len(responses)}")
    if len(responses) == len(survey.questions):
        return redirect("/")

    question = survey.questions[ques_num]
    return render_template("question.html", ques_num=ques_num, question=question, title=survey.title)

@app.route("/answer", methods=["POST"])
def submit_answer():
    """Append answer to response list and check if user is finished"""

    responses = session['responses']
    responses.append(request.form["ans"])
    session['responses'] = responses
    if len(responses) == len(survey.questions):
        return redirect("/done")
    else:
        return redirect(f"/question/{len(responses)}")

@app.route("/done")
def done():
    return render_template("done.html")