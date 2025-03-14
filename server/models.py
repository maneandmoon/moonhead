from config import db, bcrypt
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import time as dt_time, datetime
import re
from config import db
from werkzeug.security import generate_password_hash, check_password_hash

# Models go here!
# use re for email validation and time validation

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String(150))
    is_active = db.Column(db.Boolean, default=True)
    birthdate = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    # zodiac = db.Column(db.String, unique=True, nullable=False)

    appointments = db.relationship('Appointment', back_populates='user', cascade="all, delete-orphan")
    hairstyles = association_proxy('appointments', 'hairstyle')

    @validates('username')
    def validate_username(self, key, username):
        if len(username) < 3 or len(username) > 30:
            raise ValueError("Username must be between 3 and 30 characters.")
        return username
    
    @validates('email')
    def validate_email(self, key, email):
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            raise ValueError("Email format is invalid.")
        return email

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self._password_hash = generate_password_hash(password)
        print(f"Password hash set for user {self.username}: {self._password_hash}")

    def check_password(self, password):
        return check_password_hash(self._password_hash, password)
    
    def get_id(self):  
        return self.id
    
    @validates('birthdate')
    def validate_birthdate(self, key, user_birthdate):
        if isinstance(user_birthdate, str):
            user_birthdate = datetime.strptime(user_birthdate, '%Y-%m-%d').date()  # Convert to date
        
        # print(f"Type of user_birthdate: {type(user_birthdate)}")

        # Ensure both are date objects for comparison
        if isinstance(user_birthdate, datetime):
            user_birthdate = user_birthdate.date()

        if user_birthdate >= datetime.now().date():
            raise ValueError("Birthdate must be in the past.")

        return user_birthdate

class Stylist(db.Model):
    __tablename__ = 'stylists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    specialty = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    appointments = db.relationship('Appointment', back_populates='stylist')

class MoonPhase(db.Model):
    __tablename__ = 'moonphases'

    id = db.Column(db.Integer, primary_key=True)
    phase = db.Column(db.String, nullable=False)
    date = db.Column(db.Date, nullable=False)
    image = db.Column(db.String, nullable=False)

    hairstyles = db.relationship('Hairstyle', back_populates='moon_phase')    

    @validates('image')
    def validate_image(self, key, user_image):
        if not user_image:
            raise ValueError('Image cannot be empty string')
        if 'jpg' not in user_image and 'jpeg' not in user_image and 'png' not in user_image:
            raise ValueError('Image must be of type jpeg, jpg, or png')
        return user_image

class Hairstyle(db.Model):
    __tablename__ = 'hairstyles'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    moon_phase_id = db.Column(db.Integer, db.ForeignKey('moonphases.id'))
    image = db.Column(db.String)
    price = db.Column(db.Float, nullable=False)
    type = db.Column(db.String, nullable=False)

    appointments = db.relationship('Appointment', back_populates='hairstyle')
    moon_phase = db.relationship('MoonPhase', back_populates='hairstyles')

    @validates('name')
    def validate_name(self, key, user_name):
        if not user_name or len(user_name) > 30:
            raise ValueError("Hairstyle name must not be empty and must not exceed 30 characters.")
        return user_name
    
    @validates('type')
    def validate_type(self, key, user_type):
        if user_type not in ['women', 'men', 'colors']:
            raise ValueError("Type must be 'women', 'men', or 'colors'.")
        return user_type

    @validates('image')
    def validate_image(self, key, user_image):
        if(user_image == ''):
            raise ValueError('Image cannot be empty string')
        return user_image
    
    @validates('price')
    def validate_price(self, key, user_price):
        if user_price < 0:
            raise ValueError("Price must be a non-negative number.")
        return user_price


class Appointment(db.Model):
    __tablename__ = 'appointments'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    hairstyle_id = db.Column(db.Integer, db.ForeignKey('hairstyles.id'), nullable=False)
    stylist_id = db.Column(db.Integer, db.ForeignKey('stylists.id'), nullable=False)

    user = db.relationship('User', back_populates='appointments')
    hairstyle = db.relationship('Hairstyle', back_populates='appointments')
    stylist = db.relationship('Stylist', back_populates='appointments')

    @validates('date')
    def validate_date(self, key, date):
        # Convert string date to date object if necessary
        if isinstance(date, str):
            date = datetime.strptime(date, '%Y-%m-%d').date()  # Convert to date

        # Now `date` should be a date object
        if date < datetime.now().date():
            raise ValueError("Date must be today or in the future.")
        
        return date

    @validates('time')
    def validate_time(self, key, appointment_time):
    # Check if appointment_time is a string
        if isinstance(appointment_time, str):
            if not re.match(r'^\d{2}:\d{2}$', appointment_time):
                raise ValueError("Time must be in HH:MM format.")
            # Convert to a time object
            appointment_time = datetime.strptime(appointment_time, '%H:%M').time()
        
        # Check if appointment_time is a datetime.time object
        if isinstance(appointment_time, dt_time):
            return appointment_time

        raise ValueError("Invalid time format.")