from models import db, User, Post
from app import app

# Create all tables
db.drop_all()
db.create_all()

## Some Sample Data

# Create some users
u1 = User(first_name="John", last_name="Smith")
u2 = User(first_name="Michael", last_name="Williams",
             image_url="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")

db.session.add_all([u1, u2])
db.session.commit()

# Make some posts
p1 = Post(title="First Post!", content="Here is some text to my first post!", user_id="2")

db.session.add(p1)
db.session.commit()
