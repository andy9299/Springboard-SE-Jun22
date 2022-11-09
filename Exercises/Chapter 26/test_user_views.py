"""User View tests."""

# run these tests like:
#
#    FLASK_ENV=production python -m unittest test_message_views.py


import os
from unittest import TestCase

from models import db, connect_db, Message, User
from bs4 import BeautifulSoup

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


# Now we can import app

from app import app, CURR_USER_KEY

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.create_all()

# Don't have WTForms use CSRF at all, since it's a pain to test

app.config['WTF_CSRF_ENABLED'] = False

class UserViewTestCase(TestCase):
    """Test views for users."""

    def setUp(self):
        """Create test client, add sample data."""

        db.drop_all()
        db.create_all()

        self.client = app.test_client()

        self.user1 = User.signup(username="user1",
                                    email="test1@test.com",
                                    password="testuser1",
                                    image_url=None)
        self.user1_id = 11111
        self.user1.id = self.user1_id

        self.user2 = User.signup(username="user2",
                                    email="test2@test.com",
                                    password="testuser2",
                                    image_url=None)
        self.user2_id = 22222
        self.user2.id = self.user2_id

        self.user3 = User.signup(username="abcd3",
                                    email="test3@test.com",
                                    password="testuser3",
                                    image_url=None)
        self.user3_id = 33333
        self.user3.id = self.user3_id

        db.session.commit()

    def tearDown(self):
        res = super().tearDown()
        db.session.rollback()
        return res

    def add_message(self):
        msg1 = Message(text="My Message", user_id=self.user1_id)
        db.session.add(msg1)
        db.session.commit()

    def add_follow(self):
        self.user1.following.append(self.user2)
    
    def add_likes(self):
        msg1 = Message(text="test1", user_id=self.user2_id)
        msg2 = Message(text="message2", user_id=self.user2_id)
        db.session.add_all([msg1, msg2])
        db.session.commit()

        self.user1.likes.append(msg1)
        self.user1.likes.append(msg2)
        db.session.commit()
    
    def test_users_index(self):
        with self.client as c:
            resp = c.get("/users")

            self.assertIn("@user1", str(resp.data))
            self.assertIn("@user2", str(resp.data))
            self.assertIn("@abcd3", str(resp.data))
    
    def test_users_search(self):
        with self.client as c:
            resp = c.get("/users?q=user")

            self.assertIn("@user1", str(resp.data))
            self.assertIn("@user2", str(resp.data))

            self.assertNotIn("@abcd3", str(resp.data))
    
    def test_user_info(self):
        self.add_message()
        self.add_follow()
        self.add_likes()
        with self.client as c:
            resp = c.get(f"/users/{self.user1_id}")
            
            self.assertEqual(resp.status_code, 200)

            self.assertIn("@user1", str(resp.data))

            soup = BeautifulSoup(str(resp.data), 'html.parser')
            found = soup.find_all("li", {"class": "stat"})
            self.assertEqual(len(found), 4)

            # test messages/following/followers/likes count
            self.assertIn("1", found[0].text)
            self.assertIn("1", found[1].text)
            self.assertIn("0", found[2].text)
            self.assertIn("2", found[3].text)
    