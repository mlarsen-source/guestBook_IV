CREATE DATABASE guestbook;

USE guestbook;

CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fname VARCHAR(255) NOT NULL,
  lname VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  linkedIn VARCHAR(255), 
  email VARCHAR(255) NOT NULL,
  meet ENUM('none', 'School', 'Work', 'Online', 'Job Fair', 'Social Event') NOT NULL DEFAULT 'none',
  other VARCHAR(255) DEFAULT NULL,
  message TEXT,
  mailList ENUM('Yes', 'No') DEFAULT 'No', 
  format ENUM('HTML', 'Text') NOT NULL,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO contacts (fname, lname, title, company, linkedIn, email, meet, other, message, mailList, format)
VALUES ('John', 'Doe', 'Supervisor', 'Google', 'linkedin.com/johndoe', 'johndoe@gmail.com', 'Work', NULL, 'Nice to meet you!', 'Yes', 'HTML');

INSERT INTO contacts (fname, lname, title, company, linkedIn, email, meet, other, message, mailList, format)
VALUES ('Joe', 'Shmoe', 'Manager', 'Microsoft', 'linkedin.com/joeshmoe', 'joeshmoe@gmail.com', 'School', NULL, 'Hello', 'No', 'HTML');

INSERT INTO contacts (fname, lname, title, company, linkedIn, email, meet, other, message, mailList, format)
VALUES ('Jane', 'Smith', 'Executive', 'Amazon', 'linkedin.com/janesmith', 'janesmith@gmail.com', 'Social Event', 'SXSW', NULL, 'Yes', 'Text');

SELECT * FROM contacts;