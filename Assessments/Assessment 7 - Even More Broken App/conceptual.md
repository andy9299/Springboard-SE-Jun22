### Conceptual Exercise

Answer the following questions below:

- What is a JWT?
- JSON web token

- What is the signature portion of the JWT? What does it do?
- It is the signed part of a JWT. It helps to validate the token/payload with a secret key.

- If a JWT is intercepted, can the attacker see what's inside the payload?

  - Yes it is encoded in base64

- How can you implement authentication with a JWT? Describe how it works at a high level.

  - When a user signs in, you can give them the jwt with an encrypted token for login. When
    receiving that token later for authentication we can check its signature with a secret key
    in order to verify that it has not been tampered with.

- Compare and contrast unit, integration and end-to-end tests.

  - integration tests: tests individual software units (larger than unit tests)
  - end-to-end tets: tests the users workflow

- What is a mock? What are some things you would mock?

  - A mock is a fake version of something used to test code.
  - Somethings to mock are: databases, api communication, authentication

- What is continuous integration?
  a way for multiple people to work on the same code. each person makes sure they merge frequently

  - in order to not cause too many conflicts.

- What is an environment variable and what are they used for?

  - Its variables set up outside the code/program. They are usually used for security sensitive stuff
    or to set up stuff for different configurations for different environments.

- What is TDD? What are some benefits and drawbacks?

  - form of coding where you create tests before coding.
  - It helps you develop logic to build up in to the problem as you break it into smaller pieces.
  - One drawback is that it can be slow as developing the rights tests may be difficult.

- What is the value of using JSONSchema for validation?

  - It provides a way to enforce consistency for describing data formatting.

- What are some ways to decide which code to test?

  - Check every function and see what can be tested.
  - time theres an error, you can write a test to verify it's fixed

- What does `RETURNING` do in SQL? When would you use it?

  - Some SQL clauses don't return anything (esp ones that modify/insert/delete).
  - You can use returning to see the data after changing it.

- What are some differences between Web Sockets and HTTP?

  - socket is a direct connection between the client and server while http is request and response based.

- Did you prefer using Flask over Express? Why or why not (there is no right
  answer here --- we want to see how you think about technology)?
  - Express
  - Middleware and routing are cool concepts to code with. And make things feel like they flow.
