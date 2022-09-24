DROP DATABASE IF EXISTS medical_records;

CREATE DATABASE medical_records;

\c medical_records

CREATE TABLE medical_centers
  (id SERIAL PRIMARY KEY);

CREATE TABLE doctors
  (id SERIAL PRIMARY KEY,
  medical_center_id INTEGER REFERENCES medical_centers(id)); 

CREATE TABLE patients
  (id SERIAL PRIMARY KEY);

CREATE TABLE visits
  (id SERIAL PRIMARY KEY,
  doctor_id INTEGER REFERENCES doctors(id),
  patient_id INTEGER REFERENCES patients(id));

CREATE TABLE diseases
  (id SERIAL PRIMARY KEY);

CREATE TABLE diagnoses
  (id SERIAL PRIMARY KEY,
  visit_id INTEGER REFERENCES visits(id),
  disease_id INTEGER REFERENCES diseases(id));
