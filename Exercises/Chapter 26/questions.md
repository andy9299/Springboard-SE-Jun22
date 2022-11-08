## Look over the code in app.py related to authentication.

- How is the logged in user being kept track of?  
It is a global in app.py and in the flask global object  
- What is Flask’s g object?  
The flask global object  
- What is the purpose of add_user_to_g?  
To add the user to the flask global object
- What does @app.before_request mean?  
Flask runs this before every request  