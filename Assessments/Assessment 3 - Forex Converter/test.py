from unittest import TestCase
from app import app

class ForexTests(TestCase):
    def setUp(self):
        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_root_display(self):
        """Test if things are displayed properly when starting"""
        with self.client:
            response = self.client.get("/")
            self.assertIn(b"Convert from", response.data)

    def test_invalid_from_currency(self):
        with self.client:
            response = self.client.get("/convert?from-currency=aaaaaa&to-currency=USD&amount=100")
            self.assertIn(b'&#34;AAAAAA&#34; is not a valid currency', response.data)
    def test_invalid_to_currency(self):
        with self.client:
            response = self.client.get("/convert?from-currency=USD&to-currency=aaaaaa&amount=100")
            self.assertIn(b'&#34;AAAAAA&#34; is not a valid currency', response.data)
    def test_invalid_amount(self):
        with self.client:
            response = self.client.get("/convert?from-currency=USD&to-currency=USD&amount=aaaaa")
            self.assertIn(b'&#34;aaaaa&#34; is not a valid amount', response.data)
    def test_valid_entries(self):
        with self.client:
            response = self.client.get("/convert?from-currency=USD&to-currency=USD&amount=100")
            self.assertIn(b'The result is $100', response.data)
