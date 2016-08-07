CREATE DATABASE burgers_db;
USE burgers_db;

CREATE TABLE burgers (
  id int AUTO_INCREMENT,
  burger_name varchar(60) NOT NULL,
  devoured boolean,
  date timestamp NOT NULL,
  PRIMARY KEY(id)
);