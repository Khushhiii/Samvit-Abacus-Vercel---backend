CREATE DATABASE IF NOT EXISTS samvit_abacus_db;
USE samvit_abacus_db;

CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_name VARCHAR(255) NOT NULL,
  parent_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  course_interested VARCHAR(255) NOT NULL,
  student_age INT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_name VARCHAR(255) NOT NULL,
  parent_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  course_level VARCHAR(255) NOT NULL,
  student_age INT NOT NULL,
  address TEXT NOT NULL,
  previous_experience TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
