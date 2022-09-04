from flask import Flask, render_template, request
from flask_debugtoolbar import DebugToolbarExtension
from stories import story

app = Flask(__name__)
app.config['SECRET_KEY'] = "temp"


@app.route("/")
def gen_questions():
    """Generate and display form for words"""
    return render_template("questions.html", questions=story.prompts)

@app.route("/story")
def display_story():
    """Display story based on submitted form from /"""
    return render_template("story.html", story=story.generate(request.args))