# HOW TO RUN

0. Install mysql if you don't have it
1. Create a `.env` file, containing your mysql username (default is root), password
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=lostfound_db

2. Create a lostfound_db in mysql with the db/schema.sql
cd backend and run: mysql -u root -p < ./db/schema.sql


# HOW TO TEST (with postman):

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


# How to integrate with frontend
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


# BACKEND STRUCTURE: (user accounts only)
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