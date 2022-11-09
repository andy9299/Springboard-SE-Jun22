"""Message model tests."""

# run these tests like:
#
#    python -m unittest test_user_model.py


import os
from unittest import TestCase
from sqlalchemy import exc

from models import db, User, Message, Follows, Likes

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


# Now we can import app

from app import app

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

class UserModelTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""
        db.drop_all()
        db.create_all()

        self.userid = 12345
        user = User.signup("username1", "test@email.com", "password", None)
        user.id = self.userid
        db.session.commit()

        self.user = User.query.get(self.userid)

        self.client = app.test_client()
    
    def tearDown(self):
        res = super().tearDown()
        db.session.rollback()
        return res

    def test_message_model(self):
        """Does basic model work?"""
        msg = Message(text="test text", user_id=self.userid)
        
        db.session.add(msg)
        db.session.commit()

        self.assertEqual(self.user.messages[0].text, "test text")

    def test_likes(self):
        some_user = User.signup("someuser", "someemail@email.com", "password", None)
        some_user.id = 9999
        msg = Message(text="test text", user_id=some_user.id)
        
        db.session.add(msg)
        db.session.commit()

        self.user.likes.append(msg)
        db.session.commit()

        self.assertEqual(self.user.likes[0].id, msg.id)