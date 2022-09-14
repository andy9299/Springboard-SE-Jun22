### Conceptual Exercise

Answer the following questions below:

- What are important differences between Python and JavaScript?
Python is usually run in the server and used for back-end web dev.
JS is usually run in browser and used for front-end web dev.

- Given a dictionary like ``{"a": 1, "b": 2}``: , list two ways you
  can try to get a missing key (like "c") *without* your programming
  crashing.
  Use some_dict.get(key, default_val)
  Use some_dict.setdefault(key, default_val) [this one will set the default 
  value if its not there]

- What is a unit test?
Testing each function/method individually 

- What is an integration test?
Testing how each components work together

- What is the role of web application framework, like Flask?
It's  framework that has built in functions and classes that help deal with 
interacting with the browser (like producing html packets, or connecting to
the back end)

- You can pass information to Flask either as a parameter in a route URL
  (like '/foods/pretzel') or using a URL query param (like
  'foods?type=pretzel'). How might you choose which one is a better fit
  for an application?
Params in the route URL should be something related to the subject of the page
URL query params should be like handling and sending extra info

- How do you collect data from a URL placeholder parameter using Flask?
The variable is setup in the url and passed into the route function

- How do you collect data from the query string using Flask?
It can be accessed in the route function in request.args

- How do you collect data from the body of the request using Flask?
request.data

- What is a cookie and what kinds of things are they commonly used for?
its a key value pair used to store some data in the browser

- What is the session object in Flask?
The session object is a dictionary used to store information as they 
interact with the page

- What does Flask's `jsonify()` do?
turns data (usually a dict) to JSON