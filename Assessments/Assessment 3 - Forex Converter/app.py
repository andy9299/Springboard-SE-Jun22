from pydoc import cram
from flask import Flask, request, render_template, flash
from forex_python.converter import CurrencyRates, CurrencyCodes, Decimal
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config["SECRET_KEY"] = "key"

cr = CurrencyRates(force_decimal=True)
cc = CurrencyCodes()

@app.route("/")
def home_page():
    """Display homepage"""
    return render_template("index.html")

@app.route("/convert",)
def convert():
    """Use forex_python.converter to convert currencies"""

    # keep count of the errors
    errors = 0

    # checking if inputs are valid
    # "get_symbol" will return none when given an invalid currency
    from_currency = request.args['from-currency'].upper().strip()
    from_symbol = cc.get_symbol(from_currency)
    if (not from_symbol):
        flash(f"\"{from_currency}\" is not a valid currency")
        errors += 1

    to_currency = request.args['to-currency'].upper().strip()
    to_symbol = cc.get_symbol(to_currency)
    if (not to_symbol):
        flash(f"\"{to_currency}\" is not a valid currency")
        errors += 1

    # the Decimal constructor will cause an error when given an non number string
    try:
        amount = request.args['amount']
        decimal_amount = Decimal(amount)
    except Exception as ex:
        flash(f"\"{amount}\" is not a valid amount")
        errors += 1
    
    if (errors == 0):
        converted_amount = cr.convert(from_currency, to_currency, decimal_amount)
        flash(f"The result is {to_symbol}{converted_amount}")

    return render_template("index.html")
