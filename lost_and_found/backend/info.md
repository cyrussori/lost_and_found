# HOW TO RUN

0. Install mysql if you don't have it
1. Create a `.env` file, containing your mysql username (default is root), password
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=lostfound_db

2. Create a lostfound_db in mysql with the db/schema.sql
cd backend and run: mysql -u root -p < ./db/schema.sql


# HOW TO INTEGRATE WITH FRONTEND
# User account
## 1. Sign up
On submit:
	•	Send a POST request to http://localhost:5050/api/auth/signup
    •   Body JSON example:
        {
            "name": "David",
            "email": "davidBigberg@gmail.com",
            "password": "123456"
        }
## 2. Log in
On submit:
	•	Send a POST request to http://localhost:5050/api/auth/login
    •   Body JSON example:
        {
            "email": "davidBigberg@example.com",
            "password": "123456"
        }
# Posts
## 1. Create a post
POST http://localhost:5050/api/posts/
select "form-data"
example of Key and Value: (select "Text" for Type)
    Key         Value
  user_id       1,
  post_type     Lost,
  title         Lost Wallet
  description   Black wallet near cafeteria
  category      Wallet
  address       Campus Cafeteria
  contact       esther@example.com
and then add the image:
Key         Type        Value
image       File        (select a file from your computer)

## 2. Get all posts
GET http://localhost:5050/api/posts/
## 3. Get post by post id
GET http://localhost:5050/api/posts/post_id
## 4. Get post by type
get all lost posts:
GET http://localhost:5050/api/posts/type/Lost
get all found posts:
GET http://localhost:5050/api/posts/type/Found
## 5. Get post by user id
GET http://localhost:5050/api/posts/user/user_id
## 6. Update a post
PUT http://localhost:5050/api/posts/post_id
req body example:
{
    "title": "Lost backpack blue",
    "description": "Blue backpack left in lecture hall 101, around 11am today",
    "category": "Bag",
    "address": "Lecture Hall 101",
    "contact": "alice@example.com",
}
## 7. Mark a post as resolved
PUT http://localhost:5050/api/posts/post_id/resolve
## 8. Delete a post
DELETE http://localhost:5050/api/posts/post_id


# HOW TO TEST LOGIN SYSTEM (with postman):

0. Download postman if you don't have it
1. Run in terminal: npm run dev
2. Open postman, click New → HTTP Request, select method as "POST"
3. Test signing up:
    a. Enter endpoint: http://localhost:5050/api/auth/signup
    b. Go to “Body” → choose “raw” → select “JSON”
    c. Paste this:   
{
    "name": "somename",
    "email": "someemail@example.com",
    "password": "secret123"
}
    d. Click send
4. Test logging in
    a. Change endpoint to: http://localhost:5050/api/auth/login
    b. Change the content to this:
{
  "email": "someemail@example.com",
  "password": "secret123"
}
    c. Click send
5. Try out other tests (sign up more users, logging in with wrong password, with an email that doesn't exist.... )


# BACKEND STRUCTURE:
backend/
├── package.json
├── server.js                //sets up a server, registers all routes
├── db/
│   └── connection.js        //creates connection to MYSQL database
├── models/
│   ├── userModel.js         //interacts with the database about user inqueries
│   └── postRoutes.js
└── routes/
    ├── authRoutes.js        //handles login and signup
    └── postRoutes.js        //handles login and signup
helper:
        clearDB.js           //clears the accounts database