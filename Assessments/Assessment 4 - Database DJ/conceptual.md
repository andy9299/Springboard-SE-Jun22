### Conceptual Exercise

Answer the following questions below:

- What is PostgreSQL?  
  It is a relational database management system that follows SQL guidelines.

- What is the difference between SQL and PostgreSQL?  
  SQL is a language for managing data in relational databases.

- In `psql`, how do you connect to a database?  
  \c db_name

- What is the difference between `HAVING` and `WHERE`?  
  "HAVING" filters aggregated data (like "SUM" or "COUNT")  
  "WHERE" filters by looking at the rows

- What is the difference between an `INNER` and `OUTER` join?  
  "INNER" - intersection  
  "OUTER" - union

- What is the difference between a `LEFT OUTER` and `RIGHT OUTER` join?  
  "LEFT OUTER" will give all the rows in the left side of the join and common rows.  
  "RIGHT OUTER" will give all the rows in the right side of the join and common rows.

- What is an ORM? What do they do?  
  An ORM lets you query and manage a database in object oriented code. (no need for sql queries)

- What are some differences between making HTTP requests using AJAX
  and from the server side using a library like `requests`?  
  One of the main differences is hiding the query used.

- What is CSRF? What is the purpose of the CSRF token?  
  It is to provide extra protection when submitting a form to make sure it is the correct user in the session.

- What is the purpose of `form.hidden_tag()`?
  To hide the CSRF token.
