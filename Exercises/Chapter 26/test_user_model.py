"""User model tests."""

# run these tests like:
#
#    python -m unittest test_user_model.py


import os
from unittest import TestCase
from sqlalchemy import exc

from models import db, User, Message, Follows

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

db.create_all()


class UserModelTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""

        db.drop_all()
        db.create_all()

        user1 = User.signup("username1", "email1@email.com", "password1", None)
        user2 = User.signup("username2", "email2@email.com", "password2", None)
        user1_id = 11111
        user2_id = 22222
        user1.id = user1_id
        user2.id = user2_id

        db.session.commit()
        
        self.user1 = user1
        self.user1_id = user1_id
        self.user2 = user2
        self.user2_id = user2_id

        self.client = app.test_client()

    def tearDown(self):
        res = super().tearDown()
        db.session.rollback()
        return res


    def test_user_model(self):
        """Does basic model work?"""

        u = User(
            email="test@test.com",
            username="testuser",
            password="HASHED_PASSWORD"
        )

        db.session.add(u)
        db.session.commit()

        # User should have no messages & no followers
        self.assertEqual(len(u.messages), 0)
        self.assertEqual(len(u.followers), 0)

# Sign Up Tests
    def test_valid_signup(self):
        test_user_id = 12345
        test_username = "testuser1"
        test_email = "testuser1@email.com"
        test_password = "passwordtest"
        test_user = User.signup(test_username, test_email, test_password, None)
        test_user.id = test_user_id

        db.session.commit()

        self.assertEqual(test_user.username, test_username)
        self.assertEqual(test_user.email, test_email)
        self.assertNotEqual(test_user.password, test_password)
        self.assertTrue(test_user.password.startswith("$2b$"))
    
    def test_nonunique_username_signup(self):
        # non-unique username
        test_user_id = 123456
        test_user = User.signup("username1", "testuser2@email.com", "passwordtest", None)
        test_user.id = test_user_id

        with self.assertRaises(exc.IntegrityError) as e:
            db.session.commit()

    def test_no_username_signup(self):
        # no username
        test_user_id = 1234567
        test_user = User.signup(None, "testuser3@email.com", "passwordtest", None)
        test_user.id = test_user_id

        with self.assertRaises(exc.IntegrityError) as e:
            db.session.commit()

    def test_nonunique_email_signup(self):
        # non-unique email
        test_user_id = 12345678
        test_user = User.signup("testuser4", "email1@email.com", "passwordtest", None)
        test_user.id = test_user_id

        with self.assertRaises(exc.IntegrityError) as e:
            db.session.commit()

    def test_no_email_signup(self):
        # no email
        test_user_id = 123456789
        test_user = User.signup("testuser5", None, "passwordtest", None)
        test_user.id = test_user_id

        with self.assertRaises(exc.IntegrityError) as e:
            db.session.commit()

    def test_no_password_signup(self):
        # no password
        test_user_id = 12345678901
        with self.assertRaises(ValueError) as e:
            test_user = User.signup("testuser6", "testuser6@email.com", None, None)

# Authentication Tests
    def test_valid_auth(self):
        user = User.authenticate(self.user1.username, "password1")
        self.assertIsNotNone(user)
        self.assertEqual(user.username, self.user1.username)
        self.assertEqual(user.id, self.user1_id)

    def test_wrong_username(self):
        self.assertFalse(User.authenticate("wrongusername", "password1"))

    def test_wrong_password(self):
        self.assertFalse(User.authenticate(self.user1.username, "wrongpassword"))

# Follow Tests
    def test_is_following(self):
        self.user1.following.append(self.user2)
        db.session.commit()

        self.assertTrue(self.user1.is_following(self.user2))
        self.assertFalse(self.user2.is_following(self.user1))

    def test_is_followed_by(self):
        self.user1.following.append(self.user2)
        db.session.commit()

        self.assertTrue(self.user2.is_followed_by(self.user1))
        self.assertFalse(self.user1.is_followed_by(self.user2))

    def test_follows(self):
        self.user1.following.append(self.user2)
        db.session.commit()

        self.assertEqual(self.user1.following[0].id, self.user2_id)
        self.assertEqual(self.user2.followers[0].id, self.user1_id)
