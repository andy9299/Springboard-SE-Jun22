from flask import Flask, render_template, redirect, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from psycopg2 import IntegrityError
from models import Feedback, connect_db, db, User
from forms import RegisterForm, LoginForm, FeedbackForm
from werkzeug.exceptions import Unauthorized
from sqlalchemy import exc

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///users"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "qwerty"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

toolbar = DebugToolbarExtension(app)

connect_db(app)


@app.route("/")
def root():
    """Redirect to register."""

    return redirect("/register")


@app.route('/register', methods=['GET', 'POST'])
def register_user():
    """Display register user form + handle form submission"""

    if session.get("current_user"):
        return redirect(f"/users/{session['current_user']}")
    
    form = RegisterForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        first_name = form.first_name.data
        last_name = form.last_name.data
        email = form.email.data

        user = User.register(username, password, first_name, last_name, email)

        db.session.add(user)

        try:
            db.session.commit()
        except exc.IntegrityError:
            db.session.rollback()
            flash("Username is Taken")
            return redirect("/register")

        session['current_user'] = user.username
        return redirect(f"/users/{session['current_user']}")

    else:
        return render_template("users/register.html", form=form)


@app.route('/login', methods=['GET', 'POST'])
def login():
    """Display login user form + handle form submission"""

    if session.get("current_user"):
        return redirect(f"/users/{session['current_user']}")

    form = LoginForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = User.authenticate(username, password)
        if user:
            session['current_user'] = user.username
            return redirect(f"/users/{user.username}")
        else:
            form.username.errors = ["Invalid Login"]
            return render_template("users/login.html", form=form)

    return render_template("users/login.html", form=form)

@app.route("/logout", methods=['POST'])
def logout():
    """Logout"""

    session.pop("current_user")

    return redirect("/login")

@app.route("/users/<username>")
def user_info(username):
    """Show logged-in user info"""
    if not session.get("current_user") or username != session['current_user']:
        raise(Unauthorized)

    user = User.query.get(username)
    feedbacks = Feedback.query.filter_by(username=username)

    return render_template("users/info.html", user=user, feedbacks=feedbacks)


@app.route("/users/<username>/delete", methods=["POST"])
def delete_user(username):
    """Delete an user"""

    if not session.get("current_user") or username != session['current_user']:
        raise(Unauthorized)

    user = User.query.get(username)
    db.session.delete(user)
    db.session.commit()
    session.pop("current_user")

    return redirect("/login")
    

@app.route('/users/<username>/feedback/add', methods=['GET', 'POST'])
def add_feedback(username):
    """Display add feedback form + handle form submission"""

    if not session.get("current_user") or username != session['current_user']:
        raise (Unauthorized)

    form = FeedbackForm()

    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data

        feedback = Feedback(title=title, content=content, username=username)

        db.session.add(feedback)
        db.session.commit()

        return redirect(f"/users/{username}")

    else:
        return render_template("feedback/add.html", form=form)

@app.route('/feedback/<int:feedback_id>/update', methods=['GET', 'POST'])
def update_feedback(feedback_id):
    """Display update feedback form + handle form submission"""

    feedback = Feedback.query.get(feedback_id)

    if not session.get("current_user") or feedback.username != session['current_user']:
        raise (Unauthorized)

    form = FeedbackForm(obj=feedback)

    if form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data

        db.session.commit()

        return redirect(f"/users/{feedback.username}")

    else:
        return render_template("feedback/update.html", form=form)

@app.route("/feedback/<int:feedback_id>/delete", methods=["POST"])
def delete_feedback(feedback_id):
    """Delete an user"""

    feedback = Feedback.query.get(feedback_id)

    if not session.get("current_user") or feedback.username != session['current_user']:
        raise (Unauthorized)

    user = feedback.user.username

    db.session.delete(feedback)
    db.session.commit()

    return redirect(f"/users/{user}")

# @app.route("/secret")
# def secret():
#     if session.get("current_user"):
#         return render_template("secret.html")
#     else:
#         return redirect("/register")