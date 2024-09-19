#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import db, User, Hairstyle, Stylist, Appointment
# ,MoonPhase

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

# User

class UserList(Resource):
    def get(self):
        users = User.query.all()
        return make_response([{'id': user.id, 'username': user.username, 'email': user.email} for user in users], 200)
          
api.add_resource(UserList, '/users')    

class UserResource(Resource):
    def get(self, id):
        user = User.query.get(id)
        if user is None:
            return make_response({'message': 'User not found'}, 404)
        return make_response({'id': user.id, 'username': user.username, 'email': user.email}, 200)

    def post(self):
        data = request.get_json()
        new_user = User(username=data['username'], email=data['email'], password_hash=data['password'])
        db.session.add(new_user)
        db.session.commit()
        return make_response({'id': new_user.id}, 201)

    def patch(self, id):
        user = User.query.get(id)
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
            [{'id': stylist.id, 'name': stylist.name} for stylist in stylists], 200)

api.add_resource(StylistList, '/stylists')
  
class StylistResource(Resource):
    def get(self, id):
        stylist = Stylist.query.get(id)
        if stylist is None:
            return make_response({'message': 'Stylist not found'}, 404)
        return make_response({'id': stylist.id, 'name': stylist.name, 'specialty': stylist.specialty}, 200)

    def post(self):
        data = request.get_json()
        new_stylist = Stylist(name=data['name'], specialty=data.get('specialty'))
        db.session.add(new_stylist)
        db.session.commit()
        return make_response({'id': new_stylist.id}, 201)

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
            [{'id': hairstyle.id, 'name': hairstyle.name} for hairstyle in hairstyles], 200)
    
api.add_resource(HairstyleList, '/hairstyles')

class HairstyleResource(Resource):
    def get(self, id):
        hairstyle = Hairstyle.query.get(id)
        if hairstyle is None:
            return make_response({'message': 'Hairstyle not found'}, 404)
        return make_response({'id': hairstyle.id, 'name': hairstyle.name}, 200)

    def post(self):
        data = request.get_json()
        new_hairstyle = Hairstyle(name=data['name'], image=data.get('image'))
        db.session.add(new_hairstyle)
        db.session.commit()
        return make_response({'id': new_hairstyle.id}, 201)

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

class AppointmentList(Resource):
    def get(self):
        appointments = Appointment.query.all()
        return make_response(
            [{'id': appointment.id, 'date': appointment.date, 'time': appointment.time} for appointment in appointments], 200
        )

api.add_resource(AppointmentList, '/appointments')
   
class AppointmentResource(Resource):
    def get(self, id):
        appointment = Appointment.query.get(id)
        if appointment is None:
            return make_response({'message': 'Appointment not found'}, 404)
        return make_response({
            'id': appointment.id,
            'date': appointment.date,
            'time': appointment.time,
            'user_id': appointment.user_id,
            'hairstyle_id': appointment.hairstyle_id,
            'stylist_id': appointment.stylist_id}, 200)

    def post(self):
        data = request.get_json()
        new_appointment = Appointment(
            date=data['date'],
            time=data['time'],
            user_id=data['user_id'],
            hairstyle_id=data['hairstyle_id'],
            stylist_id=data['stylist_id']
        )
        db.session.add(new_appointment)
        db.session.commit()
        return make_response({'id': new_appointment.id}, 201)

    def patch(self, id):
        appointment = Appointment.query.get(id)
        if appointment is None:
            return make_response({'message': 'Appointment not found'}, 404)
        data = request.get_json()
        for key, value in data.items():
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

# GET /moon-phase: Fetch the current moon phase

# curl --request GET \
# 	--url 'https://moon-phase.p.rapidapi.com/calendar?format=html' \
# 	--header 'x-rapidapi-host: moon-phase.p.rapidapi.com' \
# 	--header 'x-rapidapi-key: Sign Up for Key'
# need to signup for key, add key to gitignore??
# add a try: and error status? will work on 9/19-9/20
# calendar format in html...change to json? format=json
# url = 'https://moon-phase.p.rapidapi.com/calendar?format=json'

class MoonPhaseResource(Resource):
    def get(self):
        moon_phase_data = response.json()
        url = 'https://moon-phase.p.rapidapi.com/calendar?format=html'
        headers = {
            'x-rapidapi-host': 'moon-phase.p.rapidapi.com',
            'x-rapidapi-key': 'Sign Up for Key'
        }  

        return make_response(moon_phase_data, 200)

api.add_resource(MoonPhaseResource, '/moon-phase')



