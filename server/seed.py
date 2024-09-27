#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import datetime, timedelta

# Remote library imports
from faker import Faker

# Local imports
from app import app, MoonPhaseResource
from models import db, User, Hairstyle, Stylist, MoonPhase, Appointment

# if __name__ == '__main__':
#     fake = Faker()
#     with app.app_context():
#         print("Starting seed...")
#         # Seed code goes here!

# Seed data
def seed_data():
    fake = Faker()

    # Create users
    users = []
    for _ in range(30):
        user = User(
            username=fake.user_name(),
            email=fake.email(),
            # password_hash=fake.password(),  # Ensure password_hash is handled in your User model
            birthdate=fake.date_of_birth(minimum_age=18),
        )
        users.append(user)
        db.session.add(user)

    db.session.commit()

    # Create stylists
    stylists = []
    for _ in range(10):
        stylist = Stylist(
            name=fake.name(),
            specialty=rc(['Coloring', 'Cutting', 'Styling', 'Extensions']),
        )
        stylists.append(stylist)
        db.session.add(stylist)

    db.session.commit()

    # Create moon phases
    # moon_phases = []
    # for _ in range(12):
    #     phase_date = datetime.now() + timedelta(days=_ * 28)  # Approximate moon cycle
    #     moon_phase = MoonPhase(
    #         phase=rc(['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 
    #                    'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent']),
    #         date=phase_date.date(),
    #         image=fake.image_url()
    #     )
    #     moon_phases.append(moon_phase)
    #     db.session.add(moon_phase)

    # db.session.commit()

    # Create moon phases
    moon_phases = []
    for _ in range(12):
        phase_date = datetime.now() + timedelta(days=_ * 28)
        moon_phase_name = rc(['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 
                               'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'])
        moon_phase = MoonPhase(
            phase=moon_phase_name,
            date=phase_date.date(),
            image=MoonPhaseResource().get_moon_image(moon_phase_name)  # Fetch correct image
        )
        moon_phases.append(moon_phase)
        db.session.add(moon_phase)

    db.session.commit()

    # Create hairstyles
    hairstyles = []
    for _ in range(20):
        hairstyle = Hairstyle(
            name=fake.word().capitalize() + " Style",
            moon_phase_id=rc(moon_phases).id,
            image=fake.image_url()
        )
        hairstyles.append(hairstyle)
        db.session.add(hairstyle)

    db.session.commit()

    # Create appointments
    appointments = []
    for _ in range(50):
        appointment_time = '20:20'  # Example time string
        appointment_time_obj = datetime.strptime(appointment_time, '%H:%M').time()  # Convert to time object
        
        appointment = Appointment(
            date=fake.date_between(start_date='today', end_date='+30d'),
            time=appointment_time_obj,
            user_id=rc(users).id,
            hairstyle_id=rc(hairstyles).id,
            stylist_id=rc(stylists).id
        )
        appointments.append(appointment)
    
    db.session.add(appointment)
    db.session.commit()
    print("Seeding completed!")

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        seed_data()

      
