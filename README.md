<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

Commands For Database(MYSQL):
```
Create Database:
Database Name - uitouxDB (Can Chnage it according to the Organization needs)
Tables Used in Database:
1.user_registration_table
2.Vehicle_Table
3.Vehicle_Part_Table
4.PartType
5.Orders_Table
6.OrderStatus
7.blog_posts
8.Cart
9.Products
10.Wishlist
```

Commands For Table(MYSQL):
1.user_registration_table
```
create table user_registration_table 
(
id int primary key auto_increment,
user_name varchar(50) not null,
user_email_id varchar(50) not null,
user_phone_number int not null,
user_password varchar(15) not null
);
```
2.Vehicle_Table
```
CREATE TABLE Vehicle_Table (
vehicle_id INT PRIMARY KEY AUTO_INCREMENT,
make VARCHAR(255),
model VARCHAR(255),
year INT,
color VARCHAR(50)
);
```
3.Vehicle_Part_Table
```
CREATE TABLE Vehicle_Part_Table (
part_number INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(255),
description TEXT,
vehicle_id INT,
FOREIGN KEY (vehicle_id) REFERENCES Vehicle_Table(vehicle_id)
);
```
4.PartType
```
CREATE TABLE PartType (
part_type_id INT PRIMARY KEY AUTO_INCREMENT,
part_number INT,
type_name VARCHAR(255),
price DECIMAL(10, 2),
FOREIGN KEY (part_number) REFERENCES Vehicle_Part_Table(part_number)
);
```
5.Vehicle_Part_Table
```
CREATE TABLE Vehicle_Part_Table (
part_number INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(255),
description TEXT,
vehicle_id INT,
FOREIGN KEY (vehicle_id) REFERENCES Vehicle_Table(vehicle_id)
);
```
6.PartType
```
CREATE TABLE PartType (
part_type_id INT PRIMARY KEY AUTO_INCREMENT,
part_number INT,
type_name VARCHAR(255),
price DECIMAL(10, 2),
FOREIGN KEY (part_number) REFERENCES Vehicle_Part_Table(part_number)
);
```
7.Orders_Table
```
CREATE TABLE `Orders_Table` (
`order_id` INT AUTO_INCREMENT PRIMARY KEY,
`customer_id` INT NOT NULL,
`order_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
`total_price` DECIMAL(10, 2) NOT NULL,
`vehicle_id` INT NOT NULL,
`make` VARCHAR(255) NOT NULL,
`model` VARCHAR(255) NOT NULL,
`part_name` VARCHAR(255) NOT NULL,
`quantity` INT NOT NULL
);
```
8.OrderStatus
```
CREATE TABLE OrderStatus (
status_id INT AUTO_INCREMENT PRIMARY KEY,
status_name VARCHAR(255) NOT NULL,
order_id INT,
FOREIGN KEY (order_id) REFERENCES Orders_Table(order_id)
);
```
9.blog_posts
```
CREATE TABLE blog_posts (
post_id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255) NOT NULL,
content JSON NOT NULL,
created_at datetime,
updated_at datetime
);
```
10.Cart
```
CREATE TABLE Cart (
cart_id INT AUTO_INCREMENT PRIMARY KEY,
customer_id INT,
product_id INT,
quantity INT DEFAULT 1,
total_price INT 
);
```
11.Products
```
CREATE TABLE Products (
product_id INT AUTO_INCREMENT PRIMARY KEY,
Product_name VARCHAR(255) NOT NULL,
price DECIMAL(10, 2) NOT NULL,
description TEXT,
image_url VARCHAR(255)
);
```
12.Wishlist
```
CREATE TABLE Wishlist (
wishlist_id INT AUTO_INCREMENT PRIMARY KEY,
customer_id INT,
product_id INT,
added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
```

### ENV File For Backend (Nest JS)
# PORT
PORT=3001

# DATABASE CONFIGRATION VARIABLES
## DATABASE TYPE
DB_TYPE='mysql'
DB_PORT=3306
DB_HOST= 127.0.0.1
DB_USERNAME= root
DB_PASSWORD ='db@12345'

### Swagger TOOL For Api Testing
![Screenshot 2024-03-19 041644](https://github.com/Baskarrajcodeflow/UITOUX-BACKEND-REST-API/assets/149696470/2d829d40-5ffb-4a27-a910-5be590f41fa3)

![Screenshot 2024-03-19 041709](https://github.com/Baskarrajcodeflow/UITOUX-BACKEND-REST-API/assets/149696470/97268ef8-873e-4ded-b745-170b61c448e5)
