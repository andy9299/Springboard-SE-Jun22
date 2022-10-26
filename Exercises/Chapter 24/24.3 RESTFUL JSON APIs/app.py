"""Flask app for Cupcakes"""

from flask import Flask, request, jsonify, render_template, flash
from models import db, connect_db, Cupcake


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///cupcakes"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "qwerty"

connect_db(app)

@app.route("/")
def root():
    """Render homepage."""

    return render_template("index.html")


@app.route("/api/cupcakes")
def all_cupcakes():
    """Get JSON data about all cupcakes."""

    cupcakes = [cupcake.to_dict() for cupcake in Cupcake.query.all() ]

    return jsonify(cupcakes=cupcakes)

@app.route("/api/cupcakes", methods=['POST'])
def create_cupcake():
    """Create a cupcake, and return JSON of the cupcake."""
    try:
        data = request.json
        cupcake = Cupcake(
            flavor=data['flavor'],
            rating=data['rating'],
            size=data['size'],
            image=data.get('image', None))
        db.session.add(cupcake)
        db.session.commit()
    except:
        return (jsonify(error = "failed to create cupcake"), 500)
    return (jsonify(cupcake=cupcake.to_dict()), 201)


@app.route("/api/cupcakes/<int:cupcake_id>")
def get_cupcake(cupcake_id):
    """Get data about a cupcake."""

    cupcake = Cupcake.query.get_or_404(cupcake_id)

    return jsonify(cupcake=cupcake.to_dict())


@app.route("/api/cupcakes/<int:cupcake_id>", methods=['PATCH'])
def update_cupcake(cupcake_id):
    """Update data about a cupcake."""
    try:
        data = request.json

        cupcake = Cupcake.query.get_or_404(cupcake_id)

        cupcake.flavor = data.get('flavor', cupcake.flavor)
        cupcake.rating = data.get('rating', cupcake.rating)
        cupcake.size = data.get('size', cupcake.size)
        cupcake.image = data.get('image', cupcake.image)

        db.session.add(cupcake)
        db.session.commit()

    except:
        return (jsonify(error = "failed to update cupcake"), 500)

    return jsonify(cupcake=cupcake.to_dict())


@app.route("/api/cupcakes/<int:cupcake_id>", methods=['DELETE'])
def delete_cupcake(cupcake_id):
    """Delete a cupcake."""
    try:
        cupcake = Cupcake.query.get_or_404(cupcake_id)

        db.session.delete(cupcake)
        db.session.commit()

    except:
        return (jsonify(error = "failed to delete cupcake"), 500)

    return jsonify(message = "deleted")
