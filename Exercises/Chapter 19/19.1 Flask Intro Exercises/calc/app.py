from flask import Flask, request
from operations import add, sub, mult, div

app = Flask(__name__)

operations = {
    "add": add,
    "sub": sub,
    "mult": mult,
    "div": div
}

@app.route("/math/<operation>")
def do_math(operation):
    """Perform a basic math operation"""
    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    result = operations[operation](a,b)
    return str(result)