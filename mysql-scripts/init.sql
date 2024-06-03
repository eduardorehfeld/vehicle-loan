CREATE DATABASE IF NOT EXISTS vehicleLoanDatabase;

USE vehicleLoanDatabase;

CREATE TABLE IF NOT EXISTS rate(
  id INT AUTO_INCREMENT PRIMARY KEY,
  loanTerm INT NOT NULL, 
  creditScore INT NOT NULL, 
  percentage DECIMAL(5,2) NOT NULL);

CREATE TABLE IF NOT EXISTS vehicle_loan(
  id INT AUTO_INCREMENT PRIMARY KEY,
  loanAmount DECIMAL(8,2) NOT NULL,
  loanTerm INT NOT NULL,
  creditScore INT NOT NULL,
  vehicleYear INT NOT NULL,
  vehicleMileage INT NOT NULL,
  percentageRate DECIMAL(5,2) NOT NULL,
  createdAt datetime NOT NULL);


INSERT INTO rate (loanTerm, creditScore, percentage) VALUES(1,1,4.75);
INSERT INTO rate (loanTerm, creditScore, percentage) VALUES(1,2,5.75);
INSERT INTO rate (loanTerm, creditScore, percentage) VALUES(1,3,12.75);
INSERT INTO rate (loanTerm, creditScore, percentage) VALUES(2,1,5);
INSERT INTO rate (loanTerm, creditScore, percentage) VALUES(2,2,6);
INSERT INTO rate (loanTerm, creditScore, percentage) VALUES(2,3,13.25);
INSERT INTO rate (loanTerm, creditScore, percentage) VALUES(3,1,5.5);
INSERT INTO rate (loanTerm, creditScore, percentage) VALUES(3,2,6.65);

