from config import db, bcrypt
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime
import re

from config import db

# Models go here!

# use re for email validation and time validation


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    # password_hash = db.Column(db.String, nullable=False)
    birthdate = db.Column(db.Date, nullable=False)
    # phone_number =
    # zodiac =

    appointments = db.relationship('Appointment', back_populates='user')
    hairstyles = association_proxy('appointments', 'hairstyle')

    @validates('username')
    def validate_username(self, key, username):
        if len(username) < 3 or len(username) > 10:
            raise ValueError("Username must be between 3 and 10 characters.")
        return username
    
    @validates('email')
    def validate_email(self, key, email):
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            raise ValueError("Email format is invalid.")
        return email

    # @hybrid_property
    # def password_hash(self):
    #     raise AttributeError('password is private')
    #     # return self._password_hash
    
    # @password_hash.setter
    # def password_hash(self, password):
    #     password_hash = bcrypt.generate_password_hash(
    #         password.encode('utf-8'))
    #     self._password_hash = password_hash.decode('utf-8')

    # def authenticate(self, password):
    #     return bcrypt.check_password_hash(
    #         self._password_hash, password.encode('utf-8'))
    
    # @validates('password_hash')
    # def validate_password(self, key, password):
    #     if len(password) < 5:
    #         raise ValueError("Password must be at least 5 characters long.")
    #     return password
    
    @validates('birthdate')
    def validate_birthdate(self, key, user_birthdate):
        if user_birthdate >= datetime.now().date():
            raise ValueError("Birthdate must be in the past.")
        return user_birthdate

class Stylist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    specialty = db.Column(db.String)

    # Relationships
    appointments = db.relationship('Appointment', back_populates='stylist')

class Hairstyle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    moon_phase_id = db.Column(db.Integer, db.ForeignKey('moonphase.id'))
    image = db.column(db.string)

    # Relationships
    appointments = db.relationship('Appointment', back_populates='hairstyle')
    moon_phase = db.relationship('MoonPhase', back_populates='hairstyles')

    @validates('name')
    def validate_name(self, key, user_name):
        if not user_name or len(user_name) > 30:
            raise ValueError("Hairstyle name must not be empty and must not exceed 30 characters.")
        return user_name

  
    @validates('image')
    def validate_image(self, key, user_image):
        if(user_image == ''):
            raise ValueError('Image cannot be empty string')
        # image has to be .png, .jpeg, .jpg
        if('jpg' not in user_image and 'jpeg' not in user_image and 'png' not in user_image):
            raise ValueError('Image must be of type jpeg, jpg, or png')
        return user_image

class MoonPhase(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    phase = db.Column(db.String, nullable=False)
    date = db.Column(db.Date, nullable=False)
    image = db.Column(db.string)

    # Relationships
    hairstyles = db.relationship('Hairstyle', back_populates='moon_phase')    

    @validates('image')
    def validate_image(self, key, user_image):
        if(user_image == ''):
            raise ValueError('Image cannot be empty string')
        # image has to be .png, .jpeg, .jpg
        if('jpg' not in user_image and 'jpeg' not in user_image and 'png' not in user_image):
            raise ValueError('Image must be of type jpeg, jpg, or png')
        return user_image

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    # time = db.Column(db.String, nullable=False)
    
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    hairstyle_id = db.Column(db.Integer, db.ForeignKey('hairstyle.id'), nullable=False)
    stylist_id = db.Column(db.Integer, db.ForeignKey('stylist.id'), nullable=False)

    # Relationships
    user = db.relationship('User', back_populates='appointments')
    hairstyle = db.relationship('Hairstyle', back_populates='appointments')
    stylist = db.relationship('Stylist', back_populates='appointments')

    @validates('date')
    def validate_date(self, key, date):
        if date < datetime.now().date():
            raise ValueError("Appointment date must be in the future.")
        return date

    @validates('time')
    def validate_time(self, key, time):
        if not re.match(r'^\d{2}:\d{2}$', time):
            raise ValueError("Time must be in 'HH:MM' format.")
        return time



