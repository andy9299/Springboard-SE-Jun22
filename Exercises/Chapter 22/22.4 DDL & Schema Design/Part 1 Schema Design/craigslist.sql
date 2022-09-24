DROP DATABASE IF EXISTS craigslist;

CREATE DATABASE craigslist;

\c craigslist

CREATE TABLE regions
  (id SERIAL PRIMARY KEY);

CREATE TABLE categories
  (id SERIAL PRIMARY KEY); 

CREATE TABLE users
  (id SERIAL PRIMARY KEY,
  pref_region_id INTEGER REFERENCES regions(id));

CREATE TABLE posts
  (id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES categories(id),
  region_id INTEGER REFERENCES regions(id),
  poster_id INTEGER REFERENCES users(id),
  location TEXT,
  title TEXT,
  text TEXT);
