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

#### Setup Environment Variables and API Key

##### API Key 

1. Obtain an API Key from weatherapi.com by signing up for a free account. Follow the prompt on screen and login. 
2. An API key will be provided. Use this key as a request parameter through an API.
		
		key=<YOUR API KEY>

3. Base URL for request to WeatherAPI.com is:
		
		Base URL: "http://api.weatherapi.com/v1"

4. URL for moon phase request is:
		
		"http://api.weatherapi.com/v1/astronomy.json"

5. Required request parameters are API key (key); query (q) (parameter is set to Chicago as the location but update it as needed depending on the user's location); and date time (dt).

##### Environment Creation

1. Create a `.env` file in the project root directory.
2. Add your API key to the `.env` file:

		API_KEY=your_api_key_here

3. Install the required packages:

		pip install python-dotenv

4. Run the application:

		python app.py

By following these steps, we ensure that API keys and sensitive information remain private and secure, even in a private GitHub repository.

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
https://lucid.app/lucidspark/5ebfdb01-6613-4156-8b12-812118269859/edit?viewport_loc=-1232%2C-12889%2C14348%2C26584%2C0_0&invitationId=inv_9605c5de-aa78-45b9-88b2-9c4164eb95bf

![HomeMoonHead](https://github.com/user-attachments/assets/51d34318-be1b-43f4-8345-13483fa9e508)
![HairstylesMoonHead](https://github.com/user-attachments/assets/7836cefc-2e84-4cda-9c02-bf96b62f855c)
![StylistMoonHead](https://github.com/user-attachments/assets/86e8dbd2-de4d-41f3-87dd-5a78ba5d7cde)
![AppointmentMoonHead](https://github.com/user-attachments/assets/705eee49-487e-42b1-98e4-7aa34c9ba89c)
![UserProfileMoonHead](https://github.com/user-attachments/assets/6f144b9b-716b-4b99-8a22-47913cc76f0f)
![LoginMoonHead](https://github.com/user-attachments/assets/ef1af6d7-26dc-41ea-b5f2-f76a055e19c8)


1.	Home – show the moon phase and hairstyles 
2.	View Hairstyles {Price list(maybe stretch goal), services (maybe stretch goal)}
3.	Stylists
4.	Appointment booking
5.	User profile
6.	Login


## User Stories

1.	User can view hairstyle recommendations based on current moon phases and style hair according to lunar cycles.
2.	User can view price list, services offered, and browse hairstyles
3.	User can view appointment history and make changes to upcoming appointments.
4.	User can view stylist profile.

## React Tree Diagram 
![TreeMoonHeadnoStylistform](https://github.com/user-attachments/assets/aacbddff-b162-47e0-84b1-36d62266c82d)

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
https://lucid.app/lucidspark/eb068605-dc0f-431f-952d-19099a7f6d25/edit?viewport_loc=-629%2C-996%2C3454%2C1653%2C0_0&invitationId=inv_c490abfc-0086-408c-8610-524e0ec44a97

![KanbanMoonHead](https://github.com/user-attachments/assets/68256bc4-0337-4163-8a32-43ec5f60dc31)




