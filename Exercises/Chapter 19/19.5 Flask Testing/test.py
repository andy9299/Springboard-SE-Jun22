from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle

class FlaskTests(TestCase):
    def setUp(self):
        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_root_display(self):
        """Test if things are displayed properly when starting"""
        with self.client:
            response = self.client.get("/")
            self.assertIn("board", session)
            self.assertIn(b"High Score: 0 in 0 plays", response.data)
            self.assertIsNone(session.get("highscore"))
            self.assertIsNone(session.get("plays"))

    def test_valid_word(self):
        """Test word that is english and in board"""
        with self.client as client:
            with client.session_transaction() as test_session:
                test_session["board"] = [["Z", "Z", "Z", "Z", "G"],
                                         ["Z", "Z", "Z", "Z", "E"],
                                         ["Z", "Z", "Z", "Z", "T"],
                                         ["Z", "Z", "Z", "Z", "Z"],
                                         ["Z", "Z", "Z", "Z", "Z"]]
            response = self.client.get("/validate-word?word=get")
            self.assertEqual(response.json["result"], "ok")

    def test_invalid_word(self):
        """Test word that is english and not on board"""
        with self.client as client:
            with client.session_transaction() as test_session:
                test_session["board"] = [["Z", "Z", "Z", "Z", "G"],
                                         ["Z", "Z", "Z", "Z", "E"],
                                         ["Z", "Z", "Z", "Z", "T"],
                                         ["Z", "Z", "Z", "Z", "Z"],
                                         ["Z", "Z", "Z", "Z", "Z"]]
            response = self.client.get(
                "/validate-word?word=formaldehydesulphoxylate")
            self.assertEqual(response.json["result"], "not-on-board")

    def test_non_eng_word(self):
        """Test word that is english and not on board"""
        with self.client as client:
            with client.session_transaction() as test_session:
                test_session["board"] = [["Z", "Z", "Z", "Z", "G"],
                                         ["Z", "Z", "Z", "Z", "E"],
                                         ["Z", "Z", "Z", "Z", "T"],
                                         ["Z", "Z", "Z", "Z", "Z"],
                                         ["Z", "Z", "Z", "Z", "Z"]]
            response = self.client.get(
                "/validate-word?word=qwerty")
            self.assertEqual(response.json["result"], "not-word")

    def test_endgame_display_new_highscore(self):
        """Test if things are displayed properly when 
        finishing with a new highscore"""
        with self.client as client:
            with client.session_transaction() as test_session:
                test_session["highscore"] = 1
                test_session["plays"] = 9
            response = self.client.post("/end-game", json={"score": 10})
            self.assertDictEqual({"didBreakScore": True,
                                  "highscore": 10,
                                  "plays": 10
                                  }, response.json)

    def test_endgame_display_old_highscore(self):
        """Test if things are displayed properly when 
        finishing without a new highscore"""
        with self.client as client:
            with client.session_transaction() as test_session:
                test_session["highscore"] = 20
                test_session["plays"] = 9
            response = self.client.post("/end-game", json={"score": 15})
            self.assertDictEqual({"didBreakScore": False,
                                  "highscore": 20,
                                  "plays": 10
                                  }, response.json)
