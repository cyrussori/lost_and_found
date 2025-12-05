# Lost and Found @UCLA
Lost and Found@UCLA is a community-driven web app that allows UCLA students, faculty, and staff to report, search, and manage lost or found items on campus. Users can create accounts, post details about items they’ve lost or found, and search existing listings to help reunite owners with their belongings.
##  Installation
### Frontend
1. Download the application or clone the repository.
2. `cd` into the `frontend` directory 
3. Type in your console `npm install` then `npm run dev`
4. The frontend of the website is functional.
### Backend
0. Install mysql if you don't have it
1. `cd` into the `backend directory`.
2. Create a `.env` file, containing your mysql username (default is root), and password
- For macOS, paste the following template into your `.env` file.
```env
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=lostfound_db
```
3. Create a lostfound_db in mysql with the db/schema.sql
cd backend and run: `mysql -u root -p < ./db/schema.sql`.
4. Type `npm install` then `npm run dev`

## Features
- Report lost and found items. 
- Filterable browsing for lost and found items.
- View means of contact for some lost or found item.
- Searchable list of all reported items that are unresolved.

## Usage
1. **Login**: From the welcome page, login or create an account.

2. **Report items**: For a user who has lost or found an item, click on the plus icon in the navigation bar to the left of the page. 

3. **Mark posts as resolved**: If you've resolved a report with another person, navigate to your profile page and mark the post as resolved.