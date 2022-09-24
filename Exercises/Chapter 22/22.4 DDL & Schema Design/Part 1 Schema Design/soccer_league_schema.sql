DROP DATABASE IF EXISTS soccer_league;

CREATE DATABASE soccer_league;

\c soccer_league

CREATE TABLE teams
  (id SERIAL PRIMARY KEY,
  rank INT NOT NULL);

CREATE TABLE refrees
  (id SERIAL PRIMARY KEY);

CREATE TABLE seasons
  (id SERIAL PRIMARY KEY,
  start_date INT NOT NULL,
  end_date INT NOT NULL);

CREATE TABLE players
  (id SERIAL PRIMARY KEY,
  team_id INTEGER REFERENCES teams(id));

CREATE TABLE games
  (id SERIAL PRIMARY KEY,
  home_team_id INTEGER REFERENCES teams(id),
  away_team_id INTEGER REFERENCES teams(id),
  refree_id INTEGER REFERENCES refrees(id),
  season_id INTEGER REFERENCES seasons(id)
  )
