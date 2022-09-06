from flask import Flask

app = Flask(__name__)

@app.route('/welcome')
def welcome():
    """Returns welcome message"""
    return "welcome"


@app.route('/welcome/home')
def welcome_home():
    """Returns welcome home message"""
    return "welcome home"


@app.route('/welcome/back')
def welcome_back():
    """Returns welcome back message"""
    return "welcome back"

