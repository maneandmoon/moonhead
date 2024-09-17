# Phase 5 Capstone Project

## MoonHead
---
## Description

MoonHead is a lunar hair-styling app that offers personalized hairstyles based on the moon’s phases and allows the user to book appointments with a stylist.

### Prerequisites

Before starting, make sure you have completed the following:

	Git is installed.
	
	You have a GitHub account.
	
	Node.js and npm are installed.
	
	Python and pipenv are installed.
	
	Honcho is installed for managing Procfile-based applications.

### Getting Started

To set up a local instance, follow these steps:

#### Front-end Installation

1. Clone the repository:

		git clone git@github.com:your-username/moonhead.git

2. Change to the root directory:

		cd moonhead

3. Install npm packages:

		npm install

4. Move to the front-end directory:

		cd client

5. Install npm packages in the front-end directory:

		npm install

#### Back-end Installation

Make sure you are in the root directory of the project.

Install pipenv and the necessary dependencies:

		pipenv install

Activate the virtual environment:

		pipenv shell

#### Database Setup

Navigate to the data directory:

		cd server/Database-Imports

Create a database file from the SQL file:

		sqlite3 app.db < backup.sql

Alternatively, you can create a migration environment by navigating to cd server and following these prompts to create two new directories-- instance and migrations, where app.db will be added to the instance directory.

		flask db init
		
		flask db migrate -m "Initial migration."
		
		flask db upgrade
		
		python seed.py

#### Running the Application

Ensure you are in the root directory of the project.

Start the application using Honcho:

		honcho start -f Procfile.dev

#### API Usage

To interact with the API, send requests to the endpoints defined in your backend. For example:

		curl -X GET http://localhost:3000

Alternatively, use a tool like Postman to set the URL to your local server's API endpoint and make your desired requests.

#### Additional Notes

Verify that your SQLite database file is correctly set up before starting the back-end server.

## Wireframe

1.	Home – show the moon phase and hairstyles 
2.	View Hairstyles {Price list(maybe stretch goal), services (maybe stretch goal)}
3.	Appointment booking
4.	User profile and appointment history
5.	Stylist profile


## User Stories

1.	User can view hairstyle recommendations based on current moon phases and style hair according to lunar cycles.
2.	User can view price list, services offered, and browse hairstyles
3.	User can view appointment history and make changes to upcoming appointments.
4.	User can view stylist profile.

## React Tree Diagram 
![React Tree MoonHead](https://github.com/user-attachments/assets/5c9e5ae3-70ea-447f-a065-ea7ed613e58b)

## Schema

One Join Table
![ERD MoonHead](https://github.com/user-attachments/assets/ea00879a-bd3b-4494-8312-2fec2feb6775)


Multiple Join Tables
![ERD2 MoonHead](https://github.com/user-attachments/assets/e4c74c33-a11a-4de2-aaca-faefe5a8f2e0)


	Example models:
 
	class User — id, username, email, password
			  appointments = db.relationship – Appointment, user
			  hairstyles = asso proxy – appointments, hairstyle

			User has many appointments (one-to-many)
			
			Appointment belongs to one User
		
			User has many hairstyles (many-to-many through appointments)
   				
	class Hairstyle – id, name, moon_phase_id(fk)
			appointments = db.relationship – Appointment, hairstyle
			moon_phase = db.relationship – MoonPhase, hairstyles_moon
   	
			User can have many hairstyles
			
			Many-to-many through appointments
		
			Hairstyle belongs to MoonPhase
			
	class MoonPhase – id, phase, date
			hairstyles_moon = db.relationship— Hairstyle, moon_phase 
   		
	     		MoonPhase has many hairstyles
		
	class Stylist – id, name, specialty (color or cut)
			appointments = db.relationship – Appointment, stylist
   		  		
	      		Stylist has many appointments (one-to-many)
	      		
			Appointment belongs to one Stylist
	
 	class Appointment – join table – id, date, time, user_id(fk), harstyle_id(fk), stylist_id(fk) 
			user = db.relationshp – User, appointments
			hairstyle = db.relatonship – Hairstyle, appointments
			stylist = db.relationship—Stylist, appointments


   


### Validations/Constraints 
Example validations and constraints

#### Validations
	Email format = @
	Password length (5)
	Image = url

#### Constraints
	User.email = required, unique
	User.username = required, unique
	Appointment.date and Appointment.time = required

## API Routes

A list of your API routes (includes HTTP Verb, Endpoint, Purpose):

### User Routes

	GET /users: Retrieve a list of all users.
	
	GET /users/<id>: Retrieve a specific user by ID.
	
	POST /users: Create a new user.
	
	PATCH /users/<id>: Partially update a specific user by ID.
	
	DELETE /users/<id>: Delete a specific user by ID.


### Stylist Routes

	GET /stylists: Retrieve a list of all stylists.
	
	GET /stylists/<id>: Retrieve a specific stylist by ID.
	
	POST /stylists: Create a new stylist.
	
	PATCH /stylists/<id>: Partially update a specific stylist by ID.
	
	DELETE /stylists/<id>: Delete a specific stylist by ID.



### Hairstyle Routes 

	GET /hairstyles: Retrieve a list of all hairstyles.
	
	GET /hairstyles/<id>: Retrieve a specific hairstyle by ID.
	
	POST /hairstyles: Create a new hairstyle.
	
	PATCH /hairstyles/<id>: Partially update a specific hairstyle by ID.
	
	DELETE /hairstyles/<id>: Delete a specific hairstyle by ID.


### Appointment Routes

	GET /appointments: Retrieve a list of all appointments.
	
	GET /appointments/<id>: Retrieve a specific appointment by ID.
	
	POST /appointments: Create a new appointment.
	
	PATCH /appointments/<id>: Partially update a specific appointment by ID.
	
	DELETE /appointments/<id>: Delete a specific appointment by ID.


### MoonPhase Routes

	GET /moon-phase: Fetch the current moon phase
	
	curl --request GET \
		--url 'https://moon-phase.p.rapidapi.com/calendar?format=html' \
		--header 'x-rapidapi-host: moon-phase.p.rapidapi.com' \
		--header 'x-rapidapi-key: Sign Up for Key'

## Stretch Goals

1. Add Admin Authorization to update stylists -- delete or create new stylist.
2. Authenication for secure user login.
3. Include price list and additional services offered page
4. Add a user profile feature for tracking past hairstyles and appointments.
5. Implement push notifications to remind users about upcoming moon phases or scheduled appointments.
6. Integrate astrology into hairstyle recommendations (e.g., based on zodiac signs).
7. Allow users to leave reviews after verified appointments.

## Kanban Board

To Do, In Progess, Testing, Done

	Build Models
	Build App.py
	Seed Data
	Build backend for new user, new stylist, new appointment, update appointmen
	Use Moon API
	Setup React  
	Use Formik and yup
	React routes
