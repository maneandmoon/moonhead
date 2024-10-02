#!/usr/bin/env python3
from werkzeug.security import generate_password_hash, check_password_hash
# Standard library imports
from dotenv import load_dotenv
import os

# Remote library imports
from flask import request, make_response, jsonify, session
from flask_login import LoginManager, login_user, logout_user, current_user
from flask_restful import Resource
from datetime import datetime, timedelta, time
from sqlalchemy.exc import IntegrityError
import requests

# Local imports
from config import app, db, api, bcrypt

# Add your model imports
from models import db, User, Hairstyle, Stylist, Appointment, MoonPhase

# Load environment variables from .env file
load_dotenv()  

API_KEY = os.getenv('API_KEY')

# Views go here!

@app.route('/')
def index():
    return '<h1>Project MoonHead</h1>'

# Initialize the login manager
login_manager = LoginManager(app)
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))  # Ensure this returns a User instance by ID

# User

# 127.0.0.1 - - [26/Sep/2024 12:40:58] "GET /users HTTP/1.1" 200 -
# /home/lindata/Development/code/phase-5/moonhead/server/app.py:63: LegacyAPIWarning: The Query.get() method is considered legacy as of the 1.x series of SQLAlchemy and becomes a legacy construct in 2.0. The method is now available as Session.get() (deprecated since: 2.0) (Background on SQLAlchemy 2.0 at: https://sqlalche.me/e/b8d9)
#   user = User.query.get(id)
# 127.0.0.1 - - [26/Sep/2024 12:41:08] "GET /users/1 HTTP/1.1" 200 -
# Type of user_birthdate: <class 'datetime.datetime'>
# 127.0.0.1 - - [26/Sep/2024 12:42:17] "POST /users HTTP/1.1" 201 -
# /home/lindata/Development/code/phase-5/moonhead/server/app.py:74: LegacyAPIWarning: The Query.get() method is considered legacy as of the 1.x series of SQLAlchemy and becomes a legacy construct in 2.0. The method is now available as Session.get() (deprecated since: 2.0) (Background on SQLAlchemy 2.0 at: https://sqlalche.me/e/b8d9)
#   user = User.query.get(id)
# Type of user_birthdate: <class 'datetime.date'>
# 127.0.0.1 - - [26/Sep/2024 12:43:02] "PATCH /users/182 HTTP/1.1" 200 -

# ask rachel about this warning--should update to db.session.get(User, id) for patch and getting single user? 

class UserList(Resource):
    def get(self):
        users = User.query.all()
        return make_response([{
            'id': user.id, 
            'username': user.username, 
            'email': user.email, 
            'birthdate': user.birthdate.strftime('%Y-%m-%d'),   #to format it w/o GMT
            'appointments': [
                {
                    'id': appointment.id,
                    'date': appointment.date.strftime('%Y-%m-%d'),  # Format date
                    'time': appointment.time.strftime('%H:%M') if appointment.time else None,  # Format time
                    'hairstyle': appointment.hairstyle.name,  # Include hairstyle name
                    'stylist': appointment.stylist.name  # Include stylist name
                } for appointment in user.appointments
            ]
        } for user in users], 200)
    
    def post(self):
        data = request.get_json()
        birthdate = datetime.strptime(data['birthdate'], '%Y-%m-%d')
        new_user = User(username=data['username'], email=data['email'], birthdate=birthdate)
        new_user.password = data['password']  # Set the password correctly

        # , password_hash=data['password']
        db.session.add(new_user)
        db.session.commit()
        return make_response({'id': new_user.id}, 201)
                
api.add_resource(UserList, '/users')    

# {
#   "username": "newusertest63",
#   "email": "newusertest_63@example.com",
#   "birthdate": "1982-06-21"
# }

class UserResource(Resource):
    def get(self, id):
        # user = User.query.get(id)

        # user = User.query.filter_by(id=id).first()
        user = db.session.get(User, id)  # Use Session.get() instead of Query.get()
        
        if user is None:
            return make_response({'message': 'User not found'}, 404)
        return make_response({
            'id': user.id, 
            'username': user.username, 
            'email': user.email, 
            'birthdate': user.birthdate.strftime('%Y-%m-%d'),
            'appointments': [
                {
                    'id': appointment.id,
                    'date': appointment.date.strftime('%Y-%m-%d'),  # Format date
                    'time': appointment.time.strftime('%H:%M') if appointment.time else None,  # Format time
                    'hairstyle': appointment.hairstyle.name,
                    'stylist': appointment.stylist.name
                } for appointment in user.appointments
            ] 
        }, 200)

    def patch(self, id):
        # user = User.query.get(id)
        # user = User.query.filter_by(id=id).first()
        user = db.session.get(User, id)  # Use Session.get() instead of Query.get()

        if user is None:
            return make_response({'message': 'User not found'}, 404)
        data = request.get_json()
        for key, value in data.items():
            setattr(user, key, value)
        db.session.commit()
        return make_response({'id': user.id}, 200)

    def delete(self, id):
        user = User.query.get(id)
        if user is None:
            return make_response({'message': 'User not found'}, 404)
        db.session.delete(user)
        db.session.commit()
        return make_response('', 204)
    
api.add_resource(UserResource, '/users/<int:id>')

# Stylist

class StylistList(Resource):
    def get(self):
        stylists = Stylist.query.all()
        return make_response(
            [{'id': stylist.id, 'name': stylist.name, 'specialty': stylist.specialty} for stylist in stylists], 200)
    
    def post(self):
        data = request.get_json()
        new_stylist = Stylist(name=data['name'], specialty=data.get('specialty'))
        db.session.add(new_stylist)
        db.session.commit()
        return make_response({'id': new_stylist.id}, 201)

api.add_resource(StylistList, '/stylists')
  
class StylistResource(Resource):
    def get(self, id):
        stylist = Stylist.query.get(id)
        if stylist is None:
            return make_response({'message': 'Stylist not found'}, 404)
        return make_response({'id': stylist.id, 'name': stylist.name, 'specialty': stylist.specialty}, 200)

    def patch(self, id):
        stylist = Stylist.query.get(id)
        if stylist is None:
            return make_response({'message': 'Stylist not found'}, 404)
        data = request.get_json()
        for key, value in data.items():
            setattr(stylist, key, value)
        db.session.commit()
        return make_response({'id': stylist.id}, 200)

    def delete(self, id):
        stylist = Stylist.query.get(id)
        if stylist is None:
            return make_response({'message': 'Stylist not found'}, 404)
        db.session.delete(stylist)
        db.session.commit()
        return make_response('', 204)

api.add_resource(StylistResource, '/stylists/<int:id>')        

# Hairstyle 

class HairstyleList(Resource):
    def get(self):
        hairstyles = Hairstyle.query.all()
        return make_response(
            [{'id': hairstyle.id, 'name': hairstyle.name, 'price': hairstyle.price} for hairstyle in hairstyles], 200)
    
    def post(self):
        data = request.get_json()
        new_hairstyle = Hairstyle(name=data['name'], image=data.get('image'))
        db.session.add(new_hairstyle)
        db.session.commit()
        return make_response({'id': new_hairstyle.id}, 201)
    
api.add_resource(HairstyleList, '/hairstyles')

class HairstyleResource(Resource):
    def get(self, id):
        hairstyle = Hairstyle.query.get(id)
        if hairstyle is None:
            return make_response({'message': 'Hairstyle not found'}, 404)
        return make_response({'id': hairstyle.id, 'name': hairstyle.name, 'price': hairstyle.price}, 200)

    def patch(self, id):
        hairstyle = Hairstyle.query.get(id)
        if hairstyle is None:
            return make_response({'message': 'Hairstyle not found'}, 404)
        data = request.get_json()
        for key, value in data.items():
            setattr(hairstyle, key, value)
        db.session.commit()
        return make_response({'id': hairstyle.id}, 200)

    def delete(self, id):
        hairstyle = Hairstyle.query.get(id)
        if hairstyle is None:
            return make_response({'message': 'Hairstyle not found'}, 404)
        db.session.delete(hairstyle)
        db.session.commit()
        return make_response('', 204)
    
api.add_resource(HairstyleResource, '/hairstyles/<int:id>')
  
# Appointment

@app.route('/appointments', methods=['POST'])
def create_appointment():
    data = request.json

    date_str = data.get('date')
    time_str = data.get('time')
    user_id = data.get('user_id')
    hairstyle_id = data.get('hairstyle_id')
    stylist_id = data.get('stylist_id')

    if not all([date_str, time_str, user_id, hairstyle_id, stylist_id]):
        return make_response(jsonify({"error": "All fields are required."}), 400)

    # Combine date and time into a single datetime object
    try:
        appointment_date = datetime.strptime(date_str, '%Y-%m-%d').date()
        appointment_time = datetime.strptime(time_str, '%H:%M').time()
    except ValueError:
        return make_response(jsonify({"error": "Invalid date format. Use 'YYYY-MM-DD' for date and 'HH:MM' for time."}), 400)

    # Check for overlapping appointments
    existing_appointment = (
        db.session.query(Appointment)
        .filter(
            Appointment.stylist_id == stylist_id,
            Appointment.date == appointment_date,
            Appointment.time == appointment_time
        )
        .first()
    )

    if existing_appointment:
        return make_response(jsonify({"error": "This stylist already has an appointment at this time."}), 400)

    new_appointment = Appointment(
        date=appointment_date,
        time=appointment_time,
        user_id=user_id,
        hairstyle_id=hairstyle_id,
        stylist_id=stylist_id
    )

    try:
        db.session.add(new_appointment)
        db.session.commit()
        return make_response(jsonify({"message": "Appointment created successfully.", "id": new_appointment.id}), 201)
    except IntegrityError:
        db.session.rollback()
        return make_response(jsonify({"error": "Could not create appointment."}), 500)

class AppointmentList(Resource):
    def get(self):
        appointments = Appointment.query.all()
        return make_response(
            [{
                'id': appointment.id, 
                'date': appointment.date.strftime('%Y-%m-%d'), 
                'time': appointment.time.strftime("%H:%M"),  # Convert time to string
                'user_id': appointment.user_id,
                'hairstyle_id': appointment.hairstyle_id,
                'stylist_id': appointment.stylist_id,
                'updated_at': appointment.updated_at.isoformat() if appointment.updated_at else None
                } for appointment in appointments], 200
        )
    
api.add_resource(AppointmentList, '/appointments')
   
class AppointmentResource(Resource):
    def get(self, id):
        # appointment = Appointment.query.get(id)
        appointment = db.session.get(Appointment, id)  # Use Session.get() instead of Query.get()

        if appointment is None:
            return make_response({'message': 'Appointment not found'}, 404)
        return make_response({
            'id': appointment.id,
            'date': appointment.date.strftime('%Y-%m-%d'),
            'time': appointment.time.strftime("%H:%M"),  # Convert time to string,
            'user_id': appointment.user_id,
            'hairstyle_id': appointment.hairstyle_id,
            'stylist_id': appointment.stylist_id}, 200)


    # def patch(self, id):
    #     appointment = Appointment.query.get(id)
    #     if appointment is None:
    #         return make_response({'message': 'Appointment not found'}, 404)
    #     data = request.get_json()
    #     for key, value in data.items():
    #         setattr(appointment, key, value)
    #     db.session.commit()
    #     return make_response({'id': appointment.id}, 200)

    def patch(self, id):
        # appointment = Appointment.query.get(id)
        appointment = db.session.get(Appointment, id)  # Use Session.get() instead of Query.get()
        if appointment is None:
            return make_response({'message': 'Appointment not found'}, 404)
        
        data = request.get_json()
        
        # # Handle time conversion
        # if 'time' in data and isinstance(data['time'], str):
        #     try:
        #         hours, minutes = map(int, data['time'].split(':'))

        #         now = datetime.now()
        #         data['time'] = datetime(now.year, now.month, now.day, hours, minutes)

        #         # data['time'] = time(hour=hours, minute=minutes)
        #     except ValueError:
        #         return make_response({'error': "Invalid time format. Use 'HH:MM'."}, 400)

        #     # Update appointment fields
        #     for key, value in data.items():
        #         setattr(appointment, key, value)

         # Handle time conversion
        if 'time' in data and isinstance(data['time'], str):
            try:
                hours, minutes = map(int, data['time'].split(':'))
                data['time'] = time(hour=hours, minute=minutes)
            except ValueError:
                return make_response({'error': "Invalid time format. Use 'HH:MM'."}, 400)

        # Update appointment fields
        for key, value in data.items():
            if key == 'updated_at':
                value = datetime.now()  # Set to current datetime for updated_at
            setattr(appointment, key, value)

            db.session.commit()
            return make_response({'id': appointment.id}, 200)

    def delete(self, id):
        appointment = Appointment.query.get(id)
        if appointment is None:
            return make_response({'message': 'Appointment not found'}, 404)
        db.session.delete(appointment)
        db.session.commit()
        return make_response('', 204)
    
api.add_resource(AppointmentResource, '/appointments/<int:id>')    

# MoonPhase 

class CurrentMoonPhaseResource(Resource):
    def get(self):
        url = "http://api.weatherapi.com/v1/astronomy.json"
        params = {
            "key": "bab7feb848584ba19c3160724242009", 
            # API_KEY -- if wanted to keep API private--in .env
            "q": "Chicago",
            "dt": datetime.now().strftime('%Y-%m-%d')  # Use today's date
        }

        try:
            response = requests.get(url, params=params)
            print(f"Response Status Code: {response.status_code}")
            print(f"Response Text: {response.text}")

            response.raise_for_status()
            data = response.json()

            moon_phase_data = {
                'phase': data['astronomy']['astro']['moon_phase'],
                'date': None,  # Initialize date as None
                'image': self.get_moon_image
                # (data['astronomy']['astro']['moon_phase'])
            }

            if moon_phase_data['phase'] and data['astronomy']['astro']['moonrise'] != "No moonrise":
                # Combine the current date with the moonrise time
                moonrise_time_str = data['astronomy']['astro']['moonrise']
                current_date = datetime.now().date()  # Get current date
                moonrise_time = datetime.strptime(moonrise_time_str, '%I:%M %p')  # Parse moonrise time
                
                # Combine date and time into a single datetime object
                full_moonrise_datetime = datetime.combine(current_date, moonrise_time.time())
                moon_phase_data['date'] = full_moonrise_datetime.strftime('%Y-%m-%d %H:%M:%S')  # Format as "year-month-day hour:minute:second"

                # Save to database
                new_moon_phase = MoonPhase(phase=moon_phase_data['phase'], date=full_moonrise_datetime, image=moon_phase_data['image'])
                db.session.add(new_moon_phase)
                db.session.commit()

                return make_response(moon_phase_data, 200)
            else:
                print("No valid moonrise data to save.")
                moon_phase_data['message'] = 'No valid moonrise data found.'
                return make_response(moon_phase_data, 200)  # Return the moon_phase_data with a message

        except requests.exceptions.HTTPError as http_err:
            print(f"HTTP error occurred: {http_err}")
            print(f"Response Text: {response.text}")
            return make_response({'error': f"HTTP error occurred: {http_err}"}, 400)

        except requests.exceptions.RequestException as req_err:
            print(f"Request exception occurred: {req_err}")
            return make_response({'error': f"Request exception occurred: {req_err}"}, 500)

        except Exception as e:
            print(f"An unexpected error occurred: {e}")
            return make_response({'error': str(e)}, 500)

    def get_moon_image(self, phase):
        images = {
            'New Moon': 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000872/GSFC_20171208_Archive_e000872~small.jpg',
            'Waxing Crescent': 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000865/GSFC_20171208_Archive_e000865~medium.jpg',
            'First Quarter': 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001863/GSFC_20171208_Archive_e001863~medium.jpg',
            'Waxing Gibbous': 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000867/GSFC_20171208_Archive_e000867~small.jpg',
            'Full Moon': 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000868/GSFC_20171208_Archive_e000868~medium.jpg',
            'Waning Gibbous': 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000868/GSFC_20171208_Archive_e000868~medium.jpg',
            'Last Quarter': 'https://images-assets.nasa.gov/image/iss066e152090/iss066e152090~medium.jpg',
            'Waning Crescent': 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000871/GSFC_20171208_Archive_e000871~small.jpg',
        }
        return images.get(phase, '')

api.add_resource(CurrentMoonPhaseResource, '/moon-phase')


class MoonPhaseResource(Resource):
    def get(self):
        url = "http://api.weatherapi.com/v1/astronomy.json"
        params = {
            "key": "bab7feb848584ba19c3160724242009",
            # API_KEY -- if wanted to keep API private--in .env
            "q": "Chicago",
        }

        month_phases = []  # To store moon phase data for the month
        current_date = datetime.now()
        start_of_month = current_date.replace(day=1)
        # Get the last day of the current month
        next_month = start_of_month.replace(month=start_of_month.month + 1) if start_of_month.month < 12 else start_of_month.replace(year=start_of_month.year + 1, month=1)
        end_of_month = (next_month - timedelta(days=1)).day

        for day in range(1, end_of_month + 1):
            params["dt"] = start_of_month.replace(day=day).strftime('%Y-%m-%d')  # Set date for each day in the month

            try:
                response = requests.get(url, params=params)
                response.raise_for_status()
                data = response.json()

                moon_phase = data['astronomy']['astro']['moon_phase']
                moonrise_time_str = data['astronomy']['astro']['moonrise']

                if moon_phase and moonrise_time_str != "No moonrise":
                    moonrise_time = datetime.strptime(moonrise_time_str, '%I:%M %p')  # Parse moonrise time
                    full_moonrise_datetime = datetime.combine(start_of_month.replace(day=day).date(), moonrise_time.time())

                    moon_phase_data = {
                        'phase': moon_phase,
                        'date': full_moonrise_datetime.strftime('%Y-%m-%d %H:%M:%S'),  # Format as "year-month-day hour:minute:second"
                        'image': self.get_moon_image(moon_phase),
                    }

                    # Save to database if needed
                    new_moon_phase = MoonPhase(phase=moon_phase_data['phase'], date=full_moonrise_datetime, image=moon_phase_data['image'])
                    db.session.add(new_moon_phase)
                    month_phases.append(moon_phase_data)

            except requests.exceptions.HTTPError as http_err:
                print(f"HTTP error occurred for date {start_of_month.replace(day=day).strftime('%Y-%m-%d')}: {http_err}")
            except Exception as e:
                print(f"An unexpected error occurred for date {start_of_month.replace(day=day).strftime('%Y-%m-%d')}: {e}")

        db.session.commit()  # Commit all new moon phases after the loop

        return make_response(month_phases, 200)  # Return all moon phase data for the month
    

    def get_moon_image(self, phase):
        images = {
            'New Moon': 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000872/GSFC_20171208_Archive_e000872~small.jpg',
            'Waxing Crescent': 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000865/GSFC_20171208_Archive_e000865~medium.jpg',
            'First Quarter': 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001863/GSFC_20171208_Archive_e001863~medium.jpg',
            'Waxing Gibbous': 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000867/GSFC_20171208_Archive_e000867~small.jpg',
            'Full Moon': 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000868/GSFC_20171208_Archive_e000868~medium.jpg',
            'Waning Gibbous': 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000868/GSFC_20171208_Archive_e000868~medium.jpg',
            'Last Quarter': 'https://images-assets.nasa.gov/image/iss066e152090/iss066e152090~medium.jpg',
            'Waning Crescent': 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000871/GSFC_20171208_Archive_e000871~small.jpg',


        }
        return images.get(phase, '')

api.add_resource(MoonPhaseResource, '/moon-phases')  

# class Signup(Resource):
#     def post(self):
#         try:
#             data = request.get_json()
#             new_user = User(
#                 username=data.get('username')
             
#             )
#             new_user.password_hash = data.get('password')
#             db.session.add(new_user)
#             db.session.commit()
            
#             session['user_id'] = new_user.id
#             # print(new_user)
#             return make_response(new_user.to_dict(), 201)
            
#         except Exception as e:
#             return make_response({'error': str(e)}, 422)
# api.add_resource(Signup, '/signup', endpoint='signup')   

# class Signup(Resource):
#     def post(self):
#         try:
#             data = request.get_json()

#             # Validate input data
#             if not data or 'username' not in data or 'password' not in data:
#                 return make_response({'error': 'Username and password are required.'}, 400)

#             new_user = User(
#                 username=data['username']),
#             email=data.get('email'), 
#             # Hash the password before saving
#             new_user.password_hash = generate_password_hash(data['password'])
#             # new_user.password_hash = data['password']  # You should hash the password before storing it
#             db.session.add(new_user)
#             db.session.commit()

#             session['user_id'] = new_user.id
#             return make_response(new_user.to_dict(), 201)

#         except Exception as e:
#             return make_response({'error': str(e)}, 422)
# class Signup(Resource):
#     def post(self):
#         try:
#             # data = {
#             #     'username': 'unique_testuser',
#             #     'email': 'unique_testuser@example.com',
#             #     'password': 'testpassword',
#             #     'password_confirmation': 'testpassword'
#             # }

#     #             {
#     #     "email": "onepagelisa@example.net",
#     #     "username": "onepagelisa",
#     #     "password": "onepage",
#     #     "password_confirmation": "onepage"
#     # }
#             data = request.get_json()
#             print(data)
#             # new_user = User(
#             #     username=data.get('username'),
#             #     email=data.get('email'),  # Ensure you are saving the email
#             # )

#                         # Ensure email is present
#             if not data.get('email'):
#                 raise ValueError("Email is required")
            
#             new_user = User(
#                 username=data.get('username'),
#                 email=data.get('email'),
#                 birthdate=datetime(2000, 1, 1)  # Example birthdate; adjust as necessary
#             )
#             new_user.password_hash = generate_password_hash(data['password'])
#             db.session.add(new_user)
#             db.session.commit()

#             return make_response(new_user.username, 201)  # Return a simple success message

#         except Exception as e:
#             print(f"Error: {str(e)}")  # Log the specific error message
#             return make_response({'error': str(e)}, 422)   

#         #     new_user.password_hash = data.get('password')  # Hash the password before saving
#         #     db.session.add(new_user)
#         #     db.session.commit()
            
#         #     session['user_id'] = new_user.id
#         #     return make_response(new_user.to_dict(), 201)
#         # except Exception as e:
#         #     print(f"Error: {str(e)}")  # Log the specific error message
#         #     # print(str(e))  # Print the specific error message for debugging
#         #     return make_response({'error': str(e)}, 422)

class Signup(Resource):
    def post(self):
        try:
            data = request.get_json()
            print(data)  # Debugging output

            # Ensure email is present
            if not data.get('email'):
                raise ValueError("Email is required")
            
            new_user = User(
                username=data.get('username'),
                email=data.get('email'),
                birthdate=data.get('birthdate'),  
            )
            new_user.password = data['password']  # Use the setter to hash the password
            db.session.add(new_user)
            db.session.commit()
            # # new_user.password_hash = generate_password_hash(data['password'])
            # new_user.password_hash = bcrypt.generate_password_hash(data['password']).decode('utf-8')
            # db.session.add(new_user)
            # db.session.commit()

            # Return a JSON response with the new user's information
            return make_response({
                "username": new_user.username,
                "email": new_user.email,
                "birthdate": new_user.birthdate,    
            }, 201)  # 201 Created status code

        except Exception as e:
            print(f"Error: {str(e)}")  # Log the specific error message
            return make_response({'error': str(e)}, 422)  # Return errors as JSON

api.add_resource(Signup, '/signup', endpoint='signup')  
     
        
# class CheckSession(Resource):
#     def get(self):
#         user = User.query.filter(User.id == session.get('user_id')).first()
#         print(session.get('user_id'), user)
#         if user:
#             return make_response(user.to_dict())
#         else:
#             return make_response({'message': '401: Not Authorized'}, 401)
        
#         # Accessing the current logged-in user:
# if current_user.is_authenticated:
#     print(current_user.username)

# api.add_resource(CheckSession, '/check_session', endpoint='check_session')        
# 
# 3rd iteration
# class CheckSession(Resource):
#     def get(self):
#         # Using Flask-Login's current_user
#         if current_user.is_authenticated:
#             return make_response(current_user.to_dict(), 200)
#         else:
#             return make_response({'message': '401: Not Authorized'}, 401)

# api.add_resource(CheckSession, '/check_session', endpoint='check_session')

class CheckSession(Resource):
    def get(self):
        # Using Flask-Login's current_user
        if current_user.is_authenticated:
            # Manually create the user data dictionary
            user_data = {
                'id': current_user.id,
                'username': current_user.username,
                'email': current_user.email,
                'birthdate': current_user.birthdate.strftime('%Y-%m-%d') if current_user.birthdate else None,
                # Add more fields as needed
            }
            return make_response(user_data, 200)
        else:
            return make_response({'message': '401: Not Authorized'}, 401)

# Add the resource to your API
api.add_resource(CheckSession, '/check_session', endpoint='check_session')


# @login_manager.user_loader
# def load_user(user_id):
#     return User.query.get(int(user_id))  # Ensure this returns a User instance by ID
        
# class Login(Resource):

#     def post(self):
#         data = request.get_json()
#         # print(data)
#         username = data.get('username')
#         password = data.get('password')

#         user = User.query.filter_by(username=username).first()
#         print(session.get('user_id'))

#         # if user and user.authenticate(password):
#         #     session['user_id'] = user.id
#         #     return make_response(user.to_dict(), 200)

#         if user and bcrypt.check_password_hash(user.password_hash, password):
#             session['user_id'] = user.id
#             return make_response(user.to_dict(), 200)

#             # return make_response({'error': 'Invalid username or password'}, 401)
# 2nd login try
# class Login(Resource):
#     def post(self):
#         data = request.get_json()
#         user = User.query.filter_by(username=data.get('username')).first()

#         if user and bcrypt.check_password_hash(user.password_hash, data['password']):
#             login_user(user)  # This logs in the user and manages the session
#             return make_response(user.to_dict(), 200)

#         return make_response({'error': 'Invalid username or password'}, 401)

# api.add_resource(Login, '/login', endpoint='login')    

# 3rd interation
# class Login(Resource):
#     def post(self):
#         data = request.get_json()
#         user = User.query.filter_by(username=data.get('username')).first()

#         # if user and user.check_password(data['password']):
#         #     login_user(user)  # This logs in the user and manages the session
#         #     return make_response(user.to_dict(), 200)

#         # return make_response({'error': 'Invalid username or password'}, 401)
#         if user:
#             if user._password_hash is None:
#                 return make_response({'error': 'Password not set for user.'}, 400)
#             if user.check_password(data['password']):
#                 login_user(user)
#                 return make_response(user.to_dict(), 200)

#         return make_response({'error': 'Invalid username or password'}, 401)
    
# api.add_resource(Login, '/login', endpoint='login')

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        user = User.query.filter_by(username=username).first()

        if user:
            if user._password_hash is None:
                return make_response({'error': 'Password not set for user.'}, 400)
            if user.check_password(password):
                login_user(user)

                # Manually create the user data dictionary
                user_data = {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'birthdate': user.birthdate.strftime('%Y-%m-%d') if user.birthdate else None,
                    # Add more fields as needed
                }

                return make_response(user_data, 200)

        return make_response({'error': 'Invalid username or password'}, 401)

# Add the resource to your API
api.add_resource(Login, '/login', endpoint='login')


# class Logout(Resource):
#     def delete(self):
#         user_id = session.get('user_id')
        
#         if user_id:
#             session['user_id'] = None
#             return make_response({'message': '204: No Content'}, 204)
        
#         return make_response({'error': 'Unauthorized'}, 401)

class Logout(Resource):
    def delete(self):
        user_id = session.get('user_id')
        
        if user_id:
            logout_user()  # Logs out the current user
            return make_response({'message': '204: No Content'}, 204)
        
        return make_response({'error': 'Unauthorized'}, 401)

api.add_resource(Logout, '/logout', endpoint='logout')    

@app.route('/current_user_test')
def current_user_test():
    if current_user.is_authenticated:
        return f"Logged in as: {current_user.username}"
    else:
        return "Not logged in"

# api: gunicorn -b 127.0.0.1:5555 --chdir ./server app:app
# api: gunicorn -b 127.0.0.1:5555 --chdir ./server --timeout 60 app:app


if __name__ == '__main__':
    app.run(port=5555, debug=True)