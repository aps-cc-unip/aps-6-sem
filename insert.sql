CREATE TYPE Roles AS ENUM ('USER', 'ADMIN', 'DIRECTOR');

CREATE TABLE
  users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    roles Roles NOT NULL
  );

INSERT INTO
  users (name, email, roles, password)
VALUES
  (
    'Eder Lima',
    'eder@mail.com',
    'DIRECTOR',
    'uploads/eder.png'
  ),
  (
    'Gustavo Marinho',
    'gustavo@mail.com',
    'DIRECTOR',
    'uploads/gustavo.png'
  ),
  (
    'Matheus Farali',
    'matheus@mail.com',
    'DIRECTOR',
    'uploads/matheus.png'
  ),
  (
    'Marcus Vinicius',
    'marcus@mail.com',
    'DIRECTOR',
    'uploads/marcus.png'
  ),
  (
    'Jeferson dos Santos',
    'jeferson@mail.com',
    'DIRECTOR',
    'uploads/jeferson.png'
  );