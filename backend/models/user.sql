CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR (16) UNIQUE NOT NULL,
    display_name VARCHAR (16) NOT NULL,
    password VARCHAR (50) NOT NULL,
    email VARCHAR (225) UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL,
    last_login TIMESTAMP,
);