        MeetMyHarvest
The MeetMyHarvest project aims to develop a comprehensive online platform that connects farmers with buyers, allowing users to explore a variety of agricultural products and streamline the process of ordering these products in bulk.

Designed aand Developed by: Fortune Ifeanyi and John Tighil


        METHODOLOGY
mkdir Travel\ connect
mkdir Frontend Backend
cd Backend 
mkdir routes db 
touch app.js
npm init -y
npm install express morgan pg cors bcrypt cloudinary
touch db/index.js 
touch routes/farmers.js 
touch routes/buyers.js 
touch routes/administrator.js 
touch routes/registration.js 
touch routes/products.js 


        SETTING UP THE DATABASE
CREATEDB -h localhost -p 5432 -U postgres meetmyharvest

CREATE TABLE users (user_id SERIAL PRIMARY KEY, username VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, password VARCHAR(500) NOT NULL, user_type varchar(255) not null, mobile_no varchar(100) not null, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE farmers (farmer_id SERIAL PRIMARY KEY, username VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, password VARCHAR(500) NOT NULL, mobile_no varchar(100) not null, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE buyers (buyer_id SERIAL PRIMARY KEY, username VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, password VARCHAR(500) NOT NULL, mobile_no varchar(100) not null, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE items (item_id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, quantity VARCHAR(100) NOT NULL, description VARCHAR(500) NOT NULL, price varchar(100) not null, added_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP, images varchar(255), location varchar(255) not null);

CREATE TABLE items (
    item_id SERIAL PRIMARY KEY NOT NULL,
    farmer_id INT REFERENCES farmers(farmer_id) NOT NULL,
    name VARCHAR(255) NOT NULL,
    quantity VARCHAR(255) NOT NULL,
    price NUMERIC NOT NULL,
    description TEXT,
    location varchar(255) not null,
    img_public_id VARCHAR(255),
    img_url VARCHAR(500),
    added_at TIMESTAMP DEFAULT current_timestamp
);

create table cart (cart_item_id serial primary key, user_id integer references users (user_id) ON DELETE CASCADE, item_id integer REFERENCES items (item_id) ON DELETE CASCADE);

<!-- TO DELETE LOGIN LOGS OLDER THAN 7 DAYS -->
delete from login_logs where logged_in_at < current_timestamp - interval '7 days';

<!-- 
git checkout -b john
git add .
git commit -m "Write what you updated here"
git fetch
git push -u origin john -->







