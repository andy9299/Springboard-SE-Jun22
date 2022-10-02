"""Blogly application."""

from flask import Flask, request, redirect, render_template, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///blogly"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'qwerty'

toolbar = DebugToolbarExtension(app)

connect_db(app)
db.create_all()

@app.route('/')
def root():
    """Redirect to list of users. (We’ll fix this in a later step)."""

    return redirect("/users")

@app.route('/users')
def users():
    """Show all users."""

    users = User.query.order_by(User.first_name, User.last_name).all()

    return render_template("users/index.html", users=users)

@app.route('/users/new', methods=["GET"])
def add_user_form():
    """Show form to add user"""

    return render_template("users/new.html")

@app.route('/users/new', methods=["POST"])
def add_user():
    """Handle form to create a new user"""

    if (request.form['first_name'] == "" or request.form['last_name'] == ""):
        flash("Invalid Name")
        return redirect("/users/new")

    new_user = User(
        first_name=request.form['first_name'],
        last_name=request.form['last_name'],
        image_url=request.form['image_url'] or None)

    db.session.add(new_user)
    db.session.commit()

    return redirect("/users")


@app.route('/users/<int:user_id>')
def user_info(user_id):
    """Show info about 1 user"""

    user = User.query.get_or_404(user_id)

    return render_template("users/info.html", user=user)


@app.route('/users/<int:user_id>/edit', methods=["GET"])
def user_edit_form(user_id):
    """Show edit form"""

    user = User.query.get_or_404(user_id)

    return render_template("users/edit.html", user=user)


@app.route('/users/<int:user_id>/edit', methods=["POST"])
def user_edit(user_id):
    """Edit User"""

    user = User.query.get_or_404(user_id)
    if (request.form['first_name'] != ""):
        user.first_name = request.form['first_name']
    if (request.form['last_name'] != ""):
        user.last_name = request.form['last_name']
    if (request.form['image_url'] != ""):
        user.image_url = request.form['image_url']

    db.session.add(user)
    db.session.commit()

    return redirect(f"/users/{user_id}")


@app.route('/users/<int:user_id>/delete', methods=["POST"])
def user_delete(user_id):
    """Delete User"""

    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()

    return redirect("/users")
